
export const AppConfig = {
  HostUrl: 'https://web-production-865f.up.railway.app/',
  DevHostUrl: 'http://localhost:5001/',
  FilterDrop: [{
    value: 'default',
    title: 'Nổi Bật'
  },
  {
    value: 'price_asc',
    title: 'Giá: Tăng Dần'
  },
  {
    value: 'price_desc',
    title: 'Giá: Giảm Dần'
  },
  {
    value: 'name_asc',
    title: 'Tên: A-Z'
  },
  {
    value: 'name_desc',
    title: 'Tên: Z-A'
  },
  {
    value: 'create_desc',
    title: 'Cũ Nhất'
  },
  {
    value: 'create_asc',
    title: 'Mới Nhất'
  },
  {
    value: 'sold_num',
    title: 'Bán Chạy Nhất'
  }],
  CatetoryDrop: [{
    value: 'crab',
    title: 'Cua'
  },
  {
    value: 'shrimp',
    title: 'Tôm'
  },
  {
    value: 'squid',
    title: 'Mực'
  },
  {
    value: 'holothurian',
    title: 'Hải Sâm'
  },
  {
    value: 'haliotis',
    title: 'Bào Ngư'
  },
  {
    value: 'oyster',
    title: 'Hàu'
  },
  {
    value: 'fish',
    title: 'Cá'
  },
  {
    value: 'snail',
    title: 'Ốc'
  }],
  return_product_detail: `

  <p class="paragraph">
  <span class="main-hightline">Kính thưa Quý Khách hàng,</span><br>
  <span class="main-hightline">{{storeName}}</span> luôn mong muốn cung cấp các sản phẩm với chất lượng cao nhất cho
  khách hàng. Tuy nhiên vì một số lí do, vận chuyển, đóng gói hoặc kiểm kê nên đôi lúc sẽ có sự không đồng nhất
  về chất lượng.<br>
  <span class="main-hightline">Chúng tôi CAM KẾT luôn sử lý hài hòa tất cả mọi giao dịch đối với khách hàng.</span>
  <br>
  Các trường hợp khiếu nại và phương án giải quyết khiếu nại cho khách hàng như sau:
</p>

<ol class="margin-level next-separate">
  <li class="title small-gap-line">
    Điều kiện bảo hành và phạm vi bảo hành:
    <br>
    <p class="paragraph inline-p">Việc bảo hành chỉ được cung cấp bởi các kỹ thuật viên của CÔNG TY TNHH NĂNG LƯỢNG XANH INSOLAR VIỆT NAM (INSOLAR VN) hoặc các địa chỉ bảo hành ủy quyền khi đáp ứng đủ các điều kiện sau:</p>

    <ol class="margin-level next-separate">
      <li class="title small-gap-line">
        <p class="paragraph inline-p">Bảo hành được áp dụng cho các thiết bị được nhập khẩu bởi INSOLAR VN và phân phối thông qua các cửa hàng bán lẻ liên kết với công ty.</p>
      </li>
      <li class="title small-gap-line">
        <p class="paragraph inline-p">Bảo hành áp dụng cho các sản phẩm, hàng hóa bị lỗi do Nhà sản xuất hoặc lỗi của INSOLAR VN.</p>
      </li>
      <li class="title small-gap-line">
        <p class="paragraph inline-p">Khách hàng yêu cầu bảo hành phải xuất trình hợp đồng mua bán hoặc phiếu bảo hành hoặc hóa đơn mua hàng ( có chứa số series của sản phẩm ) khi có yêu cầu bảo hành.</p>
      </li>
      <li class="title small-gap-line">
        <p class="paragraph inline-p">Sản phẩm yêu cầu bảo hành được sử dụng trong điều kiện thông thường. Không được sử dụng trong điều kiện đặc biệt như phòng lạnh hoặc nơi có nhiệt độ cao quá >50 độ C.</p>
      </li>
      <li class="title small-gap-line">
        <p class="paragraph inline-p">Sản phẩm yêu cầu bảo hành phải còn thời hạn bảo hành và không thuộc trường hợp ngoài phạm vi bảo hành.</p>
      </li>
    </ol>
  </li>
</ol>

  `,
  stickyNotify: 'Freeship Đơn Hàng Trên 1 triệu nội thành HCM.',
  email: 'kinhdoanh.kithuat@gmail.com',
  facebook: 'https://www.facebook.com/SaleinSolar/',
  logo: 'https://live.staticflickr.com/65535/54239372518_a70a2cbc2a_o_d.png',
  header_slogan: 'https://live.staticflickr.com/65535/54239133681_d34de1f264_o_d.png'
}
