import Link from "next/link";
import { Waves, ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <Waves className="size-14 text-pool-blue" />
      <h1 className="font-display text-4xl font-extrabold text-deep-ink">
        Looks like you&apos;ve swum off course
      </h1>
      <p className="max-w-md text-muted-foreground">
        We couldn&apos;t find that page. Let&apos;s get you back to dry land.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          <ArrowLeft /> Back to homepage
        </Link>
      </Button>
    </Container>
  );
}
