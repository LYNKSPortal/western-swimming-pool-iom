import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-ice-blue/40">
      <Container className="flex max-w-md flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <Image src="/images/logo.png" alt="Western Swimming Pool logo" width={56} height={56} />
          <h1 className="font-display text-2xl font-bold text-deep-ink">Staff admin</h1>
          <p className="text-center text-sm text-muted-foreground">
            Sign in to view swimming lesson enquiries.
          </p>
        </div>
        <Card className="p-7 sm:p-8">
          <AdminLoginForm />
        </Card>
      </Container>
    </div>
  );
}
