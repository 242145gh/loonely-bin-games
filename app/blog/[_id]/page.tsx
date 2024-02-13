"use client"

import {api} from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import HeaderMe from '@/components/layout/header';
import { Card } from '@/components/ui/card';

export default function BlogPage({ params }: { params: { _id: string } }) {

  console.debug(params._id)

 const getBlog = useQuery(api.myFunctions.getBlog, {_id: params._id})
  
  
  return (
  <>
<HeaderMe/>
    <Card  className='mt-5 ml-10 mr-10'>
    {getBlog?.map((c) => (
      <div key={c._id}>
      <div className='flex ml-5 mr-5 justify-center  border-2 
      border-slate-500 bg-secondary p-2 mt-5 mb-5 '>
        <h1>{c.title}</h1>
        </div>
        <div className='flex ml-5 mr-5  mb-5 justify-center'>  {c.body}</div>
      
    </div>
    ))}
    </Card>
  </>
  )
}

