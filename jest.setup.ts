import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Mock Supabase
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
  })),
}))

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useParams: () => ({}),
  usePathname: () => '',
}))

// Security-related global mocks
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
})

// Mock crypto for security functions
Object.defineProperty(window, 'crypto', {
  value: {
    subtle: {
      digest: jest.fn(),
      encrypt: jest.fn(),
      decrypt: jest.fn(),
    },
    getRandomValues: jest.fn(),
  },
})
