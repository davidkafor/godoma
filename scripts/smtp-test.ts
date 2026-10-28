// Usage: npm run smtp:test            -> checks configuration, connects and authenticates (sends nothing)
//        npm run smtp:test -- --send  -> additionally sends one test email to APPLICATION_RECIPIENT
import { readMailConfig, recipientFor } from '../lib/mail/config'
import { sendNotification, verifySmtp } from '../lib/mail/transport'

async function main() {
  const settings = readMailConfig()
  if (!settings.ok) {
    console.error(`Missing or invalid environment variables: ${settings.problems.join(', ')}`)
    process.exit(1)
  }
  const { host, port, secure } = settings.config
  console.log(`Connecting to ${host}:${port} (${secure ? 'implicit TLS' : 'STARTTLS'}) ...`)
  const check = await verifySmtp()
  if (!check.ok) {
    console.error(`FAILED: ${check.error}`)
    process.exit(1)
  }
  console.log('OK: connected and authenticated.')

  if (process.argv.includes('--send')) {
    const to = recipientFor('application')
    if (!to) {
      console.error('FAILED: APPLICATION_RECIPIENT is missing or invalid.')
      process.exit(1)
    }
    const outcome = await sendNotification({
      kind: 'application',
      reference: 'SMTP-TEST',
      subject: 'Godoma TTI: SMTP test',
      text: 'This is a test message from the Godoma TTI website. If you can read it, the server can send mail.',
      html: '<p>This is a test message from the Godoma TTI website. If you can read it, the server can send mail.</p>',
    })
    if (!outcome.ok) {
      console.error(`FAILED: ${outcome.error}`)
      process.exit(1)
    }
    console.log('The mail server accepted the test message. Check the recipient inbox and spam folder to confirm it arrived.')
  }
}

main().catch(() => {
  console.error('Unexpected error while testing SMTP.')
  process.exit(1)
})
