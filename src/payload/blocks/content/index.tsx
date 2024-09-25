import React from "react"
import { Page } from "@/payload-types"

import { cn } from "@/lib/utils"
import { CMSLink } from "@/components/cms-link"
import RichText from "@/components/rich-text"

type Props = Extract<Page["layout"][0], { blockType: "content" }>

export const ContentBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { columns } = props

  return (
    <div className="grid grid-cols-4 gap-x-16 gap-y-8 px-4 lg:grid-cols-12">
      {columns &&
        columns.length > 0 &&
        columns.map((col, index) => {
          const { enableLink, link, richText, size } = col

          return (
            <div
              className={cn("col-span-4", {
                "md:col-span-2": size !== "full",
                "lg:col-span-12": size === "full",
                "lg:col-span-6": size === "half",
                "lg:col-span-4": size === "oneThird",
                "lg:col-span-8": size === "twoThirds",
              })}
              key={index}
            >
              {richText && <RichText content={richText} enableGutter={false} />}

              {enableLink && <CMSLink {...link} />}
            </div>
          )
        })}
    </div>
  )
}
