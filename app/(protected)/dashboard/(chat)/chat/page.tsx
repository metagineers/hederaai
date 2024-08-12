import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '../../../../actions'

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Chat - RevolvingRock",
  description: "Chat with RedQueen, your personal assistant here.",
});

export default async function IndexPage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <>
    <DashboardHeader
      heading="Chat"
      text="Chat with RedQueen, your personal assistant here."
    />
    <div className="divide-y divide-muted pb-10">
      <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
        <Chat id={id} session={session} missingKeys={missingKeys} />
      </AI>
      </div>
    </>
  )
}