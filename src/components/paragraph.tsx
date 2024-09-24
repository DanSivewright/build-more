import { cva, VariantProps } from 'class-variance-authority'

const paragraphVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs lg:text-xs xl:text-sm',
      sm: 'text-xs lg:text-sm xl:text-base',
      md: 'text-sm lg:text-base xl:text-lg',
      lg: 'text-base lg:text-lg xl:text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

const Paragraph: React.FC<ParagraphProps> = ({ children, size, className, ...rest }) => {
  return (
    <p {...rest} className={paragraphVariants({ className, size })}>
      {children}
    </p>
  )
}

Paragraph.displayName = 'Paragraph'
export { Paragraph, paragraphVariants }
