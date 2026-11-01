"use client";

import { useActionState, useId } from "react";
import { pillStates } from "@/src/components/wizard/StepChrome";
import { trackLabel, trackWide } from "@/src/components/wizard/tracking";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

/** Admin password form. The password is checked by the login Server Action, never in the browser. */
export default function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);
  const inputId = useId();
  const errorId = useId();

  return (
    <form action={action} className="flex flex-col items-center gap-4">
      <label htmlFor={inputId} className={`${trackLabel} text-caption text-ink`}>
        PASSWORD
      </label>
      <input
        id={inputId}
        name="password"
        type="password"
        autoComplete="current-password"
        required
        maxLength={1024}
        aria-invalid={state.error ? true : undefined}
        aria-describedby={state.error ? errorId : undefined}
        className={
          "h-control w-cta rounded-control bg-burgundy px-6 text-center text-button text-paper caret-paper " +
          "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        }
      />
      <button
        type="submit"
        disabled={pending}
        className={`${trackWide} h-control w-cta rounded-control border-[1.5px] border-burgundy bg-paper text-button text-burgundy ${pillStates}`}
      >
        LOG IN
      </button>
      <p id={errorId} role="alert" className={`${trackLabel} min-h-[1.4em] text-caption text-burgundy`}>
        {state.error}
      </p>
    </form>
  );
}
