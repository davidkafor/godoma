# Godoma TTI: HostAfrica DirectAdmin deployment

One Next.js 16 application serves both the public website (`/`) and the admin dashboard (`/admin`).
It needs a real Node.js process, so it only runs on a plan that offers **Setup Node.js App** (Node.js Selector) with **Node 20.9 or newer**. Plain static or PHP-only hosting cannot run it.

## 1. What was tested and what was not

Tested locally against a temporary MariaDB (MySQL-compatible) server: migrations, seed (run twice, no duplicates), first-admin creation, login, route protection, create / publish / unpublish / delete, public pages reading from the database, and the production build served by `server.js`.

Not tested: the HostAfrica server itself. Check the items in section 8 after your first deployment.

## 2. Environment variables

Set these in DirectAdmin under **Setup Node.js App > Environment variables**. Never commit them. Keep development and production values different (different `SESSION_SECRET`, different admin accounts, separate databases if possible).

| Variable | Purpose |
| --- | --- |
| `DB_HOST` | `localhost` (the database is local to the hosting server) |
| `DB_PORT` | `3306` |
| `DB_NAME` | `godomawebsite` |
| `DB_USER` | `godomawebsite` |
| `DB_PASSWORD` | Your database password |
| `SESSION_SECRET` | At least 32 random bytes, for example `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"` |
| `APP_URL` | `https://your-domain` (must be https so cookies are `Secure`) |
| `UPLOAD_DIR` | Absolute path outside the code folder, for example `/home/USERNAME/godoma-uploads` |
| `UPLOAD_MAX_MB` | Maximum upload size, default `8` |
| `SMTP_HOST` | SMTP host supplied by HostAfrica (often `mail.your-domain`) |
| `SMTP_PORT` | `465` (implicit TLS) or `587` (STARTTLS); use what HostAfrica gives you |
| `SMTP_USER` | Full domain mailbox address, e.g. `admissions@your-domain` |
| `SMTP_PASSWORD` | That mailbox's password |
| `MAIL_FROM` | Authorised sender, normally the same mailbox (optional `Godoma TTI <address>` form) |
| `APPLICATION_RECIPIENT` | Gmail address that receives student applications |
| `CONTACT_RECIPIENT` | Gmail address that receives contact messages (may equal the one above) |
| `NODE_ENV` | `production` |

For local development copy `.env.example` to `.env.local`.

## 3. Upload the code

1. Create the folder, for example `/home/USERNAME/godoma-app`, and upload the project (without `node_modules`, `.next`, `generated`, or any `.env` file). Git or File Manager both work.
2. Create the uploads folder: `mkdir -p /home/USERNAME/godoma-uploads && chmod 750 /home/USERNAME/godoma-uploads`.

## 4. Create the Node.js application

In **Setup Node.js App > Create Application**:

- Node.js version: 20.9 or newer (22 recommended if offered)
- Application mode: Production
- Application root: `godoma-app`
- Application URL: your domain
- Application startup file: `server.js`

Add the environment variables from section 2 and save. Do **not** press **Run NPM Install**: this project is pinned to `pnpm@12.3.4` (`packageManager` in `package.json`) with a version 9 `pnpm-lock.yaml`, and npm would ignore that lockfile and resolve its own dependency versions. Install with pnpm instead, as shown in section 5 (this also runs `prisma generate` through `postinstall`).

## 5. Build, migrate and seed

Open the terminal command shown at the top of the Node.js App page to enter the app's virtual environment, then:

```bash
cd ~/godoma-app
corepack enable                  # makes the pnpm version pinned in package.json available
# If corepack is missing or not permitted on the host: npm install -g pnpm@12.3.4 --prefix ~/.local
pnpm --version                   # must print 12.3.4
pnpm install --frozen-lockfile   # installs exactly what pnpm-lock.yaml records; fails instead of drifting
pnpm run build                   # builds .next; if the plan runs out of memory, build locally and upload .next
pnpm run db:migrate              # applies version-controlled migrations (prisma migrate deploy)
pnpm run db:seed                 # imports the existing website content; safe to re-run, no duplicates
```

Never run plain `npm install` here: it would create a `package-lock.json` and may install different dependency versions from the ones the lockfile was tested with. The `--frozen-lockfile` flag also makes a lockfile mismatch an error, which is what you want on a server.

Then press **Restart** on the Node.js App page.

### Building in GitHub Codespaces (Node 24 default, server on Node 20)

Codespaces installs Node 24 by default, but the server runs Node 20. Build with the same major version the server runs, otherwise the build can use syntax or APIs that Node 20 does not have, and native packages are compiled for the wrong runtime.

Codespaces ignores `.nvmrc`; it only reads `.devcontainer/devcontainer.json`. The repository includes one that uses a Node 20 image and runs `pnpm install --frozen-lockfile` automatically. An existing Codespace keeps its old image, so after this file is on your branch, open the Command Palette (Ctrl/Cmd+Shift+P) and run **Codespaces: Rebuild Container** (or create a fresh Codespace). Then confirm with `node --version`, which must print v20.x.

If you cannot rebuild, the repository also includes an `.nvmrc` set to `20`, so in the Codespace terminal:

```bash
nvm install        # reads .nvmrc and installs Node 20
nvm use            # switch this terminal to Node 20
node --version     # must print v20.x
corepack enable
pnpm install --frozen-lockfile
pnpm run build
```

