import Image from "next/image"
import { CallToActionImageOffsetBlock, Media } from "@/payload-types"

import { cn } from "@/lib/utils"
import { Grid, gridVariants } from "@/components/grid"
import { CMSLink } from "@/components/link"
import RichText from "@/components/rich-text"
import { Section, sectionVariants } from "@/components/section"

type Props = CallToActionImageOffsetBlock
const CallToActionImageOffset: React.FC<Props> = ({
  richText,
  background,
  links,
  image,
}) => {
  return (
    <Grid
      className={cn(sectionVariants())}
      style={{ background: `#${background}` }}
    >
      <div className="relative col-span-12 aspect-video md:col-span-5 md:aspect-auto">
        <div className="relative mt-0 h-full w-full overflow-hidden lg:-mt-14 xl:-mt-28">
          <Image
            src={(image as Media).url as string}
            fill
            className="object-cover"
            alt="alt text"
          />
        </div>
      </div>
      <Section className="col-span-12 flex flex-col justify-center gap-8 px-5 md:col-span-7 md:p-0">
        {richText && <RichText className="m-0 p-0" content={richText} />}
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </Section>
    </Grid>
  )
}
export default CallToActionImageOffset
