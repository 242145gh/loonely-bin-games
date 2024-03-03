"use client"

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
import {  Configure, InstantSearch, InstantSearchServerState, InstantSearchSSRProvider, Hits, Highlight, getServerState } from 'react-instantsearch';
import { useCallback } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import algoliasearch from 'algoliasearch/lite';
const client = algoliasearch('5JJ918ZR72', '3386d55e39a56cac0e99ffb161b8c1a2');
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
 
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
    search: string;

  }>;
};


 function Hit({ hit }: HitProps) {

  const runCommando = useCallback((command: () => unknown) => {command();  }, []);  
  const routero = useRouter()
  console.log(hit.messages);
  const url = `https://discord.com/channels/1206282035904385124/1208419816881266698/threads/${hit.objectID}`
  return (
   
    <CommandItem onSelect={() => {
      runCommando(() => routero.push(url))
  }} 
  >
    
      <div className="grid grid-cols-2">
     
              <span className="col-span-2 underline font-bold text-md text-violet-500">{hit.title}</span>
            
            {hit.messages
               .slice(1, 13) // Limiting to first 3 messages
               .sort((a, b) => hit.date - hit.date)
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





export default  function CommandMenu({ serverState, url }: HomePageProps) {


  const runCommand = useCallback((command: () => unknown) => {command();  }, []);  
  
  
  const [open, setOpen] = useState(false)
  const [search, setCommandSearch] = useState('');
  const runCommandSearch = useCallback((command: () => unknown) => {command();  }, []);  
  const router = useRouter();

  const commandSearch = useQuery(api.myFunctions.commandSearch, { gamename: search });
  const blogSearch = useQuery(api.myFunctions.blogSearch, { body: search });

      useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
          }
        }
    
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
      }, [])

      const onChangeHandler = (e: any) => {
       


        console.log(e.target.value);

        runCommandSearch(() => setCommandSearch(e.target.value));
        

      };

  

   


  return (
    <>
     <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>

      <CommandDialog open={open} onOpenChange={setOpen}  >
        <CommandInput placeholder="Type a command or search..." onChangeCapture={onChangeHandler} />
        <Tabs defaultValue="blog-games" className="w-full h-250 p-1 mt-1 mb-1 ml-1 mr-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="blog-games">Blog & games</TabsTrigger>
        <TabsTrigger value="discord">Discord</TabsTrigger>
      </TabsList>
      <TabsContent value="blog-games">
        <Card className="p-1 ml-1 mr-1">
        <CommandList >
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Blog Pages">
            {blogSearch?.map((c) => (
              <Link key={c._id} href={`/blog/${c._id}`}>
              <CommandItem          
                onSelect={() => {
                  runCommand(() => router.push(`/blog/` + c._id));
                }}>
                {c.body}
              </CommandItem>
                  
              
              </Link>
            ))}
          </CommandGroup>
    
          <CommandGroup heading="Games">
            {commandSearch?.map((c) => (
              <Link key={c._id} href={c.link} >
                <CommandItem onSelect={() => 
                    runCommand(() => router.push(c.link))
                  } 
                >
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
      <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Discord Search"> 
                <InstantSearchSSRProvider {...serverState}>
                  <InstantSearch
                    searchClient={client}
                    indexName="discord"
                  >
                    <Configure 
                     
                     hitsPerPage={10}
                    />
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

