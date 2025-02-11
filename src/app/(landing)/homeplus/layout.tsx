import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import ChatIcons from "@/components/ui/chat";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <ChatIcons />
      <main className="">
        {children}
      </main>
      <Footer />
    </>
  );
}
