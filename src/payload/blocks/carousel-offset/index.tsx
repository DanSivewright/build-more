"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type {
  CarouselOffsetBlock as CarouselOffsetBlockType,
  Media,
} from "@/payload-types"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CMSLink } from "@/components/cms-link"
import { Grid } from "@/components/grid"
import RichText from "@/components/rich-text"
import { Section, sectionVariants } from "@/components/section"

type Props = CarouselOffsetBlockType
const CarouselOffsetBlock: React.FC<Props> = ({
  introContent,
  background,
  slides,
  image,
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <Grid
      className="mb-7 mt-14 lg:mb-14 lg:mt-28 xl:mb-28 xl:mt-56"
      style={{ background: `#${background}` }}
    >
      <Section className="gutter col-span-12 flex flex-col justify-start text-left md:col-span-7">
        {introContent && (
          <RichText
            className="mx-0 text-left"
            enableGutter={false}
            content={introContent}
          />
        )}
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {slides?.map((slide, index) => (
              <CarouselItem key={slide.id}>
                {slide.richText && (
                  <RichText enableGutter={false} content={slide.richText} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="relative flex w-full justify-end">
            <CarouselPrevious
              classNameOverride={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            />
            <CarouselNext
              classNameOverride={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            />
          </div>
        </Carousel>
      </Section>
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
    </Grid>
  )
}
export default CarouselOffsetBlock
