import React from "react"
import Image from "next/image"
import type {
  ArchiveGridBlock as ArchiveGridBlockType,
  Media,
  Post,
  User,
} from "@/payload-types"

import { getCollection } from "@/lib/get-collection"
import { dateFormatter } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Grid } from "@/components/grid"
import RichText from "@/components/rich-text"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

export const ArchiveGridBlock: React.FC<ArchiveGridBlockType> = async (
  props
) => {
  const {
    id,
    categories,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    richText,
    relationTo,
  } = props

  const limit = limitFromProps || 3

  let collection: (Post | User)[] = []

  if (populateBy === "collection") {
    // const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id
      else return category
    })

    const fetchedPosts = await getCollection({
      collection: relationTo as "posts" | "users",
      depth: 1,
      limit,
      ...(relationTo === "posts" &&
      flattenedCategories &&
      flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })()

    collection = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      collection = selectedDocs
        .filter(
          (
            doc
          ): doc is
            | { relationTo: "posts"; value: Post }
            | { relationTo: "users"; value: User } =>
            typeof doc.value === "object" &&
            "relationTo" in doc &&
            (doc.relationTo === "posts" || doc.relationTo === "users")
        )
        .map((doc) => doc.value) as (Post | User)[]
    }
  }

  return (
    <Section className="gutter mx-auto flex max-w-screen-2xl flex-col justify-center gap-8">
      {richText && (
        <RichText
          className="text-balance"
          enableGutter={false}
          content={richText}
        />
      )}
      <Grid>
        {collection.map((card) => {
          return (
            <article
              className="col-span-12 flex flex-col gap-2 md:col-span-6 lg:col-span-4 xl:col-span-3"
              key={card.id}
            >
              <div className="group relative flex aspect-[7/8] w-full items-center justify-center overflow-hidden bg-accent p-8 transition-all">
                {"meta" in card ? (
                  <Image
                    src={(card.meta?.image as Media)?.url || ""}
                    alt={(card.meta?.image as Media)?.alt || ""}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    {((card as User).image as Media)?.url ? (
                      <Image
                        src={((card as User).image as Media)?.url ?? ""}
                        alt={((card as User).image as Media)?.alt ?? ""}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Avatar size="2xl">
                        <AvatarFallback>
                          {(card as User).name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </>
                )}
              </div>

              {"meta" in card ? (
                <>
                  <p className="text-xs text-muted-foreground/70">
                    {dateFormatter(card.createdAt)} •{" "}
                    {card.categories &&
                    Array.isArray(card.categories) &&
                    card.categories.length > 0
                      ? card.categories?.map((category, i) => {
                          // @ts-ignore
                          const isLast = i === card?.categories?.length - 1
                          if (typeof category === "object") {
                            return (
                              <React.Fragment key={i + category.title}>
                                {category.title}
                                {!isLast && <React.Fragment>/</React.Fragment>}
                              </React.Fragment>
                            )
                          }
                          return null
                        })
                      : null}
                  </p>
                  <Title showAs={5}>{card.title}</Title>
                </>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground/70">
                    Joined {dateFormatter(card.createdAt)}
                  </p>
                  <Title
                    className="line-clamp-2"
                    style={{ margin: 0 }}
                    level={5}
                  >
                    {(card as User).name}
                  </Title>
                </>
              )}
            </article>
          )
        })}
      </Grid>
    </Section>
  )
}
