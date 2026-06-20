import { TimelineItem, Collaborator, AlbumPhoto } from "./types";

export const initialTimelineItems: TimelineItem[] = [
  {
    id: "1",
    title: "Vương quốc Đá Amalfi",
    location: "Positano, Amalfi Coast, Italia",
    date: "14 tháng 6, 2025",
    description: "Nhìn từ ban công cổ điển bên mép vách đá Positano. Những ngôi nhà sắc màu cổ kính xếp chồng lên nhau như tranh vẽ, đổ dốc theo sườn núi thẳng đứng xuống bãi biển cát vàng óng ánh màu hổ phách dưới nắng chiều vàng.",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Every corner is a postcard...",
    likes: 342,
  },
  {
    id: "2",
    title: "Hồ Gương Thung Lũng",
    location: "Sơn mạch Dolomites, Áo & Ý",
    date: "19 tháng 6, 2025",
    description: "Chúng tôi mướn một chiếc thuyền gỗ nhỏ chèo ra giữa dòng tĩnh lặng tuyệt đối của hồ nước. Phía sau, những ngọn sừng sững gồ ghề của dãy Alps in bóng xuống làn nước xanh ngọc lam trong vắt mờ sương sớm.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Finding peace in the reflection.",
    likes: 512,
  },
  {
    id: "3",
    title: "Dạ Khúc Dạ Quang",
    location: "Bán Đảo Snæfellsnes, Iceland",
    date: "23 tháng 6, 2025",
    description: "Đêm mùa hè lạnh giá của Bắc Âu, bầu trời đột ngột nhảy múa dưới những dải lụa xanh rờn của cực quang. Chúng tôi ngồi cạnh lò sưởi ngoài trời ấm áp bên bạn bè, cảm thấy vũ trụ thật bao la kỳ diệu.",
    imageUrl: "https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Under the emerald sky ✨",
    likes: 839,
  },
  {
    id: "4",
    title: "Ẩn Bản Thác Nước rừng thẳm",
    location: "Vườn Quốc Gia Plitvice, Croatia",
    date: "28 tháng 6, 2025",
    description: "Đi theo hàng cầu gỗ nhỏ len lỏi sâu vào thung lũng đá vôi phủ rêu nguyên sinh. Một dải lụa nước bạt ngàn đổ gầm vang từ tầng trời cao xuống lòng hồ tĩnh lặng xanh biên biếc lá vàng mùa thu rơi rụng.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Nature's secret sanctuary...",
    likes: 428,
  }
];

export const initialCollaborators: Collaborator[] = [
  {
    id: "col-1",
    name: "Alex Minh",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    status: "Đang chỉnh sửa"
  },
  {
    id: "col-2",
    name: "Emily Khánh",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    status: "Đang xem ảnh"
  },
  {
    id: "col-3",
    name: "Phan Lâm",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    status: "Đang ghi chú"
  }
];

export const initialAlbumPhotos: AlbumPhoto[] = [
  {
    id: "alb-1",
    title: "Nấc thang thiên đường",
    caption: "Buổi sáng chinh phục đỉnh núi Dolomites huyền thoại.",
    author: "Phan Lâm",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
    likes: 2471,
    date: "18 tháng 6"
  }
];
