import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  imageURL: 'https://utfs.io/f/Xjjcsx3JaOwUskosrOxIpUzgjiRDonMCclYA8FexHW5a6JIN',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Rich Text',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          label: 'Content',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Accordions',
    singular: 'Accordion',
  },
}
