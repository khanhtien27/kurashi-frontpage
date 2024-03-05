'use client'
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import '@/components/kurashi-tabs/react-tabs.css'

interface KurashiTabsProps {
  body: Array<{ key: string, content: any }>
  tabList: any[]
}

const KurashiTabs: React.FC<KurashiTabsProps> = ({ body, tabList }) => {
  return (
    <Tabs defaultIndex={0} className='w-2/3 mx-auto my-11'>
      <TabList className='w-full flex flex-row justify-around mb-10'>
        {tabList?.map(tab => <Tab className='pb-2 text-2xl font-semibold hover:cursor-pointer' key={tab}>{tab}</Tab>)}
      </TabList>
      {body?.map(item => (
        <TabPanel key={item.key}>
          {item.content}
        </TabPanel>
      ))}
    </Tabs>
  )
}

export default KurashiTabs
