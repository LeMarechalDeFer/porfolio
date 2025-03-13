// app/my-statsig.tsx

"use client";

import React from "react";
import { StatsigProvider, useClientAsyncInit } from '@statsig/react-bindings';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';
import { useEffect, useState } from "react";

export default function MyStatsig({ children }: { children: React.ReactNode }) {
  const { client } = useClientAsyncInit(
    "client-TAPXuEfuJy4Yue7QsvIHv74mmDjjGMxRVL9bqITHiNd",
    { userID: 'a-user' }, 
    { plugins: [ new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin() ] },
  );

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (client) {
      setIsReady(true);
    }
  }, [client]);

  if (!isReady) {
    return null;
  }


  return (
    <StatsigProvider client={client} loadingComponent={null}>
      {children}
    </StatsigProvider>
  );
}
