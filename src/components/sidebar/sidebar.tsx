'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'home',
  },
  {
    title: 'Organizations',
    href: '/organizations',
    icon: 'building',
  },
  {
    title: 'Frameworks',
    href: '/frameworks',
    icon: 'book',
  },
  {
    title: 'Security',
    href: '/security',
    icon: 'shield',
    items: [
      {
        title: 'Overview',
        href: '/security',
        icon: 'shield',
      },
      {
        title: 'Penetration Testing',
        href: '/security/penetration-testing',
        icon: 'target',
      },
      {
        title: 'Controls',
        href: '/security/controls',
        icon: 'checkCircle',
      },
      {
        title: 'Vulnerabilities',
        href: '/security/vulnerabilities',
        icon: 'warning',
      },
    ],
  },
  {
    title: 'Assessments',
    href: '/assessments',
    icon: 'clipboard',
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: 'check',
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: 'fileText',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'settings',
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className={cn('flex h-screen flex-col gap-y-5 overflow-y-auto border-r bg-background', className)}>
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Icons.logo className="h-8 w-8" />
          <span className="text-lg font-semibold text-foreground">Compliance Guardian</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col px-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {sidebarNavItems.map((item) => {
                const isActive = pathname?.startsWith(item.href || '')
                const isExpanded = isActive && item.items
                
                return (
                  <li key={item.title}>
                    {item.href && (
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex items-center gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6',
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}
                      >
                        {Icons[item.icon] && React.createElement(Icons[item.icon], { 
                          className: cn(
                            'h-5 w-5 shrink-0',
                            isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                          )
                        })}
                        <span>{item.title}</span>
                      </Link>
                    )}
                    
                    {/* Submenu */}
                    {isExpanded && item.items && (
                      <ul className="mt-1 space-y-1 pl-8">
                        {item.items.map((subItem) => {
                          const isChildActive = pathname === subItem.href
                          return (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                className={cn(
                                  'block rounded-lg p-2 text-sm leading-6',
                                  isChildActive
                                    ? 'bg-primary/50 text-foreground'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                )}
                              >
                                {Icons[subItem.icon] && React.createElement(Icons[subItem.icon], { 
                                  className: 'mr-2 h-4 w-4 inline-block'
                                })}
                                {subItem.title}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </li>
          
          {/* Sign Out Button */}
          <li className="mt-auto">
            <Button
              variant="ghost"
              className="group -mx-2 flex w-full gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6 text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={handleSignOut}
            >
              <Icons.logout className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
              Sign out
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
