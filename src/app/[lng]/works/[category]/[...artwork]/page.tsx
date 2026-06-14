import { getCategoryFileNames, getFileData, getFileNamesPerCategory } from '../../../../../utils/data-utils';
import { getAdjacentImageIndices } from '../../../../../utils/artwork-carousel';
import React from 'react';
import { getPlaiceholder } from 'plaiceholder';
import { Metadata } from 'next';
import Artwork from '@/components/works/single-artwork-page/artwork';
import { getImageProps } from 'next/image';
import path from "node:path";
import fs from "node:fs/promises";

type ArtworkImageProps = {
  blurDataURL: string;
  src: string;
  height: number;
  width: number;
  type?: string | undefined;
};

function PreloadLink({ imageProps }: { imageProps: ArtworkImageProps }) {
  const { props } = getImageProps({
    ...imageProps,
    alt: '',
    sizes: '90vw',
  });
  return <link rel="preload" as="image" href={props.src} />;
}

interface Props {
  params: Promise<{ lng: string; category: string; artwork: [string, string] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, artwork, lng } = await params;
  const fileData = getFileData(category, lng, artwork[0]);

  return {
    title: `Victor Alaluf Art - ${fileData.title}`,
    description: `Victor Alaluf Art - ${fileData.title}`,
  };
}

const SingleDestinationPage: React.FC<Props> = async (props) => {
  const { lng, category, artwork } = await props.params;

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

  const { prev: prevIndex, next: nextIndex } = getAdjacentImageIndices(
    imageIndex,
    imagesArray.length
  );
  const prevImageProps =
    prevIndex !== null ? imagePropsArray[prevIndex] : undefined;
  const nextImageProps =
    nextIndex !== null ? imagePropsArray[nextIndex] : undefined;

  return (
    <>
      {prevImageProps ? <PreloadLink imageProps={prevImageProps} /> : null}
      {nextImageProps ? <PreloadLink imageProps={nextImageProps} /> : null}
      <Artwork
        artwork={fileData}
        imageProps={imagePropsArray[imageIndex]}
        prevImageProps={prevImageProps}
        nextImageProps={nextImageProps}
        imageName={imageName}
        category={category}
        lng={lng}
      />
    </>
  );
};

export default SingleDestinationPage;

export async function generateStaticParams() {
  try {
    const pathsArray: {
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
        try {
          const fileData = getFileData(category, 'en', file);
          if (fileData.images) {
            const imageNamesArray = fileData.images
              .split('/')
              .filter(img => img.trim()) // Filter out empty strings
              .map((imageName) => imageName.replace(/\.jpg$|\.png$|\.jfif$/, ''));

            // Create paths for both languages
            const pathsEn = imageNamesArray.map((imageName) => ({ 
              category, 
              artwork: [file, imageName], 
              lng: 'en' 
            }));

            const pathsEs = imageNamesArray.map((imageName) => ({ 
              category, 
              artwork: [file, imageName], 
              lng: 'es' 
            }));
            
            pathsArray.push(...pathsEn, ...pathsEs);
          }
        } catch (error) {
          console.warn(`Error processing file ${file} in category ${category}:`, error);
          // Continue with other files even if one fails
        }
      }
    }
    
    return pathsArray;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}
