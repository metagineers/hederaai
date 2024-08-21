import { ExternalLink } from '@/components/external-link'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 sm:p-8 sm:text-base">
        <h1 className="inline-block max-w-fit text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
          Introducing RedQueen...
        </h1>
        <p className="leading-normal text-zinc-900 dark:text-zinc-100">
          RedQueen is the first MVP as part of the{' '}
          <ExternalLink href="https://hederaai.metagineers.com">HederaAI</ExternalLink>, team of{' '}
          <ExternalLink href="https://hederaai.metagineers.com">
            AI Agents
          </ExternalLink>
          .
        </p>
        <p className="leading-normal text-zinc-900 dark:text-zinc-100">
          RedQueen&apos;s main task to help you with you day to day development task on the{' '}
          <ExternalLink href="https://hedera.com">
            Hedera
          </ExternalLink>{' '}
          DLT.
         </p>
         <p className="leading-normal text-zinc-900 dark:text-zinc-100"> 
          It can answer questions you have about development, give code snippets, and even walkthrough with you on how to 
          develop your first web3 app.</p>
        <p className="leading-normal text-zinc-900 dark:text-zinc-100">
         RedQueen is built with the help of Google Gemini Pro 1.5, NextJS, FastAPI, Python, NodeJS and Hedera DLT technologies
        </p>
      </div>
    </div>
  )
}