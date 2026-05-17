export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'object' && req.body !== null ? req.body : {};
    const name = normalizeField(body.name);
    const email = normalizeField(body.email).toLowerCase();
    const message = normalizeField(body.message);
    const company = normalizeField(body.company);

    if (company) {
      return res.status(200).json({ ok: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Please complete all required fields.' });
    }

    if (name.length > 120) {
      return res.status(400).json({ ok: false, error: 'Name is too long.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    if (message.length < 10) {
      return res.status(400).json({ ok: false, error: 'Please include a little more detail.' });
    }

    if (message.length > 4000) {
      return res.status(400).json({ ok: false, error: 'Message is too long.' });
    }

    // Placeholder for email/CRM integration.
    // Keeping response deterministic until a provider token is configured.
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}

function normalizeField(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}
