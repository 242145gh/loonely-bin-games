"use client"

import {api} from '../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import HeaderMe from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';


export default function BlogPage({ params }: { params: { name: string } }) {

  //console.debug(params._id)

 const getAuthor = useQuery(api.myFunctions.getAuthor, {name: params.name})
 return (
  <>
    <HeaderMe /> {/* Assuming HeaderMe is another component */}
    <div className='bg-secondary'>
      <Card className='mt-5 ml-10 mr-10 bg-secondary'>
        {/* Mapping over the 'getAuthor' array to render each author */}
        {getAuthor?.map((c) => (
          <div key={c._id}>
            <div className="col-span-2 flex p-1 text-sm"> {/* Each author in a row */}
              <div className="mr-2">
                <Avatar>
                  <AvatarImage width={50} height={50} src={c.pictureId} className='rounded-full ring-3' />
                </Avatar>
              </div>
              <div>
                {/* Display author's name */}
                {c.name}
                {/* Display author's job */}
                {c.job}
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