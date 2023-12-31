import ArtworksPerCagegory from '../../../../components/works/artworks-per-category';
import { getCategoryFileData, getCategoryFileNames, getArtworksPerCategory } from '../../../../utils/data-utils';
import { Metadata } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import path from "node:path";
import fs from "node:fs/promises";

interface Props {
  params: { lng: string; category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, lng } = params;
  const categoryData = getCategoryFileData(category, lng);

  return {
    title: `Victor Alaluf Art - Artworks in ${categoryData.name}`,
    description: `Victor Alaluf Art - Artworks in in ${categoryData.name}`,
  };
}

const ArtworksPerCategory: React.FC<Props> = async ({ params: { lng, category } }) => {
  const categoryData = getCategoryFileData(category, lng);
  const artworks = getArtworksPerCategory(category, lng);

  const imagePropsArray = await Promise.all(
    artworks.map(async (artwork) => {
      const imagePath = `/images/works/${artwork.categorySlug}/${artwork.slug}/${artwork.mainImage}`;
      const file = await fs.readFile(path.join("./public", imagePath));
      const { base64, metadata } = await getPlaiceholder(file);
      return {
        src: imagePath,
        blurDataURL: base64,
        width: metadata.width,
        height: metadata.height,
      };
    })
  ).then((values) => values);

  return <ArtworksPerCagegory category={categoryData} artworks={artworks} imagePropsArray={imagePropsArray}  />;
};

export default ArtworksPerCategory;

export async function generateStaticParams() {
  const categoryFileNames = getCategoryFileNames('en');
  const countriesArray = categoryFileNames.map((fileName) => fileName.replace(/\.md$/, ''));
  const pathsEN = countriesArray.map((category) => ({ category, lng: 'en' }));
  const pathsES = countriesArray.map((category) => ({ category, lng: 'es' }));
  return [...pathsEN, ...pathsES];
}
