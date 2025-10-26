import { getCategoryFileNames, getFileData, getFileNamesPerCategory } from '@/utils/data-utils';
import { MetadataRoute } from 'next';

type artworksPerCountry = {
  category: string;
  artworks: string[];
  imagesPerArtwork: Record<string, string[]>;
};

const BASE_URL = 'https://victoralaluf.com';

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
    ...allartworks.flatMap(({ category, artworks, imagesPerArtwork }) => {
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
            ...imagesPerArtwork[artwork]?.flatMap((image) => {
              return [
                {
                  url: `${BASE_URL}/en/works/${category}/${artwork}/${image}`,
                  lastModified: new Date(),
                  changeFrequency: 'yearly',
                  priority: 1,
                } as const,
                {
                  url: `${BASE_URL}/es/works/${category}/${artwork}/${image}`,
                  lastModified: new Date(),
                  changeFrequency: 'yearly',
                  priority: 1,
                } as const,
              ];
            }),
          ];
        }),
      ];
    }),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    const categories = getCategoryFileNames('en').map((fileName) => fileName.replace(/\.md$/, ''));
    console.log('categories: ', categories);
    
    const artworks = categories.map((category) => {
      try {
        const artworksPerCategory = getFileNamesPerCategory(category.replace(/\.md$/, ''), 'en').map((fileName) => fileName.replace(/\.md$/, ''));
        const imagesPerArtwork: Record<string, string[]> = {}
        
        artworksPerCategory.forEach((artworkName) => {
          try {
            const artworkData = getFileData(category, 'en', artworkName);
            if (artworkData.images) {
              const imagesArray = artworkData.images.split("/").filter(img => img.trim());
              imagesPerArtwork[artworkName] = imagesArray;
            }
          } catch (error) {
            console.warn(`Error processing artwork ${artworkName} in category ${category}:`, error);
          }
        });
        
        return {
          category: category.replace(/\.md$/, ''),
          artworks: artworksPerCategory,
          imagesPerArtwork,
        };
      } catch (error) {
        console.warn(`Error processing category ${category}:`, error);
        return {
          category: category.replace(/\.md$/, ''),
          artworks: [],
          imagesPerArtwork: {},
        };
      }
    });

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(artworks);
    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return a basic sitemap if there's an error
    return [
      {
        url: 'https://victoralaluf.com/en',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://victoralaluf.com/es',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
    ];
  }
}
