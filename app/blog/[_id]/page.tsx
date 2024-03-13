"use client"

import {api} from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import HeaderMe from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { formatDate } from "date-fns";
import Link from 'next/link';

export default function BlogPage({ params }: { params: { _id: string } }) {

  //console.debug(params._id)

 const getBlog = useQuery(api.myFunctions.getBlog, {_id: params._id})
  
  
  return (
  <>
<HeaderMe/>
<div className='bg-secondary'>
  
    <Card  className='mt-5 ml-10 mr-10 bg-secondary'>
    {getBlog?.map((c) => (
      <div key={c._id}>
    <div className="col-span-2 flex p-1 text-sm"> {/* Each message in a row */}
         <div className="mr-2">
            <Avatar>
              <AvatarImage width={38} height={38} src={c.pictureId} className='rounded-full ring-3 ' />
            </Avatar>
              </div>
              <div>
              <span className='text-xs'><Link href={`/blog/author/${c.name}`} className='hover:underline'>{c.name} </Link></span> 
                  <div className='text-xs'>{formatDate(c._creationTime,'PPpp')}</div>
              </div>
             
          </div>
      
      <div className='flex ml-5 mr-5 justify-center  border-2 
      border-slate-500 bg-secondary p-2 mt-5 mb-5 bg-primary '>
        <h1>{c.title}</h1>
        </div>
        <div className='flex ml-5 mr-5  mb-5 justify-center'>  {c.body}</div>
      
    </div>
    ))}
    </Card>
    </div>
  </>
  )
}

