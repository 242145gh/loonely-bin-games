"use client";
import * as React from "react"
import { Authenticated, Unauthenticated } from "convex/react";
import { Link } from "@/components/typography/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { StickyHeader } from "@/components/layout/sticky-header";
import { MoonIcon, SunIcon, PuzzlePieceIcon } from '@heroicons/react/24/solid'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu,  DropdownMenuContent,  DropdownMenuItem,  DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenuList, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { GamepadIcon, MenuIcon, WholeWordIcon } from "lucide-react";

export default function HeaderMe() {
  const { setTheme } = useTheme()

  const Menu = (
    <>
      <div className=" flex ml-3 mb-3">Game list</div>
        <div className=" flex ml-3 mb-2 text-lg gap-1">
          <WholeWordIcon className="h-[1.2rem] w-[1.2rem]" />
          <Link href="/hangman" >Hangman </Link>
        </div>
        <div className=" flex ml-3 mb-2 text-lg gap-1">
          <PuzzlePieceIcon className="h-[1.2rem] w-[1.2rem]"/>  
          <Link href="/jugsaw" >Jigsaw Puzzle </Link>
        </div>
        <div className=" flex ml-3 mb-2 text-lg gap-1">
          <GamepadIcon className="h-[1.2rem] w-[1.2rem]" />  
          <Link href="/next-snake" >Snake </Link>
        </div>
        </>
  );

  function SignInAndSignUpButtons() {
    return (
      <div className="flex gap-4">
        <Authenticated>
          <UserButton afterSignOutUrl="#" />
        </Authenticated>
        <Unauthenticated>
          <SignInButton mode="redirect">
            <Button variant="ghost">Sign in</Button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <Button>Sign up</Button>
          </SignUpButton>
        </Unauthenticated>
      </div>
  );
}

  return (
    <>
      <StickyHeader>
          <div className="flex justify-between items-center ml-2">
          <Sheet>
      <SheetTrigger>
        <MenuIcon/>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Game List</SheetTitle>
          <SheetDescription>
          {Menu}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
      </Sheet>
          <Link className="flex absolute ml-10 size-lg bold" href="/">looney bin</Link>
              <div className="flex mr-1 p-2 gap-2">
              <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger></NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              {Menu}
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>
              <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
              <SignInAndSignUpButtons />
            </div>
              </div>
              
              </StickyHeader>
          </>
        );
      }
