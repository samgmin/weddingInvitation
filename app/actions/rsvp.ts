"use server";

import type { RsvpState } from "@/lib/rsvp-state";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function parseRadio(formData: FormData, name: string): string | null {
  const v = formData.get(name);
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s.length ? s : null;
}

export async function submitRsvp(
  _prevState: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const guestName = String(formData.get("guestName") ?? "").trim();
  const phoneLast4 = String(formData.get("phoneLast4") ?? "").trim();
  const guestSide = parseRadio(formData, "guestSide");
  const attendance = parseRadio(formData, "attendance");
  const plusOneRaw = parseRadio(formData, "plusOne");
  const guestCountRaw = formData.get("guestCount");

  if (!guestName) {
    return { ok: false, message: "성함을 입력해 주세요." };
  }
  if (!/^\d{4}$/.test(phoneLast4)) {
    return {
      ok: false,
      message: "휴대폰 뒷번호 4자리를 숫자 4자리로 입력해 주세요.",
    };
  }
  if (guestSide !== "groom" && guestSide !== "bride") {
    return { ok: false, message: "누구 손님인지 선택해 주세요." };
  }
  if (attendance !== "yes" && attendance !== "no") {
    return { ok: false, message: "참석 여부를 선택해 주세요." };
  }
  if (plusOneRaw !== "yes" && plusOneRaw !== "no") {
    return { ok: false, message: "동반인 여부를 선택해 주세요." };
  }

  let guestCount = 0;
  if (guestCountRaw !== null && guestCountRaw !== "") {
    const n = Number(guestCountRaw);
    if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) {
      return { ok: false, message: "동반인 수는 0 이상의 정수로 입력해 주세요." };
    }
    guestCount = n;
  }

  const plus_one = plusOneRaw === "yes";

  const row = {
    guest_name: guestName,
    phone_last4: phoneLast4,
    guest_side: guestSide,
    attendance,
    plus_one,
    guest_count: guestCount,
    updated_at: new Date().toISOString(),
  };

  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("rsvp").upsert(row, {
      onConflict: "guest_name,phone_last4",
    });

    if (error) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console -- 서버 디버그
        console.error("[RSVP] Supabase error", error);
      }
      return {
        ok: false,
        message:
          "저장 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 관리자에게 문의해 주세요.",
      };
    }

    return {
      ok: true,
      message: "참석 의사가 저장되었습니다. 감사합니다!",
    };
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.";
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("[RSVP]", e);
    }
    if (msg.includes("Supabase 환경변수")) {
      return { ok: false, message: "서버 설정이 완료되지 않았습니다. 관리자에게 문의해 주세요." };
    }
    return { ok: false, message: "저장에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
