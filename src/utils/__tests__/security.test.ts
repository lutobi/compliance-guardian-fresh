import {
  hashString,
  sanitizeInput,
  validateEvidence,
  generateSecureToken,
  validateControlId,
  RateLimiter,
} from '../security'

describe('Security Utils', () => {
  beforeEach(() => {
    // Mock crypto.subtle.digest
    const mockDigest = jest.fn()
      .mockImplementation(async (algorithm, data) => {
        // Return different hash values based on input
        const inputStr = new TextDecoder().decode(data)
        const mockHash = new Uint8Array(32).fill(inputStr === 'input1' ? 1 : 2)
        return mockHash.buffer
      })

    Object.defineProperty(global.crypto.subtle, 'digest', {
      value: mockDigest,
      configurable: true
    })

    // Mock crypto.getRandomValues
    let counter = 0
    const mockGetRandomValues = jest.fn().mockImplementation((array) => {
      counter++
      array.fill(counter) // Fill with different values each time
      return array
    })

    Object.defineProperty(global.crypto, 'getRandomValues', {
      value: mockGetRandomValues,
      configurable: true
    })
  })

  describe('hashString', () => {
    it('should generate consistent hashes', async () => {
      const input = 'test-string'
      const hash1 = await hashString(input)
      const hash2 = await hashString(input)
      expect(hash1).toBe(hash2)
    })

    it('should generate different hashes for different inputs', async () => {
      const hash1 = await hashString('input1')
      const hash2 = await hashString('input2')
      expect(hash1).not.toBe(hash2)
    })
  })

  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      const input = '<script>alert("xss")</script>'
      expect(sanitizeInput(input)).not.toContain('<script>')
    })

    it('should remove javascript: protocol', () => {
      const input = 'javascript:alert("xss")'
      expect(sanitizeInput(input)).not.toContain('javascript:')
    })

    it('should preserve valid text', () => {
      const input = 'Valid text 123'
      expect(sanitizeInput(input)).toBe(input)
    })

    it('should remove event handlers', () => {
      const input = '<div onclick="alert(1)">test</div>'
      const sanitized = sanitizeInput(input)
      expect(sanitized).not.toContain('onclick')
      expect(sanitized).toBe('test')
    })

    it('should remove data URIs', () => {
      const input = 'data:text/html,<script>alert(1)</script>'
      expect(sanitizeInput(input)).not.toContain('data:')
    })
  })

  describe('validateEvidence', () => {
    it('should reject empty evidence', () => {
      const result = validateEvidence('')
      expect(result.isValid).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should reject too long evidence', () => {
      const longEvidence = 'a'.repeat(11000)
      const result = validateEvidence(longEvidence)
      expect(result.isValid).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should sanitize and accept valid evidence', () => {
      const evidence = 'Valid evidence text'
      const result = validateEvidence(evidence)
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe(evidence)
    })

    it('should sanitize malicious evidence', () => {
      const evidence = '<script>alert("xss")</script>Valid evidence'
      const result = validateEvidence(evidence)
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe('Valid evidence')
    })
  })

  describe('generateSecureToken', () => {
    it('should generate tokens of correct length', () => {
      const token = generateSecureToken(16)
      expect(token.length).toBe(32) // Each byte becomes 2 hex characters
    })

    it('should generate unique tokens', () => {
      const token1 = generateSecureToken()
      const token2 = generateSecureToken()
      expect(token1).not.toBe(token2)
    })
  })

  describe('validateControlId', () => {
    it('should accept valid control IDs', () => {
      expect(validateControlId('A.1')).toBe(true)
      expect(validateControlId('A.1.2')).toBe(true)
      expect(validateControlId('A.1.2.3')).toBe(true)
    })

    it('should reject invalid control IDs', () => {
      expect(validateControlId('1.1')).toBe(false)
      expect(validateControlId('A1')).toBe(false)
      expect(validateControlId('A.B.1')).toBe(false)
      expect(validateControlId('')).toBe(false)
    })
  })

  describe('RateLimiter', () => {
    let rateLimiter: RateLimiter

    beforeEach(() => {
      rateLimiter = new RateLimiter(3, 1000) // 3 attempts per second
    })

    it('should allow initial attempts', () => {
      expect(rateLimiter.isRateLimited('test-key')).toBe(false)
    })

    it('should block after max attempts', () => {
      const key = 'test-key'
      rateLimiter.isRateLimited(key) // 1st attempt
      rateLimiter.isRateLimited(key) // 2nd attempt
      rateLimiter.isRateLimited(key) // 3rd attempt
      expect(rateLimiter.isRateLimited(key)).toBe(true) // 4th attempt should be blocked
    })

    it('should reset after time window', async () => {
      const key = 'test-key'
      rateLimiter.isRateLimited(key)
      rateLimiter.reset(key)
      expect(rateLimiter.isRateLimited(key)).toBe(false)
    })

    it('should handle multiple keys independently', () => {
      const key1 = 'test-key-1'
      const key2 = 'test-key-2'

      // Max out key1
      rateLimiter.isRateLimited(key1)
      rateLimiter.isRateLimited(key1)
      rateLimiter.isRateLimited(key1)
      expect(rateLimiter.isRateLimited(key1)).toBe(true)

      // key2 should still work
      expect(rateLimiter.isRateLimited(key2)).toBe(false)
    })
  })
})
