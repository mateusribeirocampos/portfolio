import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// sharp is already installed with Next.js's optional image dependencies.
// This script only exports sizes/formats; the master contains the artwork.
const source = new URL('../assets/brand/mrc-icon-master.png', import.meta.url);
const appDirectory = new URL('../app/', import.meta.url);
const input = await readFile(source);
const sizes = [16, 32, 48];

const images = await Promise.all(
  sizes.map((size) => sharp(input).resize(size, size).png().toBuffer()),
);

// An ICO directory points at the PNG-encoded image for each supported size.
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2); // Type 1: icon.
directory.writeUInt16LE(sizes.length, 4);
let imageOffset = directory.length;

for (const [index, size] of sizes.entries()) {
  const entryOffset = 6 + index * 16;
  directory.writeUInt8(size, entryOffset);
  directory.writeUInt8(size, entryOffset + 1);
  directory.writeUInt16LE(1, entryOffset + 4); // Color planes.
  directory.writeUInt16LE(32, entryOffset + 6); // RGBA bits per pixel.
  directory.writeUInt32LE(images[index].length, entryOffset + 8);
  directory.writeUInt32LE(imageOffset, entryOffset + 12);
  imageOffset += images[index].length;
}

await Promise.all([
  writeFile(new URL('favicon.ico', appDirectory), Buffer.concat([directory, ...images])),
  sharp(input).resize(512, 512).png().toFile(new URL('icon.png', appDirectory).pathname),
  // Apple applies its own corner mask; provide an opaque square background.
  sharp(input)
    .resize(180, 180)
    .flatten({ background: '#090b11' })
    .png()
    .toFile(new URL('apple-icon.png', appDirectory).pathname),
]);

console.log('Exported app/favicon.ico (16/32/48), app/icon.png (512), app/apple-icon.png (180).');
