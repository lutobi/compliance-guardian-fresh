import FrameworkSidebar from '@/components/framework/FrameworkSidebar'

export default function FrameworkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
