'use client'

import React from 'react'

interface PageHeaderProps {
  heading: string
  subheading?: string
  children?: React.ReactNode
}

export function PageHeader({ heading, subheading, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
        {subheading && (
          <p className="text-sm text-muted-foreground">{subheading}</p>
        )}
      </div>
      {children && <div className="flex items-center space-x-2">{children}</div>}
    </div>
  )
}
