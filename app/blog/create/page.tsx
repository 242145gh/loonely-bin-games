"use client";

import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import HeaderMe from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"; // Assuming Button import is correct
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import algoliasearch from "algoliasearch"
import { toast } from "sonner"

export default function CreateBlogPage() {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [summary,setSummary] = useState("");

  const createArticle   = useMutation(api.myFunctions.createArticle);
  const last  = useQuery(api.myFunctions.lastRecord, {});

  const handleButtonComment = () => {
    createArticle({title: title, body: body, summary: summary });
      if (last) {
       
          const articlesArray = last.article; // Assuming the array is stored under the 'article' key
          articlesArray.forEach(article => {
          const id = article._id;
          console.log("last article id is:", id); // You can use the ID as needed
          const client = algoliasearch("5JJ918ZR72","39f936c8f879bdd1c47892010a397f51")
          const index = client.initIndex("stack")
          
          const record = { objectID: article._id, 
            title: article.title,
            type: "article",
            summary: article.summary,
            content: article.body
          };
          index.saveObject(record).wait();

          {/*
                    objectID
          "https://stack.convex.dev/searching-for-sanity"
          title
          "Searching for Sanity"
          type
          "article"
          summary
          "You may be surprised to learn that there’s nothing particularly unusual about what Notion is doing. In most systems, backend search architectures are structured just so:"
          content
          "In this common design, `vardump() ==> '0'; ` the system that stores your records is separate from the system that indexes them …"
                  */}
        index
          .search('stack')
          .then(( {hits } ) => console.log(hits[0]));
        
          setTitle('')
          setBody('')
          setSummary('')

      });
    }
    
  };


  return (
    <>
      <HeaderMe />
      <div className="bg-secondary ml-10 mr-10 mt-10 mb-10">
        <Card className="mt-5 ml-10 mr-10 bg-secondary">
          <div className="grid grid-cols-1 w-full p-5">
          <Label className='mb-2'> Title:</Label> <Input
              className='mb-5'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
             <Label className='mb-2'> Summary: </Label><Textarea
                className='mb-5'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
           <Label className='mb-2'> Contents: </Label><Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            
            <Button
              className="mt-5"
              onClick={() => {
                toast("Success", {
                  description: `Article added`,
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                });
                handleButtonComment();
              }}
            >
              Create Article
            </Button>      
          </div>
        </Card>
      </div>
    </>
  );
}
