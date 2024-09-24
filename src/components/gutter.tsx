import { cva, VariantProps } from 'class-variance-authority'

const gutterVariants = cva('', {
  variants: {
    size: {
      sm: 'px-4 lg:px-8 xl:px-16',
      md: 'px-6 lg:px-12 xl:px-24',
      lg: 'px-8 lg:px-16 xl:px-36',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface IGutterProps extends VariantProps<typeof gutterVariants> {
  children: React.ReactNode
  className?: string
}

const Gutter: React.FC<IGutterProps> = ({ children, className, size }) => {
  return (
    <div
      className={gutterVariants({
        size,
        className,
      })}
    >
      {children}
    </div>
  )
}
Gutter.displayName = 'Gutter'

export { Gutter, gutterVariants }
