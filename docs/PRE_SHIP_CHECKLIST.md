# Pre-Ship Checklist

## Verdict
SHIP / DO NOT SHIP / SHIP AFTER FIXES

## Top Risks
1.
2.
3.

## Ship Blockers
- [ ] Issue:
  - Why it matters:
  - Exact fix:
  - Files/routes/components involved:
  - How to verify:

## Security Review
- Auth:
- Authorization:
- Database access:
- API routes:
- Secrets:
- Headers:
- CORS:
- Rate limits:
- Error handling:
- Logging:
- Third-party services:

## Privacy & Legal Review
- Data collected:
- Where data is stored:
- Privacy policy status:
- Cookie/tracking status:
- User deletion/export needs:
- Compliance concerns:

## Abuse & Cost Protection
- Public forms:
- Paid APIs:
- Bot protection:
- Daily caps:
- Alerting:
- Spam risks:

## Failure Case Testing
- Auth failure:
- Form validation failure:
- API failure:
- Payment failure:
- Network failure:
- Empty state:
- Loading state:
- Permission denied:
- Invalid input:
- Mobile layout:

## Required Fix Plan
1.
2.
3.

## Final Verification Checklist
- [ ] I verified no secrets are exposed to the browser
- [ ] I verified server-side validation exists
- [ ] I verified auth-protected data cannot be accessed by other users
- [ ] I verified database policies or server-side authorization checks exist
- [ ] I verified paid API endpoints are rate limited
- [ ] I verified public forms have spam protection
- [ ] I verified errors do not expose stack traces, SQL, table names, tokens, or internals
- [ ] I verified privacy policy/data handling is acceptable for launch
- [ ] I verified basic OWASP risks were checked
- [ ] I verified production environment variables are separate from local dev values
