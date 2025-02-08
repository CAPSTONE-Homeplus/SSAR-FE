"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { useMediaQuery } from "usehooks-ts";
const DesignIntroduction = () => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  const sectionStyle = isDesktop
    ? {}
    : {
        backgroundImage: "url('/images/bag-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
  return (
    <section
      className="container mx-auto p-4 md:p-8 bg-gray-50 dark:bg-black rounded-lg flex flex-col md:flex-row flex-wrap justify-between items-center
      bg-cover bg-center bg-no-repeat md:bg-none"
      style={sectionStyle}
    >
      <div className="flex flex-col justify-evenly p-4 max-w-xl gap-6 md:gap-12  bg-opacity-80 md:bg-transparent rounded-md">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          Chúng tôi tạo ra nghệ thuật Kiểu dáng thời trang thích hợp cho mọi
          người sử dụng
        </h3>
        <p className="">
          Chúng tôi tạo ra nghệ thuật Kiểu dáng thời trang thích hợp cho mọi
          người sử dụng
        </p>
        <div className="flex gap-4 md:gap-6 items-center">
          <div className="h-12 w-12 md:h-16 md:w-16 bg-green-100 dark:bg-gray-400 rounded-full flex items-center justify-center">
            <FaPhoneAlt className="h-6 w-6 md:h-8 md:w-8 text-green-300 dark:text-gray-800" />
          </div>

          <div className="text-gray-700 dark:text-white">
            <p className="text-lg md:text-xl">0976-325-953</p>
            <p className="text-sm md:text-md">
              Gọi cho chúng tôi bất cứ lúc nào
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-center md:justify-start">
          <Button onClick={() => router.push("/design")}>
            Thiết kế theo phong cách của bạn
            <FaArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0 mt-8 md:mt-0 hidden md:block">
        <Image
          src="/images/bag-1.jpg"
          alt="bag-1"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default DesignIntroduction;
