"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image"; // Import Next.js Image component

type CardProps = {
  link: string;
  title: string;
  img: string; // Add img prop for the image URL
  description: string;
};

const CardAbout = ({ link, title, description, img }: CardProps) => {
  const router = useRouter();
  const handleNavigate = (link: string) => {
    router.push(link);
  };

  return (
    <Card className="flex flex-col items-center text-center p-4 dark:border-white">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-lg md:text-xl font-semibold">
          {title}
        </CardTitle>
        {/* Add the image here */}
        <div className="mt-4">
          <Image
            src={img} 
            alt={title} 
            width={300} 
            height={100} 
            className="object-cover rounded-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm md:text-md">{description}</p>
      </CardContent>
      <CardFooter className="mt-4">
        <Button onClick={() => handleNavigate(link)}>
          Tìm hiểu thêm <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardAbout;
