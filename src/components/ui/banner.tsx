"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { items } from "@/constants/items-banner";
import Link from "next/link";
type Props = {
  className?: string;
};

export default function Banner({ className }: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const handleMouseLeave = () => {
    plugin.current.play();
  };

  return (
    <Carousel
      plugins={[plugin.current]}
      className={cn("w-full", className)}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselContent className="h-screen">
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <section className="bg-gray-50 dark:bg-gray-800 py-20">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      {item.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-gray-600 dark:text-white">
                      {item.description}
                    </p>
                    <Link href={item.link}>
                      <Button className="py-6 px-6 rounded-lg">
                        Tìm hiểu thêm
                      </Button>
                    </Link>
                  </div>
                  <div className="order-1 md:order-2">
                    {/* Set a fixed size for the image container */}
                    <div className="w-[700px] h-[500px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Uncomment if you want navigation buttons */}
      {/* <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-16 w-16 bg-gray-100 bg-opacity-50 rounded-lg " />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 h-16 w-16 bg-gray-100 bg-opacity-50 rounded-lg " /> */}
    </Carousel>
  );
}
