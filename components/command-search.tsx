
import * as React from "react"
import {  CalendarIcon,  EnvelopeClosedIcon,  FaceIcon,  GearIcon,  PersonIcon,  RocketIcon} from "@radix-ui/react-icons"
import {  Command,    CommandDialog,    CommandEmpty,    CommandGroup,    CommandInput,    CommandItem,    CommandList,    CommandSeparator,    CommandShortcut  } from "@/components/ui/command"
import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"

export default function CommandMenu() {
    const [open, setOpen] = React.useState(false)
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

    return (<>
    <Button onClick={()=> setOpen((open) => !open)
    } className=" border-1 rounded h-6 w-22" placeholder="Search for games">
        <div className="flex justify-between items-center"><SearchIcon className="w-4 h-4"/><div className="ml-2 mr-10">Search Games ...</div><CommandShortcut>⌘J</CommandShortcut></div>
    </Button>
    
      <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <FaceIcon className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <RocketIcon className="mr-2 h-4 w-4" />
            <span>Launch</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
            <span>Mail</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
    </> )
  }