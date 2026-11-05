/**
 * Tiện ích cho mục Blog "Kiến thức" (thư mục bắt đầu bằng "_" nên Vercel không biến thành API).
 *  - slugify: tiêu đề tiếng Việt -> đường dẫn không dấu (VD: "1 bát cơm bao nhiêu calo?" -> "1-bat-com-bao-nhieu-calo")
 *  - renderContent: chuyển nội dung bài (chữ thường) sang HTML với vài quy ước đơn giản:
 *        ## Tiêu đề mục        ### Tiêu đề nhỏ
 *        - gạch đầu dòng       1. danh sách đánh số
 *        **chữ đậm**           (cách 1 dòng trống để xuống đoạn)
 */

// Tên miền chính của web: dùng cho đường dẫn gốc (canonical), sitemap, ảnh chia sẻ Facebook.
// Đổi tên miền: sửa ở đây, hoặc đặt biến môi trường SITE_URL trên Vercel.
export const SITE_URL = (process.env.SITE_URL || "https://www.tangcogiammo.com").replace(/\/+$/, "");

import { SEED_POSTS } from "./seed-posts.js";

// Chuyên mục của Blog (thanh lọc ở /kien-thuc?chuyen-muc=<id>)
export const CATEGORIES = [
  { id: "dinh-duong", name: "Dinh Dưỡng & Bảng Calo" },
  { id: "thuc-don", name: "Thực Đơn Cơm Nhà" },
  { id: "tap-tai-nha", name: "Tập Tại Nhà (Home Workout)" },
  { id: "tap-gym", name: "Kinh Nghiệm Tập Gym" },
];
export const catName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || "";
export const isCategory = (id) => CATEGORIES.some((c) => c.id === id);

const sortPosts = (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt);
// Bài đã đăng + bài nền tảng (SEED_POSTS). Bài admin đăng trùng đường dẫn sẽ thay bài nền tảng.
export function withSeeds(posts) {
  const taken = new Set(posts.map(postSlug));
  return [...posts, ...SEED_POSTS.filter((p) => !taken.has(p.slug))].sort(sortPosts);
}

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // bỏ dấu
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

// Nội dung tiếng Việt của bài (bài cũ có thể chỉ có bản ngôn ngữ khác)
export const postText = (p) => p?.i18n?.vi || Object.values(p?.i18n || {})[0] || {};
// Đường dẫn của bài: slug đã lưu, bài cũ chưa có slug thì tạo từ tiêu đề + 6 ký tự đầu của id
export const postSlug = (p) => p.slug || `${slugify(postText(p).title) || "bai-viet"}-${String(p.id).slice(0, 6)}`;
// Ảnh bìa: ảnh tải lên (base64) được phục vụ qua /anh-bai-viet/<id> để trang nhẹ và dùng được cho chia sẻ Facebook
// Ảnh minh họa có sẵn (ảnh mẫu, không phải học viên) -> luôn ghi chú "Ảnh minh họa"
export const isIllustration = (src) => /^\/images\/minh-hoa\//.test(src || "");
export const postImageUrl = (p) => (!p.image ? "" : p.image.startsWith("data:") ? `/anh-bai-viet/${p.id}` : p.image);

const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
// Tiêu đề mục có id (để Mục lục bấm nhảy tới đúng mục)
const h2 = (text) => `<h2 id="${slugify(text.replace(/\*\*/g, "")) || "muc"}">${inline(text)}</h2>`;

// Mục lục tự động: các tiêu đề "## " trong bài
export function tocItems(content) {
  return String(content || "")
    .split(/\r?\n/)
    .filter((l) => /^##\s+/.test(l.trim()))
    .map((l) => {
      const text = l.trim().replace(/^##\s+/, "").replace(/\*\*/g, "");
      return { id: slugify(text) || "muc", text };
    });
}

// Trả về mảng các khối HTML (để chèn khung kêu gọi vào giữa bài)
export function renderBlocks(content) {
  return String(content || "")
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length === 1 && lines[0].startsWith("### ")) return `<h3>${inline(lines[0].slice(4))}</h3>`;
      if (lines.length === 1 && lines[0].startsWith("## ")) return h2(lines[0].slice(3));
      if (lines.every((l) => /^[-•]\s+/.test(l))) return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^[-•]\s+/, ""))}</li>`).join("")}</ul>`;
      if (lines.every((l) => /^\d+[.)]\s+/.test(l))) return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+[.)]\s+/, ""))}</li>`).join("")}</ol>`;
      // Khối có dòng tiêu đề "## ..." ở đầu rồi tới đoạn văn
      if (/^#{2,3}\s/.test(lines[0])) {
        const head = lines[0].startsWith("### ") ? `<h3>${inline(lines[0].slice(4))}</h3>` : h2(lines[0].replace(/^##\s+/, ""));
        return head + renderBlocks(lines.slice(1).join("\n")).join("");
      }
      return `<p>${lines.map(inline).join("<br>")}</p>`;
    });
}

// Tóm tắt tự động khi admin để trống ô "Tóm tắt"
export function autoExcerpt(content, max = 180) {
  const plain = String(content || "")
    .replace(/^#{2,3}\s+/gm, "")
    .replace(/^[-•]\s+|^\d+[.)]\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max).replace(/\s+\S*$/, "") + "…" : plain;
}

export const readingMinutes = (content) => Math.max(1, Math.round(String(content || "").split(/\s+/).length / 200));
