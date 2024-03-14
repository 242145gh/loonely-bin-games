"use client"
import { api } from "../../../convex/_generated/api";
import { Authenticated, useMutation, useQuery } from "convex/react";
import HeaderMe from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import algoliasearch from "algoliasearch";
import toast from 'react-hot-toast';

export default function CreateBlogPage() {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const createArticle = useMutation(api.myFunctions.createArticle);
  const last = useQuery(api.myFunctions.lastRecord, {});

  const handleButtonComment = () => {
    if (!title || !summary || !body) {
      toast.error('Please fill in all fields.');
      
    }else{
     
      
      if (last) {
        last.article.forEach(article => {
          const id = article._id;
          console.log("last article id is:", id);
          const client = algoliasearch("5JJ918ZR72", "39f936c8f879bdd1c47892010a397f51");
          const index = client.initIndex("stack");
          const record = {
            objectID: article._id,
            title: article.title,
            type: "article",
            summary: article.summary,
            content: article.body
          };
          
         
          index.search('stack').then(({ hits }) => console.log(hits[0]));
          setTitle('');
          setBody('');
          setSummary('');
          toast.promise(
    new Promise((resolve, reject) => {
        createArticle({
            title: JSON.stringify(title).slice(1, -1),
            body: JSON.stringify(body).slice(1, -1),
            summary: JSON.stringify(summary).slice(1, -1)
        }).then(article => {
            index.saveObject(record).then(savedRecord => {
                resolve(savedRecord);
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            reject(error);
        });
    }),
    {
        loading: 'Saving...',
        success: <b>Article saved!</b>,
        error: <b>Could not save.</b>,
    }
);
        });
      }
    }
  };

  return (
    <>
      <HeaderMe />
      <Authenticated>
        <div className="bg-secondary ml-10 mr-10 mt-10 mb-10">
          <Card className="mt-5 ml-10 mr-10 bg-secondary">
            <div className="grid grid-cols-1 w-full p-5">
              <Label className='mb-2'> Title:</Label>
              <Input
                className='mb-5'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Label className='mb-2'> Summary: </Label>
              <Textarea
                className='mb-5'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <Label className='mb-2'> Contents: </Label>
              <div className="bg-neutral-n8">If you want code Markdown use quote ` code ` the article appears in Markdown format.</div>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <Button
                className="mt-5"
                onClick={() => {
                  
                  handleButtonComment();
                }}
              >
                Create Article
              </Button>
            </div>
          </Card>
        </div>
      </Authenticated>
    </>
  );
}
