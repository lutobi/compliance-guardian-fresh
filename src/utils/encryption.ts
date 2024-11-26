import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const algorithm = 'aes-256-gcm'
const scryptAsync = promisify(scrypt)

export class EncryptionService {
  private static readonly keyLength = 32 // for AES-256
  private static readonly saltLength = 32
  private static readonly ivLength = 12 // for GCM mode
  private static readonly tagLength = 16 // for GCM mode

  // Encrypt data
  static async encrypt(data: string, password: string): Promise<string> {
    // Generate salt and derive key
    const salt = randomBytes(this.saltLength)
    const key = await scryptAsync(password, salt, this.keyLength) as Buffer

    // Generate IV
    const iv = randomBytes(this.ivLength)

    // Create cipher
    const cipher = createCipheriv(algorithm, key, iv, {
      authTagLength: this.tagLength
    })

    // Encrypt data
    const encryptedData = Buffer.concat([
      cipher.update(data, 'utf8'),
      cipher.final()
    ])

    // Get auth tag
    const authTag = cipher.getAuthTag()

    // Combine all components
    const result = Buffer.concat([
      salt,
      iv,
      authTag,
      encryptedData
    ])

    return result.toString('base64')
  }

  // Decrypt data
  static async decrypt(encryptedData: string, password: string): Promise<string> {
    // Convert from base64
    const buffer = Buffer.from(encryptedData, 'base64')

    // Extract components
    const salt = buffer.subarray(0, this.saltLength)
    const iv = buffer.subarray(this.saltLength, this.saltLength + this.ivLength)
    const authTag = buffer.subarray(
      this.saltLength + this.ivLength,
      this.saltLength + this.ivLength + this.tagLength
    )
    const data = buffer.subarray(this.saltLength + this.ivLength + this.tagLength)

    // Derive key
    const key = await scryptAsync(password, salt, this.keyLength) as Buffer

    // Create decipher
    const decipher = createDecipheriv(algorithm, key, iv, {
      authTagLength: this.tagLength
    })
    decipher.setAuthTag(authTag)

    // Decrypt data
    const decrypted = Buffer.concat([
      decipher.update(data),
      decipher.final()
    ])

    return decrypted.toString('utf8')
  }

  // Encrypt object
  static async encryptObject<T extends object>(
    obj: T,
    password: string,
    fieldsToEncrypt: (keyof T)[]
  ): Promise<T> {
    const result = { ...obj }

    for (const field of fieldsToEncrypt) {
      if (typeof result[field] === 'string') {
        result[field] = await this.encrypt(
          result[field] as string,
          password
        ) as any
      }
    }

    return result
  }

  // Decrypt object
  static async decryptObject<T extends object>(
    obj: T,
    password: string,
    fieldsToDecrypt: (keyof T)[]
  ): Promise<T> {
    const result = { ...obj }

    for (const field of fieldsToDecrypt) {
      if (typeof result[field] === 'string') {
        result[field] = await this.decrypt(
          result[field] as string,
          password
        ) as any
      }
    }

    return result
  }
}
