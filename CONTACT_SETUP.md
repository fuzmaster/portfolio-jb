# Contact Setup

## Current contact method
Direct `mailto:` link only. The contact section on `index.html` uses:

- Primary CTA: `mailto:jacobbritten@outlook.com?subject=Portfolio%20Inquiry%20-%20Producer%20Role`
- Visible plain address: `jacobbritten@outlook.com`
- Secondary CTA: `Resume.pdf`

There is **no submittable contact form** on the site.

## Why the form was removed
The previous HTML form posted to `api/contact.js`, which **validated input and returned
`{ ok: true }` without sending any email** (it was a placeholder). That is unsafe: a
recruiter could submit the form, see a success message, and the message would be lost.

The form and its client JS were removed, and `api/contact.js` now always returns
`410 Gone` with a message pointing to the email address. It never returns success.

## Future option: wire Resend (or another provider)
If a real form is wanted later:

1. Add a provider (e.g. Resend) and restore a form that posts to `api/contact.js`.
2. Implement actual sending in `api/contact.js`.
3. Only return success **after** the provider confirms the email was sent.

### Future environment variables (if Resend is added)
- `RESEND_API_KEY` — the provider API key
- `CONTACT_TO_EMAIL` — the destination inbox (e.g. `jacobbritten@outlook.com`)

## Hard rule
**Never return success unless an email actually sends.** A silent-failure form is worse
than no form, because it loses real inbound messages without anyone knowing.
