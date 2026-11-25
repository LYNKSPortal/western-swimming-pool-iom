"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Check } from "lucide-react";

const STORAGE_KEY = "wsp-cookie-consent";

/** Consent banner shown once to new visitors; dismissal is stored in localStorage. */
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

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore storage failures
    }
    setVisible(false);
  }

  function decline() {
    window.location.href = "https://www.google.com";
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-deep-ink p-5 text-sm text-white/80 shadow-2xl sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 size-5 shrink-0 text-heritage-yellow" />
          <p>
            We use cookies to keep this site working properly. By continuing to browse you agree
            to our{" "}
            <Link href="/cookie-policy" className="font-semibold text-pool-blue hover:text-white">
              cookie policy
            </Link>
            ,{" "}
            <Link
              href="/terms-conditions"
              className="font-semibold text-pool-blue hover:text-white"
            >
              terms &amp; conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="font-semibold text-pool-blue hover:text-white">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-heritage-yellow px-5 py-2 text-sm font-bold text-deep-ink transition-colors hover:bg-white"
          >
            <Check className="size-4" /> Accept
          </button>
          <button
            type="button"
            onClick={decline}
            className="text-xs text-white/40 underline-offset-2 hover:text-white/60 hover:underline"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
