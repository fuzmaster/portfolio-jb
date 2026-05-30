# Support Links

Main support links are stored in `/data/support-links.json`.

Current links:

- Ko-fi: https://ko-fi.com/jacobbritten
- PayPal: replace `PAYPAL_DONATION_URL_HERE` with the final public PayPal donation URL.

## Apply support footer to another static project

Dry run:

```bash
node scripts/apply-support-footer.js "C:\Sites\ProjectName" --dry-run
```

Apply:

```bash
node scripts/apply-support-footer.js "C:\Sites\ProjectName"
```

The script uses these markers:

```html
<!-- JBD SUPPORT FOOTER START -->
<!-- JBD SUPPORT FOOTER END -->
```

Review injected HTML before publishing.
