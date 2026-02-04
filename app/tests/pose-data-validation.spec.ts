import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge');
const POSES_DIR = path.join(KNOWLEDGE_DIR, 'poses');
const MANIFEST_PATH = path.join(KNOWLEDGE_DIR, 'manifest.json');

interface ManifestPose {
  id: string;
  title?: string;
  category: string[];
}

interface Manifest {
  poses: ManifestPose[];
}

test.describe('Pose Data Validation', () => {
  let manifest: Manifest;

  test.beforeAll(() => {
    const manifestData = fs.readFileSync(MANIFEST_PATH, 'utf8');
    manifest = JSON.parse(manifestData);
  });

  test('manifest.json is valid JSON', () => {
    expect(() => {
      const data = fs.readFileSync(MANIFEST_PATH, 'utf8');
      JSON.parse(data);
    }).not.toThrow();
  });

  test('all manifest IDs have corresponding .md files', () => {
    const missingFiles: string[] = [];

    for (const pose of manifest.poses) {
      const filePath = path.join(POSES_DIR, `${pose.id}.md`);
      if (!fs.existsSync(filePath)) {
        missingFiles.push(pose.id);
      }
    }

    expect(missingFiles, `Missing .md files for IDs: ${missingFiles.join(', ')}`).toHaveLength(0);
  });

  test('all .md files have matching IDs in their frontmatter', () => {
    const mismatchedIds: { file: string; expected: string; actual: string }[] = [];

    for (const pose of manifest.poses) {
      const filePath = path.join(POSES_DIR, `${pose.id}.md`);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(content);
          if (data.id !== pose.id) {
            mismatchedIds.push({
              file: `${pose.id}.md`,
              expected: pose.id,
              actual: data.id || '(no id field)',
            });
          }
        } catch {
          // YAML parsing errors are caught in another test
        }
      }
    }

    expect(
      mismatchedIds,
      `ID mismatches:\n${mismatchedIds.map((m) => `  ${m.file}: expected "${m.expected}", got "${m.actual}"`).join('\n')}`
    ).toHaveLength(0);
  });

  test('all .md files have valid YAML frontmatter', () => {
    const invalidFiles: { file: string; error: string }[] = [];

    for (const pose of manifest.poses) {
      const filePath = path.join(POSES_DIR, `${pose.id}.md`);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          matter(content);
        } catch (e) {
          invalidFiles.push({
            file: `${pose.id}.md`,
            error: e instanceof Error ? e.message : String(e),
          });
        }
      }
    }

    expect(
      invalidFiles,
      `Invalid YAML in files:\n${invalidFiles.map((f) => `  ${f.file}: ${f.error}`).join('\n')}`
    ).toHaveLength(0);
  });

  test('all .md files in poses directory are listed in manifest', () => {
    const poseFiles = fs.readdirSync(POSES_DIR).filter((f) => f.endsWith('.md'));
    const manifestIds = new Set(manifest.poses.map((p) => p.id));
    const unlisted: string[] = [];

    for (const file of poseFiles) {
      const id = file.replace('.md', '');
      if (!manifestIds.has(id)) {
        unlisted.push(id);
      }
    }

    expect(unlisted, `Pose files not in manifest: ${unlisted.join(', ')}`).toHaveLength(0);
  });

  test('each pose file has required fields', () => {
    const requiredFields = ['id', 'names', 'description', 'category', 'difficulty_level'];
    const missingFields: { file: string; missing: string[] }[] = [];

    for (const pose of manifest.poses) {
      const filePath = path.join(POSES_DIR, `${pose.id}.md`);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(content);
          const missing = requiredFields.filter((field) => !(field in data));
          if (missing.length > 0) {
            missingFields.push({ file: `${pose.id}.md`, missing });
          }
        } catch {
          // YAML errors caught in another test
        }
      }
    }

    expect(
      missingFields,
      `Files missing required fields:\n${missingFields.map((f) => `  ${f.file}: missing ${f.missing.join(', ')}`).join('\n')}`
    ).toHaveLength(0);
  });

  test('no duplicate IDs in manifest', () => {
    const ids = manifest.poses.map((p) => p.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    const uniqueDuplicates = [...new Set(duplicates)];

    expect(uniqueDuplicates, `Duplicate IDs in manifest: ${uniqueDuplicates.join(', ')}`).toHaveLength(0);
  });

  test('all manifest entries have title and category', () => {
    const incomplete: { id: string; missing: string[] }[] = [];

    for (const pose of manifest.poses) {
      const missing: string[] = [];
      if (!pose.title || pose.title.trim() === '') {
        missing.push('title');
      }
      if (!pose.category || pose.category.length === 0) {
        missing.push('category');
      }
      if (missing.length > 0) {
        incomplete.push({ id: pose.id, missing });
      }
    }

    expect(
      incomplete,
      `Manifest entries missing required fields:\n${incomplete.map((e) => `  ${e.id}: missing ${e.missing.join(', ')}`).join('\n')}`
    ).toHaveLength(0);
  });
});
