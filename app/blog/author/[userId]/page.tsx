"use client"

import {api} from '../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import HeaderMe from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';


export default function BlogPage({ params }: { params: { userId: string } }) {

  //console.debug(params._id)

 const getAuthor = useQuery(api.myFunctions.getAuthor, {userId: params.userId})
 return (
  <>
    <HeaderMe /> {/* Assuming HeaderMe is another component */}
    <div className='bg-secondary'>
      <Card className='mt-5 ml-10 mr-10 bg-secondary'>
        {/* Mapping over the 'getAuthor' array to render each author */}
        {getAuthor?.map((c) => (
          <div key={c._id}>
            <div className="col-span-1 flex p-1"> {/* Each author in a row */}
              <div className="mr-2">
                <Avatar>
                  <AvatarImage width={50} height={50} src={c.pictureId} className='rounded-full ring-3' />
                </Avatar>
             
                {/* Display author's name */}
               <div className='text-3xl'> {c.name}</div>
                {/* Display author's job */}
                <div className='mb-3'>{c.job}</div>
                {/* Display author's bio */}
                {c.bio}
             
             </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  </>
);
};