Run `nvm use` again in every new terminal. Then upload the project to the server and, **on the server**, run `pnpm install --frozen-lockfile` and `pnpm run db:migrate` as in the steps above. Do not upload `node_modules` or `generated` from the Codespace: Prisma and other native packages must be installed on the server so they match its operating system.

If you only upload the built `.next` folder (for example because the server runs out of memory during the build), it must come from a Node 20 build.

## 6. Create the first administrator

There is no public sign-up and no default password. Run once on the server:

```bash
pnpm run admin:create
```

It prompts for name, email and password (the password is not echoed or stored in shell history) and refuses to run if a super administrator already exists. Further administrators are added in **Admin > Administrators**. To recover access: `pnpm run admin:reset-password`.

## 7. HTTPS

In DirectAdmin go to **SSL Certificates** and enable the free Let's Encrypt certificate for the domain (include `www`), then enable **Force SSL with https redirect**. Keep `APP_URL` on `https://`. Session cookies are HTTP-only, `SameSite=Lax` and `Secure` in production.

## 8. After first deployment, check

- `https://your-domain/` shows the existing content.
- `https://your-domain/admin` redirects to `/admin/login`.
- Sign in, create a draft news item, publish it, confirm it appears on the homepage, then delete it.
- Upload an image in **Media library** and confirm it displays. Uploaded files are served through `/uploads/...`, so make sure `UPLOAD_DIR` is writable by the Node.js user.
- If the host places a proxy limit on request size, uploads larger than that limit will fail even though `UPLOAD_MAX_MB` allows them.

## 8a. Application and contact form email

How it works: a submission is validated, **saved to MySQL first**, then the notification email is sent from the HostAfrica mailbox to your Gmail address with the visitor in `Reply-To`. The result is stored as `PENDING`, `SENT` or `FAILED` on the record. Nothing runs in the background: the email is attempted during the request (10-20 s timeouts), and if SMTP is down the record is kept and shows as `FAILED` in **Admin > Student applications / Contact messages**, where a super administrator or administrator can press **Retry email notification**. The retry is claimed atomically, so it can never send the same notification twice.

Important: **"Sent" means the SMTP server accepted the message. It does not guarantee it reached the Gmail inbox** (check Spam on first use; adding SPF/DKIM for your domain in DirectAdmin **DNS Management / Email Accounts** greatly improves Gmail delivery). The site never tells the visitor an email was sent; it only confirms the application was received and saved.

Steps:

1. In DirectAdmin create (or pick) the mailbox, and note the SMTP host, port and password in the HostAfrica email settings.
2. Add the SMTP variables from section 2 in **Setup Node.js App**.
3. Apply the new migration: `pnpm run db:migrate` (adds `Application`, `ContactMessage` and `RateLimitHit` tables; no existing data is touched and it is safe to re-run).
4. `pnpm install --frozen-lockfile && pnpm run build`, then **Restart**.
5. Test the connection (sends nothing): `pnpm run smtp:test`. To send one real test email to `APPLICATION_RECIPIENT`: `pnpm run smtp:test -- --send`.
6. Submit the live contact form and the application form once, check Gmail (inbox and Spam), and confirm the record shows `Sent` in the admin.

Troubleshooting (the admin record shows a safe reason in "Last error"; details go to the Node.js app log, never to visitors):

| Symptom | Likely cause and fix |
| --- | --- |
| "SMTP authentication failed" | Wrong `SMTP_USER` (must be the full address) or `SMTP_PASSWORD`. Log in to webmail with the same credentials to confirm. |
| "Could not connect ... timed out" | Wrong `SMTP_HOST`/`SMTP_PORT`, or the host blocks outbound SMTP. Try the other port (465 vs 587) and ask HostAfrica support. |
| "TLS negotiation failed" | Port/mode mismatch (465 must be implicit TLS, 587 STARTTLS) or the certificate does not match `SMTP_HOST`. Use the hostname on the certificate (HostAfrica documents it). |
| "rejected the sender" | `MAIL_FROM` is not the authenticated mailbox. Set it to the same address as `SMTP_USER`. |
| Marked `Sent` but not in Gmail | Check Spam, then set up SPF and DKIM for the domain. |
| "Email is not configured" | A variable is missing; the message lists which. Restart the app after changing variables. |

Spam and abuse protection: hidden honeypot field, minimum fill time, per-IP and per-email rate limits stored in MySQL (so they work without Redis or workers), 16 KB request limit, same-origin check, duplicate detection (same idempotency key or identical recent submission returns the original reference instead of a second email).

## 9. Updating the site later

Content changes are made in `/admin` and appear immediately; no deployment is needed. For code changes: upload the new code (including `pnpm-lock.yaml`), then run `pnpm install --frozen-lockfile`, `pnpm run build`, `pnpm run db:migrate`, and restart the app.

## 10. Backups

Back up the `godomawebsite` database (DirectAdmin **MySQL Management > Backup**) and the `UPLOAD_DIR` folder together.

## 11. Security summary

- Passwords hashed with a salted, memory-hard algorithm; no default account.
- Sessions stored server-side; cookies are HTTP-only, SameSite and Secure.
- CSRF token plus origin checks on every administrative mutation; admin pages and `/api/admin/*` return a redirect or 401 when unauthenticated.
- Login rate limiting and account lockout; all inputs validated on the server; all database access through parameterised queries.
- Uploads restricted by type and size, renamed on save, and stored outside the code folder.
- Role-based permissions (super administrator, administrator, editor) enforced on the server.
- Database credentials and secrets are read only on the server and are never sent to the browser.
