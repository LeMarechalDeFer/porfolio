// app/my-statsig.tsx

"use client"

import React, { useEffect, useState } from "react"
import { StatsigProvider, useClientAsyncInit } from "@statsig/react-bindings"

type StatsigPlugins = NonNullable<NonNullable<Parameters<typeof useClientAsyncInit>[2]>["plugins"]>

export default function MyStatsig({ children }: Readonly<{ children: React.ReactNode }>) {
  const [plugins, setPlugins] = useState<StatsigPlugins>()

  useEffect(() => {
    async function loadPlugins() {
      const [{ StatsigAutoCapturePlugin }, { StatsigSessionReplayPlugin }] = await Promise.all([
        import("@statsig/web-analytics"),
        import("@statsig/session-replay"),
      ])
      setPlugins([new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin()])
    }
    loadPlugins()
  }, [])

  const { client } = useClientAsyncInit(
    "client-TAPXuEfuJy4Yue7QsvIHv74mmDjjGMxRVL9bqITHiNd",
    { userID: "a-user" },
    { plugins },
  )

  if (!client) return <>{children}</>

  return (
    <StatsigProvider client={client} loadingComponent={<>{children}</>}>
      {children}
    </StatsigProvider>
  )
}
