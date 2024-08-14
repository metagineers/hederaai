import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat, getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  console.log('session', JSON.stringify(session))

  if (!session?.user || !session.user.id) {
    return {}
  }


  const chat = await getChat(params.id, session.user.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  console.log('params', params)
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  if (!session?.user) {
    console.log("No sessions user found")
    redirect(`/login?next=/dashboard/chat/${params.id}`)
  }

  const userId = session.user.id as string
  const chat = await getChat(params.id, userId)
  console.log('got here')
  if (!chat) {
    console.log("No chat info found")
    redirect('/')
  }

  if (chat?.userId !== session?.user?.id) {
    console.log("chat user id is not session user id")
    notFound()
  }
  console.log('got here too')
  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages,
        interactions: []
      }}
    >
      <Chat
        id={chat.id}
        session={session}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
