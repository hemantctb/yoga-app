#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const POSES_DIR = path.join(__dirname, '../codebase/knowledge/poses');
const MANIFEST_PATH = path.join(__dirname, '../codebase/knowledge/manifest.json');

// Helper to extract title and category from markdown frontmatter
function parseAsana(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let id = '';
  let english = '';
  let category = [];

  for (const line of lines) {
    if (line.startsWith('id:')) {
      id = line.split(':')[1].trim().replace(/"/g, '').replace(/\\/g, '');
    }
    if (line.includes('english:')) {
      english = line.split(':')[1].trim().replace(/"/g, '').replace(/\\/g, '');
    }
    if (line.startsWith('category:')) {
      const catLine = line.split(':')[1].trim();
      category = catLine.replace(/[\[\]"\\]/g, '').split(',').map(c => c.trim());
    }
  }

  return { id, title: english, category: category[0] || 'standing' };
}

// Get all .md files
const files = fs.readdirSync(POSES_DIR).filter(f => f.endsWith('.md'));

const poses = files
  .map(file => {
    try {
      return parseAsana(path.join(POSES_DIR, file));
    } catch (err) {
      console.error(`Error parsing ${file}:`, err.message);
      return null;
    }
  })
  .filter(Boolean)
  .sort((a, b) => a.title.localeCompare(b.title));

const manifest = { poses };

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 4));

console.log(`✅ Generated manifest with ${poses.length} asanas`);
