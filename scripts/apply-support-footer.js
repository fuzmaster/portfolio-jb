#!/usr/bin/env node
'use strict';

/**
 * apply-support-footer.js
 *
 * Injects (or updates) a standard "JBD support footer" block into the
 * top-level .html files of a target project folder.
 *
 * Usage:
 *   node scripts/apply-support-footer.js <target-folder> [--dry-run]
 *
 * Behavior per HTML file:
 *   - If the file already contains the marked footer block, that block is
 *     replaced in place.
 *   - Otherwise, if the file contains a </body> tag, the block is inserted
 *     immediately before the first </body>.
 *   - Otherwise the file is skipped and reported.
 *
 * No external dependencies: only the built-in `fs` and `path` modules.
 */

const fs = require('fs');
const path = require('path');

const START_MARKER = '<!-- JBD SUPPORT FOOTER START -->';
const END_MARKER = '<!-- JBD SUPPORT FOOTER END -->';

/**
 * Build the footer HTML block from the support config.
 *
 * The config is expected to look like:
 *   {
 *     "copy": "Use one of my tools? Support future builds.",
 *     "links": [
 *       { "label": "Ko-fi", "href": "https://ko-fi.com/jacobbritten", "external": true },
 *       { "label": "PayPal", "href": "https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U", "external": true },
 *       { "label": "Support", "href": "support.html" }
 *     ]
 *   }
 *
 * Missing fields fall back to sensible defaults so the script still produces
 * a valid block even if the config is sparse.
 *
 * @param {object} config
 * @returns {string}
 */
function buildFooterBlock(config) {
  const cfg = config && typeof config === 'object' ? config : {};

  const copy =
    typeof cfg.copy === 'string' && cfg.copy.trim().length > 0
      ? cfg.copy
      : 'Use one of my tools? Support future builds.';

  const defaultLinks = [
    {
      label: 'Ko-fi',
      href: 'https://ko-fi.com/jacobbritten',
      external: true,
    },
    {
      label: 'PayPal',
      href: 'https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U',
      external: true,
    },
    {
      label: 'Support',
      href: 'support.html',
      external: false,
    },
  ];

  const links =
    Array.isArray(cfg.links) && cfg.links.length > 0 ? cfg.links : defaultLinks;

  const linkLines = links
    .map(function (link) {
      const label = link && link.label != null ? String(link.label) : '';
      const href = link && link.href != null ? String(link.href) : '#';
      const external = link && link.external === true;
      const rel = external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return (
        '    <a href="' +
        href +
        '"' +
        rel +
        ' class="jbd-support-footer__link">' +
        label +
        '</a>'
      );
    })
    .join('\n');

  return [
    START_MARKER,
    '<div class="jbd-support-footer">',
    '  <p class="jbd-support-footer__copy">' + copy + '</p>',
    '  <div class="jbd-support-footer__links">',
    linkLines,
    '  </div>',
    '</div>',
    END_MARKER,
  ].join('\n');
}

/**
 * Parse command line arguments.
 *
 * @param {string[]} argv - typically process.argv
 * @returns {{ targetFolder: (string|null), dryRun: boolean }}
 */
function parseArgs(argv) {
  const args = argv.slice(2);
  let targetFolder = null;
  let dryRun = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--dry-run') {
      dryRun = true;
    } else if (targetFolder === null) {
      targetFolder = arg;
    }
  }

  return { targetFolder: targetFolder, dryRun: dryRun };
}

/**
 * Load the support config from data/support-links.json relative to this
 * script's project root (the parent of the scripts/ directory).
 *
 * @returns {object}
 */
function loadSupportConfig() {
  const projectRoot = path.resolve(__dirname, '..');
  const configPath = path.join(projectRoot, 'data', 'support-links.json');

  if (!fs.existsSync(configPath)) {
    console.warn(
      'Warning: support config not found at ' +
        configPath +
        ' - using built-in defaults.'
    );
    return {};
  }

  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn(
      'Warning: failed to read/parse ' +
        configPath +
        ' (' +
        err.message +
        ') - using built-in defaults.'
    );
    return {};
  }
}

