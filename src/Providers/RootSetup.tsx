import React from 'react'

export function RootProvider({children}: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}