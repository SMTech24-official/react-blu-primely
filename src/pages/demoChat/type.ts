export interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  profilePicture: string;
}

export interface Message {
  id: string;
  content: string;
  createdAt: Date | string;
  senderId: string;
  chatId: string;
  isRead: boolean;
  sender: User;
}

export interface Chat {
  id: string;
  name: string;
  logo: string;
  isGroup: boolean;
  createdAt: Date | string;
  lastMessage?: Message | null;
  unreadCount: number;
}
