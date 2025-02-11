import AboutUs from "@/app/(landing)/homeplus/_components/about-us";
import Blog from "@/app/(landing)/homeplus/_components/blog";
import ContactUs from "@/app/(landing)/homeplus/_components/contact-us";
import DesignIntroduction from "@/app/(landing)/homeplus/_components/design-introduction";
import Gallery from "@/app/(landing)/homeplus/_components/gallery";
import Services from "@/app/(landing)/homeplus/_components/services";
import Banner from "@/components/ui/banner";
import Footer from "@/components/ui/footer";


export default function Home() {


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
      <Footer />

    </div>
  );
}
