"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import { submitRsvp } from "@/app/actions/rsvp";
import { initialRsvpState, type RsvpState } from "@/lib/rsvp-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 rounded-lg bg-forest py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending ? "저장 중…" : "제출하기"}
    </button>
  );
}

function RsvpModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [state, formAction] = useFormState(submitRsvp, initialRsvpState);

  useEffect(() => {
    if (!state.ok) return;
    const t = setTimeout(() => onClose(), 1800);
    return () => clearTimeout(t);
  }, [state.ok, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mx-auto mt-8 max-h-[85vh] max-w-md overflow-y-auto rounded-2xl bg-white p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="font-[var(--font-serif)] text-xl text-forest">참석 의사</h3>
      <form action={formAction} className="mt-4 space-y-4">
        <FieldSet label="누구 손님이신가요?">
          <Radio name="guestSide" value="groom" label="신랑" defaultChecked />
          <Radio name="guestSide" value="bride" label="신부" />
        </FieldSet>

        <FieldSet label="참석 여부">
          <Radio name="attendance" value="yes" label="참석" defaultChecked />
          <Radio name="attendance" value="no" label="불참" />
        </FieldSet>

        <Input label="성함" name="guestName" placeholder="홍길동" autoComplete="name" required />
        <Input
          label="휴대폰 뒷번호 4자리"
          name="phoneLast4"
          placeholder="1234"
          inputMode="numeric"
          maxLength={4}
          pattern="[0-9]{4}"
          required
        />

        <FieldSet label="동반인 여부">
          <Radio name="plusOne" value="yes" label="네" />
          <Radio name="plusOne" value="no" label="아니요" defaultChecked />
        </FieldSet>

        <Input
          label="동반인 수"
          name="guestCount"
          type="number"
          min={0}
          placeholder="0"
          defaultValue={0}
        />

        <RsvpMessage state={state} />

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            className="flex-1 rounded-lg border py-2.5 text-sm"
            onClick={onClose}
          >
            닫기
          </button>
          <SubmitButton />
        </div>
      </form>
    </motion.div>
  );
}

function RsvpMessage({ state }: { state: RsvpState }) {
  if (!state.message) return null;
  return (
    <p
      role="status"
      className={`text-center text-sm ${
        state.ok ? "text-forest" : "text-coral"
      }`}
    >
      {state.message}
    </p>
  );
}

export function RSVP() {
  const [open, setOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  return (
    <SectionShell>
      <SectionHeading
        title="참석의사 체크"
        description="참석 여부를 알려주시면 준비에 큰 도움이 됩니다."
      />
      <button
        type="button"
        onClick={() => {
          setModalKey((k) => k + 1);
          setOpen(true);
        }}
        className="mt-4 w-full rounded-full bg-forest py-3 text-sm font-medium text-white"
      >
        참석의사 체크하기
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/55 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <RsvpModal key={modalKey} onClose={() => setOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionShell>
  );
}

function FieldSet({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-1 text-sm font-medium text-zinc-700">{label}</legend>
      <div className="flex flex-wrap gap-4">{children}</div>
    </fieldset>
  );
}

function Radio({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-sm text-zinc-600">
      {label}
      <input
        {...props}
        className="mt-1 block w-full rounded-lg border border-[#e3dece] px-3 py-2 text-sm text-zinc-800 outline-none focus:border-forest"
      />
    </label>
  );
}
