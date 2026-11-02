/**
 * Trang BÀI VIẾT (Blog "Kiến thức") – HTML dựng sẵn trên máy chủ để Google đọc được ngay (SSR).
 *
 *   /kien-thuc            -> danh sách bài đã đăng
 *   /kien-thuc/<slug>     -> 1 bài viết (khung "Nhận 3 ngày miễn phí" ở giữa và cuối bài)
 * (vercel.json chuyển 2 đường dẫn trên về file này)
 *
 * Bài do admin viết ở admin.html → tab "Bài đăng". Giao diện dùng chung /assets/site.css với trang chủ.
 * Số Zalo, tên PT, Meta Pixel lấy từ /config.js (giống trang chủ).
 */
import { hasStore, listPosts } from "./_lib/store.js";
import { esc, postText, postSlug, postImageUrl, renderBlocks, autoExcerpt, readingMinutes } from "./_lib/blog.js";

const SITE_NAME = "TangCoGiamMo-Coach – PT Online Giảm Mỡ Tăng Cơ";
const fmtDate = (d) => new Date(d).toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" });

export default async function handler(req, res) {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const origin = `https://${host}`;
  const slug = String(req.query?.slug || "").toLowerCase();

  let posts = [];
  try {
    if (hasStore()) posts = await listPosts({ publishedOnly: true, limit: 300 });
  } catch (err) {
    console.error("[article]", err);
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Cache trên CDN của Vercel: trang nhanh, bài mới / sửa bài lên sau tối đa ~5 phút
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");

  if (!slug) return res.status(200).send(listPage(posts, origin));

  const post = posts.find((p) => postSlug(p) === slug);
  if (!post) {
    res.setHeader("Cache-Control", "public, s-maxage=60");
    return res.status(404).send(notFoundPage(posts, origin));
  }
  return res.status(200).send(articlePage(post, posts, origin));
}

/* ----------------------------- KHUNG TRANG CHUNG ----------------------------- */
function layout({ title, description, canonical, image, type = "website", jsonLd, body }) {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta name="theme-color" content="#006fdc" />
  <meta property="og:type" content="${type}" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:site_name" content="${esc(SITE_NAME)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${esc(image)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%231089ff'/%3E%3Cpath d='M6 18c0-7 4-11 12-12-.5 8-4.5 12-12 12Zm0 0 6-6' fill='%23a3cb4c' stroke='%23fff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/site.css" />
  <style>
    .prose-vi { font-size: 17px; line-height: 1.8; color: #374151; }
    .prose-vi h2 { margin: 2rem 0 .75rem; font-size: 1.45rem; line-height: 1.35; font-weight: 700; color: #25282b; }
    .prose-vi h3 { margin: 1.5rem 0 .5rem; font-size: 1.2rem; font-weight: 700; color: #25282b; }
    .prose-vi p { margin: 0 0 1.1rem; }
    .prose-vi ul, .prose-vi ol { margin: 0 0 1.1rem; padding-left: 1.4rem; }
    .prose-vi ul { list-style: disc; } .prose-vi ol { list-style: decimal; }
    .prose-vi li { margin: .35rem 0; }
    .prose-vi strong { color: #25282b; }
  </style>
  <script src="/config.js"></script>
  <script>
    (function () {
      var id = window.SITE_CONFIG && window.SITE_CONFIG.META_PIXEL_ID;
      if (!id) return;
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', id);
      fbq('track', 'PageView');
    })();
  </script>
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>` : ""}
</head>
<body class="bg-white">
  <header class="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
    <div class="container-x flex h-16 items-center justify-between gap-3">
      <a href="/" class="whitespace-nowrap text-[18px] font-bold leading-none tracking-tight text-heading sm:text-[22px]">TangCo<span class="text-primary">GiamMo</span><span class="text-leaf">-Coach</span></a>
      <nav class="flex items-center gap-4 text-[15px] font-medium sm:gap-6">
        <a href="/kien-thuc" class="hidden text-gray-600 hover:text-primary sm:inline">Kiến thức</a>
        <a href="/#tinh-calo" class="hidden text-gray-600 hover:text-primary md:inline">Tính Calo</a>
        <a href="/#bang-gia" class="hidden text-gray-600 hover:text-primary md:inline">Bảng Giá</a>
        <a href="/#kham" class="btn-primary whitespace-nowrap px-3 py-2.5 text-sm sm:px-4">🎁 <span class="sm:hidden">Miễn Phí</span><span class="hidden sm:inline">Nhận 3 Ngày Miễn Phí</span></a>
      </nav>
    </div>
  </header>

  ${body}

  <footer class="mt-16 bg-dark pb-28 pt-10 text-sm text-white/60 lg:pb-10">
    <div class="container-x flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xl font-bold text-white">TangCo<span class="text-sky-300">GiamMo</span><span class="text-leaf">-Coach</span></p>
        <p class="mt-1"><span data-pt-name>PT</span> · PT Online giảm cân: ăn sạch đúng lượng, tập nhẹ đúng cách.</p>
      </div>
      <div class="flex gap-5">
        <a href="/" class="hover:text-white">Trang chủ</a>
        <a href="/kien-thuc" class="hover:text-white">Kiến thức</a>
        <a href="/#kham" class="hover:text-white">Khám cơ thể miễn phí</a>
      </div>
    </div>
  </footer>

  <!-- Mobile: nút dính đáy -->
  <div class="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
    <a href="/#kham" class="btn-primary w-full py-3.5 text-base">🎁 Khám Cơ Thể & Nhận 3 Ngày Miễn Phí</a>
  </div>
  <!-- Nút chat nổi -->
  <div class="fixed bottom-[5.5rem] right-3 z-40 flex flex-col items-center gap-3 lg:bottom-6 lg:right-6">
    <a href="#" data-link="messenger" target="_blank" rel="noopener noreferrer" class="float-chat h-12 w-12 bg-gradient-to-br from-[#00b2ff] to-[#a033ff]" aria-label="Nhắn Messenger">
      <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2Zm1 12.4-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.4 5.8Z"/></svg>
    </a>
    <a href="#" data-link="zalo" target="_blank" rel="noopener noreferrer" class="float-chat h-14 w-14 bg-zalo text-sm font-bold" aria-label="Chat Zalo với PT">
      <span class="pulse-ring absolute inset-0 rounded-full bg-zalo" aria-hidden="true"></span>
      <span class="relative">Zalo</span>
    </a>
  </div>

  <script>
    (function () {
      var C = window.SITE_CONFIG || {};
      var zalo = String(C.ZALO_PHONE || "").replace(/\\D/g, "");
      var links = { zalo: "https://zalo.me/" + zalo, messenger: "https://m.me/" + (C.FANPAGE_ID || ""), facebook: "https://facebook.com/" + (C.FANPAGE_ID || "") };
      document.querySelectorAll("[data-link]").forEach(function (a) { a.href = links[a.dataset.link] || "#"; });
      document.querySelectorAll("[data-pt-name]").forEach(function (el) { el.textContent = C.PT_NAME || "PT"; });
      document.addEventListener("click", function (e) {
        var a = e.target.closest('[data-link="zalo"], [data-link="messenger"]');
        if (a && typeof window.fbq === "function") window.fbq("track", "Contact", { content_name: a.dataset.link });
      });
    })();
  </script>
</body>
</html>`;
}

// Khung kêu gọi "Nhận 3 ngày miễn phí" chèn vào giữa và cuối bài
const ctaBox = (variant) => `
  <aside class="not-prose my-10 overflow-hidden rounded-2xl ${variant === "end" ? "bg-gradient-to-br from-primary-dark to-primary" : "bg-gradient-to-br from-primary to-leaf-dark"} p-6 text-white shadow-card sm:p-8">
    <p class="text-xl font-bold leading-snug sm:text-2xl">🎁 Nhận Khám Cơ Thể + Giáo Án 3 Ngày Miễn Phí từ <span data-pt-name>PT</span></p>
    <p class="mt-2 text-[15px] text-white/90">Điền Phiếu Khám 1 phút, gửi 3 ảnh dáng người qua Zalo (không cần lộ mặt). PT gửi giáo án dinh dưỡng + giáo án tập riêng cho bạn trong 24 giờ. Không ưng không mất phí.</p>
    <a href="/#kham" class="btn mt-5 w-full bg-white py-3.5 text-base text-primary-dark hover:bg-leaf-light sm:w-auto sm:px-8">Khám Cơ Thể Miễn Phí Ngay →</a>
  </aside>`;

const card = (p) => {
  const f = postText(p);
  const img = postImageUrl(p);
  return `
    <a href="/kien-thuc/${esc(postSlug(p))}" class="card group block overflow-hidden">
      ${img ? `<img src="${esc(img)}" alt="${esc(f.title)}" loading="lazy" class="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />` : `<div class="grid aspect-[16/10] place-items-center bg-gradient-to-br from-primary-light to-leaf-light text-5xl">🥗</div>`}
      <div class="p-5">
        <p class="text-[13px]">${fmtDate(p.publishedAt || p.createdAt)} · ${readingMinutes(f.content)} phút đọc</p>
        <h3 class="mt-1.5 text-lg font-bold leading-snug text-heading group-hover:text-primary">${esc(f.title)}</h3>
        <p class="mt-2 text-sm">${esc(f.excerpt || autoExcerpt(f.content))}</p>
        <span class="mt-3 inline-block text-sm font-semibold text-primary">Đọc bài →</span>
      </div>
    </a>`;
};

/* ----------------------------- 1 BÀI VIẾT ----------------------------- */
function articlePage(post, posts, origin) {
  const f = postText(post);
  const slug = postSlug(post);
  const canonical = `${origin}/kien-thuc/${slug}`;
  const desc = f.excerpt || autoExcerpt(f.content, 160);
  const img = postImageUrl(post);
  const ogImage = img ? (img.startsWith("http") ? img : origin + img) : `${origin}/images/og.jpg`;
  const blocks = renderBlocks(f.content);
  // Khung kêu gọi giữa bài: đặt TRƯỚC tiêu đề mục (##) gần giữa bài nhất, để không cắt ngang 1 mục
  const heads = blocks.map((b, i) => (i > 0 && /^<h2>/.test(b) ? i : -1)).filter((i) => i > 0);
  const half = blocks.length / 2;
  const mid = blocks.length < 4 ? -1 : heads.length ? heads.reduce((best, i) => (Math.abs(i - half) < Math.abs(best - half) ? i : best)) : Math.ceil(half);
  const content = blocks.map((b, i) => (i === mid ? ctaBox("mid") + b : b)).join("\n");
  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);
  const date = post.publishedAt || post.createdAt;

  const body = `
  <main>
    <article class="container-x max-w-3xl pt-8 sm:pt-12">
      <nav class="text-sm" aria-label="Vị trí"><a href="/" class="hover:text-primary">Trang chủ</a> › <a href="/kien-thuc" class="hover:text-primary">Kiến thức</a></nav>
      <h1 class="mt-3 text-[1.75rem] font-bold leading-tight text-heading sm:text-4xl" style="text-wrap: balance">${esc(f.title)}</h1>
      <p class="mt-3 text-sm"><span data-pt-name>PT</span> · ${fmtDate(date)} · ${readingMinutes(f.content)} phút đọc</p>
      ${img ? `<img src="${esc(img)}" alt="${esc(f.title)}" class="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />` : ""}
      ${f.excerpt ? `<p class="mt-6 rounded-2xl bg-light p-5 text-[17px] font-medium leading-relaxed text-heading">${esc(f.excerpt)}</p>` : ""}
      <div class="prose-vi mt-6">
        ${content}
      </div>
      ${ctaBox("end")}
    </article>

    ${
      related.length
        ? `<section class="container-x mt-6">
      <h2 class="text-2xl font-bold text-heading">Bài viết khác</h2>
      <div class="mt-6 grid gap-6 md:grid-cols-3">${related.map(card).join("")}</div>
    </section>`
        : ""
    }
  </main>`;

  return layout({
    title: `${f.title} | Kiến thức giảm cân`,
    description: desc,
    canonical,
    image: ogImage,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: f.title,
      description: desc,
      image: [ogImage],
      datePublished: date,
      dateModified: post.updatedAt || date,
      mainEntityOfPage: canonical,
      inLanguage: "vi",
      publisher: { "@type": "Organization", name: SITE_NAME },
    },
    body,
  });
}

/* ----------------------------- DANH SÁCH BÀI ----------------------------- */
function listPage(posts, origin) {
  const body = `
  <main class="container-x pt-10 sm:pt-14">
    <div class="mx-auto max-w-3xl text-center">
      <span class="eyebrow">Blog</span>
      <h1 class="heading">Kiến Thức Giảm Cân Thực Chiến</h1>
      <p class="mt-4 text-base">Ăn sạch đúng lượng, tập nhẹ đúng cách, giữ kỷ luật mỗi ngày: chia sẻ thực tế từ <span data-pt-name>PT</span>.</p>
    </div>
    ${
      posts.length
        ? `<div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${posts.map(card).join("")}</div>`
        : `<p class="mt-12 text-center">Bài viết đang được cập nhật. Trong lúc chờ, bạn có thể <a href="/#tinh-calo" class="font-semibold text-primary">tính calo miễn phí</a>.</p>`
    }
    <div class="mx-auto mt-6 max-w-3xl">${ctaBox("end")}</div>
  </main>`;
  return layout({
    title: "Kiến Thức Giảm Cân Thực Chiến | Dinh dưỡng & tập luyện",
    description: "Chia sẻ thực tế về ăn sạch đúng lượng với món Việt, tập nhẹ tại nhà hoặc phòng Gym và giữ kỷ luật giảm cân bền vững.",
    canonical: `${origin}/kien-thuc`,
    image: `${origin}/images/og.jpg`,
    body,
  });
}

function notFoundPage(posts, origin) {
  const body = `
  <main class="container-x max-w-3xl pt-14 text-center">
    <h1 class="heading">Không tìm thấy bài viết</h1>
    <p class="mt-4">Bài viết có thể đã được đổi tên hoặc gỡ xuống.</p>
    <a href="/kien-thuc" class="btn-primary mt-6">Xem các bài viết khác</a>
    ${posts.length ? `<div class="mt-12 grid gap-6 text-left md:grid-cols-3">${posts.slice(0, 3).map(card).join("")}</div>` : ""}
  </main>`;
  return layout({ title: "Không tìm thấy bài viết | Kiến thức giảm cân", description: "Bài viết không tồn tại.", canonical: `${origin}/kien-thuc`, image: `${origin}/images/og.jpg`, body });
}
