import { Accordion } from "@/payload/blocks/accordion/config"
import { ArchiveGrid } from "@/payload/blocks/archive-grid/config"
import { ArchiveOffset } from "@/payload/blocks/archive-offset/config"
import { CallToActionImageOffset } from "@/payload/blocks/call-to-action-image-offset/config"
import { CarouselOffset } from "@/payload/blocks/carousel-offset/config"
import { TextHero } from "@/payload/blocks/text-hero/config"
import { slugField } from "@/payload/fields/slug"
import { hero } from "@/payload/heros/config"
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"
import type { CollectionConfig } from "payload"

import { generatePreviewPath } from "../../../lib/generate-preview-path"
import { authenticated } from "../../access/authenticated"
import { authenticatedOrPublished } from "../../access/authenticated-or-published"
import { CallToAction } from "../../blocks/call-to-action/config"
import { Content } from "../../blocks/content/config"
import { FormBlock } from "../../blocks/form/config"
import { MediaBlock } from "../../blocks/media-block/config"
import { populatePublishedAt } from "../../hooks/populate-published-at"
import { revalidatePage } from "./hooks/revalidatePage"

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/${typeof data?.slug === "string" ? data.slug : ""}`,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({
        path: `/${typeof doc?.slug === "string" ? doc.slug : ""}`,
      }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                //
                CallToAction,
                TextHero,
                CallToActionImageOffset,
                Accordion,
                ArchiveOffset,
                ArchiveGrid,
                CarouselOffset,
                Content,
                MediaBlock,
                FormBlock,
              ],
              required: true,
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
