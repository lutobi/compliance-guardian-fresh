import React from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
