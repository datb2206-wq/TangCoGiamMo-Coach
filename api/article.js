/**
 * Trang BÀI VIẾT (Blog "Kiến thức") – HTML dựng sẵn trên máy chủ để Google đọc được ngay (SSR).
 *
 *   /kien-thuc            -> danh sách bài đã đăng
 *   /kien-thuc/<slug>     -> 1 bài viết (khung "Nhận 3 ngày miễn phí" ở giữa và cuối bài)
 * (vercel.json chuyển 2 đường dẫn trên về file này)
 *
 * Bài do admin viết ở admin.html → tab "Bài đăng". Giao diện dùng chung /assets/site.css với trang chủ.
 * Số Zalo, tên Coach, số năm kinh nghiệm, Meta Pixel lấy từ /config.js (giống trang chủ).
 * Bài nền tảng (api/_lib/seed-posts.js) luôn hiện kèm bài admin đăng. Lọc chuyên mục: /kien-thuc?chuyen-muc=<id>
 */
import { hasStore, listPosts } from "./_lib/store.js";
import { SITE_URL, esc, postText, postSlug, postImageUrl, isIllustration, renderBlocks, autoExcerpt, readingMinutes, withSeeds, CATEGORIES, catName, isCategory, tocItems } from "./_lib/blog.js";

const SITE_NAME = "TangCoGiamMo-Coach – Coach Online Tăng Cơ Giảm Mỡ";
const fmtDate = (d) => new Date(d).toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" });

