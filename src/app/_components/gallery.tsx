import Image from "next/image";
import React from "react";

const images = [
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/513285394.jpg?k=527086dd973e9b8c3285380b0c715ea25d1a4eaad11b180359f7e71a9eb49690&o=&hp=1",
  "https://file.hstatic.net/1000030244/file/thuc-don-cac-mon-hai-san-binh-dan-daohaisan7_c3da6c51e5a54ec3b5955f7a9fecd822_1024x1024.jpg",
  "https://cdn-i.vtcnews.vn/files/f2/2015/02/02/nhung-khung-canh-hen-ho-lang-man-cho-ngay-valentine-2.jpg",
];

const Gallery = () => {
  return (
    <>
      <div className="max-w-4xl pt-24 pb-12 ">
        <h2 className="text-2xl text-gray-600 font-sans border-l border-black dark:text-white dark:border-white pl-12 py-4">
          Bộ sưu tập
        </h2>
        <p className="border-l-4 border-black pl-12 dark:text-white dark:border-white text-3xl font-light max-w-md py-4">
          Khoảnh khắc đẹp cùng chúng tôi
        </p>
      </div>
      <section className="rounded-lg bg-gray-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={300}
                height={300}
                className=" rounded-lg shadow-lg"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
