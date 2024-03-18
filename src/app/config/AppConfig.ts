
export const AppConfig = {
  HostUrl: 'https://trumbien-main.herokuapp.com/',
  DevHostUrl: 'https://product-sell.onrender.com/',//'http://localhost:5000/',
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
  CatetoryDrop: [
    //   {
    //   value: 'crab',
    //   title: 'Cua',
    //   pageTitle: 'Trùm Biển - Hải Sản Cao Cấp, Cua, Cua Biển, Cua Cà Mau, Cua Hoàng Đế, Cua Lông Thượng Hải, Giá Cua Bao Nhiêu'
    // },
    // {
    //   value: 'shrimp',
    //   title: 'Tôm',
    //   pageTitle: 'Trùm Biển - Hải Sản Cao Cấp, Tôm, Tôm Sú, Tôm Càng Xanh, Tôm Hùm, Giá Tôm Sú, Giá Tôm Hùm'
    // },
    // {
    //   value: 'squid',
    //   title: 'Mực',
    //   pageTitle: 'Trùm Biển - Hải Sản Cao Cấp, Mực, Mực Ống, Mực Nang, Giá Mực, Giá Mực Ống, Giá Mực Nang'
    // },
    {
      value: 'holothurian',
      title: 'Hải Sâm',
      pageTitle: 'Trùm Biển - Hải Sản Cao Cấp, Hải Sâm, Hải Sâm Môi Son, Giá Hải Sâm'
    },
    {
      value: 'haliotis',
      title: 'Bào Ngư',
      pageTitle: 'Trùm Biển - Hải Sản Cao Cấp, Bào Ngư, Giá Bào Ngư'
    },
    {
      value: 'oyster',
      title: 'Hàu',
      pageTitle: 'Trùm Biển - Hải Sản Cao Cấp, Hàu, Hàu Nhật, Hàu Nhật Hyogo, Giá Hàu Nhật'
    },
    {
      value: 'fish',
      title: 'Cá',
      pageTitle: 'Trùm Biển - Hải Sản Cao Cấp, Cá Mú, Cá Mú Đỏ, Cá Thu, Cá Thu Bao Nhiêu, Cá Mú Đỏ Bao Nhiêu'
    },
    {
      value: 'snail',
      title: 'Ốc',
      pageTitle: 'Trùm Biển - Hải Sản Cao Cấp, Ốc, Ốc Bulot Pháp, Giá Ốc Bulot Pháp'
    }]
}
