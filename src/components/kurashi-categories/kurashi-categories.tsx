import React from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

import { ProductCard } from '@/components/product'

import prisma from '@/lib/prisma'

interface KurashiCategoriesProps {
  lng: string
}

// @ts-expect-error
const KurashiCategories: Promise<React.JSX.Element> = async ({ lng }: KurashiCategoriesProps) => {
  const productsRaw = await prisma.product.findMany({
    take: 20,
    where: { isAvailable: true },
    include: {
      category: { select: { name: true, id: true } },
      ProductColor: true,
      ProductTag: true
    }
  })

  return (
    <div className='flex flex-row gap-5 justify-center'>
      {productsRaw.sort((x, y) => x.order - y.order).map(x => {
        const url = x.hasLandingPage ? x.landingPageUrl : `/products/product-detail/${x.id}`
        return (
          <Link key={uuidv4()} href={url}>
            <ProductCard lng={lng} product={x} />
          </Link>
        )
      })}
    </div>
  )
}

export default KurashiCategories
