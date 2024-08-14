'use client'

import { Chat } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'

import { removeChat, shareChat } from '@/app/actions'

import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'

interface SidebarItemsProps {
  chats?: Chat[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  if (!chats?.length) return null

  return (
    <>
      {chats.map((chat, index) => 
        chat && (
          <SidebarItem key={index} index={index} chat={chat}>
            <SidebarActions
              chat={chat}
              removeChat={removeChat}
              shareChat={shareChat}
            />
          </SidebarItem>
        )
      )}
    </>
  )
}
