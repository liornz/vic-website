export type artwork = {
  slug: string;
  categorySlug: string;
  title: string;
  category: string;
  materials: string;
  measurements: string;
  year: string;
  mainImage: string;
  blurDataURL: string;
  images: string;
  imageNames: string;
  content: string;
};

export type artworkMetaData = {
  title: string;
  category: string;
  materials: string;
  measurements: string;
  year: string;
  mainImage: string;
  blurDataURL: string;
  images: string;
  imageNames: string;
};

export type categoryMetaData = {
  name: string;
  image: string;
  blurDataURL: string;
};

export type category = {
  slug: string;
  name: string;
  image: string;
  blurDataURL: string;
};

export type enteredMessageData = {
  email: string;
  name: string;
  message: string;
};
