/**
 * GET /api/posts  (Vercel Serverless Function, công khai)
 *
 * Trả về các bài đã ĐĂNG (status "published") để trang chủ hiện ở mục "Kiến Thức Giảm Cân Thực Chiến".
 * Chỉ gửi tiêu đề, tóm tắt, đường dẫn (không gửi nội dung đầy đủ / ảnh base64) để trang chủ tải nhanh.
 * Trang đọc bài đầy đủ: /kien-thuc/<slug> (api/article.js).
 */
import { hasStore, listPosts } from "./_lib/store.js";
import { postText, postSlug, postImageUrl, autoExcerpt, readingMinutes } from "./_lib/blog.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!hasStore()) return res.status(200).json({ posts: [] });

  try {
    const posts = (await listPosts({ publishedOnly: true, limit: 3 })).map((p) => {
      const f = postText(p);
      return {
        id: p.id,
        slug: postSlug(p),
        pinned: Boolean(p.pinned),
        image: postImageUrl(p),
        publishedAt: p.publishedAt || p.createdAt,
        title: f.title || "",
        excerpt: f.excerpt || autoExcerpt(f.content),
        minutes: readingMinutes(f.content),
      };
    });
    // Cache ngắn trên CDN của Vercel: nhanh mà bài mới vẫn lên trong ~30 giây
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=300");
    return res.status(200).json({ posts });
  } catch (err) {
    console.error("[posts]", err);
    return res.status(200).json({ posts: [] });
  }
}
