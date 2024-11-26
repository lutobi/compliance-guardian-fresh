'use client';

import Link from 'next/link'
import { 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ClockIcon,
  DocumentCheckIcon,
  ClipboardDocumentCheckIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { MarketingHeader } from '@/components/marketing/header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                  New Features Available
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Intelligent Security & Compliance Guardian
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Automate your security assessments, streamline compliance frameworks, and protect your organization with our AI-powered platform.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/auth/signup"
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/auth/signin"
                  className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
                >
                  Sign in to Dashboard <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Enterprise-Grade Security</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Comprehensive Security & Compliance Platform
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform delivers an integrated solution for security assessments, compliance management, and risk mitigation with powerful automation capabilities.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col hover:transform hover:scale-105 transition-transform duration-300">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <ShieldCheckIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Security Assessments
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Conduct thorough security assessments with customizable frameworks, automated testing, and detailed reporting capabilities.
                  </p>
                  <p className="mt-4">
                    <Link href="/security" className="text-sm font-semibold leading-6 text-primary">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col hover:transform hover:scale-105 transition-transform duration-300">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <DocumentCheckIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Framework Management
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Access and customize industry-standard frameworks (ISO, NIST, SOC2) with our intelligent framework mapping system.
                  </p>
                  <p className="mt-4">
                    <Link href="/frameworks" className="text-sm font-semibold leading-6 text-primary">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col hover:transform hover:scale-105 transition-transform duration-300">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <ClipboardDocumentCheckIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Compliance Tracking
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Track compliance status, manage evidence collection, and generate compliance reports with our automated tools.
                  </p>
                  <p className="mt-4">
                    <Link href="/compliance" className="text-sm font-semibold leading-6 text-primary">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary/5 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Trusted by security professionals worldwide
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Empowering organizations to maintain robust security posture and compliance
                </p>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col bg-primary/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-muted-foreground">Security Controls</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">500+</dd>
                </div>
                <div className="flex flex-col bg-primary/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-muted-foreground">Frameworks</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">20+</dd>
                </div>
                <div className="flex flex-col bg-primary/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-muted-foreground">Automated Tests</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">1000+</dd>
                </div>
                <div className="flex flex-col bg-primary/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-muted-foreground">Success Rate</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">99.9%</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
