'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'

import { toast } from 'sonner'

import { ServerActionResult, User, type Chat } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'


import { ChatHistory } from './chat-history'

import { useSession } from 'next-auth/react';

interface ChatHistoryDialogProps extends DialogProps {
  onChatChange: () => void
}

export function ChatHistoryDialog({
  onChatChange,
  ...props
}: ChatHistoryDialogProps) {

  const { data: session, status } = useSession();

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat History</DialogTitle>
          <DialogDescription>
            <ChatHistory onChatChange={onChatChange} userId={session?.user.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="items-center">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
