"use client";
import * as React from "react"
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { Skeleton } from "@/components/ui/skeleton";
import  PhoneOtpForm from "@/components/phone-login"
import { Button } from "@/components/ui/button"
import OtpInput from "@/components/otp-input";
import { Paragraph } from "@/components/layout/paragraph";
import HeaderMe from "@/components/layout/header";

export default function Home() {
  return (
    <>
    <HeaderMe />
        <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold my-8 text-center">
        Looney bin
        </h1>
        <Authenticated>
          <SignedInContent />
          <Paragraph>Main content</Paragraph>
        </Authenticated>
        <Unauthenticated>
          <div className="flex justify-center items-center">Click one of the buttons in the top right corner to sign in.</div>
        </Unauthenticated>
      </main>

    </>
  );
}


 function SignedInContent() {

  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </>
    );
  }
  return (
    <>
      <p>Welcome {viewer ?? "N/A"}!</p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <Button
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </Button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : numbers?.join(", ") ?? "..."}

      <PhoneOtpForm />
      <OtpInput/>
      </p>
      <p>
        Edit <Code>convex/myFunctions.ts</Code> to change your backend
      </p>
      <p>
        Edit <Code>app/(fullstack)/page.tsx</Code> to change your frontend
      </p>
      <p>
        Check out{" "}
        <Link target="_blank" href="https://docs.convex.dev/home">
          Convex docs
        </Link>
      </p>
      <p>
        To build a full page layout copy one of the included{" "}
        <Link target="_blank" href="/layouts">
          layouts
        </Link>
      </p>
    </>
  );
}


