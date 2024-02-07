"use client";
import React, { useState } from "react";
import "./App.css";
import "./puzzle.css";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import ConfettiExplosion from 'react-confetti-explosion';
import { formatDistance } from "date-fns";
import HeaderMe from '@/components/layout/header';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";

interface JigsawPuzzle {
    imageSrc: string; // Assuming imageSrc is a string, adjust accordingly
    rows: number;
    columns: number;
    onSolved: () => void; // Assuming onSolved is a function taking no arguments
  }

export default function JigsawPuzzleComponent() {

    const img = ['./vw.jpg', './derek.jpg', './squirrel.jpg', './alex.jpg', './shuper.jpg', './yue.jpg', './thimo.jpg'];    
    const randomIndex = Math.floor(Math.random() * img.length);
    const randomImage = img[randomIndex];

    const set = () => {
        setIsExploding(true)
        setText("Congratulations!!")
    };

    const [isExploding, setIsExploding] = React.useState(false);
    const [text, setText] = useState("Unpuzzle the pieces!!");
    const [input, setComment] = useState('');
    const addComment = useMutation(api.myFunctions.addComment);
    const allComments = useQuery(api.myFunctions.allComments);
    const [jigsaw, setJigsaw] = useState<JigsawPuzzle>({
        imageSrc: randomImage,
        rows: 2,
        columns: 2,
        onSolved: set
      });

    const reset = () => {
        setComment('')
    }

    const handleButtonComment = () => {
        addComment({ comment: input });
        reset();
      };
    
      const handleKeyPress = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            handleButtonComment()
        }
      };

    return (
        <>
   
    <HeaderMe />
    <Authenticated>
                <div className='flex py-2 items-center justify-center text-lg font-bold text-green-600'>{text}
                {isExploding &&  <ConfettiExplosion force={0.5} zIndex={1} duration={2500} particleSize={5} height="120vh" colors={[
                    '#FFC700','#FF0000','#2E3191','#41BBC7','#fc59a3','#87c830','#ffd400','#fe7e0f','#8e3ccb']} particleCount={450} />}              
             

               </div>
            <Card className='p-5 ml-5 mr-5 mt-1 mb-5'>
            <Button className='mb-4 mt-4 ml-4 mr-4' variant="ghost" onClick={() => {
                setJigsaw({
                    imageSrc: randomImage,
                    rows: 2,
                    columns: 2,
                    onSolved: set
                });
                setIsExploding(false);
            }}>
            Play again
            </Button>
        
                <JigsawPuzzle {...jigsaw} />
            </Card>
           
   
        <Card className='flex mb-4 mt-4 ml-4 mr-4 items-center'>
        <Input className=' mb-4 mt-4 ml-4 mr-4 w-5/6'
            type="text"
            value={input}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <Button
            className='mb-4 mt-4 ml-4 mr-4'
            variant="ghost"
            onClick={handleButtonComment}
            tabIndex={0}
        >
      Comment
    </Button>
        </Card>
        
        {allComments?.map((message) => (
            <div className="grid grid-cols-1 gap-4" key={message._id}>
                <Card className='mb-4 mt-4 ml-4 mr-4'>
                    <CardTitle>
                        <Avatar>
                            <AvatarImage src={message.pictureId} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {message.name}
                        </CardTitle>
                        {formatDistance((message._creationTime), new Date(), { addSuffix: true })}  
                <CardContent>
                {message.comment}
                </CardContent>
                </Card>
            </div>
        ))}
    </Authenticated>
    <Unauthenticated>
        <div className='flex items-center mt-8 justify-center text-sky-500'>
            <h1>Sign in</h1>
        </div>
    </Unauthenticated>

        </>
    );
}