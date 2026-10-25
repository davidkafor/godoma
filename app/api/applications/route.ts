import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const requiredFields = ['fullName', 'email', 'phone', 'course', 'message'] as const

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>
    const missing = requiredFields.filter((field) => typeof body[field] !== 'string' || !body[field]?.trim())
    if (missing.length) return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASSWORD
    if (!host || !user || !pass) return NextResponse.json({ error: 'Application email is not configured yet.' }, { status: 503 })

    const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
    const fullName = String(body.fullName).trim()
    const email = String(body.email).trim()
    await transporter.sendMail({
      from: `Godoma TTI Website <${user}>`,
      to: process.env.APPLICATION_RECIPIENT || 'admissionsgtti@gmail.com',
      replyTo: email,
      subject: `New application enquiry — ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${String(body.phone).trim()}\nCourse: ${String(body.course).trim()}\nMessage: ${String(body.message).trim()}`,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'We could not send your application. Please try again or contact Admissions.' }, { status: 500 })
  }
}
