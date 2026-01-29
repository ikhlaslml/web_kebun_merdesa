export type Product = {
  id: number;
  name: string;
  category?: string | null;
  description?: string | null;
  price: number;
  image_url?: string | null;
  is_active: boolean;
};

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string;
  cover_image_url?: string | null;
  published_at?: string | null;
};
