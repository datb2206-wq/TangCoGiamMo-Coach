/**
 * /sitemap.xml  (vercel.json chuyển về file này) – danh sách trang cho Google: trang chủ, /kien-thuc và mọi bài đã đăng.
 * Tự cập nhật khi admin đăng / sửa bài.
 */
import { hasStore, listPosts } from "./_lib/store.js";
import { SITE_URL, postSlug, withSeeds, CATEGORIES } from "./_lib/blog.js";

export default async function handler(req, res) {
  const origin = SITE_URL;
  let posts = [];
  try {
    if (hasStore()) posts = await listPosts({ publishedOnly: true, limit: 300 });
  } catch (err) {
    console.error("[sitemap]", err);
  }
  posts = withSeeds(posts);
  const latest = posts.reduce((m, p) => Math.max(m, new Date(p.updatedAt || p.publishedAt || p.createdAt).getTime()), 0);
  const url = (loc, lastmod, priority) =>
    `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""}<priority>${priority}</priority></url>`;
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    url(`${origin}/`, null, "1.0"),
    url(`${origin}/kien-thuc`, latest || null, "0.8"),
    ...CATEGORIES.map((c) => url(`${origin}/kien-thuc?chuyen-muc=${c.id}`, null, "0.6")),
    ...posts.map((p) => url(`${origin}/kien-thuc/${postSlug(p)}`, p.updatedAt || p.publishedAt, "0.7")),
    "</urlset>",
  ].join("\n");
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=86400");
  return res.status(200).send(xml);
}
