import React from 'react'
import { SpinnerIcon } from '../ui/icons'
import { Skeleton } from '../ui/skeleton'

export const Image = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-96 w-full" />
      <div
        className={`flex flex-row items-center gap-2 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      >
        <SpinnerIcon />
        <div className="text-sm text-zinc-500">Analyzing image...</div>
      </div>
    </div>
  )
}
