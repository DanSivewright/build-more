import { cache } from "react"
import { RenderBlocks } from "@/payload/blocks/render-blocks"

import { createPage } from "@/lib/create-page"
import { getCollection } from "@/lib/get-collection"
import { PayloadRedirects } from "@/components/payload-redirects"

const queryPageBySlug = cache(async () => {
  const data = await getCollection({
    collection: "pages",
    limit: 1000,
    where: {
      slug: {
        equals: "home",
      },
    },
  })()

  return data.docs?.[0] || null
})

const { Page } = createPage({
  loader: async () => await queryPageBySlug(),
  component: async ({ data }) => {
    if (!data) {
      return <PayloadRedirects url={"/home"} />
    }

    const { hero, layout } = data
    return (
      <article>
        <PayloadRedirects disableNotFound url={"/home"} />
        <RenderBlocks blocks={layout} />
      </article>
    )
  },
})

export default Page
