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

export type Channel = {
  id: number;
  title: string;
  tag?: string | null;
  image_url?: string | null;
  cta_label?: string | null;
  whatsapp_message?: string | null;
  sort_order?: number;
  is_active: boolean;
};
