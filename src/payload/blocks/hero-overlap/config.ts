import { linkGroup } from "@/payload/fields/linkGroup"
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"
import { Block } from "payload"

export const HeroOverlap: Block = {
  slug: "hero-overlap",
  imageURL:
    "https://utfs.io/f/Xjjcsx3JaOwUnG2XLxUkKBp5u9LfGrawxTvUHj62otZdF7CI",
  fields: [
    {
      name: "headingLines",
      type: "array",
      minRows: 1,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
  interfaceName: "HeroOverlapBlock",
}
