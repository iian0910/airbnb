// 此元件是為了確保內容只在 client 端選染而非 server 端而製作

'use client';

import { useEffect, useState } from "react"

interface ClientOnlyProps {
  children: React.ReactNode
}

export const ClientOnly: React.FC<ClientOnlyProps> = ({
  children
}) => {
  const [hasMounted, setHasMounted] = useState(false)
  
  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <>
      { children }
    </>
  )
}