/** RSVP 폼 `useFormState`용 — `"use server"` 모듈과 분리 (Next가 서버 파일은 async 함수만 export 허용) */
export type RsvpState = {
  ok: boolean;
  message: string;
};

export const initialRsvpState: RsvpState = {
  ok: false,
  message: "",
};
