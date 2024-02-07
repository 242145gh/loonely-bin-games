"use client";
import * as React from "react"
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "@/components/typography/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"
import HeaderMe from "@/components/layout/header";
import  Image  from "next/image"

export default function Home() {
  return (
    <>
    <HeaderMe />
          <Authenticated>
          <SignedInContent />
        </Authenticated>
        <Unauthenticated>
        <main className="">
        <section className="">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Play Awesome Arcade Games written in Nextjs
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Play the best games on the planet in one place!
            </p>
            <Button asChild variant="snake">
              <Link href="/next-snake" >Try and beat the highscore in snake</Link>
            </Button>
          </div>
          <div className="col-span-5">
            <Image
              priority
              src="/landing.jpg"
              alt="mockup"
              width="600"
              className="w-full"
              height="400"
            />
          </div>
        </div>
      </section>
    </main>
        </Unauthenticated>
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
    
    
      <div className="p-2">Welcome {viewer ?? "N/A"}!</div>
      </>
  );
}


