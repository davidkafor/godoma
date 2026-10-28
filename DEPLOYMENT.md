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
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `APPLICATION_RECIPIENT` | Existing application-form email |
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

Add the environment variables from section 2, save, then use **Run NPM Install** (this also runs `prisma generate` through `postinstall`).

## 5. Build, migrate and seed

Open the terminal command shown at the top of the Node.js App page to enter the app's virtual environment, then:

```bash
cd ~/godoma-app
npm install
npm run build          # builds .next; if the plan runs out of memory, build locally and upload .next
npm run db:migrate     # applies version-controlled migrations (prisma migrate deploy)
npm run db:seed        # imports the existing website content; safe to re-run, no duplicates
```

Then press **Restart** on the Node.js App page.

## 6. Create the first administrator

There is no public sign-up and no default password. Run once on the server:

```bash
npm run admin:create
```

It prompts for name, email and password (the password is not echoed or stored in shell history) and refuses to run if a super administrator already exists. Further administrators are added in **Admin > Administrators**. To recover access: `npm run admin:reset-password`.

## 7. HTTPS

In DirectAdmin go to **SSL Certificates** and enable the free Let's Encrypt certificate for the domain (include `www`), then enable **Force SSL with https redirect**. Keep `APP_URL` on `https://`. Session cookies are HTTP-only, `SameSite=Lax` and `Secure` in production.

## 8. After first deployment, check

- `https://your-domain/` shows the existing content.
- `https://your-domain/admin` redirects to `/admin/login`.
- Sign in, create a draft news item, publish it, confirm it appears on the homepage, then delete it.
- Upload an image in **Media library** and confirm it displays. Uploaded files are served through `/uploads/...`, so make sure `UPLOAD_DIR` is writable by the Node.js user.
- If the host places a proxy limit on request size, uploads larger than that limit will fail even though `UPLOAD_MAX_MB` allows them.

## 9. Updating the site later

Content changes are made in `/admin` and appear immediately; no deployment is needed. For code changes: upload the new code, `npm install`, `npm run build`, `npm run db:migrate`, then restart the app.

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
