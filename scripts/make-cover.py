#!/usr/bin/env python3
"""
Tạo ảnh bìa cho bài blog (1200x630, JPEG) – dùng cho web, ảnh chia sẻ và bài đăng Facebook.

Cách dùng:
  python3 scripts/make-cover.py <slug> "<Tiêu đề bài>" <chuyên-mục>
  -> lưu images/bai-viet/<slug>.jpg  (dùng trong seed-posts.js: image: "/images/bai-viet/<slug>.jpg")

chuyên-mục: dinh-duong | thuc-don | tap-tai-nha | tap-gym
Cần Pillow (pip install pillow). Font: Inter nếu có, không thì DejaVu Sans.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 1200, 630
BLUE, BLUE_DARK, LEAF, LEAF_DARK = (21, 135, 255), (11, 74, 156), (139, 195, 74), (85, 139, 47)
WHITE, INK = (255, 255, 255), (22, 28, 45)

CATS = {
    "dinh-duong": ("DINH DƯỠNG & BẢNG CALO", "🥗"),
    "thuc-don": ("THỰC ĐƠN CƠM NHÀ", "🍚"),
    "tap-tai-nha": ("TẬP TẠI NHÀ", "🏠"),
    "tap-gym": ("KINH NGHIỆM TẬP GYM", "🏋️"),
}


def font(weight, size):
    for path in (
        f"/usr/share/fonts/opentype/inter/Inter-{weight}.otf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if weight != "Medium" else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ):
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def wrap(draw, text, fnt, max_w):
    lines, cur = [], ""
    for word in text.split():
        test = f"{cur} {word}".strip()
        if draw.textlength(test, font=fnt) <= max_w:
            cur = test
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def main(slug, title, cat):
    label = CATS.get(cat, ("KIẾN THỨC TĂNG CƠ GIẢM MỠ", ""))[0]
    img = Image.new("RGB", (W, H), BLUE_DARK)
    d = ImageDraw.Draw(img)
    # Nền chuyển màu xanh dương đậm -> xanh dương
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(BLUE_DARK[i] + (BLUE[i] - BLUE_DARK[i]) * t * 0.55) for i in range(3)))
    # Mảng xanh lá trang trí góc phải
    d.polygon([(W - 330, 0), (W, 0), (W, H), (W - 170, H)], fill=LEAF_DARK)
    d.polygon([(W - 250, 0), (W, 0), (W, H), (W - 90, H)], fill=LEAF)

    x = 70
    # Nhãn chuyên mục
    lf = font("Bold", 26)
    lw = d.textlength(label, font=lf)
    d.rounded_rectangle((x, 64, x + lw + 40, 112), 24, fill=LEAF)
    d.text((x + 20, 73), label, font=lf, fill=WHITE)

    # Tiêu đề: tự giảm cỡ chữ cho vừa tối đa 4 dòng
    max_w = W - x - 330
    for size in (64, 58, 52, 47, 42, 38):
        tf = font("ExtraBold", size)
        lines = wrap(d, title, tf, max_w)
        if len(lines) <= 4:
            break
    lines = lines[:4]
    y = 150
    for ln in lines:
        d.text((x, y), ln, font=tf, fill=WHITE)
        y += int(size * 1.22)

    # Chân ảnh: thương hiệu
    bf = font("ExtraBold", 34)
    d.text((x, H - 98), "TangCo", font=bf, fill=WHITE)
    bx = x + d.textlength("TangCo", font=bf)
    d.text((bx, H - 98), "GiamMo", font=bf, fill=(140, 200, 255))
    bx += d.textlength("GiamMo", font=bf)
    d.text((bx, H - 98), "-Coach", font=bf, fill=LEAF)
    d.text((x, H - 54), "tangcogiammo.com  ·  Coach Tuấn Đạt – 10 năm kinh nghiệm", font=font("Medium", 24), fill=(214, 228, 255))

    out_dir = os.path.join(ROOT, "images", "bai-viet")
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, f"{slug}.jpg")
    img.save(out, "JPEG", quality=86, optimize=True)
    print(out)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
