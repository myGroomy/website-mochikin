/**
 * Buat akun admin pertama untuk Payload CMS (idempotent).
 * Jalankan: npx payload run scripts/create-admin.ts --disable-transpile
 *
 * - Jika user `admin@mochikin.id` sudah ada → skip.
 * - Password acak di-generate dan dicetak sekali ke terminal.
 */
import crypto from 'node:crypto'

import config from '../payload.config.ts'
import { getPayload } from 'payload'

const email = process.env.ADMIN_EMAIL || 'admin@mochikin.id'

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
  overrideAccess: true,
})

if (existing.totalDocs > 0) {
  console.log(`✔ User dengan email ${email} sudah ada — skip. Reset password via /admin (forgot password) bila lupa.`)
} else {
  const password = `Mochikin-${crypto.randomBytes(4).toString('hex')}`
  await payload.create({
    collection: 'users',
    data: { email, password, name: 'Admin MOCHIKIN' },
    overrideAccess: true,
  })
  console.log('✔ Admin pertama dibuat:')
  console.log(`  email    : ${email}`)
  console.log(`  password : ${password}`)
  console.log('  (simpan sekarang; password tidak ditampilkan lagi)')
}
