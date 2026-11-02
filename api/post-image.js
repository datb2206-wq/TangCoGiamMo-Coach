/**
 * /anh-bai-viet/<id>  (vercel.json chuyển về file này) – trả ảnh bìa của bài viết.
 * Ảnh tải lên ở admin được lưu dạng base64; phục vụ thành file ảnh để trang nhẹ và Facebook lấy được ảnh khi chia sẻ link.
 */
import { hasStore, getPost, isLeadId } from "./_lib/store.js";

export default async function handler(req, res) {
  const id = String(req.query?.id || "");
  if (!hasStore() || !isLeadId(id)) return res.status(404).end();
  try {
    const post = await getPost(id);
    const img = post?.status === "published" ? post.image || "" : "";
    const m = img.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
    if (m) {
      res.setHeader("Content-Type", m[1]);
      res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
      return res.status(200).send(Buffer.from(m[2], "base64"));
    }
    if (/^https:\/\//.test(img)) return res.redirect(302, img);
    return res.status(404).end();
  } catch (err) {
    console.error("[post-image]", err);
    return res.status(500).end();
  }
}
