/* Server-side administrator setup. There is no public sign-up and no default password.
 *
 *   npm run admin:create            create the first super administrator (refuses if one exists)
 *   npm run admin:reset-password    reset the password of an existing administrator
 *
 * Values are asked interactively; the password is never echoed or stored in shell history.
 * For automation you may pass ADMIN_EMAIL, ADMIN_NAME and ADMIN_PASSWORD as environment variables.
 */
import path from 'node:path'
import readline from 'node:readline'
import dotenv from 'dotenv'
import { prisma } from '../lib/prisma'
import { hashPassword, validatePasswordStrength } from '../lib/auth/password'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

function ask(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    const stdout = process.stdout as NodeJS.WriteStream
    if (hidden) {
      const original = (rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput
      ;(rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = (s: string) => {
        if (s.includes(question)) original.call(rl, s)
        else stdout.write('')
      }
    }
    rl.question(question, (answer) => {
      rl.close()
      if (hidden) stdout.write('\n')
      resolve(answer.trim())
    })
  })
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

async function create() {
  const existing = await prisma.adminUser.count({ where: { role: 'SUPER_ADMIN' } })
  if (existing > 0) {
    console.error('A super administrator already exists. Sign in at /admin/login and add users from Admin > Users.')
    process.exitCode = 1
    return
  }
  const email = (process.env.ADMIN_EMAIL || (await ask('Administrator email: '))).toLowerCase()
  const name = process.env.ADMIN_NAME || (await ask('Full name: '))
  const password = process.env.ADMIN_PASSWORD || (await ask('Password (min 12 chars, hidden): ', true))
  if (!emailPattern.test(email) || !name) throw new Error('A valid email and name are required.')
  const problem = validatePasswordStrength(password)
  if (problem) throw new Error(problem)
  await prisma.adminUser.create({ data: { email, name, passwordHash: await hashPassword(password), role: 'SUPER_ADMIN' } })
  console.log(`Super administrator created for ${email}. Sign in at /admin/login.`)
}

async function resetPassword() {
  const email = (process.env.ADMIN_EMAIL || (await ask('Administrator email: '))).toLowerCase()
  const user = await prisma.adminUser.findUnique({ where: { email } })
  if (!user) throw new Error('No administrator with that email.')
  const password = process.env.ADMIN_PASSWORD || (await ask('New password (min 12 chars, hidden): ', true))
  const problem = validatePasswordStrength(password)
  if (problem) throw new Error(problem)
  await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(password), active: true } })
  await prisma.session.deleteMany({ where: { userId: user.id } })
  console.log('Password updated and all existing sessions were signed out.')
}

const command = process.argv[2]
;(command === 'reset-password' ? resetPassword() : command === 'create' ? create() : Promise.reject(new Error('Usage: admin.ts <create|reset-password>')))
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
