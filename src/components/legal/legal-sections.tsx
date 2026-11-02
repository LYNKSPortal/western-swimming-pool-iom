import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { LegalSection } from "@/lib/data/legal";

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <Accordion type="multiple" defaultValue={[sections[0]?.title]} className="flex flex-col">
      {sections.map((section) => (
        <AccordionItem key={section.title} value={section.title}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
