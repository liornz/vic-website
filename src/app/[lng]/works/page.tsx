import getPlaiceholder from '@plaiceholder/next';
import { Metadata } from 'next';
import fs from 'node:fs/promises';
import path from 'node:path';
import AllCategories from '../../../components/works/categories/all-categories';
import { getAllCategoriesData } from '../../../utils/data-utils';

interface Props {
  params: Promise<{ lng: string }>;
}

export const metadata: Metadata = {
  title: 'Travelblog Sinfronteras - Destinations Page',
  description: 'Destinations - Sinfronteras Travel Blog - Choose country',
};

const AllCategoriesPage = async ({ params }: Props) => {
  const { lng } = await params;
  const categories = getAllCategoriesData(lng);
  const imagePropsArray = await Promise.all(
    categories.map(async (category) => {
      const imagePath = `/images/categories/${category.slug}/${category.image}`;
      const file = await fs.readFile(path.join('./public', imagePath));
      const { base64, metadata } = await getPlaiceholder(file);
      return {
        imageProps: {
          src: imagePath,
          blurDataURL: base64,
          width: metadata.width,
          height: metadata.height,
        },
      };
    })
  ).then((values) => values);

  return <AllCategories lng={lng} categories={categories} images={imagePropsArray} />;
};

export default AllCategoriesPage;
