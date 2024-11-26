'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Icons } from '@/components/ui/icons'

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
        icon: 'alertTriangle',
      },
      {
        title: 'Vulnerability Scanner',
        href: '/security/scanner',
        icon: 'scan',
      }
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

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setOpen(false)}
          >
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold">Compliance Guardian</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            {sidebarNavItems.map((item) => {
              const isActive = pathname?.startsWith(item.href || '')
              const isExpanded = isActive && item.items

              return (
                <div key={item.title}>
                  {item.href && (
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6',
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      )}
                      onClick={() => setOpen(false)}
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
                              onClick={() => setOpen(false)}
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
                </div>
              )
            })}
          </div>
        </ScrollArea>
        <div className="pl-6 pr-7">
          <Button
            variant="ghost"
            className="group -mx-2 flex w-full gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6 text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => {
              handleSignOut()
              setOpen(false)
            }}
          >
            <Icons.logout className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
            Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
