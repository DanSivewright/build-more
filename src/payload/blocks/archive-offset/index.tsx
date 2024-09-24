import React from "react"
import Image from "next/image"
import Link from "next/link"
import type {
  ArchiveOffsetBlock as ArchiveOffsetBlockType,
  Media,
  Post,
} from "@/payload-types"

import { getCollection } from "@/lib/get-collection"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Grid } from "@/components/grid"
import { Section, sectionVariants } from "@/components/section"
import { Title } from "@/components/title"

function splitArray(arr: Post[]): [Post[], Post[]] {
  const arrOne: Post[] = []
  const arrTwo: Post[] = []

  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      arrOne.push(arr[i])
    } else {
      arrTwo.push(arr[i])
    }
  }

  return [arrOne, arrTwo]
}

export const ArchiveOffsetBlock: React.FC<ArchiveOffsetBlockType> = async (
  props
) => {
  const {
    id,
    categories,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === "collection") {
    // const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id
      else return category
    })

    const fetchedPosts = await getCollection({
      collection: "posts",
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })()

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === "object") return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  const [arrOne, arrTwo] = splitArray(posts)

  return (
    <Section className="gutter relative pb-7 lg:pb-14 xl:pb-28">
      <Grid gap="xl" className="mx-auto max-w-screen-2xl">
        <div className="absolute inset-x-0 bottom-0 top-14 bg-accent lg:top-28 xl:top-56"></div>
        <Section
          spacer="p"
          className="relative z-10 col-span-12 flex flex-col gap-16 lg:col-span-5"
        >
          {arrOne.map((post, index) => (
            <Link
              href={("/posts/" + post.slug) as string}
              className="flex flex-col"
              key={post.id}
            >
              <div
                className={cn(
                  "relative aspect-video w-full overflow-hidden lg:aspect-square",
                  {
                    "lg:aspect-[10/11]": index === 0,
                    "lg:aspect-[16/11]": index === 1,
                  }
                )}
              >
                <Image
                  src={(post.meta?.image as Media)?.url as string}
                  alt={(post.meta?.image as Media)?.alt as string}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                {post.categories &&
                Array.isArray(post.categories) &&
                post.categories.length > 0
                  ? post.categories?.map((category, i) => {
                      // @ts-ignore
                      const isLast = i === post?.categories?.length - 1
                      if (typeof category === "object") {
                        return (
                          <React.Fragment key={index}>
                            {category.title}
                            {!isLast && <React.Fragment>/</React.Fragment>}
                          </React.Fragment>
                        )
                      }
                      return null
                    })
                  : null}
              </p>
              <Title level={4} showAs={5}>
                {post.title}
              </Title>
              <Button variant="link" className="px-0 underline">
                Read more
              </Button>
            </Link>
          ))}
        </Section>
        <div className="relative z-10 col-span-12 flex flex-col gap-16 lg:col-span-7">
          {arrTwo.map((post, index) => (
            <Link
              href={("/posts/" + post.slug) as string}
              className="flex flex-col"
              key={post.id}
            >
              <div
                className={cn(
                  "relative aspect-video w-full overflow-hidden lg:aspect-square",
                  {
                    "lg:aspect-[16/11]": index === 0,
                    "lg:aspect-square": index === 1,
                  }
                )}
              >
                <Image
                  src={(post.meta?.image as Media)?.url as string}
                  alt={(post.meta?.image as Media)?.alt as string}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                {post.categories &&
                Array.isArray(post.categories) &&
                post.categories.length > 0
                  ? post.categories?.map((category, i) => {
                      // @ts-ignore
                      const isLast = i === post?.categories?.length - 1
                      if (typeof category === "object") {
                        return (
                          <React.Fragment key={index}>
                            {category.title}
                            {!isLast && <React.Fragment>/</React.Fragment>}
                          </React.Fragment>
                        )
                      }
                      return null
                    })
                  : null}
              </p>
              <Title level={4} showAs={5}>
                {post.title}
              </Title>
              <Button variant="link" className="px-0 underline">
                Read more
              </Button>
            </Link>
          ))}
        </div>
      </Grid>
    </Section>
  )
}
