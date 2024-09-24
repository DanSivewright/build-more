import type { Field } from 'payload'
import deepMerge from '../utilities/deep-merge'

export type LinkAppearances = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    value: 'default',
    label: 'Default',
  },
  destructive: {
    value: 'destructive',
    label: 'Destructive',
  },
  outline: {
    value: 'outline',
    label: 'Outline',
  },
  secondary: {
    value: 'secondary',
    label: 'Secondary',
  },
  ghost: {
    value: 'ghost',
    label: 'Ghost',
  },
  link: {
    value: 'link',
    label: 'Link',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      maxDepth: 1,
      relationTo: ['pages', 'posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.secondary]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
    linkResult.fields.push({
      name: 'size',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Extra Small',
          value: 'xs',
        },
        {
          label: 'Small',
          value: 'sm',
        },
        {
          label: 'Deafult',
          value: 'md',
        },
        {
          label: 'Large',
          value: 'lg',
        },
        {
          label: 'Extra Large',
          value: 'xl',
        },
      ],
      admin: {
        description: 'Choose the size of the button.',
      },
    })
  }

  return deepMerge(linkResult, overrides)
}
