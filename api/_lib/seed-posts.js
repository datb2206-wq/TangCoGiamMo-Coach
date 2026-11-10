/**
 * BÀI VIẾT NỀN TẢNG – luôn hiện ở /kien-thuc và trang chủ (kể cả khi admin chưa đăng bài nào).
 *  - Muốn sửa 1 bài: trong admin.html bấm "📥 Bài mẫu" để nạp thành bản nháp, sửa rồi Đăng
 *    (bài admin đăng có CÙNG đường dẫn sẽ tự thay thế bài nền tảng tương ứng).
 *  - Quy ước viết: "## " tiêu đề mục, "- " gạch đầu dòng, "1. " danh sách số, **chữ đậm**, cách 1 dòng trống để xuống đoạn.
 *  - category: dinh-duong | thuc-don | tap-tai-nha | tap-gym  (xem CATEGORIES trong blog.js)
 * File sample-posts.js (nút "📥 Bài mẫu" trong admin) được tạo tự động từ file này khi chạy npm run build:css.
 */
export const SEED_POSTS = [
  {
    slug: "1-bat-com-trang-bao-nhieu-calo-cach-an-com-giam-mo",
    category: "dinh-duong",
    image: "/images/minh-hoa/11.webp",
    publishedAt: "2026-11-05T02:00:00.000Z",
    title: "1 Bát Cơm Trắng Bao Nhiêu Calo? Cách Ăn Cơm Nhà Đều Đặn Mà Vẫn Giảm Mỡ Bụng",
    excerpt: "Không cần bỏ cơm trắng để giảm mỡ. Biết 1 bát cơm có bao nhiêu calo và cách chia đĩa ăn đúng lượng là bạn vẫn ăn chung mâm với gia đình mà mỡ bụng vẫn giảm.",
    content: `Rất nhiều người bắt đầu giảm cân bằng cách bỏ cơm. Vài ngày đầu cân có thể xuống, nhưng phần lớn là nước. Sau đó cơ thể mệt, thèm ăn và rất dễ ăn bù. Thực tế, mỡ giảm khi **tổng năng lượng bạn ăn mỗi ngày thấp hơn năng lượng cơ thể đốt**, chứ không phải vì bỏ một món cụ thể nào.

## 1 bát cơm trắng bao nhiêu calo?

- 100 g cơm trắng đã nấu chín: khoảng 130 kcal
- 1 bát ăn cơm vừa (khoảng 150 g, xới bằng miệng bát): khoảng 190–200 kcal
- 1 bát đầy có ngọn (200–250 g): khoảng 260–330 kcal

Con số thay đổi theo loại gạo và độ khô của cơm, nên hãy coi đây là mức ước tính để định lượng.

## Khi giảm mỡ nên ăn bao nhiêu cơm?

Với đa số người đang giảm mỡ, **mỗi bữa chính khoảng 1 bát vừa** là hợp lý, ăn kèm đủ rau và đạm. Người vận động nhiều có thể cần nhiều hơn; người ngồi văn phòng cả ngày có thể giảm còn 2/3 bát. Lượng chính xác phụ thuộc lượng calo mỗi ngày của bạn.

## Cách chia đĩa ăn đơn giản bằng mắt

- 1/2 đĩa là rau: rau luộc, rau xào ít dầu, canh rau
- 1/4 đĩa là đạm: thịt nạc, cá, trứng, đậu phụ, tôm
- 1/4 đĩa là tinh bột: cơm, khoai lang, bún

Không cần cân đo từng bữa, chỉ cần giữ tỉ lệ này đều đặn mỗi ngày.

## Vì sao ăn cơm đều đặn lại giúp giảm mỡ bụng bền hơn?

- Đủ tinh bột giúp bạn có sức tập, không bị đuối giữa buổi
- Ăn no vừa phải ở bữa chính giúp bớt ăn vặt, trà sữa buổi chiều
- Ăn chung mâm với gia đình thì dễ duy trì nhiều tháng, không phải nấu riêng

Mỡ bụng không giảm riêng một chỗ: khi tổng lượng mỡ cơ thể giảm, vòng eo sẽ gọn dần theo.

## 4 mẹo ăn cơm mà không tăng cân

1. Dùng bát nhỏ, xới một lần, không xới thêm
2. Ăn rau và đạm trước, cơm sau, bạn sẽ no lâu hơn
3. Hạn chế chan nước thịt, nước sốt nhiều mỡ và nước mắm pha đường
4. Ăn chậm, nhai kỹ, dừng lại khi thấy no khoảng 80%

## Kết luận

Bạn không cần bỏ cơm. Điều cần là **ăn đúng lượng, đủ đạm, nhiều rau** và giữ thói quen đó mỗi ngày. Nếu muốn biết chính xác mình nên ăn bao nhiêu cơm mỗi bữa, Coach có thể tính và lên thực đơn cơm nhà riêng cho bạn.`,
  },
  {
    slug: "thuc-don-tang-co-giam-mo-7-ngay-cho-viet-binh-dan",
    category: "thuc-don",
    image: "/images/minh-hoa/07.webp",
    publishedAt: "2026-11-05T01:00:00.000Z",
    title: "Thực Đơn Tăng Cơ Giảm Mỡ 7 Ngày Bằng Đồ Ăn Chợ Việt (Dưới 60.000đ/Ngày)",
    excerpt: "Thực đơn mẫu 7 ngày từ trứng, ức gà, cá, đậu phụ, thịt nạc và rau chợ: đủ đạm để giữ và tăng cơ, vừa calo để giảm mỡ, chi phí khoảng 45.000–60.000đ mỗi ngày.",
    content: `Muốn vừa tăng cơ vừa giảm mỡ, bạn cần 2 điều: **ăn hơi thấp hơn mức calo cơ thể đốt một chút** và **ăn đủ đạm mỗi ngày** (khoảng 1,6–2,2 g đạm cho mỗi kg cân nặng), kèm tập kháng lực đều đặn. Tin vui là toàn bộ thực đơn dưới đây đều mua được ở chợ, không cần cá hồi hay đồ Tây đắt tiền.

## Thực đơn này dành cho ai?

- Người muốn giảm mỡ, săn chắc hơn, có tập tại nhà hoặc phòng Gym 3–5 buổi/tuần
- Mức năng lượng tham khảo khoảng **1.400–1.700 kcal/ngày** (nữ) và **1.800–2.100 kcal/ngày** (nam: tăng phần cơm khoảng 1,5 lần)
- Chi phí ước tính **45.000–60.000đ/ngày** theo giá chợ phổ biến; giá thực tế tùy địa phương và thời điểm

Lượng calo đúng cho riêng bạn phụ thuộc chiều cao, cân nặng và mức vận động. Bạn có thể tự tính nhanh bằng công cụ Tính Calo trên trang chủ.

## Nguyên tắc chung cho cả 7 ngày

- Mỗi bữa chính: 1 bát cơm vừa (khoảng 150 g) hoặc 1 củ khoai lang vừa
- Mỗi bữa có 1 phần đạm bằng lòng bàn tay: 120–150 g thịt nạc, cá, ức gà, hoặc 2–3 quả trứng, hoặc 1 bìa đậu phụ to
- Rau ăn thoải mái, luộc hoặc xào ít dầu
- Uống 2–2,5 lít nước mỗi ngày, hạn chế nước ngọt và trà sữa

## Ngày 1

- Sáng: 2 quả trứng luộc + 1 củ khoai lang + 1 cốc trà không đường
- Trưa: cơm + ức gà luộc xé 150 g + rau muống luộc
- Tối: cơm + đậu phụ sốt cà chua + canh bí xanh
- Phụ: 1 hũ sữa chua không đường

## Ngày 2

- Sáng: bánh mì + 2 quả trứng ốp ít dầu + dưa chuột
- Trưa: cơm + thịt lợn nạc rim 120 g + cải ngọt xào ít dầu
- Tối: cơm + cá rô phi hấp gừng + canh rau ngót
- Phụ: 1 quả chuối

## Ngày 3

- Sáng: xôi lạc nắm nhỏ + 1 quả trứng luộc
- Trưa: cơm + ức gà áp chảo + su su luộc
- Tối: cơm + trứng hấp thịt băm + canh cải
- Phụ: 1 hũ sữa chua không đường

## Ngày 4

- Sáng: 1 bát phở gà ít bánh, thêm rau
- Trưa: cơm + cá basa kho tộ ít đường + bắp cải luộc
- Tối: cơm + đậu phụ nhồi thịt + canh mồng tơi
- Phụ: 1 cốc sữa đậu nành không đường

## Ngày 5

- Sáng: 2 quả trứng luộc + 1 củ khoai lang
- Trưa: cơm + thịt bò xào hành tây 100 g + rau cải luộc
- Tối: cơm + ức gà luộc + canh bí đỏ
- Phụ: 1 quả chuối

## Ngày 6

- Sáng: cháo yến mạch nấu với 1 quả trứng hoặc bún nước ít bún, thêm thịt
- Trưa: cơm + tôm rang ít dầu + rau muống xào tỏi
- Tối: cơm + cá thu sốt cà + canh chua rau
- Phụ: 1 hũ sữa chua không đường

## Ngày 7

- Sáng: bánh mì + pate ít + 1 quả trứng + rau sống
- Trưa: cơm + thịt gà kho gừng (bỏ da) + rau lang luộc
- Tối: cơm + đậu phụ luộc chấm + trứng rán ít dầu + canh rau
- Phụ: 1 cốc sữa đậu nành không đường

## Mẹo giữ chi phí dưới 60.000đ/ngày

1. Mua ức gà, thịt nạc theo cân rồi chia hộp để ngăn đá cho cả tuần
2. Trứng và đậu phụ là 2 nguồn đạm rẻ nhất, xoay vòng hằng ngày
3. Chọn rau theo mùa, cá theo mùa để vừa rẻ vừa tươi
4. Nấu 1 lần cho 2 bữa (trưa mang đi làm) để bớt ăn ngoài

## Lưu ý

- Đây là thực đơn mẫu cho người khỏe mạnh. Nếu bạn có bệnh dạ dày, thận, tiểu đường, đang mang thai hoặc cho con bú, hãy hỏi ý kiến bác sĩ trước khi thay đổi chế độ ăn.
- Muốn tăng cơ thật sự, bạn cần **tập kháng lực đều đặn** (squat, chống đẩy, kéo, đẩy tạ…), ăn đủ đạm thôi là chưa đủ.

## Kết luận

Tăng cơ giảm mỡ không cần đồ ăn đắt tiền. Chỉ cần **đủ đạm, đúng lượng cơm, nhiều rau** và tập đều. Nếu muốn thực đơn được tính riêng theo chỉ số cơ thể và món nhà bạn hay nấu, Coach sẽ lên giáo án và theo sát bạn mỗi ngày qua Zalo.`,
  },
  {
    slug: "lich-tap-giam-mo-tai-nha-30-phut-khong-can-dung-cu",
    category: "tap-tai-nha",
    image: "/images/minh-hoa/10.webp",
    publishedAt: "2026-11-05T00:00:00.000Z",
    title: "Lịch Tập Giảm Mỡ Tăng Cơ Tại Nhà 30 Phút/Ngày Không Cần Dụng Cụ Cho Người Mới",
    excerpt: "Chỉ cần một tấm thảm và 30 phút, 3–4 buổi mỗi tuần. Bài tập nhẹ, dễ làm theo, giúp đốt mỡ và giữ, tăng cơ cho người mới, dân văn phòng và người ngại đến phòng Gym.",
    content: `Bạn không cần phòng Gym hay tập thật nặng để bắt đầu. Với người mới, điều quan trọng nhất là **tập đúng kỹ thuật và đều đặn**. Lịch dưới đây chỉ cần một tấm thảm, khoảng 30 phút mỗi buổi, 3–4 buổi mỗi tuần, tập trung vào các bài dùng trọng lượng cơ thể để vừa đốt mỡ vừa giữ cơ.

## Khởi động (5 phút)

- Xoay cổ, vai, hông, cổ chân: mỗi khớp khoảng 30 giây
- Đi bộ tại chỗ, đánh tay: 1 phút
- Squat chậm không xuống sâu: 10 lần

## Bài tập chính (khoảng 20 phút)

Làm lần lượt 6 bài dưới đây là 1 vòng. Nghỉ 30–45 giây giữa các bài, 1–2 phút giữa các vòng. Tập **3 vòng**.

1. Squat (ngồi xổm): 12–15 lần, giữ lưng thẳng, gối hướng theo mũi chân
2. Chống đẩy tựa tường hoặc chống gối: 8–12 lần
3. Cầu mông (nằm ngửa, đẩy hông lên): 15 lần
4. Lunge lùi (bước lùi một chân): 10 lần mỗi chân
5. Plank (chống khuỷu tay, giữ thân thẳng): 20–30 giây
6. Leo núi tại chỗ chậm (mountain climber): 20 lần

## Giãn cơ (5 phút)

- Giãn đùi trước, đùi sau, mông: mỗi bên 20–30 giây
- Giãn lưng và vai, hít thở sâu để nhịp tim hạ dần

## Lịch tập trong tuần

- Thứ 2, Thứ 4, Thứ 6 (thêm Thứ 7 nếu khỏe): tập theo lịch trên
- Các ngày còn lại: đi bộ nhanh 20–30 phút hoặc đi bộ 8.000 bước
- Chủ nhật: nghỉ ngơi, ngủ đủ giấc

## Tăng dần độ khó để tiếp tục tăng cơ

Cơ chỉ phát triển khi bài tập khó dần lên theo thời gian. Sau khoảng 2 tuần, khi thấy nhẹ nhàng hơn, hãy chọn 1 trong các cách:

- Tăng lên 4 vòng, hoặc thêm 2–3 lần mỗi bài
- Làm chậm pha hạ xuống (đếm 3 giây khi ngồi xuống squat, khi hạ người chống đẩy)
- Chuyển sang bài khó hơn: chống đẩy chân trên sàn, cầu mông một chân

## Lưu ý an toàn

- Dừng lại nếu thấy đau nhói ở khớp, chóng mặt hoặc tức ngực
- Nếu bạn có bệnh tim mạch, huyết áp, đang mang thai hoặc có chấn thương, hãy hỏi ý kiến bác sĩ trước khi tập
- Tập chậm, đúng tư thế quan trọng hơn tập nhanh và nhiều

## Kết luận

Tập đều giúp cơ thể săn chắc và đốt thêm năng lượng, còn **ăn đúng lượng, đủ đạm** quyết định phần lớn kết quả giảm mỡ. Nếu bạn muốn có giáo án riêng theo thể lực, chấn thương và lịch làm việc của mình, Coach sẽ thiết kế và theo sát bạn mỗi ngày qua Zalo.`,
  },
  {
    slug: "bang-calo-mon-an-viet-quen-thuoc",
    category: "dinh-duong",
    image: "/images/minh-hoa/09.webp",
    publishedAt: "2026-11-04T23:00:00.000Z",
    title: "Bảng Calo Món Ăn Việt Quen Thuộc: Phở, Bún, Cơm Tấm, Bánh Mì, Trà Sữa",
    excerpt: "Một tô phở, một ổ bánh mì hay một ly trà sữa có bao nhiêu calo? Bảng ước tính dưới đây giúp bạn chọn món ăn ngoài thông minh mà vẫn giảm mỡ.",
    content: `Ăn ngoài không có nghĩa là không giảm mỡ được. Quan trọng là bạn biết món nào "nặng" calo để cân đối các bữa còn lại trong ngày. Các con số dưới đây là **mức ước tính cho một suất phổ biến**; thực tế còn tùy quán, khẩu phần và lượng dầu mỡ.

## Món sáng

- Phở bò tái 1 tô vừa: khoảng 400–450 kcal
- Bún bò Huế 1 tô: khoảng 450–550 kcal
- Bánh mì thịt 1 ổ: khoảng 400–500 kcal
- Xôi mặn / xôi xéo 1 gói: khoảng 500–600 kcal
- Bánh cuốn 1 đĩa: khoảng 350–450 kcal

## Món trưa, tối ăn ngoài

- Cơm tấm sườn bì chả 1 đĩa: khoảng 600–750 kcal
- Bún chả 1 suất: khoảng 500–600 kcal
- Cơm rang dưa bò 1 đĩa: khoảng 650–800 kcal
- Cơm văn phòng (cơm + 1 món mặn + rau): khoảng 550–700 kcal

## Thực phẩm hay dùng khi giảm mỡ

- Trứng gà luộc 1 quả: khoảng 70–80 kcal
- Ức gà luộc 100 g: khoảng 165 kcal
- Đậu phụ 100 g: khoảng 75–80 kcal
- Khoai lang luộc 100 g: khoảng 85–90 kcal
- Chuối 1 quả vừa: khoảng 100 kcal

## Đồ uống: nơi calo "ẩn" nhiều nhất

- Trà sữa trân châu size M: khoảng 350–450 kcal
- Cà phê sữa đá 1 ly: khoảng 120–150 kcal
- Bia 1 lon 330 ml: khoảng 140–150 kcal
- Nước ngọt có ga 1 lon: khoảng 130–150 kcal

Một ly trà sữa có thể bằng cả một bữa ăn chính. Nếu thèm, hãy chọn size nhỏ, 30% đường và bỏ trân châu.

## Mẹo chọn món khi ăn ngoài

1. Ưu tiên món luộc, nướng, canh; hạn chế món chiên, xào nhiều dầu
2. Xin thêm rau, bớt cơm hoặc bún còn khoảng 2/3
3. Bớt nước béo, nước sốt và đồ chấm nhiều đường
4. Uống nước lọc, trà không đường thay cho nước ngọt

## Kết luận

Bạn vẫn ăn được món Việt quen thuộc khi giảm mỡ. Chỉ cần biết món nào nhiều calo để **cân đối trong ngày** là đủ. Coach sẽ giúp bạn xây thực đơn từ chính những món bạn hay ăn.`,
  },
  {
    slug: "nguoi-moi-tap-gym-tuan-dau-nen-tap-gi",
    category: "tap-gym",
    image: "/images/bai-viet/nguoi-moi-tap-gym-tuan-dau-nen-tap-gi.jpg",
    publishedAt: "2026-11-10T04:00:00.000Z",
    title: "Người Mới Tập Gym Tuần Đầu Nên Tập Gì? Lịch 3 Buổi Dễ Theo, Không Đau Cơ Quá Mức",
    excerpt: "Tuần đầu vào phòng Gym dễ bị choáng vì quá nhiều máy và bài tập. Lịch 3 buổi toàn thân dưới đây giúp bạn làm quen kỹ thuật, không đau cơ quá mức và đủ sức đi tiếp những tuần sau.",
    content: `Ngày đầu vào phòng Gym, nhiều người hoặc tập quá sức vì hào hứng, hoặc đi lòng vòng không biết bắt đầu từ đâu. Cả hai đều dễ dẫn tới bỏ cuộc sau một tuần. Mục tiêu của **tuần đầu tiên** không phải là đốt thật nhiều mỡ, mà là **làm quen kỹ thuật, làm quen phòng tập và tạo thói quen đi tập đều**.

## Tuần đầu nên tập bao nhiêu buổi?

**3 buổi/tuần, cách ngày** là vừa đủ cho người mới, ví dụ Thứ 2 – Thứ 4 – Thứ 6. Ngày nghỉ giúp cơ hồi phục, nhờ đó buổi sau bạn tập tốt hơn. Mỗi buổi khoảng **45–60 phút**, kể cả khởi động và giãn cơ.

## Vì sao người mới nên tập toàn thân?

Thay vì chia "hôm nay tập ngực, mai tập chân", người mới nên **tập toàn thân trong mỗi buổi**:

- Mỗi nhóm cơ được tập 3 lần/tuần, học kỹ thuật nhanh hơn
- Mỗi buổi tập nhẹ hơn, ít bị đau cơ dữ dội
- Lỡ nghỉ 1 buổi thì cũng không bỏ sót nhóm cơ nào

## Lịch tập mẫu cho mỗi buổi

Khởi động 5–10 phút: đạp xe hoặc đi bộ dốc nhẹ, xoay khớp vai, hông, gối.

1. **Goblet squat** (cầm 1 tạ đơn trước ngực, ngồi xuống): 3 hiệp × 10–12 lần
2. **Đẩy ngực với máy** (chest press): 3 hiệp × 10–12 lần
3. **Kéo cáp ngồi** (seated cable row): 3 hiệp × 10–12 lần
4. **Đạp đùi với máy** (leg press): 3 hiệp × 10–12 lần
5. **Kéo xô** (lat pulldown): 3 hiệp × 10–12 lần
6. **Plank**: 3 lần × 20–30 giây

Nghỉ **60–90 giây** giữa các hiệp. Cuối buổi có thể đi bộ nhanh trên máy 10 phút, rồi giãn cơ 5 phút.

## Chọn mức tạ thế nào cho đúng?

Chọn mức tạ mà bạn làm được đủ số lần với **kỹ thuật chuẩn**, và khi xong hiệp vẫn còn sức làm thêm khoảng **2–3 lần nữa**. Nếu phải giật người, cong lưng hay nín thở mới nâng được, tức là tạ đang quá nặng. Tuần đầu, **nhẹ một chút còn hơn nặng quá**.

## Đau cơ sau buổi đầu có bình thường không?

Cơ hơi ê ẩm 1–2 ngày sau buổi tập đầu là bình thường, nhất là ở đùi và mông. Đi bộ nhẹ, ngủ đủ và uống đủ nước sẽ giúp cơ hồi phục nhanh. Nhưng nếu thấy **đau nhói ở khớp**, sưng hoặc đau kéo dài nhiều ngày, hãy nghỉ tập và hỏi ý kiến bác sĩ.

## 5 lỗi người mới hay mắc

1. Tập quá nhiều bài, quá nhiều hiệp ngay buổi đầu
2. Bỏ khởi động, vào là nâng tạ ngay
3. Chọn tạ theo người bên cạnh thay vì theo sức mình
4. Chỉ chạy bộ mà không tập kháng lực
5. Ăn uống thất thường, nghĩ đi tập rồi thì ăn gì cũng được

## Ăn uống trong tuần đầu

Bạn chưa cần ăn kiêng khắt khe. Chỉ cần **đủ 3 bữa chính, mỗi bữa có một phần đạm** (thịt nạc, cá, trứng, đậu phụ), nhiều rau, và hạn chế nước ngọt, trà sữa. Ăn nhẹ khoảng 1–2 giờ trước buổi tập, ví dụ 1 quả chuối hoặc 1 lát bánh mì, để không bị đói hay choáng.

## Kết luận

Tuần đầu ở phòng Gym chỉ cần **3 buổi, tập toàn thân, tạ vừa sức, kỹ thuật đúng**. Giữ được nhịp này 3–4 tuần, bạn sẽ thấy cơ thể khỏe hơn và sẵn sàng tăng dần độ khó. Nếu muốn có giáo án riêng theo thể trạng và mục tiêu, Coach sẽ lên lịch tập và thực đơn cho bạn, theo sát mỗi ngày qua Zalo.`,
  },
  {
    slug: "thuc-don-com-van-phong-giam-can",
    category: "thuc-don",
    image: "/images/bai-viet/thuc-don-com-van-phong-giam-can.jpg",
    publishedAt: "2026-11-10T04:05:00.000Z",
    title: "Thực Đơn Cơm Văn Phòng Giảm Cân: 5 Hộp Cơm Mang Đi Làm Dễ Nấu, No Lâu",
    excerpt: "Thực đơn cơm văn phòng giảm cân với 5 hộp cơm mẫu từ đồ ăn chợ Việt, mỗi hộp khoảng 450–550 kcal, đủ đạm, nhiều rau, nấu tối hôm trước là sáng mang đi làm.",
    content: `Một **thực đơn cơm văn phòng giảm cân** tốt không cần ức gà luộc nhạt nhẽo mỗi ngày. Chỉ cần hộp cơm có **đúng lượng cơm, đủ đạm và thật nhiều rau**, bạn vẫn ăn ngon, no đến chiều và giảm mỡ đều đặn. Bài này gợi ý cách chia hộp cơm, 5 hộp cơm mẫu cho cả tuần làm việc và mẹo nấu nhanh vào buổi tối.

## Vì sao bữa trưa văn phòng dễ làm tăng cân?

Bữa trưa ở công ty thường là bữa "ăn vội": cơm hàng, cơm hộp đặt qua ứng dụng, hoặc bún, phở gần chỗ làm. Theo ước tính, một suất cơm văn phòng bên ngoài (cơm + 1 món mặn + ít rau) có thể khoảng **550–700 kcal**, nhiều dầu mỡ, nhiều cơm nhưng lại ít rau và ít đạm nạc.

Thêm vào đó là những thói quen rất phổ biến:

- Uống thêm ly trà sữa hoặc cà phê sữa buổi chiều (khoảng 120–450 kcal tùy loại)
- Ăn vặt bánh kẹo ở bàn làm việc khi buồn ngủ
- Ngồi gần như cả ngày, vận động rất ít

Tự mang cơm giúp bạn **kiểm soát lượng dầu, lượng cơm và nguồn đạm**, đồng thời tiết kiệm chi phí.

## Nguyên tắc chia hộp cơm văn phòng giảm cân

Hãy hình dung hộp cơm chia làm 3 phần, gần giống quy tắc "đĩa ăn cân bằng":

1. **Một nửa hộp là rau**: luộc, hấp, xào ít dầu. Rau giúp no lâu mà ít calo.
2. **Một phần tư là đạm**: khoảng 100–150 g thịt nạc, cá, tôm, ức gà, hoặc 2 quả trứng, hoặc 1 bìa đậu phụ to.
3. **Một phần tư là tinh bột**: khoảng 100–150 g cơm (gần 2/3 đến 1 bát cơm vừa), hoặc khoai lang, cơm gạo lứt.

Với cách chia này, một hộp cơm thường rơi vào khoảng **450–550 kcal** (ước tính), phù hợp với nhiều người đang giảm mỡ. Nam giới hoặc người tập nặng có thể tăng phần cơm thêm khoảng nửa bát.

Lượng ăn phù hợp cho riêng bạn còn tùy chiều cao, cân nặng và mức vận động. Bạn có thể tự tính nhanh bằng công cụ Tính Calo trên trang chủ.

## 5 hộp cơm mẫu cho 5 ngày làm việc

Các mức calo dưới đây là **ước tính** cho khẩu phần khoảng 120 g cơm; thực tế còn tùy cách nấu và lượng dầu.

### Thứ 2: Cơm ức gà áp chảo + bông cải luộc

- 120 g cơm trắng
- 150 g ức gà ướp tỏi, tiêu, nước mắm, áp chảo ít dầu
- Bông cải xanh và cà rốt luộc
- Ước tính: khoảng 450–500 kcal

### Thứ 3: Cơm cá basa kho + cải ngọt

- 120 g cơm
- 150 g cá basa kho tộ, giảm đường và bớt nước kho
- Cải ngọt luộc hoặc xào tỏi ít dầu
- Ước tính: khoảng 450–550 kcal

### Thứ 4: Cơm đậu phụ sốt cà chua + trứng luộc

- 120 g cơm
- 1 bìa đậu phụ to sốt cà chua, 1 quả trứng luộc
- Su su, bí xanh luộc
- Ước tính: khoảng 450–500 kcal. Đây là hộp cơm rẻ nhất trong tuần.

### Thứ 5: Cơm thịt bò xào hành tây + dưa chuột

- 120 g cơm
- 100 g thịt bò nạc xào hành tây, ớt chuông ít dầu
- Dưa chuột, cà chua thái lát
- Ước tính: khoảng 500–550 kcal

### Thứ 6: Cơm gạo lứt + thịt lợn nạc rim + rau muống

- 120 g cơm gạo lứt (hoặc trộn nửa gạo trắng nửa gạo lứt)
- 120 g thịt lợn nạc thăn rim, bớt đường
- Rau muống luộc
- Ước tính: khoảng 500–550 kcal

Nếu buổi chiều hay đói, hãy mang thêm **1 hũ sữa chua không đường** hoặc **1 quả chuối** thay cho bánh kẹo.

## Mẹo nấu nhanh và bảo quản cơm hộp an toàn

- **Nấu tối hôm trước**: nấu bữa tối nhiều hơn một chút, chia ngay 1 phần vào hộp trước khi ăn.
- **Sơ chế cuối tuần**: mua ức gà, thịt nạc theo cân, chia túi nhỏ để ngăn đá; tối hôm trước chuyển xuống ngăn mát cho rã đông.
- **Để nguội rồi đậy nắp**, cho vào tủ lạnh ngay, sáng mang đi làm và cất tủ lạnh ở công ty nếu có.
- **Hâm nóng kỹ** trước khi ăn. Rau xanh luộc nên để ngăn riêng hoặc ăn trong ngày để không bị úa, đổi màu.
- Dùng hộp thủy tinh hoặc hộp nhựa ghi rõ dùng được với lò vi sóng.

## Ăn cơm văn phòng có giảm cân được không? Câu hỏi thường gặp

**Không có thời gian nấu thì có giảm cân được không?** Được. Khi đặt cơm bên ngoài, hãy chọn món luộc, hấp, nướng, xin thêm rau, bớt cơm còn khoảng 2/3 và hạn chế nước sốt, da gà, mỡ.

**Có nên bỏ cơm để giảm cân nhanh hơn?** Không nên. Bỏ hẳn tinh bột dễ làm bạn mệt, khó tập trung khi làm việc và dễ ăn bù vào buổi tối. Giảm lượng cơm hợp lý thường hiệu quả và bền hơn.

**Ăn trưa xong có nên nằm ngủ ngay?** Nên đi lại nhẹ vài phút rồi mới nghỉ trưa. Ngủ trưa ngắn khoảng 15–30 phút giúp buổi chiều tỉnh táo hơn.

**Mỗi tuần nên giảm bao nhiêu cân?** Mức tham khảo an toàn với nhiều người là khoảng **0,5–1 kg mỗi tuần**. Giảm quá nhanh dễ mất cơ và dễ tăng lại.

## Lưu ý khi áp dụng thực đơn

- Đây là thực đơn mẫu cho người trưởng thành khỏe mạnh. Nếu bạn có bệnh dạ dày, tiểu đường, bệnh thận, đang mang thai hoặc cho con bú, hãy hỏi ý kiến bác sĩ trước khi thay đổi chế độ ăn.
- Hộp cơm trưa chỉ là một phần. Bữa sáng và bữa tối cũng cần đủ đạm, nhiều rau và không ăn quá no trước khi ngủ.
- Để giữ cơ khi giảm mỡ, hãy kết hợp **tập kháng lực 3–4 buổi/tuần**, tại nhà hoặc phòng Gym, và đi bộ nhiều hơn trong ngày (đi cầu thang, đứng dậy vận động mỗi giờ).

## Kết luận

Một thực đơn cơm văn phòng giảm cân hiệu quả chỉ cần **nửa hộp rau, một phần tư đạm, một phần tư cơm**, nấu ít dầu và chuẩn bị từ tối hôm trước. Duy trì đều đặn vài tuần, bạn sẽ thấy cơ thể nhẹ nhõm hơn mà không phải nhịn đói. Nếu muốn có thực đơn và giáo án tính riêng theo chỉ số cơ thể, lịch làm việc và món bạn thích, Coach sẽ lên kế hoạch cho bạn và theo sát mỗi ngày qua Zalo.`,
  },
].map((p, i) => ({
  id: `seed-${i + 1}`,
  seed: true,
  status: "published",
  pinned: false,
  slug: p.slug,
  category: p.category,
  image: p.image,
  i18n: { vi: { title: p.title, excerpt: p.excerpt, content: p.content } },
  createdAt: p.publishedAt,
  updatedAt: p.publishedAt,
  publishedAt: p.publishedAt,
}));
