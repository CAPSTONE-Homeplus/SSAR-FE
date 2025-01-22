import Banner from "@/components/ui/banner";
import AboutUs from "../../_components/about-us";
import Services from "../../_components/services";
import Blog from "../../_components/blog";
import ContactUs from "../../_components/contact-us";
import DesignIntroduction from "../../_components/design-introduction";
import Gallery from "@/app/_components/gallery";

export default function Home() {
  // const a =
  //   '[{"img":"https://res.cloudinary.com/dsmdqayv6/image/upload/v1728140741/blob_fnzbmm.jpg"},{"img":"https://res.cloudinary.com/dsmdqayv6/image/upload/v1728140741/blob_hf7vhq.png"},{"img":"https://res.cloudinary.com/dsmdqayv6/image/upload/v1728140743/blob_xqgrky.png"}]';
  // const parsedArray = JSON.parse(a);
  // console.log("ihiiiiiiiii", parsedArray);

  return (
    <div>
      <Banner />
      <div className="container mx-auto px-0 md:px-6 lg:px-8 mb-12">
        <div>
          <AboutUs />
          <DesignIntroduction />
          <Services />
          {/* <Testimonials /> */}
          <Gallery />
          <Blog />
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
