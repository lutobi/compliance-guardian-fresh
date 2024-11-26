'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Icons.home },
  { name: 'Organizations', href: '/organizations', icon: Icons.building },
  { name: 'Frameworks', href: '/frameworks', icon: Icons.book },
  { name: 'Assessments', href: '/assessments', icon: Icons.fileCheck },
  { 
    name: 'Security', 
    href: '/security', 
    icon: Icons.shield,
    children: [
      { name: 'Overview', href: '/security' },
      { name: 'Penetration Testing', href: '/security/penetration-testing' },
      { name: 'Vulnerability Management', href: '/security/vulnerabilities' },
      { name: 'Security Controls', href: '/security/controls' },
      { name: 'Vulnerability Scanner', href: '/security/scanner' }
    ]
  },
  { name: 'Reports', href: '/reports', icon: Icons.fileText },
  { name: 'Settings', href: '/settings', icon: Icons.settings },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block md:w-64">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-80">
            <Icons.logo className="h-6 w-6" />
            <span>Compliance Guardian</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname?.startsWith(item.href)
            const isExpanded = isActive && item.children

            return (
              <div key={item.name}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start gap-2',
                      isActive && 'font-semibold'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>

                {isExpanded && item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href
                      return (
                        <Link key={child.name} href={child.href}>
                          <Button
                            variant={isChildActive ? 'secondary' : 'ghost'}
                            size="sm"
                            className={cn(
                              'w-full justify-start',
                              isChildActive && 'font-semibold'
                            )}
                          >
                            {child.name}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Sign out button */}
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => {
              const supabase = createClientComponentClient()
              supabase.auth.signOut()
            }}
          >
            <Icons.logout className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}
