// Mock product data for NAM (Men's) category
export const mockProductsNam = [
  {
    id: 1,
    name: "ÁO NỈ CỔ KHÓA KÉO CƠ BẢN",
    price: "1.399.000 VND",
    image: "/src/assets/images/products/man/1.png",
    category: "nam",
    colors: [
      { name: "Đen", hex: "#000000" },
      { name: "Xanh dương đậm", hex: "#060A12" },
      { name: "Vàng rơm", hex: "#DAC19A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/man/16.png",
      "/src/assets/images/products/man/17.png",
      "/src/assets/images/products/man/18.png",
      "/src/assets/images/products/man/1.png",
    ],
    description: "Áo nỉ dáng suông. Cổ cao cài khóa kéo phía trước. Dài tay. Bo viền bằng vải gân.",
    material: "+ LỚP NGOÀI: 80% vải cotton, 20% vải pôliexte\n+ CHI TIẾT: 97% vải cotton, 3% elastane",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
    sizeChart: {
      S: { chest: '90-94', shoulder: '44', length: '68' },
      M: { chest: '94-98', shoulder: '45', length: '69' },
      L: { chest: '98-102', shoulder: '46', length: '70' },
      XL: { chest: '102-106', shoulder: '47', length: '71' },
    },
  },
  {
    id: 2,
    name: "ÁO KHOÁC VẢI DỆT",
    price: "2.599.000 VND",
    image: "/src/assets/images/products/man/2.png",
  },
  {
    id: 3,
    name: "ÁO KHOÁC VẠT ĐẮP CHÉO",
    price: "3.999.000 VND",
    image: "/src/assets/images/products/man/3.png",
  },
  {
    id: 4,
    name: "ÁO KHOÁC REGULAR FIT",
    price: "3.199.000 VND",
    image: "/src/assets/images/products/man/12.png",
  },
  {
    id: 5,
    name: "ÁO PHÔNG DỆT KIM",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/man/11.png",
  },
  {
    id: 6,
    name: "ÁO PHÔNG IN HỌA TIẾT",
    price: "899.000 VND",
    image: "/src/assets/images/products/man/4.png",
  },
  {
    id: 7,
    name: "ÁO PHÔNG KIỂU BẠC MÀU",
    price: "899.000 VND",
    image: "/src/assets/images/products/man/5.png",
  },
  {
    id: 8,
    name: "ÁO HỌA TIẾT PHUN SƠN",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/man/6.png",
  },
  {
    id: 9,
    name: "QUẦN JOGGER RELAXED FIT",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/man/7.png",
  },
  {
    id: 10,
    name: "QUẦN JEANS STRAIGHT FIT",
    price: "1.399.000 VND",
    image: "/src/assets/images/products/man/8.png",
  },
  {
    id: 11,
    name: "QUẦN JEANS FLARE FIT",
    price: "1.899.000 VND",
    image: "/src/assets/images/products/man/9.png",
  },
  {
    id: 12,
    name: "QUẦN ỐNG SUÔNG XẾP LI",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/man/10.png",
  },
];

// Mock product data for NỮ (Women's) category
export const mockProductsNu = [
  // Hàng 1: Áo khoác
  {
    id: 1,
    name: "ÁO KHOÁC PHA LEN",
    price: "1.179.000 VND",
    image: "/src/assets/images/products/woman/1.png",
    category: "nu",
    colors: [
      { name: "Be", hex: "#D4C5B9" },
      { name: "Đen", hex: "#000000" },
      { name: "Xám", hex: "#808080" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/17.png",
      "/src/assets/images/products/woman/18.png",
      "/src/assets/images/products/woman/19.png",
      "/src/assets/images/products/woman/1.png",
    ],
    description: "Áo khoác dáng ngắn, cổ ve lật, dài tay có đai cài. Túi may viền phía trước. Cài phía trước bằng khuy.",
    material: "+ LỚP NGOÀI: 70% vải pôliexte, 30% len\n+ LÓT: 100% vải pôliexte",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  {
    id: 2,
    name: "ÁO KHOÁC LÔNG NHÂN TẠO",
    price: "2.599.000 VND",
    image: "/src/assets/images/products/woman/2.png",
    category: "nu",
    colors: [
      { name: "Trắng kem", hex: "#F5F5DC" },
      { name: "Nâu", hex: "#8B4513" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/2.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Áo khoác lông nhân tạo dáng suông. Cổ tròn. Tay dài. Túi hai bên. Cài khóa kéo phía trước.",
    material: "+ LỚP NGOÀI: 100% vải pôliexte\n+ LÓT: 100% vải pôliexte",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  {
    id: 3,
    name: "ÁO KHOÁC DÁNG DÀI PHA LEN",
    price: "4.799.000 VND",
    image: "/src/assets/images/products/woman/3.png",
    category: "nu",
    colors: [
      { name: "Xám đậm", hex: "#696969" },
      { name: "Đen", hex: "#000000" },
      { name: "Camel", hex: "#C19A6B" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/3.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Áo khoác dáng dài. Cổ ve. Tay dài có nẹp cài cúc. Túi hai bên. Cài cúc phía trước.",
    material: "+ LỚP NGOÀI: 60% len, 40% vải pôliexte\n+ LÓT: 100% vải pôliexte",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  {
    id: 4,
    name: "ÁO KHOÁC NGẮN HAI CÚC",
    price: "1.899.000 VND",
    image: "/src/assets/images/products/woman/4.png",
    category: "nu",
    colors: [
      { name: "Đen", hex: "#000000" },
      { name: "Trắng", hex: "#FFFFFF" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/4.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Áo khoác dáng ngắn. Cổ ve. Tay dài. Túi hai bên. Cài hai cúc phía trước.",
    material: "+ LỚP NGOÀI: 100% vải pôliexte\n+ LÓT: 100% vải pôliexte",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  // Hàng 2: Áo phông
  {
    id: 5,
    name: "ÁO PHÔNG THE MUPPETS",
    price: "799.000 VND",
    image: "/src/assets/images/products/woman/5.png",
    category: "nu",
    colors: [
      { name: "Trắng", hex: "#FFFFFF" },
      { name: "Đen", hex: "#000000" },
      { name: "Xám", hex: "#808080" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/5.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Áo phông dáng suông. Cổ tròn. Tay ngắn. In hình The Muppets phía trước.",
    material: "+ LỚP NGOÀI: 100% vải cotton",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  {
    id: 6,
    name: "ÁO PHÔNG KUNST TAY NGẮN",
    price: "799.000 VND",
    image: "/src/assets/images/products/woman/6.png",
    category: "nu",
    colors: [
      { name: "Trắng", hex: "#FFFFFF" },
      { name: "Đen", hex: "#000000" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/6.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Áo phông dáng suông. Cổ tròn. Tay ngắn. In chữ KUNST phía trước.",
    material: "+ LỚP NGOÀI: 100% vải cotton",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  {
    id: 7,
    name: "ÁO PHÔNG VIỀN VẢI BO",
    price: "649.000 VND",
    image: "/src/assets/images/products/woman/7.png",
    category: "nu",
    colors: [
      { name: "Trắng", hex: "#FFFFFF" },
      { name: "Đen", hex: "#000000" },
      { name: "Xanh navy", hex: "#000080" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/7.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Áo phông dáng suông. Cổ tròn viền vải bo. Tay ngắn.",
    material: "+ LỚP NGOÀI: 100% vải cotton\n+ CHI TIẾT: 95% vải cotton, 5% elastane",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  {
    id: 8,
    name: "ÁO PHÔNG CỔ TRÒN XẺ",
    price: "649.000 VND",
    image: "/src/assets/images/products/woman/8.png",
    category: "nu",
    colors: [
      { name: "Trắng", hex: "#FFFFFF" },
      { name: "Đen", hex: "#000000" },
      { name: "Hồng pastel", hex: "#FFB6C1" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/8.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Áo phông dáng suông. Cổ tròn. Tay ngắn. Xẻ hai bên.",
    material: "+ LỚP NGOÀI: 100% vải cotton",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },

  // Hàng 3: Quần
  {
    id: 10,
    name: "QUẦN BALLOON (Z W COLLEC.)",
    price: "1.499.000 VND",
    image: "/src/assets/images/products/woman/10.png",
    category: "nu",
    colors: [
      { name: "Đen", hex: "#000000" },
      { name: "Be", hex: "#D4C5B9" },
      { name: "Xanh navy", hex: "#000080" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/10.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Quần dáng balloon. Cạp cao có dây rút. Túi hai bên. Ống rộng.",
    material: "+ LỚP NGOÀI: 100% vải pôliexte",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  {
    id: 11,
    name: "QUẦN NẾT LY ỐNG RỘNG",
    price: "1.099.000 VND",
    image: "/src/assets/images/products/woman/11.png",
    category: "nu",
    colors: [
      { name: "Đen", hex: "#000000" },
      { name: "Xám", hex: "#808080" },
      { name: "Be", hex: "#D4C5B9" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/11.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Quần ống rộng. Cạp cao. Nếp ly phía trước. Túi hai bên.",
    material: "+ LỚP NGOÀI: 100% vải pôliexte",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  {
    id: 12,
    name: "QUẦN VẢI DỆT THOI JQ",
    price: "1.179.000 VND",
    image: "/src/assets/images/products/woman/12.png",
    category: "nu",
    colors: [
      { name: "Đen", hex: "#000000" },
      { name: "Trắng", hex: "#FFFFFF" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/12.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Quần vải dệt thoi jacquard. Cạp cao. Túi hai bên. Ống suông.",
    material: "+ LỚP NGOÀI: 100% vải pôliexte",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
  {
    id: 13,
    name: "QUẦN ỐNG SUÔNG CẠP CAO",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/woman/13.png",
    category: "nu",
    colors: [
      { name: "Đen", hex: "#000000" },
      { name: "Xám", hex: "#808080" },
      { name: "Xanh navy", hex: "#000080" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/src/assets/images/products/woman/13.png",
      "/src/assets/images/products/woman/14.png",
      "/src/assets/images/products/woman/15.png",
      "/src/assets/images/products/woman/16.png",
    ],
    description: "Quần ống suông. Cạp cao. Túi hai bên. Khóa kéo và cúc phía trước.",
    material: "+ LỚP NGOÀI: 100% vải pôliexte",
    careInstructions: "Giặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC\nKhông giặt khô\nKhông sử dụng máy sấy",
  },
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  if (category === "nam") {
    return mockProductsNam;
  } else if (category === "nu") {
    return mockProductsNu;
  }
  return [];
};

// Helper function to get a single product by category and id
export const getProductById = (category, id) => {
  const products = getProductsByCategory(category);
  return products.find((p) => p.id === parseInt(id));
};

export const newCollectionNam = [
  {
    id: 1,
    image: "/src/assets/images/products/man/13.png",
    name: "ÁO NỈ CỔ KHÓA KÉO CƠ BẢN",
  },
  {
    id: 2,
    image: "/src/assets/images/products/man/14.png",
    name: "ÁO KHOÁC VẢI DỆT",
  },
  {
    id: 3,
    image: "/src/assets/images/products/man/15.png",
    name: "Item 3",
  },
];
export const newCollectionNu = [
  {
    id: 1,
    image: "/src/assets/images/products/woman/14.png",
    name: "Item 1",
  },
  {
    id: 2,
    image: "/src/assets/images/products/woman/15.png",
    name: "Item 2",
  },
  {
    id: 3,
    image: "/src/assets/images/products/woman/16.png",
    name: "Item 3",
  },
];
export const getNewCollectionByCategory = (category) => {
  if (category === "nam") {
    return newCollectionNam;
  } else if (category === "nu") {
    return newCollectionNu;
  }
  return [];
};