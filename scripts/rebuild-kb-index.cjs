const fs = require("node:fs/promises");
const path = require("node:path");

const KB_ROOT = path.resolve(process.cwd(), "knowledge_base");
const TOPICS_DIR = path.join(KB_ROOT, "topics");
const NOTES_DIR = path.join(KB_ROOT, "notes");
const INDEX_FILE = path.join(KB_ROOT, "_index.md");

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectMarkdownFiles(dirPath) {
  const results = [];

  async function walk(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        results.push(fullPath);
      }
    }
  }

  if (await fileExists(dirPath)) {
    await walk(dirPath);
  }

  return results;
}

function extractTitle(markdown, fallbackTitle) {
  const content = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }
  return fallbackTitle;
}

function toLabelFromFilename(filename) {
  return filename
    .replace(/\.md$/i, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function toLinkItems(filePaths) {
  const items = [];

  for (const filePath of filePaths) {
    const relativeToKb = path.relative(KB_ROOT, filePath).replace(/\\/g, "/");
    const markdown = await fs.readFile(filePath, "utf8");
    const fallbackTitle = toLabelFromFilename(path.basename(filePath));
    const title = extractTitle(markdown, fallbackTitle);

    items.push({
      title,
      relativeLink: `./${relativeToKb}`,
    });
  }

  items.sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));
  return items;
}

function renderList(items) {
  if (!items.length) {
    return "- _No files found._";
  }

  return items.map((item) => `- [${item.title}](${item.relativeLink})`).join("\n");
}

async function buildIndex() {
  if (!(await fileExists(KB_ROOT))) {
    throw new Error(`knowledge_base folder not found: ${KB_ROOT}`);
  }

  const [topicFiles, noteFiles] = await Promise.all([
    collectMarkdownFiles(TOPICS_DIR),
    collectMarkdownFiles(NOTES_DIR),
  ]);

  const [topicItems, noteItems] = await Promise.all([
    toLinkItems(topicFiles),
    toLinkItems(noteFiles),
  ]);

  const output = [
    "# Knowledge Base Index",
    "This index is the master entry point for the phone project knowledge base and links all topic and concept notes for fast retrieval.",
    "",
    "## Topics",
    renderList(topicItems),
    "",
    "## Notes",
    renderList(noteItems),
    "",
    "## Source Coverage",
    "- Product and setup docs: `README.md`, `docs/**`",
    "- Runtime code: `index.html`, `script.js`, `*.css`",
    "- Quality and delivery: `tests/**`, `.github/workflows/ci.yml`, `package.json`",
    "",
    "## Maintenance",
    "- Regenerate this index with `npm run kb:index`",
    "",
  ].join("\n");

  await fs.writeFile(INDEX_FILE, output, "utf8");
}

buildIndex().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
