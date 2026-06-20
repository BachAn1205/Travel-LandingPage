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
  },
  {
    id: "5",
    title: "Sông Băng Vĩnh Cửu",
    location: "Vườn Quốc Gia Banff, Canada",
    date: "2 tháng 7, 2025",
    description: "Mặt hồ đóng băng phẳng lặng như một tấm gương khổng lồ phản chiếu trọn vẹn những đỉnh núi tuyết trắng phau đang rực sáng dưới ánh nắng ban mai. Cái lạnh cắt da không thể ngăn cản được nhịp đập rộn ràng của trái tim.",
    imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Cold air, warm heart ❄️",
    likes: 671,
  },
  {
    id: "6",
    title: "Bình Minh Thung Lũng",
    location: "Thung Lũng Yosemite, California",
    date: "5 tháng 7, 2025",
    description: "Đứng từ trên đỉnh đồi nhìn xuống dòng sông uốn lượn tuyệt đẹp ôm lấy những rặng cây đang đổi màu. Khung cảnh hoang sơ và hùng vĩ khiến con người ta chợt nhận ra mình nhỏ bé đến nhường nào.",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "Lost in the wilderness...",
    likes: 924,
  },
  {
    id: "7",
    title: "Dòng Chảy Bất Tận",
    location: "Thác Skógafoss, Iceland",
    date: "10 tháng 7, 2025",
    description: "Âm thanh cuồn cuộn của dòng thác khổng lồ đổ ập xuống từ độ cao hàng chục mét vang vọng cả một góc trời. Làn sương mờ ảo tung bọt trắng xóa ôm lấy cây cầu gỗ nhuốm màu thời gian.",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop",
    handwrittenCaption: "The power of water 💧",
    likes: 540,
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
