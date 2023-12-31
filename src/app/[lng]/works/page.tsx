import { Metadata } from 'next';
import AllCategories from '../../../components/works/categories/all-categories';
import { category } from '../../../types/types';
import { getAllCategoriesData } from '../../../utils/data-utils';
import React from 'react';
import { getPlaiceholder } from 'plaiceholder';
import path from "node:path";
import fs from "node:fs/promises";

interface Props {
  params: { lng: string };
}

export const metadata: Metadata = {
  title: 'Travelblog Sinfronteras - Destinations Page',
  description: 'Destinations - Sinfronteras Travel Blog - Choose country',
};

const AllCategoriesPage: React.FC<Props> = async ({ params: { lng } }) => {
  const categories = getAllCategoriesData(lng);
  const imagePropsArray = await Promise.all(
    categories.map(async (category) => {
      const imagePath = `/images/categories/${category.slug}/${category.image}`;
      const file = await fs.readFile(path.join("./public", imagePath));
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
