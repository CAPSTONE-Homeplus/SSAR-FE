"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { dataBlogs } from "@/constants/data";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const posts = [
  {
    title: "Bảo tồn san hô",
    date: "01/08/2024",
    description: "Các biện pháp bảo tồn san hô hiệu quả.",
  },
  {
    title: "Lặn biển an toàn",
    date: "15/07/2024",
    description: "Những điều cần biết khi lặn biển.",
  },
  {
    title: "Khám phá đại dương",
    date: "10/06/2024",
    description: "Những địa điểm lặn biển tuyệt đẹp.",
  },
];

const Blog = () => {
  const router = useRouter();
  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl py-24 ">
          <h2 className="text-2xl  font-sans border-l-4 border-black dark:text-white dark:border-white pl-8 py-4">
            Tin tức & Blog
          </h2>
          {/* <p className="border-l-4 border-black pl-12 text-3xl font-light max-w-md py-4">
            Cập nhập các tin tức mới
          </p> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dataBlogs.slice(0, 3).map((item, index) => (
            <Card
              key={index}
              className="shadow-lg dark:border-white"
              onClick={() => router.push(`/blogs/${item.id}`)}
            >
              <CardHeader>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                {/* <p className="text-sm text-gray-500 truncate">
                  {item.description}
                </p> */}
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 dark:text-white truncate">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 dark:text-white">
                  {formatDate(item.createdDate)}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
