"use client"
import { decode } from 'punycode'
import {api} from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import HeaderMe from '@/components/layout/header';

export default function BlogPage({ params }: { params: { _id: string } }) {

  console.debug(params._id)

 const getBlog = useQuery(api.myFunctions.getBlog, {_id: params._id})
  
  
  return (
  <>
<HeaderMe/>

    {getBlog?.map((c) => (
      <div key={c._id}>
      <div className='flex justify-center  border-2 
      border-sky-500 bg-secondary p-2 mt-5 mb-5 w-full'>
        <h1>{c.title}</h1>
        </div>
        <div className='flex justify-center'>  {c.body}</div>
      
    </div>
    ))}
  </>
  )
}

