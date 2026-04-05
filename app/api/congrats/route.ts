import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const TABLE = "congrats_messages";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from(TABLE)
      .select("id,name,message,created_at")
      .order("created_at", { ascending: false })
      .limit(60);

    if (error) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("[Congrats][GET]", error);
      }
      return NextResponse.json({ ok: false, message: "메시지를 불러오지 못했습니다." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, items: data ?? [] });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("[Congrats][GET]", e);
    }
    return NextResponse.json({ ok: false, message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name?: string; message?: string };
    const name = (body.name ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name) {
      return NextResponse.json({ ok: false, message: "이름을 입력해 주세요." }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ ok: false, message: "축하 메시지를 입력해 주세요." }, { status: 400 });
    }
    if (name.length > 20) {
      return NextResponse.json({ ok: false, message: "이름은 20자 이하로 입력해 주세요." }, { status: 400 });
    }
    if (message.length > 300) {
      return NextResponse.json({ ok: false, message: "메시지는 300자 이하로 입력해 주세요." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from(TABLE)
      .insert({ name, message })
      .select("id,name,message,created_at")
      .single();

    if (error) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("[Congrats][POST]", error);
      }
      return NextResponse.json({ ok: false, message: "메시지 저장에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, item: data });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("[Congrats][POST]", e);
    }
    return NextResponse.json({ ok: false, message: "요청 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}

