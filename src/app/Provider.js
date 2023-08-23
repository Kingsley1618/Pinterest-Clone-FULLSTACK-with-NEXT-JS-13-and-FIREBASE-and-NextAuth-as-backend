'use client'
import React, { Children } from 'react'
import { SessionProvider } from "next-auth/react"
function Provider({children}) {
  return (
    <SessionProvider>
        {children}
        </SessionProvider>
  )
}

export default Provider