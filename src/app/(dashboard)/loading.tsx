"use client";
import animationData from "@/components/loading.json";
import Lottie from "lottie-react";

export default function Loading() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Lottie
        animationData={animationData}
        className="flex justify-center items-center w-1/2 h-1/2"
        loop={true}
      />
    </div>
  );
}
