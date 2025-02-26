import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
// import ChatIcons from "@/components/ui/chat";
// import Chatbox from "@/components/ui/chatbox";
import { ChatMessageListDemo } from "@/app/(landing)/homeplus/demo";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {/* <ChatIcons />
      <div className="fixed bottom-50 right-5 flex flex-col items-end gap-2">
        <Chatbox />
      </div> */}
      <div className="z-[10000]">
        <ChatMessageListDemo />
      </div>

      <main className="">{children}</main>
      <Footer />
    </>
  );
}
