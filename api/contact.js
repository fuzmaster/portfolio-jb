// Contact form is disabled. The site uses a direct mailto link instead.
// This endpoint previously returned a placeholder success without sending any
// email, which is unsafe (a sender would think their message was delivered).
// It now always returns 410 Gone. Never return success unless an email is
// actually sent. See CONTACT_SETUP.md for how to wire a provider later.
export default function handler(req, res) {
  res.setHeader('Allow', '');
  return res.status(410).json({
    ok: false,
    error: 'Contact form is disabled. Please email jacobbritten@outlook.com.',
  });
}
