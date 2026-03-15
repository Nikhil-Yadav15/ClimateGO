/**
 * Post-build script to replace environment placeholders with actual values
 * from environment variables set on Render (or any hosting platform).
 *
 * Usage: API_BASE_URL=https://your-api.onrender.com/v1 node scripts/replace-env.js
 */
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist', 'client', 'browser');

const replacements = {
  API_BASE_URL_PLACEHOLDER: process.env.API_BASE_URL || '/v1',
};

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [placeholder, value] of Object.entries(replacements)) {
    if (content.includes(placeholder)) {
      content = content.replaceAll(placeholder, value);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Replaced placeholders in ${path.relative(distDir, filePath)}`);
  }
}

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  }
}

if (!fs.existsSync(distDir)) {
  console.error(`Build output not found at ${distDir}`);
  process.exit(1);
}

console.log('Replacing environment placeholders in build output...');
walkDir(distDir);
console.log('Done.');
