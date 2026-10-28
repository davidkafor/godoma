import { randomBytes, scrypt as scryptCallback, timingSafeEqual, type ScryptOptions } from 'node:crypto'

// scrypt ships with Node, so it needs no native build step on shared hosting.
const N = 2 ** 15
const R = 8
const P = 1
const KEY_LENGTH = 64

function scrypt(password: string, salt: Buffer, options: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, KEY_LENGTH, options, (error, key) => (error ? reject(error) : resolve(key)))
  })
}

const options: ScryptOptions = { N, r: R, p: P, maxmem: 128 * N * R * 2 }

export async function hashPassword(password: string) {
  const salt = randomBytes(16)
  const key = await scrypt(password, salt, options)
  return `scrypt$${N}$${R}$${P}$${salt.toString('base64')}$${key.toString('base64')}`
}

export async function verifyPassword(password: string, stored: string) {
  const [scheme, n, r, p, salt, hash] = stored.split('$')
  if (scheme !== 'scrypt' || !salt || !hash) return false
  const expected = Buffer.from(hash, 'base64')
  const key = await scrypt(password, Buffer.from(salt, 'base64'), {
    N: Number(n),
    r: Number(r),
    p: Number(p),
    maxmem: 128 * Number(n) * Number(r) * 2,
  })
  return key.length === expected.length && timingSafeEqual(key, expected)
}

// A fixed dummy hash lets us spend the same time when an email does not exist.
let dummyHash: Promise<string> | undefined
export function dummyVerify(password: string) {
  dummyHash ??= hashPassword('not-a-real-password')
  return dummyHash.then((hash) => verifyPassword(password, hash))
}

export function validatePasswordStrength(password: string): string | null {
  if (password.length < 12) return 'Password must be at least 12 characters long.'
  if (password.length > 200) return 'Password is too long.'
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password))
    return 'Password must include upper-case, lower-case and a number.'
  return null
}
