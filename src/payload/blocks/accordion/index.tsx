import type { AccordionBlock } from "@/payload-types"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import RichText from "@/components/rich-text"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

type Props = AccordionBlock
const AccordionBlock: React.FC<Props> = ({ items, richText }) => {
  return (
    <Section className="gutter mx-auto flex max-w-screen-lg flex-col items-center">
      {richText && (
        <RichText
          enableGutter={false}
          className="text-balance text-center"
          content={richText}
        />
      )}
      {items && items.length ? (
        <Accordion type="multiple" className="w-full">
          {items.map((item, index) => (
            <AccordionItem
              className={cn("border-b-2 border-foreground/80", {
                "border-t-2": index === 0,
              })}
              key={item.id}
              value={item.id as string}
            >
              <AccordionTrigger>
                <div className="flex w-full grow items-center gap-4">
                  {index < 10 ? `0${index + 1}` : index + 1}{" "}
                  <Title className="line-clamp-1 w-fit" level={3} showAs={5}>
                    {item.title}
                  </Title>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {item.content && (
                  <RichText
                    enableGutter={false}
                    className="text-left"
                    content={item.content}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : null}
    </Section>
  )
}
export default AccordionBlock
