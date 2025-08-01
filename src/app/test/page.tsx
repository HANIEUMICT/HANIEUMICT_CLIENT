'use client'

import { useState } from 'react'
import EstimateList from '@/components/factory/estimate/EstimateList'


export default function TestPage() {
  return (
    <div className='flex items-center'>
      <EstimateList></EstimateList>
    </div>
  )
}
