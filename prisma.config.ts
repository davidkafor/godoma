import path from 'node:path'
import dotenv from 'dotenv'
import { defineConfig } from 'prisma/config'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

function databaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  const { DB_HOST = 'localhost', DB_PORT = '3306', DB_NAME, DB_USER, DB_PASSWORD } = process.env
  if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
    // Placeholder so `prisma generate` works without credentials; migrate/deploy will fail to connect.
    return 'mysql://user:password@localhost:3306/placeholder'
  }
  return `mysql://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: { url: databaseUrl() },
})
