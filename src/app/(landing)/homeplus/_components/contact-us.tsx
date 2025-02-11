"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const ContactUs = () => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col items-center justify-center h-80 z-1">
      <div className="absolute inset-0">
        <Image
          src="/images/anhbia.png"
          alt="Background"
          layout="fill"
          objectFit="fill"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-20 z-10" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center">
        <p className="text-white text-2xl font-semibold mb-4">
          Bạn muốn gặp chúng tôi chứ?
        </p>
        <Button
          onClick={() => router.push("/about")}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Liên hệ ngay
        </Button>
      </div>
    </div>
  );
};

export default ContactUs;
