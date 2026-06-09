import cherryBlossomImg from "../assets/a_delicate_cherry_blossom_arrangement_in_a_soft_pink_vase_ethereal_spring.png";
import cherryBlossomImg_1 from "../assets/cherryBlossomImg_1.png";
import cherryBlossomImg_2 from "../assets/cherryBlossomImg_2.png";
import cherryBlossomImg_3 from "../assets/cherryBlossomImg_3.png";
import sunflowerImg from "../assets/a_bundle_of_fresh_yellow_sunflowers_tied_with_a_rustic_twine_bright_and_cheery.png";
import monsteraImg from "../assets/a_lush_green_monstera_plant_in_a_ceramic_pastel_yellow_pot_soft_natural_light.png";
import tulipDaisyImg from "../assets/a_vibrant_spring_bouquet_of_tulips_and_daisies_in_a_simple_glass_vase_soft.png";
import tulipDaisyImg_1 from "../assets/tulipDaisyImg_1.png";
import tulipDaisyImg_2 from "../assets/tulipDaisyImg_2.png";



export interface CareStep {
  title: string;
  engTitle?: string;
  description: string;
  icon: string; // lucide icon name
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface QnaItem {
  id: string;
  author: string;
  question: string;
  answer: string | null;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  engName?: string;
  price: number;
  tags: string[];
  description: string;
  longDescription?: string;
  mainImage: string;
  thumbnails: string[];
  careGuide: CareStep[];
  rating: number;
  reviewsCount: number;
  category: "spring" | "plants" | "gifts";
  categoryLabel: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "cherry-blossom",
    name: "벚꽃 꽃병 세트",
    engName: "Spring Bouquets > 벚꽃 꽃병 세트",
    price: 42000,
    tags: ["Best Seller", "Spring Seasonal"],
    description: "화사한 봄의 기운을 담은 벚꽃 꽃병 세트입니다. 은은한 핑크빛 꽃잎이 공간에 화사함을 더해줍니다. 특별한 날 선물용으로 인기가 많습니다.",
    longDescription: "화사한 봄의 기운을 담은 벚꽃 꽃병 세트입니다. 은은한 핑크빛 꽃잎이 공간에 화사함을 더해줍니다. 특별한 날 선물용으로 인기가 많습니다. 전문 플로리스트가 당일 수급된 최상의 꽃들로 정성껏 구성합니다. 꽃병이 포함되어 있어 화사하게 바로 장식할 수 있는 실용미 넘치는 세트 상품입니다.",
    mainImage: cherryBlossomImg,
    thumbnails: [
      cherryBlossomImg,
      cherryBlossomImg_1,
      cherryBlossomImg_2,
      cherryBlossomImg_3
    ],
    careGuide: [
      {
        title: "매일 물 갈아주기",
        engTitle: "Watering",
        description: "화병의 물은 매일 시원한 물로 교체해주세요.",
        icon: "Droplet"
      },
      {
        title: "줄기 사선 자르기",
        engTitle: "Stem Cutting",
        description: "줄기 끝을 사선으로 1cm 정도 잘라주면 수분 흡수가 더 원활해집니다.",
        icon: "Scissors"
      },
      {
        title: "직사광선 피하기",
        engTitle: "No Direct Light",
        description: "직사광선이 닿지 않는 서늘한 곳에 보관해 주세요.",
        icon: "SunOff"
      }
    ],
    rating: 4.8,
    reviewsCount: 124,
    category: "spring",
    categoryLabel: "Spring Bouquets"
  },
  {
    id: "sunflower",
    name: "선샤인 해바라기 다발",
    engName: "Spring Bouquets > 해바라기 다발",
    price: 25000,
    tags: ["Best Seller", "Season's Best"],
    description: "밝고 활기찬 에너지를 주는 해바라기 다발입니다. 응원과 축하의 의미를 담아 선물하기 좋습니다.",
    longDescription: "밝고 활기찬 에너지를 주는 해바라기 다발입니다. 응원과 축하의 의미를 담아 선물하기 좋습니다. 전문가가 엄선한 신선한 해바라기만을 사용하여 품격 있는 테이블 연출이나 생일, 입학식 등 특별한 순간을 더욱 빛나게 해줍니다.",
    mainImage: sunflowerImg,
    thumbnails: [
      sunflowerImg,
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaxIv1Y2zst-B2VPp7Ehlhj4A6Ff9xrxPMU2fw1Y-2qd-7D2bTaTVvDGo9CYHyX8Y-lnRj6PXrz462ns4vx3KIIJZ4Ha6RAENn_n7FKE4pTUUVI9irnqyZffGLttKwIp7_LRW3i9YsTL2Y_Sf6NGCIQfSh6Z4-YoJakRIBtdSOeHTvnGSjjgZ4UwIZbZeKreKKuX5KMks4Hlf5F_4s0oimlMltMgRk-KEmZekt0qITIuAFEr34D-dvv0ilohtbbNVLhwMtzy7BPg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ9d_he2Y4vFcN_k7AJK0UtqCySdETUUwynR5P_ZxtxPkoWjBkovPvlAoJazfu8VnFOQj6ZSS4s2wI4b-F7utttHvcu0lVhSlZtGaRfqkiVCPi2Z7nZWvL8YiNky9SJsaL7AjymTR3VCm-IqucWBJ7ZOC-OjWHxu9A30bNyBRbrBP3xSFce-Kc6ojU0iqfAgfVrzLF7und1qB9qaf_n3yKYa6sj8tBUZ00Tt52Hu9DmRo4WOZaPhYxm-qFSZXze6A1aFmS5dT5Ag",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Mb9TmlM1_GH55M9-lwQQxpZ4zCbYpDC6l1FYJpchkw0jO52-5m3Oj2Ukyo9WTlvlz_53Uv4-DXqTt3weiTEnOcuzji3yGQXZeYx0nSgFcJxzTwJehDqktpH-MAHSwgiPtebgV-3bZyand1u4FFFcr3VuVC3vPowFNJ9XG9J1fD4C5BDTJEzXxfRFhUfGEu-Kr4hQlDldssfHk1z6xWAXl7NcaU-gmS4fgvMpuO7RqiVwdpaCMD4Bx2URR_Nj_zq-6jqTNwjhcQ"
    ],
    careGuide: [
      {
        title: "신선한 물 공급",
        engTitle: "Watering",
        description: "매일 깨끗한 물로 갈아주시고 줄기 끝을 사선으로 잘라주세요.",
        icon: "Droplet"
      },
      {
        title: "직사광선 피하기",
        engTitle: "Sunshine",
        description: "직사광선을 피하고 서늘한 곳에 보관하시면 더 오래 감상하실 수 있습니다.",
        icon: "SunOff"
      },
      {
        title: "실내 온도 관리",
        engTitle: "Temperature",
        description: "15-20도 사이의 적정 온도를 유지해 주는 것이 좋습니다.",
        icon: "Thermometer"
      }
    ],
    rating: 4.7,
    reviewsCount: 108,
    category: "spring",
    categoryLabel: "Spring Bouquets"
  },
  {
    id: "monstera",
    name: "몬스테라 화분",
    engName: "House Plants > 몬스테라 화분",
    price: 42000,
    tags: ["Best Seller", "Air Purifying"],
    description: "싱그러운 초록빛 잎이 매력적인 몬스테라입니다. 관리가 쉬워 초보자에게도 추천합니다.",
    longDescription: "싱그러운 초록빛 잎이 매력적인 몬스테라입니다. 관리가 쉬워 초보자에게도 추천하며, 어떤 인테리어에도 잘 어울리는 반려식물입니다. 넓은 잎은 공기 정화 능력도 탁월하여 실내 공간에 생기를 불어넣어 줍니다. 화담 및 배수 디자인이 가미된 화분 패키지 세트입니다.",
    mainImage: monsteraImg,
    thumbnails: [
      monsteraImg,
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7kkSP5nDhhNYqbrSllOmcP_OfSThzZjq9CJ64N0ilRbOWMAfJQHQuIdR09gvZeaIg5byDDddIjZFUblokStIPREQFddSkZoHUJonbkGI0mkzGxENl_LZ3JmGoQW8OvldXwcz09wwFRbHIvhFdtKLi82REdK6YieB2jabsjB5wRL6W-GzFllKjHe54OwxKMyx1UzwP3m_nJhobqug3Y9I-uSIc_GQrnb6lzj8OVwPH6KmX_UZNTvYPZvyKPxfp2NaDBizHHQ5hZA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAleNK8ClhX4XbseOOwrAiVNkzSCua96qQi1m-Brynmzy5fpg-nMnXF8mCpEuQJfMJNCFdhmV1bZyF-SLTZIK2fDbva1dT80G3j460POwBhpi3CFntAs_eGEGbBQ5ZN1y1AtGS8Mbhb7q1SOLzjfdhsSlF6ltBsq3IhGCsNF10OnUrSyKpCBRtz03lPaE-x8UzLDZZyI9JyHoyZT3AVmFR2C_4OgbOAVdd9i9uYp57uHEy-3eYvVuB2Bc_iLNyMr3hhaA9ddezi4A",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB--UXCPUDnsaiCkHoq_21HNzxuOj-xaqLKmRD_7UuYLNvZJfheZ4cbK4tDlqeVuKYPAQNjWaH0AoQ4lT4upm7LVFuPP0GSZoH8yoP7v-oS74lJoc8GcwNILB5tW7xhBXw5O3dFp3GLWd1dIlre5B77PXTJapkI6XXYfNV_geUyua3ZGMa19_Gjrz6oOROg2BcMcF47mxsSQWhbGTyscH_63YkyPI1gqDCaPziSlH6jgAGrwcSKO_O6cKEjwFgFpPGas625Pm3uiA"
    ],
    careGuide: [
      {
        title: "햇빛 (Light)",
        description: "반양지 혹은 반음지를 좋아합니다. 강한 직사광선은 피해 주세요.",
        icon: "Sun"
      },
      {
        title: "물주기 (Water)",
        description: "겉흙이 말랐을 때 아래까지 촉촉해지도록 물을 조절해 듬뿍 줍니다 (보통 주 1회).",
        icon: "Droplet"
      },
      {
        title: "적정 온도 (Temp)",
        description: "18-25℃ 사이의 실내 기온을 가장 선호합니다. 겨울철에는 실내 안쪽으로 옮겨주세요.",
        icon: "Thermometer"
      },
      {
        title: "적절한 환기 (Vent)",
        description: "바람이 살며시 잘 통하는 곳에 비치해 숨을 잘 쉴 수 있게 해주세요.",
        icon: "Wind"
      }
    ],
    rating: 4.9,
    reviewsCount: 145,
    category: "plants",
    categoryLabel: "House Plants"
  },
  {
    id: "tulip-daisy",
    name: "봄날의 튤립 & 데이지 부케",
    engName: "Spring Bouquets > 봄날의 튤립 & 데이지 부케",
    price: 35000,
    tags: ["New Arrival", "Seasonal Exclusive"],
    description: "계절의 화사함을 가득 담은 봄날의 선물입니다. 신선한 튤립과 아기자기한 데이지가 완벽하게 조화를 이룹니다.",
    longDescription: "계절의 화사함을 가득 담은 봄날의 선물입니다. 신선한 튤립과 아기자기한 데이지가 조화롭게 어우러져 어떤 공간이든 밝게 빛내줍니다. 전문 플로리스트가 당일 수급된 최상의 꽃들로 정성껏 구성합니다. 화병에 꽂았을 때 튤립 고유의 우아함에 데이지가 싱그러움을 배가시킵니다.",
    mainImage: tulipDaisyImg,
    thumbnails: [
      tulipDaisyImg,
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB18fCIxkk_V635hHaH_PkBL-qQddf8DJb6Jw8rGT5D25X5F-2dwpUugXNlp7zU56PPNMU0kw0lqjrH-rvtTCy2gV3HNdisXXitoK0vb9gRRh896yQfVh93R1aVHlmsmbKMrI11C3WSgzaKMpm04FjUiJ5pm6O3RZ5dLvjgtctja43zCN-N8ie7Ay7i4sL2Ro-KV3FPz4SfOgksXc7oDqxRawi8J5kGIX5E9kPlQ9jzVB7F__eSu-cAGV8UQAu5GGca5zpD6QDybw",
      tulipDaisyImg_1,
      tulipDaisyImg_2
    ],
    careGuide: [
      {
        title: "시원하고 맑은 물 제공",
        description: "화병의 물은 매일 시원한 물로 교체해주어 박테리아 증식을 최소화합니다.",
        icon: "Droplet"
      },
      {
        title: "줄기 단면 사선 자르기",
        description: "줄기 끝을 사선으로 1cm 정도 정기적으로 다듬어 물 올림 효율을 올려 줍니다.",
        icon: "Scissors"
      },
      {
        title: "서늘한 그늘 비치",
        description: "직사광선과 따뜻한 바람을 피하고 서늘한 곳에 비치하면 튤립이 봉오리를 오래 유지합니다.",
        icon: "SunOff"
      }
    ],
    rating: 4.8,
    reviewsCount: 96,
    category: "gifts",
    categoryLabel: "Gifts / Exclusives"
  }
];

