import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

import { KurashiDiv, KurashiLeftBorder } from '@/components/kurashi-div'
import { useTranslation } from '@/i18n'
import * as transKey from '@/i18n/product-info-trans-key'
import { Breadcrumb } from '@/components/breadcrumb'
import ProductSizeTable from '@/components/product/product-size-table'

import prisma from '@/lib/prisma'

interface ProductInfoProps {
  lng: string
  id: string
}

const ProductInfo: React.FC<ProductInfoProps> = async ({ id, lng }) => {
  const { t } = await useTranslation(lng, transKey.namespace)
  const productInfo = await prisma.product.findUnique({
    where: { id },
    include: {
      origin: true,
      component: {
        include: {
          material: {
            select: { name: true }
          }
        }
      },
      size: {
        include: {
          dimension: {
            select: {
              name: true,
              value: true,
              id: true
            }
          }
        }
      },
      category: true,
      productIntro: true,
      ProductVariants: {
        select: {
          product: {
            select: {
              id: true,
              name: true,
              size: {
                include: {
                  dimension: {
                    select: {
                      name: true,
                      id: true,
                      value: true
                    }
                  }
                }
              }
            }
          },
          unit: true,
          id: true,
          thumbnail: true,
          variantName: true
        }
      }
    }
  })

  const breadcrumb = [
    <Link href='/' key={uuidv4()}>{t(transKey.home)}</Link>,
    <Link href='/products' key={uuidv4()}>{t(transKey.allProducts)}</Link>,
    <Link href={`/products/category/${productInfo?.category?.id ?? '#'}`} key={uuidv4()}>{productInfo?.category?.name ?? 'null'}</Link>,
    <Link href={`/products/product-detail/${productInfo?.id ?? '#'}`} key={uuidv4()}>{productInfo?.name ?? 'null'}</Link>
  ]

  if (productInfo !== null) {
    return (
      <div>
        <div className='w-4/5 my-10 mx-auto flex flex-row'>
          <div>
            <div className='flex flex-row gap-5 items-center justify-center self-start ml-auto'>
              <Breadcrumb items={breadcrumb} separator={<i className='fa-solid fa-chevron-right' />} />
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex flex-col w-4/5 mx-auto my-10 max-lg:w-full max-lg:p-1'>
            <div className='w-fit mb-10'>
              <KurashiLeftBorder>
                <h1 className='text-xl'>{t(transKey.productInformation)}</h1>
              </KurashiLeftBorder>
            </div>
            <div className='flex flex-row mx-auto items-center justify-between gap-20 max-lg:flex-col'>
              <div className='w-3/5 max-w-md max-lg:w-full mx-auto'>
                <img className='max-w-full' src={productInfo.thumbnail} alt={productInfo.name} />
              </div>
              <div className='flex flex-col justify-center gap-1 flex-grow h-full'>
                <div className='bg-secondary p-5'>
                  <KurashiLeftBorder>
                    {`${t(transKey.productName)}`}: <span>{t(productInfo.name)}</span>
                  </KurashiLeftBorder>
                </div>
                <div className='bg-secondary p-5'>
                  <div>
                    <KurashiLeftBorder>
                      {`${t(transKey.productMaterial)}`}:
                    </KurashiLeftBorder>
                  </div>
                  <div className='pl-10'>
                    {productInfo.component.map(component => (
                      <div key={component.id}>
                        <span className='text-main text-xl font-semibold'> - </span>{t(component.name)}: <span>{component.material.map(material => t(material.name)).join(', ')}</span>
                      </div>
                    )
                    )}
                  </div>
                </div>
                <div className='bg-secondary p-5'>
                  <div>
                    <KurashiLeftBorder>
                      {`${t(transKey.productOrigin)}`}: {'\t'}
                      <span>
                        {productInfo.origin.map(fromOrigin => t(fromOrigin.name)).join(', ')}
                      </span>
                    </KurashiLeftBorder>
                  </div>
                </div>
                <div className='bg-secondary p-2'>
                  <div className='w-fit mx-auto'>
                    <KurashiDiv>
                      <Link href='#zalolink'>{t(transKey.contactUsingZalo)}</Link>
                      <div className='ml-3 inline-block'>
                        <i className='fa-solid fa-chevron-right' />
                      </div>
                    </KurashiDiv>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-4/5 mx-auto max-lg:w-full max-lg:p-1'>
            <div className='w-fit mb-10'>
              <KurashiLeftBorder>
                <h1 className='text-xl'>{t(transKey.productIntro)}</h1>
              </KurashiLeftBorder>
            </div>
            <div className='flex flex-row bg-secondary max-lg:flex-col max-lg:w-full max-lg:mx-0'>
              <div className='flex flex-col w-1/2 p-10 items-center justify-center max-lg:w-full'>
                {productInfo.productIntro.map(intro => (
                  <div className='flex flex-col gap-5 my-5' key={intro.id}>
                    <KurashiLeftBorder>
                      <div>{intro.title}</div>
                    </KurashiLeftBorder>
                    <div className='pl-4'>
                      {intro.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-row-reverse w-1/2 justify-center items-center max-lg:w-full max-lg:p-10'>
                {productInfo.productIntro.map(intro => (
                  <div className='flex flex-col w-1/2 gap-5 my-5' key={intro.id}>
                    <img src={intro.introImg} alt='product intro image' className='w-5/6' />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col w-4/5 mx-auto my-10 max-lg:w-full max-lg:p-1'>
            <div className='w-fit mb-10'>
              <KurashiLeftBorder>
                <h1 className='text-xl'>{t(transKey.productSize)}</h1>
              </KurashiLeftBorder>
            </div>
            <div className='flex flex-row max-lg:flex-col bg-secondary justify-center items-center max-lg:w-full max-lg:mx-0'>
              <div className='flex flex-row-reverse w-1/2 justify-center items-center max-lg:w-full my-5'>
                <img src={productInfo.size?.productSizeImage} alt='product size image' className='w-5/6' />
              </div>
              <div className='w-1/2 flex-1 flex flex-col gap-10'>
                {productInfo.ProductVariants.map(x => (
                  <div key={uuidv4()} className='max-lg:w-full'>
                    <div className='flex flex-row gap-1 justify-center items-center'>
                      <i className='fa-solid fa-up-right-and-down-left-from-center' />
                      <div>
                        {x.variantName}
                      </div>
                      <img src={x.thumbnail} alt='product size image' className='w-5/6' />
                    </div>
                    <div className='' />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col items-center justify-center flex-1 max-lg:my-5 my-5 w-full mx-auto'>
              <div className='w-full mx-auto flex flex-col gap-10'>
                {productInfo.ProductVariants.map(x => <ProductSizeTable key={x.id} lng={lng} variants={x} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

  return notFound()
}

export default ProductInfo
