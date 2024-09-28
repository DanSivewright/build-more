"use client"

import React, { Fragment, useEffect, useRef, useState } from "react"
import type { StaticImageData } from "next/image"
import NextImage from "next/image"
import cssVariables from "@/cssVariables"

import { cn } from "@/lib/utils"

import type { Props } from "./types"

const { breakpoints } = cssVariables

export const Media: React.FC<Props> = (props) => {
  const {
    alt: altFromProps,
    className,
    fill,
    htmlElement = "div",
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    videoClassName,
  } = props

  const isVideo =
    typeof resource === "object" && resource?.mimeType?.includes("video")
  const Tag = (htmlElement as any) || Fragment

  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isVideo) {
      const { current: video } = videoRef
      if (video) {
        video.addEventListener("suspend", () => {
          // Handle video suspension if needed
        })
      }
    }
  }, [isVideo])

  if (isVideo && resource && typeof resource === "object") {
    const { filename } = resource

    return (
      <Tag {...(htmlElement !== null ? { className } : {})}>
        <video
          autoPlay
          className={cn(videoClassName)}
          controls={false}
          loop
          muted
          onClick={onClick}
          playsInline
          ref={videoRef}
        >
          <source
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`}
          />
        </video>
      </Tag>
    )
  }

  // Image handling
  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ""

  if (!src && resource && typeof resource === "object") {
    const {
      alt: altFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource

    src = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
  }

  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(", ")

  return (
    <Tag {...(htmlElement !== null ? { className } : {})}>
      <NextImage
        alt={alt || ""}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        onClick={onClick}
        onLoad={() => {
          setIsLoading(false)
          if (typeof onLoadFromProps === "function") {
            onLoadFromProps()
          }
        }}
        priority={priority}
        quality={90}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </Tag>
  )
}
