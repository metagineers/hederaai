import { ExternalLink } from '@/components/external-link'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 sm:p-8 sm:text-base">
        <h1 className="inline-block max-w-fit text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
          Introducing RedQueen...
        </h1>
        <p className="leading-normal text-zinc-900 dark:text-zinc-100">
          RedQueen is part of the{' '}
          <ExternalLink href="https://hederaai.vercel.app">HederaAI</ExternalLink>, team of{' '}
          <ExternalLink href="https://hederaai.vercel.app">
            AI Agents
          </ExternalLink>
          .
        </p>
        <p className="leading-normal text-zinc-900 dark:text-zinc-100">
          RedQueen&apos;s main task is to get to know more about you so that the rest of the HederaAI{' '}
          <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            EcoSystem
          </ExternalLink>{' '}
         can serve you better. Have a natural conversation with RedQueen and treat it like an inquisitive friend
         who is trying to get to know you better. 
         </p>
         <p className="leading-normal text-zinc-900 dark:text-zinc-100"> 
          Tell it about your skills, interests, important personal 
         information that you want to remember, your relationships and anything factual related to you that can be
         used by the Revolving Rock team to better understand you and your needs.
        </p>
      </div>
    </div>
  )
}