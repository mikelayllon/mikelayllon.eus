// Panelean igotako irudiak txikitzen ditu argitaratu aurretik (dist/irudiak).
// Jatorrizkoak ez dira ukitzen; argitaratutako kopiak bakarrik.
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const DIR = 'dist/irudiak';
const MAX = 1800; // zabalera edo altuera maximoa, pixeletan

let files = [];
try { files = await readdir(DIR); } catch { process.exit(0); }

for (const f of files) {
  const ext = extname(f).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
  const path = join(DIR, f);
  const before = (await stat(path)).size;
  const img = sharp(path, { failOn: 'none' }).rotate();
  const meta = await img.metadata();
  let pipe = img.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
  if (ext === '.png') pipe = pipe.png({ compressionLevel: 9, palette: true });
  else if (ext === '.webp') pipe = pipe.webp({ quality: 80 });
  else pipe = pipe.jpeg({ quality: 82, mozjpeg: true, progressive: true });
  const out = await pipe.toBuffer();
  if (out.length < before) {
    await writeFile(path, out);
    console.log(`irudia: ${f} ${meta.width}x${meta.height} ${Math.round(before / 1024)}KB -> ${Math.round(out.length / 1024)}KB`);
  }
}
