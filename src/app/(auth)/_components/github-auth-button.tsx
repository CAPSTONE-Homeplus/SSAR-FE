"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/constants/icons";
import { RootPath } from "@/constants/path";

export default function GithubSignInButton() {
  const router = useRouter();
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => router.push(RootPath.admin)}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Continue with Github
    </Button>
  );
}
