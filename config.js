/* =====================================================================
 * CẤU HÌNH TRANG CHỦ – chủ web tự sửa file này, không cần đụng vào index.html
 * Sửa xong: lưu file -> deploy lại Vercel (hoặc đẩy lên GitHub nếu đã nối Vercel).
 * ===================================================================== */
window.SITE_CONFIG = {
  /* ---------- PT ---------- */
  // Tên Coach hiện trên web (đầu trang, popup cảm ơn, chân trang, blog). Đổi tên ở đây là cả trang đổi theo.
  PT_NAME: "Coach Tuấn Đạt",
  // Số năm kinh nghiệm: hiện ở nhãn đầu trang, thanh số liệu, chân trang, FAQ, blog
  EXPERIENCE_YEARS: 10,

  /* ---------- Liên hệ ---------- */
  // Số Zalo của PT (10 số, viết liền). Nút Zalo nổi + nút "Mở Zalo" sau khi gửi form dùng số này.
  ZALO_PHONE: "0911811010",
  // ID / tên trang Facebook (Fanpage): dãy số trong link profile.php?id=… hoặc tên trang (facebook.com/<tên>)
  // m.me/<ID> mở Messenger, link Fanpage tự tạo từ ID này
  FANPAGE_ID: "100091672211550",
  EMAIL: "hotro@tangcogiammo.com",

  /* ---------- Quảng cáo Facebook ---------- */
  // Dán ID Meta Pixel (dãy số trong Events Manager). Để trống "" = chưa bật Pixel.
  // Sự kiện tự gửi: PageView (mở trang), Lead (gửi Phiếu Khám thành công), Contact (bấm Zalo / Messenger).
  META_PIXEL_ID: "",

  /* ---------- Bảng giá (đổi giá khuyến mãi khi chạy Ads ở đây) ---------- */
  PRICING: {
    // Cột đối chiếu (làm mờ, không có nút bấm)
    gymPT: {
      name: "PT Phòng Tập Truyền Thống",
      price: "5.000.000đ – 8.000.000đ",
      unit: "/ tháng",
      cons: ["Chi phí đắt đỏ khó duy trì lâu", "Phải di chuyển và phụ thuộc giờ giấc của PT", "Hết gói tập dễ bị tăng cân trở lại"],
    },
    plans: [
      {
        id: "dung-thu",
        name: "Dùng Thử 3 Ngày",
        badge: "MIỄN PHÍ",
        price: 0, // 0 = hiện chữ "Miễn phí"
        unit: "3 ngày đầu",
        features: [
          "Khám cơ thể miễn phí qua 3 ảnh dáng người (trước – ngang – sau), không cần lộ mặt",
          "Giáo án dinh dưỡng riêng cho 3 ngày đầu",
          "Giáo án tập riêng cho 3 ngày đầu (tại nhà hoặc phòng Gym)",
          "Không ưng ý? Dừng lại, không mất đồng nào",
        ],
        cta: "Nhận 3 Ngày Miễn Phí",
      },
      {
        id: "30-ngay",
        name: "Gói Đồng Hành 30 Ngày",
        badge: "SAU 3 NGÀY DÙNG THỬ",
        price: 288000,
        unit: "/ 30 ngày",
        days: 30, // dùng để tính "≈ ... đ/ngày"
        features: [
          "Mỗi ngày nhận giáo án tập và thực đơn dinh dưỡng mới",
          "Coach kiểm tra bữa ăn & nhắc kỷ luật mỗi ngày qua Zalo",
          "Chỉnh kỹ thuật bài tập qua video",
          "Cập nhật cân nặng, số đo hằng tuần để điều chỉnh giáo án",
          "Đóng theo từng tháng, muốn dừng lúc nào cũng được",
        ],
        cta: "Đăng Ký Gói 30 Ngày",
      },
      {
        id: "90-ngay",
        name: "Combo Kỷ Luật 90 Ngày",
        badge: "TIẾT KIỆM 165.000Đ",
        oldPrice: 864000, // = 3 x 288.000đ, hiện gạch ngang để thấy phần tiết kiệm
        price: 699000,
        unit: "/ 90 ngày",
        days: 90,
        features: [
          "Toàn bộ quyền lợi gói 30 ngày, trọn 90 ngày",
          "Lộ trình dài hơi cho mục tiêu giảm 5–8kg",
          "Đổi mới thực đơn, lịch tập theo từng giai đoạn để chống chững cân",
          "Hướng dẫn cách tự giữ dáng sau khi kết thúc gói",
        ],
        cta: "Đăng Ký Combo 90 Ngày",
      },
    ],
  },

  /* ---------- Kết quả học viên ----------
   * Mục này TỰ ẨN khi danh sách trống. Chỉ dùng ảnh học viên THẬT, đã xin phép và che mặt.
   * Ảnh để trong thư mục images/ket-qua/ (nên dùng .webp, rộng ~1000px). Thêm học viên mới: chép 1 khối { ... } rồi sửa số.
   *   before / after : cân nặng trước – sau (kg)      time : thời gian ("3 tháng", "36 buổi"…)
   *   who            : "Nam" / "Nữ"                    images : 1 hoặc nhiều góc chụp (mỗi góc 1 ảnh ghép trước–sau)
   *   tall: true     : thêm vào ảnh khi ảnh là khổ DỌC (VD 894x1080) để không bị cắt mất chữ
   * Ảnh chụp màn hình tin nhắn Zalo học viên báo cáo: { type: "zalo", image: "images/ket-qua/zalo-1.webp", caption: "Báo cáo bữa trưa ngày 12" }
   */
  // ⚠️ CHỈ dùng ảnh của học viên do chính PT kèm, đã xin phép và che mặt. Không dùng ảnh lấy từ nơi khác.
  // Danh sách trống = mục "Kết quả học viên" tự ẩn (trang vẫn có mục Cam kết).
  RESULTS: [
    { who: "Chị N.", before: 63, after: 60, time: "15 buổi", images: [{ src: "images/ket-qua/nu-63-60-15buoi.webp", label: "Mặt trước" }] },
    { who: "Chị V.", before: 57, after: 54.5, time: "16 buổi", images: [{ src: "images/ket-qua/nu-57-545-16buoi.webp", label: "Mặt trước" }] },
    { who: "Anh T.", before: 86.2, after: 80.4, time: "25 ngày", images: [
      { src: "images/ket-qua/nam-862-804-25ngay.webp", label: "Mặt trước" },
      { src: "images/ket-qua/nam-862-804-ngang.webp", label: "Mặt ngang" } ] },
    { who: "Chị L.", before: 56.7, after: 52.2, time: "25 ngày", images: [{ src: "images/ket-qua/nu-567-522-25ngay.webp", label: "Mặt ngang" }] },
    { who: "Anh H.", before: 69.3, after: 63.7, time: "45 ngày", images: [{ src: "images/ket-qua/nam-693-637-45ngay.webp", label: "Mặt ngang" }] },
    { who: "Chị M.", before: 55, after: 52, time: "45 ngày", images: [{ src: "images/ket-qua/nu-55-52-45ngay.webp", label: "Mặt trước" }] },
    { who: "Học viên", before: 57, after: 54.5, time: "31 buổi", images: [{ src: "images/ket-qua/nu-57-545-31buoi-v2.webp", label: "Mặt ngang", tall: true }] },
    { who: "Học viên", before: 56.7, after: 52.2, time: "40 buổi", images: [{ src: "images/ket-qua/nu-567-522-40buoi-v2.webp", label: "Mặt trước", tall: true }] },
    { who: "Học viên", before: 53.6, after: 52, time: "26 buổi", images: [{ src: "images/ket-qua/nu-536-52-26buoi-v2.webp", label: "Mặt ngang", tall: true }] },
    { who: "Học viên", before: 53.1, after: 51.8, time: "25 buổi", images: [{ src: "images/ket-qua/nu-531-518-25buoi-v2.webp", label: "Mặt trước", tall: true }] },
    { who: "Học viên", before: 65, after: 60, time: "42 buổi", images: [{ src: "images/ket-qua/nu-65-60-42buoi-v2.webp", label: "Mặt ngang", tall: true }] },
    { who: "Học viên", before: 48.8, after: 47.4, time: "25 buổi", images: [{ src: "images/ket-qua/nu-488-474-25buoi-v2.webp", label: "Mặt ngang", tall: true }] },
    { who: "Học viên", before: 63, after: 60.6, time: "30 buổi", images: [{ src: "images/ket-qua/nu-63-606-30buoi-v2.webp", label: "Mặt ngang", tall: true }] },
    { who: "Học viên", before: 69.3, after: 63.7, time: "45 buổi", images: [{ src: "images/ket-qua/nam-693-637-45buoi-v2.webp", label: "Mặt trước", tall: true }] },
    { who: "Học viên", before: 63, after: 60, time: "33 buổi", images: [{ src: "images/ket-qua/nu-63-60-33buoi-v2.webp", label: "Mặt ngang", tall: true }] },
  ],
};
