import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Chat – Revolving Rock",
  description: "Chat with RedQueen, your personal assistant.",
});

export default async function ChatPage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Chat"
        text="Red Queen - Your Personal Assistant."
      />
      <div className="divide-y divide-muted pb-10">
        <p>RedQueen</p>
      </div>
    </>
  );
}
