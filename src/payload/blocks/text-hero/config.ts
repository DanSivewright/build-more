import { linkGroup } from '@/payload/fields/linkGroup'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const TextHero: Block = {
  slug: 'text-hero',
  imageURL: 'https://utfs.io/f/Xjjcsx3JaOwUt7MRUerGMAnoF98KkrseZ7gH2hiR0jlEJOqP',
  fields: [
    {
      name: 'headingLines',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
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
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  interfaceName: 'TextHeroBlock',
}
