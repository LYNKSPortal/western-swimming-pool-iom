"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "wsp-cookie-consent";

/** Simple cookie notice shown once to new visitors; dismissal is stored in localStorage. */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setVisible(true);
        }
      } catch {
        // localStorage unavailable — don't nag on every page
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // ignore storage failures
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-deep-ink p-5 text-sm text-white/80 shadow-2xl sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 size-5 shrink-0 text-heritage-yellow" />
          <p>
            We use cookies to keep this site working properly and to help us understand how
            it&apos;s used. By continuing to browse you agree to our use of cookies.{" "}
            <Link href="/cookie-policy" className="font-semibold text-pool-blue hover:text-white">
              Read our cookie policy
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-end rounded-full bg-heritage-yellow px-5 py-2 text-sm font-bold text-deep-ink transition-colors hover:bg-white sm:self-auto"
        >
          <X className="size-4" /> Got it
        </button>
      </div>
    </div>
  );
}
