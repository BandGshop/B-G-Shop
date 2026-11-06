import { cp, mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const webOutput = join(projectRoot, 'www');
const rootFiles = await readdir(projectRoot, { withFileTypes: true });
const htmlPages = rootFiles
  .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
  .map((entry) => entry.name);
const assets = [...htmlPages, 'styles.css', 'js', 'images'];

await mkdir(webOutput, { recursive: true });

for (const asset of assets) {
  await cp(join(projectRoot, asset), join(webOutput, asset), { recursive: true });
}

console.log(`Pages et ressources mobiles préparées dans ${webOutput}`);