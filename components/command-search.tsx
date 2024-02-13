import * as React from "react";
import { useState } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";
import {  GamepadIcon, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { api } from '../convex/_generated/api';
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import discordPage  from "@/components/discord"


export default function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [search, setCommandSearch] = useState('');
    const [link, setLink] = useState('');
    
    const router = useRouter()

    const commandSearch = useQuery(api.myFunctions.commandSearch, { gamename: search });
    const blogSearch = useQuery(api.myFunctions.blogSearch, { body: search });
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "⌘/" && (e.metaKey || e.ctrlKey)) || e.key === "⌘/") {
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
          router.replace(link)
 
        }
     }

    return (
        <>
        
            <Button onClick={() => setOpen((open) => !open)} className="rounded-full h-6 w-18" placeholder="Search for games" variant={"outline"}>
                <div className="flex justify-between items-center">
                    <SearchIcon className="w-4 h-4" />
                    <div className="ml-2 mr-10">Search ...</div>
                    <CommandShortcut><Badge variant={"outline"} className="h-4" >⌘/</Badge></CommandShortcut>
                </div>
            </Button>

            <CommandDialog  open={open} onOpenChange={setOpen}>
          
                <CommandInput placeholder="Type a command or search..."
                onChangeCapture={onChangeHandler} onKeyDownCapture={handleKeyDown} />
                  <Button onClick={() => discordPage() } variant={"outline"} className="w-50 h-50 flex
             justify-between justify-center items-center">discord</Button>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Blog Pages">
                        {blogSearch?.map((c) => (
                            <Link key={c._id} href={`/blog/${c._id}`}>
                                <CommandItem onSelect={() => 
                                    setLink(`/blog/`+c._id)  
                                   
                                }>
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
            </CommandDialog>
        </>
    );
}
