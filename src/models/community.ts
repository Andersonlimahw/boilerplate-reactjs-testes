export interface CommunityModel {
  id: string;
  name: string;
  description: string;
  image: string;
  membersCount: number;
  category: string;
  isVerified: boolean;
  createdAt: string;
  link: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'member';
  joinedAt: string;
}

export interface CommunityStats {
  totalMembers: number;
  activeMembers: number;
  messagesCount: number;
  groupsCount: number;
}
