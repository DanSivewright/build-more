import RichText from '@/components/rich-text'
import React from 'react'

import { Width } from '../width'

export const Message: React.FC = ({ message }: { message: Record<string, any> }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText content={message} />}
    </Width>
  )
}
