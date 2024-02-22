import * as React from "react";
import { useState, useEffect } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { api } from '../convex/_generated/api';
import { useQuery } from "convex/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation";
import { Hit as AlgoliaHit } from 'instantsearch.js';
import { GetServerSideProps } from 'next';
import { renderToString } from 'react-dom/server';
import {  InstantSearch, InstantSearchServerState, InstantSearchSSRProvider, Hits, Highlight, getServerState } from 'react-instantsearch';

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import algoliasearch from 'algoliasearch/lite';
const client = algoliasearch('5JJ918ZR72', '3386d55e39a56cac0e99ffb161b8c1a2');
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "./ui/label";


type Message = {
  author: {
    avatar: string;
    convexer: boolean;
    name: string;
  };
  body: string;
};

type HomePageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

type HitProps = {
  hit: AlgoliaHit<{
    title: string;
    objectID: string;
    date: number;
    messages: Message[];
  }>;
};

function Hit({ hit }: HitProps) {
  console.log(hit.messages);
  return (
    <CommandItem>
    
      <div className="grid grid-cols-2">
            <Link href={`https://discord.com/channels/1206282035904385124/1208419816881266698/threads/${hit.objectID}`} 
                className="underline font-bold text-md text-violet-500">
              <span className="col-span-2">{hit.title}</span>
         </Link>
            {hit.messages
               .slice(1, 13) // Limiting to first 3 messages
               .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((message, index) => (
                    <div key={index} className="col-span-2 flex p-1"> {/* Each message in a row */}
                        <div className="mr-2">
                            <Avatar>
                                <AvatarImage src={message.author.avatar} />
                            </Avatar>
                        </div>
                        <div>
                            <span>{message.author.name}</span>
                            <div>{message.body}</div>
                        </div>
                    </div>
                ))}
        </div>

</CommandItem>

  );
}

export default function CommandMenu({ serverState, url }: HomePageProps) {

  const [open, setOpen] = useState(false);
  const [search, setCommandSearch] = useState('');
  const [link, setLink] = useState('');
  const router = useRouter();

  const commandSearch = useQuery(api.myFunctions.commandSearch, { gamename: search });
  const blogSearch = useQuery(api.myFunctions.blogSearch, { body: search });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "/" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onChangeHandler = (e: any) => {
    console.log(e.target.value);

    setCommandSearch(e.target.value);
    

  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("hello");
      console.log("link is:", link);
      router.replace(link);
    }
  };



  return (
    <>
      <Button onClick={() => setOpen((open) => !open)} className="rounded-full h-6 w-18" placeholder="Search for games" variant={"outline"}>
        <div className="flex justify-between items-center">
          <SearchIcon className="w-4 h-4" />
          <div className="ml-2 mr-10">Search ...</div>
          <CommandShortcut><Badge variant={"outline"} className="h-4" >⌘/</Badge></CommandShortcut>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} >
        <CommandInput placeholder="Type a command or search..." onChangeCapture={onChangeHandler} onKeyDownCapture={handleKeyDown}/>
        <Tabs defaultValue="blog-games" className="w-full h-250 p-1 mt-1 mb-1 ml-1 mr-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="blog-games">Blog & games</TabsTrigger>
        <TabsTrigger value="discord">Discord</TabsTrigger>
      </TabsList>
      <TabsContent value="blog-games">
        <Card className="p-1 ml-1 mr-1">
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Blog Pages">
            {blogSearch?.map((c) => (
              <Link key={c._id} href={`/blog/${c._id}`}>
                <CommandItem onSelect={() => setLink(`/blog/` + c._id)}>
                  {c.body}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
    
          <CommandGroup heading="Games">
            {commandSearch?.map((c) => (
              <Link key={c._id} href={c.link}>
                <CommandItem onSelect={() => setLink(c.link)}>
                  {c.gamename}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
       </CommandList>
        </Card>
      </TabsContent>
      <TabsContent value="discord">
      <Card>
      <CommandList>
        <CommandGroup heading="Discord Search"> 
                <InstantSearchSSRProvider {...serverState}>
                  <InstantSearch
                    searchClient={client}
                    indexName="discord"
                  >
                    <Hits hitComponent={Hit} />
                  </InstantSearch>
                </InstantSearchSSRProvider>
            </CommandGroup>
          </CommandList>
      </Card>
      </TabsContent>
    </Tabs>
      
   
      </CommandDialog>
    </>
  );
}

// Define the getServerSideProps function to fetch data for server-side rendering
export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ req }) => {
  const protocol = req.headers.referer?.split('://')[0] || 'https';
  const url = `${protocol}://${req.headers.host}${req.url}`;
  // Generate server state using React InstantSearch's getServerState function
  const serverState = await getServerState(<CommandMenu url={url} />, {
    renderToString: renderToString as (element: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => string, // Explicitly define the type
  });

  return {
    props: {
      serverState,
      url,
    },
  };
};
