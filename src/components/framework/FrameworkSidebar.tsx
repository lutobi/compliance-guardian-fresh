'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { frameworks } from '@/data/frameworks'

export default function FrameworkSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        className="lg:hidden fixed bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-text shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed bottom-0 right-0 top-0 z-20 w-64 transform overflow-y-auto bg-surface p-6 shadow-lg transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text">Frameworks</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Select a compliance framework to view
          </p>
        </div>

        <nav className="space-y-1">
          {frameworks.map((framework) => {
            const href = `/frameworks/${framework.slug}`
            const isActive = pathname === href

            return (
              <Link
                key={framework.slug}
                href={href}
                className={`
                  group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-primary text-text'
                    : 'text-text-secondary hover:bg-surface-light hover:text-text'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <span>{framework.name}</span>
                  <span className="ml-2 text-xs text-text-secondary">
                    v{framework.version}
                  </span>
                </div>
                <ChevronRightIcon
                  className={`
                    h-4 w-4
                    ${isActive ? 'text-text' : 'text-text-secondary group-hover:text-text'}
                  `}
                />
              </Link>
            )
          })}
        </nav>

        <div className="mt-8">
          <div className="rounded-lg bg-surface-light p-4">
            <h3 className="text-sm font-medium text-text">Need Help?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Check our documentation for guidance on implementing these frameworks.
            </p>
            <Link
              href="/docs"
              className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary/90"
            >
              View Documentation
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
