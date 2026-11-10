/**
 * Fills in each album's title and cover from Spotify's oEmbed endpoint, which
 * is public - the Web API would need an authorised app, this needs nothing.
 * Covers are committed so the site never depends on Spotify at request time.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const FILE = new URL("../src/data/music.json", import.meta.url);
const OUT = new URL("../public/music/", import.meta.url);

const data = JSON.parse(await readFile(FILE, "utf8"));

for (const album of data.albums) {
  const url = `https://open.spotify.com/oembed?url=https://open.spotify.com/album/${album.id}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) {
    console.warn(`  ✗ ${album.id} (${album.artist}) -> HTTP ${res.status}`);
    continue;
  }
  const meta = await res.json();
  album.title = meta.title;

  const img = await fetch(meta.thumbnail_url, { signal: AbortSignal.timeout(15000) });
  const buf = Buffer.from(await img.arrayBuffer());
  const slug = `${album.artist}-${meta.title}`
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  await sharp(buf).resize(300, 300, { fit: "cover" }).webp({ quality: 82 })
    .toFile(fileURLToPath(new URL(`${slug}.webp`, OUT)));
  album.cover = `/music/${slug}.webp`;
  console.log(`  ✓ ${meta.title} — ${album.artist} (${album.year})`);
}

await writeFile(FILE, JSON.stringify(data, null, 2) + "\n");
console.log(`\n${data.albums.filter(a => a.cover).length}/${data.albums.length} albums resolved`);
