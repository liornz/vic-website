import { reconstructUrl } from "@/utils/url-utils";
import { Metadata } from "next";
import Image from "next/image";

interface Props {
	params: { lng: string; pic: string };
  }

  export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { pic: filename } = params;
  
	return {
	  title: `Victor Alaluf Art - Press Article - ${filename}`,
	  description: `Victor Alaluf Art - Press Article - ${filename}`,
	};
  }

const ImageViewer: React.FC<Props> = ({ params }) => {
	const { pic: filename } = params;

	if (filename.startsWith('external-')) {
		const reconstructedUrl = reconstructUrl(filename.replace('external-', ''));
		console.log('reconstructedUrl', reconstructedUrl);
		return (
			<iframe src={reconstructedUrl} allow="*"  style={{width: '100%', height: '100vh'}} />
		)
	}

	const imagePath = `/images/press/${filename}.jpg`;
	return (
	  <Image
		src={imagePath}
		alt={`Press article - ${filename}`}
		width={2000}
		height={1428}
		style={{ width: "100%", height: "auto" }}
	  />
	);
  };

export default ImageViewer;