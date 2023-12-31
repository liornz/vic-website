import { getCategoryFileNames, getFileNamesPerCategory } from '@/utils/data-utils';
import { MetadataRoute } from 'next';

type artworksPerCountry = {
  countryName: string;
  artworks: string[];
};

const BASE_URL = 'https://sinfronteras-travelblog.com';

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
      url: `${BASE_URL}/en/shop`,
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
      url: `${BASE_URL}/es/artworks`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    } as const,
    {
      url: `${BASE_URL}/es/shop`,
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
    ...allartworks.flatMap(({ countryName }) => {
      return [
        {
          url: `${BASE_URL}/en/artworks/${countryName}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        } as const,
        {
          url: `${BASE_URL}/es/artworks/${countryName}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        } as const,
      ];
    }),
    ...allartworks.flatMap(({ countryName, artworks }) => {
      return [
        {
          url: `${BASE_URL}/en/artworks/${countryName}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        } as const,
        {
          url: `${BASE_URL}/es/artworks/${countryName}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        } as const,
        ...artworks.flatMap((destination) => {
          return [
            {
              url: `${BASE_URL}/en/artworks/${countryName}/${destination}`,
              lastModified: new Date(),
              changeFrequency: 'yearly',
              priority: 1,
            } as const,
            {
              url: `${BASE_URL}/es/artworks/${countryName}/${destination}`,
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
  const artworks = categories.map((country) => ({
    countryName: country.replace(/\.md$/, ''),
    artworks: getFileNamesPerCategory(country.replace(/\.md$/, ''), 'en').map((fileName) => fileName.replace(/\.md$/, '')),
  }));

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(artworks);
  return sitemap;
}