export default async function handler(req, res) {
  const origin = SITE_URL; // luôn dùng tên miền chính, kể cả khi mở qua địa chỉ .vercel.app
  const slug = String(req.query?.slug || "").toLowerCase();

  let stored = [];
  try {
    if (hasStore()) stored = await listPosts({ publishedOnly: true, limit: 300 });
  } catch (err) {
    console.error("[article]", err);
  }
  const posts = withSeeds(stored);
  const cat = String(req.query?.["chuyen-muc"] || "").toLowerCase();

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Cache trên CDN của Vercel: trang nhanh, bài mới / sửa bài lên sau tối đa ~5 phút
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");

  if (!slug) return res.status(200).send(listPage(posts, origin, isCategory(cat) ? cat : ""));

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
    <div class="container-x flex h-14 items-center justify-between gap-3 md:h-16">
      <a href="/" class="whitespace-nowrap text-[18px] font-bold leading-none tracking-tight text-heading sm:text-[22px]">TangCo<span class="text-primary">GiamMo</span><span class="text-leaf">-Coach</span></a>
      <nav class="flex items-center gap-4 text-[15px] font-medium sm:gap-6">
        <a href="/kien-thuc" class="hidden font-semibold text-leaf-dark hover:text-primary sm:inline">📗 Kiến Thức</a>
        <a href="/#tinh-calo" class="hidden text-gray-600 hover:text-primary md:inline">Tính Calo</a>
        <a href="/#bang-gia" class="hidden text-gray-600 hover:text-primary md:inline">Bảng Giá</a>
        <a href="/#kham" class="btn-primary whitespace-nowrap px-3 py-2.5 text-sm sm:px-4">🎁 <span class="sm:hidden">Miễn Phí</span><span class="hidden sm:inline">Nhận 3 Ngày Miễn Phí</span></a>
      </nav>
    </div>
  </header>

  ${body}

  <footer class="mt-16 bg-dark pb-24 pt-10 text-sm text-white/60 md:pb-10">
    <div class="container-x flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xl font-bold text-white">TangCo<span class="text-sky-300">GiamMo</span><span class="text-leaf">-Coach</span></p>
        <p class="mt-1"><span data-pt-name>Coach</span> · <span data-years>10</span> năm kinh nghiệm huấn luyện thực chiến tăng cơ &amp; giảm mỡ.</p>
      </div>
      <div class="flex gap-5">
        <a href="/" class="hover:text-white">Trang chủ</a>
        <a href="/kien-thuc" class="hover:text-white">Kiến thức</a>
        <a href="/#kham" class="hover:text-white">Khám cơ thể miễn phí</a>
      </div>
    </div>
  </footer>

  <!-- Điện thoại (< 768px): thanh đáy Zalo 35% + Nhận 3 ngày miễn phí 65% -->
  <div class="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-gray-100 bg-white/95 px-2.5 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
    <a href="#" data-link="zalo" target="_blank" rel="noopener noreferrer" class="flex h-12 w-[35%] items-center justify-center gap-1.5 rounded-lg bg-zalo text-[15px] font-semibold text-white" aria-label="Chat Zalo với Coach">💬 Chat Zalo</a>
    <a href="/#kham" class="btn-primary h-12 w-[65%] gap-1 px-2 py-0 text-center text-[14px] leading-tight">🎁 <span>Nhận 3 Ngày Tập &amp; Ăn Miễn Phí</span></a>
  </div>
  <!-- Nút chat nổi: chỉ máy tính / máy tính bảng -->
  <div class="fixed bottom-6 right-4 z-40 hidden flex-col items-center gap-3 md:flex lg:right-6">
    <a href="#" data-link="messenger" target="_blank" rel="noopener noreferrer" class="float-chat h-12 w-12 bg-gradient-to-br from-[#00b2ff] to-[#a033ff]" aria-label="Nhắn Messenger">
      <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2Zm1 12.4-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.4 5.8Z"/></svg>
    </a>
    <a href="#" data-link="zalo" target="_blank" rel="noopener noreferrer" class="float-chat h-14 w-14 bg-zalo text-sm font-bold" aria-label="Chat Zalo với Coach">
      <span class="pulse-ring absolute inset-0 rounded-full bg-zalo" aria-hidden="true"></span>
      <span class="relative">Zalo</span>
    </a>
  </div>

  <script>
    (function () {
      var C = window.SITE_CONFIG || {};
      var zalo = String(C.ZALO_PHONE || "").replace(/\\D/g, "");
      var links = { zalo: "https://zalo.me/" + zalo, messenger: "https://m.me/" + (C.FANPAGE_ID || ""), facebook: /^\d+$/.test(C.FANPAGE_ID || "") ? "https://www.facebook.com/profile.php?id=" + C.FANPAGE_ID : "https://www.facebook.com/" + (C.FANPAGE_ID || "") };
      document.querySelectorAll("[data-link]").forEach(function (a) { a.href = links[a.dataset.link] || "#"; });
      document.querySelectorAll("[data-pt-name]").forEach(function (el) { el.textContent = C.PT_NAME || "Coach"; });
      document.querySelectorAll("[data-years]").forEach(function (el) { el.textContent = C.EXPERIENCE_YEARS || 10; });
      document.addEventListener("click", function (e) {
        var a = e.target.closest('[data-link="zalo"], [data-link="messenger"]');
        if (a && typeof window.fbq === "function") window.fbq("track", "Contact", { content_name: a.dataset.link });
      });
    })();
  </script>
</body>
</html>`;
}

// Cuối bài: khung "Nhận khám cơ thể + giáo án 3 ngày miễn phí" -> Phiếu Khám trang chủ
const ctaBox = () => `
  <aside class="not-prose my-10 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark to-primary p-6 text-white shadow-card sm:p-8">
    <p class="text-xl font-bold leading-snug sm:text-2xl">🎁 Nhận Khám Cơ Thể + Giáo Án 3 Ngày Miễn Phí từ <span data-pt-name>Coach</span></p>
    <p class="mt-2 text-[15px] text-white/90">Điền Phiếu Khám 1 phút, nhắn Zalo cho Coach để giữ suất (3 ảnh dáng người không cần lộ mặt, gửi sau cũng được). Coach gửi giáo án dinh dưỡng + giáo án tập riêng cho bạn. Không ưng không mất phí.</p>
    <a href="/#kham" class="btn mt-5 w-full bg-white py-3.5 text-base text-primary-dark hover:bg-leaf-light sm:w-auto sm:px-8">Khám Cơ Thể Miễn Phí Ngay →</a>
  </aside>`;
// Giữa bài: hộp mời tính BMI & TDEE miễn phí -> máy tính calo trang chủ
const calcBox = () => `
  <a href="/#tinh-calo" class="not-prose my-8 block rounded-2xl border-2 border-leaf/50 bg-leaf-light p-5 text-heading no-underline transition hover:border-leaf sm:p-6">
    <p class="text-[17px] font-semibold leading-snug">💡 Bạn chưa biết cơ thể mình cần ăn bao nhiêu Calo mỗi ngày để tăng cơ giảm mỡ?</p>
    <p class="mt-2 font-bold text-primary-dark">👉 Bấm vào đây tính chỉ số BMI &amp; TDEE miễn phí trong 10 giây</p>
  </a>`;

const card = (p) => {
  const f = postText(p);
  const img = postImageUrl(p);
  return `
    <a href="/kien-thuc/${esc(postSlug(p))}" class="card group flex flex-col overflow-hidden">
      <div class="relative overflow-hidden">
      ${img ? `<img src="${esc(img)}" alt="${esc(f.title)}" loading="lazy" class="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105" />` : `<div class="grid aspect-[16/9] place-items-center bg-gradient-to-br from-primary-light to-leaf-light text-5xl">🥗</div>`}
      ${isIllustration(img) ? `<span class="pointer-events-none absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white">Ảnh minh họa</span>` : ""}
      </div>
      <div class="flex flex-1 flex-col p-5">
        ${p.category ? `<span class="self-start rounded-full bg-leaf-light px-2.5 py-0.5 text-xs font-semibold text-leaf-dark">${esc(catName(p.category))}</span>` : ""}
        <h2 class="mt-2 text-lg font-bold leading-snug text-heading group-hover:text-primary">${esc(f.title)}</h2>
        <p class="mt-2 line-clamp-2 text-sm">${esc(f.excerpt || autoExcerpt(f.content))}</p>
        <p class="mt-auto flex items-center justify-between pt-4 text-[13px]"><span>⏱ ${readingMinutes(f.content)} phút đọc</span><span class="font-semibold text-primary">Đọc bài →</span></p>
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
  const heads = blocks.map((b, i) => (i > 0 && /^<h2[ >]/.test(b) ? i : -1)).filter((i) => i > 0);
  const half = blocks.length / 2;
  const mid = blocks.length < 4 ? -1 : heads.length ? heads.reduce((best, i) => (Math.abs(i - half) < Math.abs(best - half) ? i : best)) : Math.ceil(half);
  const content = blocks.map((b, i) => (i === mid ? calcBox() + b : b)).join("\n");
  // Bài liên quan: ưu tiên cùng chuyên mục
  const others = posts.filter((p) => p.id !== post.id);
  const related = [...others.filter((p) => p.category && p.category === post.category), ...others.filter((p) => !p.category || p.category !== post.category)].slice(0, 3);
  const toc = tocItems(f.content);
  const date = post.publishedAt || post.createdAt;

  const body = `
  <main>
    <article class="container-x max-w-3xl pt-8 sm:pt-12">
      <nav class="text-sm" aria-label="Vị trí"><a href="/" class="hover:text-primary">Trang chủ</a> › <a href="/kien-thuc" class="hover:text-primary">Kiến thức</a>${post.category ? ` › <a href="/kien-thuc?chuyen-muc=${esc(post.category)}" class="hover:text-primary">${esc(catName(post.category))}</a>` : ""}</nav>
      <h1 class="mt-3 text-[1.75rem] font-bold leading-tight text-heading sm:text-4xl" style="text-wrap: balance">${esc(f.title)}</h1>
      <p class="mt-3 text-sm"><span data-pt-name>Coach</span> · ${fmtDate(date)} · ${readingMinutes(f.content)} phút đọc</p>
      ${img ? `<figure class="mt-6"><img src="${esc(img)}" alt="${esc(f.title)}" class="aspect-[16/9] w-full rounded-2xl object-cover" />${isIllustration(img) ? `<figcaption class="mt-2 text-center text-xs text-gray-400">Ảnh minh họa</figcaption>` : ""}</figure>` : ""}
      ${f.excerpt ? `<p class="mt-6 rounded-2xl bg-light p-5 text-[17px] font-medium leading-relaxed text-heading">${esc(f.excerpt)}</p>` : ""}
      ${
        toc.length >= 3
          ? `<nav class="mt-6 rounded-2xl border border-gray-200 p-5" aria-label="Mục lục">
        <p class="font-bold text-heading">📑 Mục lục</p>
        <ol class="mt-2 list-decimal space-y-1.5 pl-5 text-[15px]">${toc.map((t) => `<li><a href="#${esc(t.id)}" class="text-primary-dark hover:underline">${esc(t.text)}</a></li>`).join("")}</ol>
      </nav>`
          : ""
      }
      <div class="prose-vi mt-6">
        ${content}
      </div>
      ${ctaBox()}
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
function listPage(allPosts, origin, cat) {
  const posts = cat ? allPosts.filter((p) => p.category === cat) : allPosts;
  const tab = (id, name) =>
    `<a href="/kien-thuc${id ? `?chuyen-muc=${id}` : ""}" class="shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
      id === cat ? "bg-primary text-white shadow-sm" : "bg-white text-heading ring-1 ring-gray-200 hover:text-primary hover:ring-primary"
    }"${id === cat ? ' aria-current="page"' : ""}>${esc(name)}</a>`;
  const body = `
  <main class="container-x pt-10 sm:pt-14">
    <div class="mx-auto max-w-3xl text-center">
      <span class="eyebrow">Blog</span>
      <h1 class="heading">Kiến Thức Tăng Cơ &amp; Giảm Mỡ Thực Chiến</h1>
      <p class="mt-4 text-base">Ăn sạch đúng lượng với món Việt, tập đúng cách tại nhà hoặc phòng Gym: chia sẻ thực chiến từ <span data-pt-name>Coach</span> (<span data-years>10</span> năm kinh nghiệm).</p>
    </div>
    <nav class="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden" aria-label="Chuyên mục">
      ${tab("", "Tất cả")}${CATEGORIES.map((c) => tab(c.id, c.name)).join("")}
    </nav>
    ${
      posts.length
        ? `<div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${posts.map(card).join("")}</div>`
        : `<p class="mt-12 text-center">Chuyên mục này đang được cập nhật bài mới. Trong lúc chờ, bạn xem <a href="/kien-thuc" class="font-semibold text-primary">tất cả bài viết</a> hoặc <a href="/#tinh-calo" class="font-semibold text-primary">tính calo miễn phí</a>.</p>`
    }
    <div class="mx-auto mt-6 max-w-3xl">${ctaBox()}</div>
  </main>`;
  const catLabel = cat ? catName(cat) : "";
  return layout({
    title: catLabel ? `${catLabel} | Kiến Thức Tăng Cơ Giảm Mỡ` : "Kiến Thức Tăng Cơ & Giảm Mỡ Thực Chiến | Dinh dưỡng & tập luyện",
    description: "Chia sẻ thực chiến về ăn đúng lượng với món Việt, thực đơn cơm nhà, tập tại nhà hoặc phòng Gym để tăng cơ, giảm mỡ bền vững.",
    canonical: `${origin}/kien-thuc${cat ? `?chuyen-muc=${cat}` : ""}`,
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
