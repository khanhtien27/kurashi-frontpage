import React from 'react'
import Image from 'next/image'

import { useTranslation } from '@/i18n'
import { ProductQueryResult } from '@/types'

interface ProductCardProps {
  product: Partial<ProductQueryResult>
  lng: string
}

const ProductCard: React.FC<ProductCardProps> = async ({ product, lng }) => {
  const { t } = await useTranslation(lng)
  return (
    <div className='product-card--hover flex flex-col items-center rounded-md w-96 max-sm:w-full relative' style={{}}>
      <div className='rounded-md bg-secondary overflow-hidden z-10'>
        <Image className='transform transition-transform duration-500' src={product.thumbnail ?? '#'} alt='product thumbnail' width={640} height={360} />
      </div>
      <div className='z-10 flex flex-col justify-center transition rounded-md hover:cursor-pointer hover:bg-opacity-0 bg-kurashi-black absolute text-center w-full h-full'>
        <div className='font-semibold text-xl text-secondary'>
          {t(product.name?.toUpperCase() ?? '#')}
        </div>
      </div>

    </div>
  )
}

export default ProductCard
