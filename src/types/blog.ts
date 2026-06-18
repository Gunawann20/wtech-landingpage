export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  tags: string[];
  image: string;
  readTime: number;
  content: string;
}
