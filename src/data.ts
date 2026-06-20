import { TimelineItem, Collaborator, AlbumPhoto } from "./types";

export interface TranslatedTimelineItem extends TimelineItem {
  title_en: string;
  location_en: string;
  date_en: string;
  description_en: string;
  handwrittenCaption_en: string;
}

export interface TranslatedCollaborator extends Collaborator {
  status_en: string;
}

export interface TranslatedAlbumPhoto extends AlbumPhoto {
  title_en: string;
  caption_en: string;
  date_en: string;
}

export const initialTimelineItems: TranslatedTimelineItem[] = [
  {
    id: "1",
    title: "Vương quốc Đá Amalfi",
    title_en: "Amalfi Stone Kingdom",
    location: "Positano, Amalfi Coast, Italia",
    location_en: "Positano, Amalfi Coast, Italy",
    date: "14 tháng 6, 2025",
    date_en: "June 14, 2025",
    description: "Nhìn từ ban công cổ điển bên mép vách đá Positano. Những ngôi nhà sắc màu cổ kính xếp chồng lên nhau như tranh vẽ, đổ dốc theo sườn núi thẳng đứng xuống bãi biển cát vàng óng ánh màu hổ phách dưới nắng chiều vàng.",
    description_en: "View from a classic balcony on the cliff edge of Positano. Vintage colorful houses stack on top of each other like a painting, cascading down the steep mountainside to the golden amber sand beach shining in the afternoon sun.",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Mỗi góc nhỏ là một tấm bưu thiếp...",
    handwrittenCaption_en: "Every corner is a postcard...",
    likes: 342,
  },
  {
    id: "2",
    title: "Hồ Gương Thung Lũng",
    title_en: "Valley Mirror Lake",
    location: "Sơn mạch Dolomites, Áo & Ý",
    location_en: "Dolomites Range, Austria & Italy",
    date: "19 tháng 6, 2025",
    date_en: "June 19, 2025",
    description: "Chúng tôi mướn một chiếc thuyền gỗ nhỏ chèo ra giữa dòng tĩnh lặng tuyệt đối của hồ nước. Phía sau, những ngọn sừng sững gồ ghề của dãy Alps in bóng xuống làn nước xanh ngọc lam trong vắt mờ sương sớm.",
    description_en: "We rented a small wooden boat and rowed out into the absolute silence of the lake. Behind us, the rugged, towering peaks of the Alps reflected on the crystal-clear emerald-turquoise water shrouded in morning mist.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Tìm lại sự yên bình trong phản chiếu.",
    handwrittenCaption_en: "Finding peace in the reflection.",
    likes: 512,
  },
  {
    id: "3",
    title: "Dạ Khúc Dạ Quang",
    title_en: "Luminescent Nocturne",
    location: "Bán Đảo Snæfellsnes, Iceland",
    location_en: "Snæfellsnes Peninsula, Iceland",
    date: "23 tháng 6, 2025",
    date_en: "June 23, 2025",
    description: "Đêm mùa hè lạnh giá của Bắc Âu, bầu trời đột ngột nhảy múa dưới những dải lụa xanh rờn của cực quang. Chúng tôi ngồi cạnh lò sưởi ngoài trời ấm áp bên bạn bè, cảm thấy vũ trụ thật bao la kỳ diệu.",
    description_en: "On a cold Nordic summer night, the sky suddenly danced with bright green ribbons of aurora. We sat by the warm outdoor fire pit with friends, feeling the vast wonder of the universe.",
    imageUrl: "https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Dưới bầu trời ngọc lục bảo ✨",
    handwrittenCaption_en: "Under the emerald sky ✨",
    likes: 839,
  },
  {
    id: "4",
    title: "Ẩn Bản Thác Nước Rừng Thẳm",
    title_en: "Deep Forest Hidden Waterfall",
    location: "Vườn Quốc Gia Plitvice, Croatia",
    location_en: "Plitvice Lakes National Park, Croatia",
    date: "28 tháng 6, 2025",
    date_en: "June 28, 2025",
    description: "Đi theo hàng cầu gỗ nhỏ len lỏi sâu vào thung lũng đá vôi phủ rêu nguyên sinh. Một dải lụa nước bạt ngàn đổ gầm vang từ tầng trời cao xuống lòng hồ tĩnh lặng xanh biên biếc lá vàng mùa thu rơi rụng.",
    description_en: "Walking along a small wooden boardwalk winding deep into the moss-covered limestone valley. A massive sheet of water thundered down from high above into a quiet, emerald-blue lake sprinkled with falling autumn leaves.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Thánh đường bí mật của thiên nhiên...",
    handwrittenCaption_en: "Nature's secret sanctuary...",
    likes: 428,
  },
  {
    id: "5",
    title: "Sông Băng Vĩnh Cửu",
    title_en: "Eternal Glacial River",
    location: "Vườn Quốc Gia Banff, Canada",
    location_en: "Banff National Park, Canada",
    date: "2 tháng 7, 2025",
    date_en: "July 2, 2025",
    description: "Mặt hồ đóng băng phẳng lặng như một tấm gương khổng lồ phản chiếu trọn vẹn những đỉnh núi tuyết trắng phau đang rực sáng dưới ánh nắng ban mai. Cái lạnh cắt da không thể ngăn cản được nhịp đập rộn ràng của trái tim.",
    description_en: "The frozen lake surface lay smooth like a giant mirror, completely reflecting the snowy peaks glowing under the morning sun. The biting cold could not stop our hearts from beating with excitement.",
    imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Không khí lạnh, trái tim nóng ❄️",
    handwrittenCaption_en: "Cold air, warm heart ❄️",
    likes: 671,
  },
  {
    id: "6",
    title: "Bình Minh Thung Lũng",
    title_en: "Valley Sunrise",
    location: "Thung Lũng Yosemite, California",
    location_en: "Yosemite Valley, California",
    date: "5 tháng 7, 2025",
    date_en: "July 5, 2025",
    description: "Đứng từ trên đỉnh đồi nhìn xuống dòng sông uốn lượn tuyệt đẹp ôm lấy những rặng cây đang đổi màu. Khung cảnh hoang sơ và hùng vĩ khiến con người ta chợt nhận ra mình nhỏ bé đến nhường nào.",
    description_en: "Standing on the hilltop looking down at the beautiful winding river embracing the forest turning colors. The wild and majestic landscape makes one realize how small they truly are.",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Lạc giữa thiên nhiên hoang dã...",
    handwrittenCaption_en: "Lost in the wilderness...",
    likes: 924,
  },
  {
    id: "7",
    title: "Dòng Chảy Bất Tận",
    title_en: "Endless Stream flow",
    location: "Thác Skógafoss, Iceland",
    location_en: "Skógafoss Waterfall, Iceland",
    date: "10 tháng 7, 2025",
    date_en: "July 10, 2025",
    description: "Âm thanh cuồn cuộn của dòng thác khổng lồ đổ ập xuống từ độ cao hàng chục mét vang vọng cả một góc trời. Làn sương mờ ảo tung bọt trắng xóa ôm lấy cây cầu gỗ nhuốm màu thời gian.",
    description_en: "The roaring sound of the giant waterfall tumbling down from dozens of meters echoed across the landscape. The misty fog and splashing white foam enveloped the weathered wooden bridge.",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Sức mạnh của nước xanh 💧",
    handwrittenCaption_en: "The power of water 💧",
    likes: 540,
  }
];

export const initialCollaborators: TranslatedCollaborator[] = [
  {
    id: "col-1",
    name: "Alex Minh",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    status: "Đang chỉnh sửa",
    status_en: "Editing"
  },
  {
    id: "col-2",
    name: "Emily Khánh",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    status: "Đang xem ảnh",
    status_en: "Viewing photos"
  },
  {
    id: "col-3",
    name: "Phan Lâm",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    status: "Đang ghi chú",
    status_en: "Writing notes"
  }
];

export const initialAlbumPhotos: TranslatedAlbumPhoto[] = [
  {
    id: "alb-1",
    title: "Nấc thang thiên đường",
    title_en: "Stairway to Heaven",
    caption: "Buổi sáng chinh phục đỉnh núi Dolomites huyền thoại.",
    caption_en: "Morning conquest of the legendary Dolomites peaks.",
    author: "Phan Lâm",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
    likes: 2471,
    date: "18 tháng 6",
    date_en: "June 18"
  }
];
