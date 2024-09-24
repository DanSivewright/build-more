import type { TextHeroBlock as TextHeroBlockProps } from "src/payload-types"

import { cn } from "@/lib/utils"
import { Grid } from "@/components/grid"
import { CMSLink } from "@/components/link"
import RichText from "@/components/rich-text"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

type Props = {
  className?: string
} & TextHeroBlockProps

const TextHero: React.FC<Props> = ({
  className,
  richText,
  headingLines,
  links,
}) => {
  return (
    <Section spacer="p" className="gutter mx-auto max-w-screen-2xl">
      {headingLines.map((line, index) => (
        <h1
          //
          key={index}
          className={cn(
            "text-left text-[34px] font-semibold md:text-[70px] lg:text-[80px] xl:text-[90px]",
            {
              "lg:text-right": index % 2 !== 0,
            }
          )}
          // className={index % 2 === 0 ? 'text-left' : 'text-right'}
        >
          {line.text}
        </h1>
      ))}
      {richText && (
        <Grid>
          <div className="col-span-12 mt-8 flex flex-col gap-8 lg:col-span-7 lg:col-start-6">
            <RichText
              className="text-balance"
              content={richText}
              enableGutter={false}
              enableProse={false}
            />
            <div className="flex flex-col gap-8">
              {(links || []).map(({ link }, i) => {
                return <CMSLink key={i} size="lg" {...link} />
              })}
            </div>
          </div>
        </Grid>
      )}
    </Section>
  )
}
export default TextHero
