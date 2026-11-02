import { Hero } from "@/components/home/hero";
import { UpcomingSessions } from "@/components/home/upcoming-sessions";
import { FacilitiesIntro } from "@/components/home/facilities-intro";
import { LessonHighlights } from "@/components/home/lesson-highlights";
import { ActivitiesSection } from "@/components/home/activities-section";
import { CafeSection } from "@/components/home/cafe-section";
import { PricingSection } from "@/components/home/pricing-section";
import { CommunityStories } from "@/components/home/community-stories";
import { AccessibilitySection } from "@/components/home/accessibility-section";
import { ContactSection } from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <UpcomingSessions />
      <FacilitiesIntro />
      <LessonHighlights />
      <ActivitiesSection />
      <CafeSection />
      <PricingSection />
      <CommunityStories />
      <AccessibilitySection />
      <ContactSection />
    </>
  );
}
