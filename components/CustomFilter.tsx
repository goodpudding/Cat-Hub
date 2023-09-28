import React from 'react'
import { CustomFilterProps } from '@/types'

const CustomFilter: React.FC<CustomFilterProps> = ({ title }) => {
  return (
    <div>{title}</div>
  )
}

export default CustomFilter