/**
 * List top-level (non-recursive) .html files in a folder.
 *
 * @param {string} folder
 * @returns {string[]} absolute file paths
 */
function listHtmlFiles(folder) {
  const entries = fs.readdirSync(folder, { withFileTypes: true });
  return entries
    .filter(function (entry) {
      return (
        entry.isFile() && /\.html?$/i.test(entry.name)
      );
    })
    .map(function (entry) {
      return path.join(folder, entry.name);
    })
    .sort();
}

/**
 * Apply the footer block to a single file's content.
 *
 * @param {string} content
 * @param {string} block
 * @returns {{ content: string, action: ('replaced'|'inserted'|'skipped') }}
 */
function applyToContent(content, block) {
  const startIdx = content.indexOf(START_MARKER);
  const endIdx = content.indexOf(END_MARKER);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    // Replace the existing block (including markers).
    const before = content.slice(0, startIdx);
    const after = content.slice(endIdx + END_MARKER.length);
    return { content: before + block + after, action: 'replaced' };
  }

  // No existing block -> try to insert before the first </body>.
  const bodyClose = /<\/body>/i;
  const match = content.match(bodyClose);
  if (match) {
    const insertAt = match.index;
    const before = content.slice(0, insertAt);
    const after = content.slice(insertAt);
    return { content: before + block + '\n' + after, action: 'inserted' };
  }

  return { content: content, action: 'skipped' };
}

function main() {
  const parsed = parseArgs(process.argv);
  const dryRun = parsed.dryRun;

  if (!parsed.targetFolder) {
    console.error(
      'Usage: node scripts/apply-support-footer.js <target-folder> [--dry-run]'
    );
    process.exitCode = 1;
    return;
  }

  const targetFolder = path.resolve(parsed.targetFolder);

  if (!fs.existsSync(targetFolder) || !fs.statSync(targetFolder).isDirectory()) {
    console.error('Error: target folder does not exist or is not a directory:');
    console.error('  ' + targetFolder);
    process.exitCode = 1;
    return;
  }

  const config = loadSupportConfig();
  const block = buildFooterBlock(config);

  let htmlFiles;
  try {
    htmlFiles = listHtmlFiles(targetFolder);
  } catch (err) {
    console.error('Error reading target folder: ' + err.message);
    process.exitCode = 1;
    return;
  }

  console.log('Target folder: ' + targetFolder);
  console.log('Mode: ' + (dryRun ? 'dry-run (no files written)' : 'write'));
  console.log('HTML files found: ' + htmlFiles.length);
  console.log('');

  const summary = {
    changed: [],
    skipped: [],
    errors: [],
  };

  htmlFiles.forEach(function (filePath) {
    const name = path.basename(filePath);
    let content;

    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.log('  [ERROR]   ' + name + ' - ' + err.message);
      summary.errors.push({ file: filePath, reason: err.message });
      return;
    }

    const result = applyToContent(content, block);

    if (result.action === 'skipped') {
      console.log('  [SKIP]    ' + name + ' - no footer block and no </body>');
      summary.skipped.push(filePath);
      return;
    }

    if (result.content === content) {
      console.log('  [SKIP]    ' + name + ' - already up to date');
      summary.skipped.push(filePath);
      return;
    }

    const verb = result.action === 'replaced' ? 'replaced' : 'inserted';

    if (dryRun) {
      console.log('  [DRY]     ' + name + ' - would be ' + verb);
      summary.changed.push(filePath);
      return;
    }

    try {
      fs.writeFileSync(filePath, result.content, 'utf8');
      console.log('  [CHANGED] ' + name + ' - footer ' + verb);
      summary.changed.push(filePath);
    } catch (err) {
      console.log('  [ERROR]   ' + name + ' - ' + err.message);
      summary.errors.push({ file: filePath, reason: err.message });
    }
  });

  console.log('');
  console.log('Summary');
  console.log('-------');
  console.log('  Changed: ' + summary.changed.length);
  console.log('  Skipped: ' + summary.skipped.length);
  console.log('  Errors:  ' + summary.errors.length);

  if (summary.errors.length > 0) {
    process.exitCode = 1;
  }
}

main();
