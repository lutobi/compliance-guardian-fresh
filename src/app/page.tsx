'use client';

import Link from 'next/link'
import { ShieldCheckIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { MarketingHeader } from '@/components/marketing/header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Security & Compliance Management Platform
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Streamline your security assessments, manage compliance frameworks, and protect your organization with our comprehensive platform.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/auth/signup"
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Get started
                </Link>
                <Link
                  href="/auth/signin"
                  className="text-sm font-semibold leading-6 text-foreground"
                >
                  Sign in <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Comprehensive Security</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to manage security and compliance
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform provides a unified solution for security assessments, compliance management, and risk mitigation.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <ShieldCheckIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Security Assessments
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Conduct thorough security assessments and track vulnerabilities with our comprehensive tools.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <ChartBarIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Compliance Management
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Stay compliant with industry standards and regulations through our automated compliance tracking.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <ClockIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Real-time Monitoring
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Monitor your security posture in real-time and receive instant alerts about potential threats.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
