import { getCategoryFileNames, getFileData, getFileNamesPerCategory } from '@/utils/data-utils';
import { MetadataRoute } from 'next';

type artworksPerCountry = {
  category: string;
  artworks: string[];
};

const BASE_URL = 'https://victoralaluf.com/';

function generateSiteMap(allartworks: artworksPerCountry[]) {
  return [
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    } as const,
    {
      url: `${BASE_URL}/en/artworks`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    } as const,
    {
      url: `${BASE_URL}/en/press`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    } as const,
    {
      url: `${BASE_URL}/en/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    } as const,
    {
      url: `${BASE_URL}/es`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    } as const,
    {
      url: `${BASE_URL}/es/works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    } as const,
    {
      url: `${BASE_URL}/es/press`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    } as const,
    {
      url: `${BASE_URL}/es/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    } as const,
    ...allartworks.flatMap(({ category }) => {
      return [
        {
          url: `${BASE_URL}/en/works/${category}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        } as const,
        {
          url: `${BASE_URL}/es/works/${category}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        } as const,
      ];
    }),
    ...allartworks.flatMap(({ category, artworks }) => {
      return [
        {
          url: `${BASE_URL}/en/works/${category}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        } as const,
        {
          url: `${BASE_URL}/es/works/${category}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        } as const,
        ...artworks.flatMap((artwork) => {
          return [
            {
              url: `${BASE_URL}/en/works/${category}/${artwork}`,
              lastModified: new Date(),
              changeFrequency: 'yearly',
              priority: 1,
            } as const,
            {
              url: `${BASE_URL}/es/works/${category}/${artwork}`,
              lastModified: new Date(),
              changeFrequency: 'yearly',
              priority: 1,
            } as const,
          ];
        }),
      ];
    }),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getCategoryFileNames('en');
  const artworks = categories.map((category) => {
    const artworksPerCategory = getFileNamesPerCategory(category.replace(/\.md$/, ''), 'en').map((fileName) => fileName.replace(/\.md$/, ''));
    const imagesPerArtwork: Record<string, string[]> = {}
    artworksPerCategory.forEach((artworkName) => {
      const artworkData = getFileData(category, 'en', artworkName);
      const imagesArray = artworkData.images.split("/");
      imagesPerArtwork[artworkName] = imagesArray;
    });
    return {
      category: category.replace(/\.md$/, ''),
      artworks: artworksPerCategory,
      imagesPerArtwork,
    };
  });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(artworks);
  return sitemap;
}
