import { getCategoryFileNames, getFileData, getFileNamesPerCategory } from '../../../../../utils/data-utils';
import React from 'react';
import { getPlaiceholder } from 'plaiceholder';
import { Metadata } from 'next';
import Artwork from '@/components/works/single-artwork-page/artwork';
import path from "node:path";
import fs from "node:fs/promises";

interface Props {
  params: { lng: string; category: string; artwork: [string, string] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, artwork, lng } = params;
  const fileData = getFileData(category, lng, artwork[0]);

  return {
    title: `Victor Alaluf Art - ${fileData.title}`,
    description: `Victor Alaluf Art - ${fileData.title}`,
  };
}

const SingleDestinationPage: React.FC<Props> = async (props) => {
  const {
    params: { lng, category, artwork },
  } = props;

  const [artworkIdentifier, imageName] = artwork;

  const fileData = getFileData(category, lng, artworkIdentifier);
  const imagesArray = fileData.images.split('/');

  const imagePropsArray = await Promise.all(
    imagesArray.map(async (image) => {
      const imagePath = `/images/works/${category}/${artwork[0]}/${image}`;
      const file = await fs.readFile(path.join("./public", imagePath));
      const { base64, metadata } = await getPlaiceholder(file);
      return {
        width: metadata.width,
        height: metadata.height,
        src: imagePath,
        blurDataURL: base64,
      };
    })
  ).then((values) => values);

  const imageIndex = imagesArray.findIndex(
    (image) => image.replace(/\.jpg$|\.png$|\.jfif$/, '') === imageName
  );

  return  <Artwork artwork={fileData} imageProps={imagePropsArray[imageIndex]} imageName={imageName} category={category} lng={lng} />;
};

export default SingleDestinationPage;

export async function generateStaticParams() {
  let pathsArray: {
    category: string;
    artwork: string[];
    lng: string;
  }[] = [];
  const categoryFileNames = getCategoryFileNames('en');
  const categoryFileSlugs = categoryFileNames.map((FileName) =>
    FileName.replace(/\.md$/, '')
  );
  for (const category of categoryFileSlugs) {
    const fileNames = getFileNamesPerCategory(category, 'en');
    const fileSlugs = fileNames.map((fileName) =>
      fileName.replace(/\.md$/, '')
    );
    for (const file of fileSlugs) {
      const fileData = getFileData(category, 'en', file);
      const imageNamesArray = fileData.images
        .split('/')
        .map((imageName) => imageName.replace(/\.jpg$|\.png$|\.jfif$/, ''));

      const pathsEn = imageNamesArray.map((imageName) => ({ category, artwork: [file, imageName], lng: 'en' }));

      const pathsEs = imageNamesArray.map((imageName) => ({ category, artwork: [file, imageName], lng: 'es' }));
      const pathsCategory = pathsEn.concat(pathsEs);
      pathsArray = pathsArray.concat(pathsCategory);
    }
  }
  return pathsArray;
}
