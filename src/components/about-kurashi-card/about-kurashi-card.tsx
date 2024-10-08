'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useTranslationClient } from '@/i18n/client-side'
import { defaultNS } from '@/i18n/settings'
import { aboutKurashi, readMore, aboutContentTitle } from '@/i18n/translation-key'

interface AboutKurashiCardProps {
  lng: string
}

const AboutKurashiCard: React.FC<AboutKurashiCardProps> = ({ lng }) => {
  const { t } = useTranslationClient(lng, defaultNS, {})
  return (
    <div className='max-lg:flex-col max-lg:w-full max-lg:mx-1 h-[75vh] relative bg-about'>
      <Image className='h-full w-full' alt='về Kurashi' src='https://storage.googleapis.com/kurashi_frontpage_files/images/about-bg.png' fill />
      <div className='flex flex-col gap-7 justify-center items-center absolute top-1/2 right-1/2 translate-x-1/2 translate-y-[-50%]'>
        <div className='w-fit text-wrap max-lg:mx-auto text-6xl font-semibold text-secondary'>
          {t(aboutKurashi).toUpperCase()}
        </div>
        <div className='text-2xl max-lg:mx-auto text-secondary'>{t(aboutContentTitle)}</div>
        <div className='w-fit mt-20'>
          <Link href='/about'>
            <div className='flex flex-row items-center px-2 py-2 bg-secondary border-main hover:bg-main hover:text-secondary transition'>
              <div className='px-3'>{t(readMore)}</div>
              <div className='ml-3 inline-block'>
                <i className='fa-solid fa-chevron-right' />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutKurashiCard
