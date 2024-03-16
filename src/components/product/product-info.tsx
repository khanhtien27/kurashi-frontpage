import React from 'react'
import Link from 'next/link'

import { KurashiDiv, KurashiLeftBorder } from '@/components/kurashi-div'
import { useTranslation } from '@/i18n'
import { productName, productMaterial, productOrigin, contactUsingZalo, productInformation } from '@/i18n/translation-key'
import { productNs } from '@/i18n/settings'

import { Prisma } from '@prisma/client'

interface ProductInfoProps {
  productInfo: Prisma.ProductGetPayload<{ include: { origin: true, component: { include: { material: { select: { name: true } } } } } }>
  lng: string
}

const ProductInfo: React.FC<ProductInfoProps> = async ({ productInfo, lng }) => {
  const { t } = await useTranslation(lng, productNs)
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col w-4/5 mx-auto'>
        <div className='w-fit pl-10 mb-10'>
          <KurashiLeftBorder>
            <h1 className='text-xl'>{t(productInformation)}</h1>
          </KurashiLeftBorder>
        </div>
        <div className='flex flex-row mx-auto items-center gap-20 max-lg:flex-col'>
          <div className='w-1/2 max-w-md max-lg:w-full'>
            <img className='max-w-full' src={productInfo.thumbnail} alt={productInfo.name} />
          </div>
          <div className='flex flex-col justify-center gap-1 flex-grow h-full'>
            <div className='bg-secondary p-5'>
              <KurashiLeftBorder>
                {`${t(productName)}`}: <span>{t(productInfo.name)}</span>
              </KurashiLeftBorder>
            </div>
            <div className='bg-secondary p-5'>
              <div>
                <KurashiLeftBorder>
                  {`${t(productMaterial)}`}:
                </KurashiLeftBorder>
              </div>
              <div className='pl-10'>
                {productInfo.component.map(component => (
                  <div key={component.id}>
                    <span className='text-main text-xl font-semibold'> - </span>{component.name}: <span>{component.material.map(material => t(material.name)).join(', ')}</span>
                  </div>
                )
                )}
              </div>
            </div>
            <div className='bg-secondary p-5'>
              <div>
                <KurashiLeftBorder>
                  {`${t(productOrigin)}`}: {'\t'}
                  <span>
                    {productInfo.origin.map(fromOrigin => t(fromOrigin.name)).join(', ')}
                  </span>
                </KurashiLeftBorder>
              </div>
            </div>
            <div className='bg-secondary p-2'>
              <div className='w-fit mx-auto'>
                <KurashiDiv>
                  <Link href='#zalolink'>{t(contactUsingZalo)}</Link>
                  <div className='ml-3 inline-block'>
                    <i className='fa-solid fa-chevron-right' />
                  </div>
                </KurashiDiv>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
