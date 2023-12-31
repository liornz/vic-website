import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { artworkMetaData, categoryMetaData } from './types';

const enCategoryDataDirectory = path.join(process.cwd(), 'data', 'en', 'categories');
const esCategoryDataDirectory = path.join(process.cwd(), 'data', 'es', 'categories');

export function getCategoryFileNames(locale: string) {
  let dataFiles;
  switch (locale) {
    case 'en-US':
      dataFiles = fs.readdirSync(enCategoryDataDirectory);
      return dataFiles;
    case 'es-AR':
      dataFiles = fs.readdirSync(esCategoryDataDirectory);
      return dataFiles;
    default:
      dataFiles = fs.readdirSync(enCategoryDataDirectory);
      return dataFiles;
  }
}

export function getCategoryFileData(fileIdentifier: string, locale: string) {
  const categorySlug = fileIdentifier.replace(/\.md$/, '');
  let filePath;
  switch (locale) {
    case 'en':
      filePath = path.join(enCategoryDataDirectory, `${categorySlug}.md`);
      break;
    case 'es':
      filePath = path.join(esCategoryDataDirectory, `${categorySlug}.md`);
      break;
    default:
      filePath = path.join(enCategoryDataDirectory, `${categorySlug}.md`);
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const categoryData = {
    slug: categorySlug,
    ...(data as categoryMetaData),
    content,
  };
  return categoryData;
}

export function getAllCategoriesData(locale: string) {
  const categoryFileNames = getCategoryFileNames(locale);
  const allCategories = categoryFileNames.map((fileName) => {
    return getCategoryFileData(fileName, locale);
  });
  return allCategories;
}

export function buildCategoryDirectory(category: string, locale: string) {
  const enDataDirectory = path.join(
    process.cwd(),
    'data',
    'en',
    'works',
    category
  );
  const esDataDirectory = path.join(
    process.cwd(),
    'data',
    'es',
    'works',
    category
  );
  const directory = locale === 'en-US' ? enDataDirectory : esDataDirectory;
  return directory;
}

export function getFileData(
  category: string,
  locale: string,
  fileIdentifier: string
) {
  const directory = buildCategoryDirectory(category, locale);
  const fileSlug = fileIdentifier.replace(/\.md$/, '');
  const filePath = path.join(directory, `${fileSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const artworkData = {
    slug: fileSlug,
    categorySlug: category,
    ...(data as artworkMetaData),
    content,
  };
  return artworkData;
}

export function getFileNamesPerCategory(category: string, locale: string) {

  const directory = buildCategoryDirectory(category, locale);

  const fileNames = fs.readdirSync(directory);
  return fileNames;
}

export function getArtworksPerCategory(category: string, locale: string) {

  const directory = buildCategoryDirectory(category, locale);

  const fileNames = fs.readdirSync(directory);
  const filesData = fileNames.map(file => {
    return getFileData(category, locale, file);
  });
  return filesData;
}

