import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
// import ChatIcons from "../../components/chat";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {/* <ChatIcons /> */}
      <div className="mt-20">{children}</div>
      <Footer />
    </>
  );
}
