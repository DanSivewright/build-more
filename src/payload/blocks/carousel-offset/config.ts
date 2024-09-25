import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"
import type { Block } from "payload"

export const CarouselOffset: Block = {
  slug: "carousel-offset",
  interfaceName: "CarouselOffsetBlock",
  imageURL:
    "https://utfs.io/f/Xjjcsx3JaOwUty8ey0rGMAnoF98KkrseZ7gH2hiR0jlEJOqP",
  fields: [
    {
      name: "background",
      label: "Background",
      type: "select",
      required: true,
      options: [
        {
          label: "Bright Gray",
          value: "EDEDED",
        },
        {
          label: "Columbia Blue",
          value: "C9DAF0",
        },
        {
          label: "Big Foot Feet",
          value: "E08C5B",
        },
        {
          label: "Medium Sea Green",
          value: "41BD62",
        },
        {
          label: "Cornsilk",
          value: "FFF9D7",
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "slides",
      type: "array",
      label: "Slides",
      fields: [
        {
          name: "richText",
          type: "richText",
          label: "Slide Content",
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: "introContent",
      type: "richText",
      label: "Intro Content",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],
  labels: {
    singular: "Carousel Offset",
    plural: "Carousel Offsets",
  },
}
