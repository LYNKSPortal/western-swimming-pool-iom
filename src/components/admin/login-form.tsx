"use client";

import { useActionState } from "react";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginAdmin, type LoginState } from "@/lib/actions/admin-auth";

const initialState: LoginState = {};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">
          <span className="flex items-center gap-1.5">
            <Lock className="size-3.5" /> Admin password
          </span>
        </Label>
        <Input id="password" name="password" type="password" required autoFocus />
      </div>

      {state?.error ? (
        <p className="flex items-center gap-2 text-sm text-western-red">
          <AlertCircle className="size-4 shrink-0" /> {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="animate-spin" /> Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
