import { SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";

export const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <Button variant={"outline"} className="cursor-pointer">
        Sign In
      </Button>
    </SignInButton>
  );
};
