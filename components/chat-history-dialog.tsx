'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { type VisuallyHiddenProps } from '@radix-ui/react-visually-hidden'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

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
import { IconSpinner } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

import { ChatHistory } from './chat-history'

import { useSession } from 'next-auth/react';

interface ChatHistoryDialogProps extends DialogProps {
  chat: Pick<Chat, 'id' | 'title' | 'messages'>
  shareChat: (id: string) => ServerActionResult<Chat>
  onCopy: () => void
}

export function ChatHistoryDialog({
  chat,
  shareChat,
  onCopy,
  ...props
}: ChatHistoryDialogProps) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [isSharePending, startShareTransition] = React.useTransition()



  const copyShareLink = React.useCallback(
    async (chat: Chat) => {
      if (!chat.sharePath) {
        return toast.error('Could not copy share link to clipboard')
      }

      const url = new URL(window.location.href)
      url.pathname = chat.sharePath
      copyToClipboard(url.toString())
      onCopy()
      toast.success('Share link copied to clipboard')
    },
    [copyToClipboard, onCopy]
  )

  const { data: session, status } = useSession();

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat History</DialogTitle>
          <DialogDescription>
            <ChatHistory userId={session?.user.id} />
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1 rounded-lg border p-4 text-sm">
          <div className="font-medium">{chat.title}</div>
          <div className="text-muted-foreground">
            {chat.messages.length} messages
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button
            disabled={isSharePending}
            onClick={() => {
              // @ts-ignore
              startShareTransition(async () => {
                console.log(JSON.stringify(chat))
                const result = await shareChat(chat.id)

                if (result && 'error' in result) {
                  toast.error(result.error)
                  return
                }

                copyShareLink(result)
              })
            }}
          >
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              <>Copy link</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
