import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="w-full max-w-lg px-8">
        <div className="mb-8 flex flex-col items-center space-y-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Compliance Guardian"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xl font-bold">Compliance Guardian</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  )
}
