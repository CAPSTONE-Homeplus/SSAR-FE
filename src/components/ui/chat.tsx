"use client";
import Image from "next/image";
import React from "react";

const ChatIcons = () => {
  return (
    <div className="fixed right-6 z-40 bottom-4 flex flex-col space-y-2">
      <div className="grid gap-4 py-4">
        {/* <div className="img-box">
          <Image
            src="/images/messenger.webp"
            alt="messenger"
            width={60}
            height={60}
            className="xl:w-[60px] border-2 rounded-full"
          />
        </div> */}
        <a
          className="img-box"
          href="https://www.facebook.com/profile.php?id=100086570243903"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/facebook.png"
            alt="zalo"
            width={60}
            height={60}
            className="xl:w-60px] border-2 rounded-full"
          />
        </a>
      </div>
    </div>
  );
};

export default ChatIcons;
