"use client"
import * as React from "react"
import { useState} from "react"
import {  Command,    CommandDialog,    CommandEmpty,    CommandGroup,    CommandInput,    CommandItem,    CommandList,    CommandSeparator,    CommandShortcut  } from "@/components/ui/command"
import { GamepadIcon, SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { api } from '../convex/_generated/api';
import {useMutation,useQuery} from "convex/react"
import Link from "next/link"


export default function CommandMenu() {
    const [open, setOpen] = useState(false)
    const [search, setCommandSearch] = useState('');

    const  commandSearch = useQuery(api.myFunctions.commandSearch, {gamename: search})
  
    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" || e.key === "J" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
    
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])


    const onChangeHandler = (e: any) => {
      console.log(e.target.value)
     
      setCommandSearch(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, link: string) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          window.location.href = link; // Navigate to the link
      }
  }

    console.log(commandSearch)

    return (<>
    <Button onClick={()=> setOpen((open) => !open)
    } className=" rounded h-6 w-22" placeholder="Search for games">
        <div className="flex justify-between items-center"><SearchIcon className="w-4 h-4"/><div className="ml-2 mr-10">Search Games ...</div><CommandShortcut>⌘J</CommandShortcut></div>
    </Button>
    
      <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." onChangeCapture={onChangeHandler}/>
      <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Games">
  
          {commandSearch?.map((c) => (
             <Link href={c.link}>
             <CommandItem key={c._id} onKeyDown={(e) => handleKeyDown(e, c.link)} tabIndex={0}>
                           
              
            {c.gamename}                
           
       </CommandItem>

       </Link>   
       
          ))}
      
      </CommandGroup>
      </CommandList>
        
    </CommandDialog>
    </> )
  }