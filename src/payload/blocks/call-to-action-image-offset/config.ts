import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '../../fields/linkGroup'

export const CallToActionImageOffset: Block = {
  slug: 'cta-image-offset',
  interfaceName: 'CallToActionImageOffsetBlock',
  imageURL: 'https://utfs.io/f/Xjjcsx3JaOwUPDzlUAMXZk21iTVKaYcs7wQtvmdDL0B3x5qG',
  fields: [
    {
      name: 'background',
      label: 'Background',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Bright Gray',
          value: 'EDEDED',
        },
        {
          label: 'Columbia Blue',
          value: 'C9DAF0',
        },
        {
          label: 'Big Foot Feet',
          value: 'E08C5B',
        },
        {
          label: 'Medium Sea Green',
          value: '41BD62',
        },
        {
          label: 'Cornsilk',
          value: 'FFF9D7',
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  labels: {
    plural: 'Calls to Action with Image Offset',
    singular: 'Call to Action with Image Offset',
  },
}
