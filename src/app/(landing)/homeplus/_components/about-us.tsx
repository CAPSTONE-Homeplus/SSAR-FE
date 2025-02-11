import React from "react";
import CardAbout from "./card-about";
import { items } from "@/constants/item-about";

const AboutUs = () => {
  return (
    <section className="py-12 md:py-24 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans mb-8 text-center">
          Có thể bạn quan tâm
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <CardAbout
              key={index}
              title={item.title}
              img={item.img}
              description={item.description}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
