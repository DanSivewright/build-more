import React, { Fragment } from "react"
import type { Page } from "@/payload-types"
import { CallToActionBlock } from "@/payload/blocks/call-to-action"
import { ContentBlock } from "@/payload/blocks/content"
import { FormBlock } from "@/payload/blocks/form"
import { MediaBlock } from "@/payload/blocks/media-block"

import AccordionBlock from "./accordion"
import { ArchiveGridBlock } from "./archive-grid"
import { ArchiveOffsetBlock } from "./archive-offset"
import CallToActionImageOffset from "./call-to-action-image-offset"
import CarouselOffsetBlock from "./carousel-offset"
import HeroOverlapBlock from "./hero-overlap"
import TextHero from "./text-hero"

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  "text-hero": TextHero,
  "cta-image-offset": CallToActionImageOffset,
  accordion: AccordionBlock,
  "archive-offset": ArchiveOffsetBlock,
  "archive-grid": ArchiveGridBlock,
  "carousel-offset": CarouselOffsetBlock,
  "hero-overlap": HeroOverlapBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-ignore */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