export const MOCK_REVIEWS: Review[] = [
  { id: "r1", author: "김민아", rating: 5, date: "2026-05-24", comment: "꽃이 너무 포동포동 건강하고 벚꽃 가지가 정말 화사하네요! 포장도 완벽했어요." },
  { id: "r2", author: "이성진", rating: 5, date: "2026-05-20", comment: "선물받으신 분이 역대급으로 아름답다고 좋아하셨습니다. 매일 설명대로 물 갈아주고 있어요." },
  { id: "r3", author: "최유정", rating: 4, date: "2026-05-18", comment: "튤립이랑 데이지 색상 조화가 미쳤어요ㅎㅎ 봄 분위기 내기에 진짜 최적입니다!" },
  { id: "r4", author: "박태형", rating: 5, date: "2026-05-15", comment: "몬스테라 새 잎이 잘 자라나옵니다! 대형 식물에 초보인데 플로럴 케어 안내서가 아주 편하네요." }
];

export const MOCK_QNAS: QnaItem[] = [
  { id: "q1", author: "한수현", question: "벚꽃 세트 화병도 포함된 금액인가요? 화병 재질은 어떤가요?", answer: "네, 나래의 벚꽃 꽃병 세트에는 사진 속 고급 인디핑크 세라믹 화병이 기본으로 동봉되어 한 패키지로 발송됩니다.", date: "2026-05-28" },
  { id: "q2", author: "정다은", question: "오전 일찍 배송받고 싶은데 지정이 가능한가요?", answer: "서울/경기 지역의 경우 오전 시간대 퀵 연계 지정 배송이 조율 가능하오니 결제 후 고객센터(1588-0000)로 신속히 요청해 주세요.", date: "2026-05-27" },
  { id: "q3", author: "강정웅", question: "선물 메시지 카드 넣는 옵션이 있나요?", answer: "네! 결제 화면에서 ‘선물 포장’ 옵션을 기재한 후, 주문란의 메세지 입력 창에 원하시는 카드의 문구를 채워주시면 리본과 특별 수제 엽서 카드로 준비해 드립니다.", date: "2026-05-25" }
];
