"use client"
import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import HeaderMe from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { formatDate } from "date-fns";
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import { useEffect, useState } from 'react';


export default function BlogPage({ params }: { params: { _id: string } }) {
  const [author, setUserId] = useState('');
  const [extractedMarkdown, setExtractedMarkdown] = useState('');
  const [context, setContext] = useState<string | null>(null);


  const getBlog = useQuery(api.myFunctions.getBlog, { _id: params._id });
  const getAuthor = useQuery(api.myFunctions.getAuthor, { userId: author });

  useEffect(() => {
    if (getBlog && getBlog.length > 0) {
      setUserId(getBlog[0].userId);
      extractMarkDown(getBlog[0].body);
    }
  }, [getBlog]);

  function extractMarkDown(markDown: string) {
    // Regular expression to match markdown content enclosed in backticks
    const regex = /`([^`]*\n?[^`]*)`/;

    // Executing the regular expression on the input string
    const matches = markDown.match(regex);

    const extractedMarkdown = matches ? matches[1].replace(/\\n/g, '\n').trim() : "";

    // Extracting context text before and after the markdown
    const contextTextBefore = markDown.slice(0, matches ? matches.index : markDown.length);
    const contextTextAfter = matches ? markDown.slice((matches.index || 0) + matches[0].length) : '';


    // Combine context before and after
    const contextCombined = contextTextBefore + contextTextAfter;

    // Printing extracted markdown and context text
    console.log("Extracted Markdown:", extractedMarkdown);
    console.log("Context Combined:", contextCombined);

    setExtractedMarkdown("`"+extractedMarkdown+"`");
    setContext(contextCombined);
}


  return (
    <>
      <HeaderMe />
      <div className='col-span-2 flex'>
        <div className='bg-secondary flex-1'>
          <Card className='mt-5 ml-10 mr-10 bg-secondary'>
            {getBlog?.map((c) => (
              <div key={c._id}>
                <div className="col-span-2 flex p-1 text-sm"> {/* Each message in a row */}
                  <div className="mr-2">
                    <Avatar>
                      <AvatarImage width={38} height={38} src={c.pictureId} className='rounded-full ring-3 ' />
                    </Avatar>
                  </div>
                  <div>
                    <span className='text-xs'><Link href={`/blog/author/${c.userId}`} className='hover:underline'>{c.name}</Link></span>
                    <div className='text-xs'>{formatDate(c._creationTime, 'PPpp')}</div>
                  </div>
                </div>
                <div className='flex ml-5 mr-5 justify-center border-2 border-slate-500 bg-secondary p-2 mt-5 mb-5 bg-primary '>
                  <h1>{c.title}</h1>
                  <div className='mb-5'> - {c.summary}</div>
                </div>
                
                
               
                <div className='flex ml-5 mr-5 mb-5 justify-center relative mb-5'>
                  {extractedMarkdown ? (
                    <>
                      {context !== null && (
                        <div dangerouslySetInnerHTML={{ __html: context }} />
                      )}
                      <Markdown text={extractedMarkdown} />
                    </>
                  ) : (
                    <>
                      {context !== null && (
                        <div dangerouslySetInnerHTML={{ __html: context }} />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </Card>
        </div>
        <div className='bg-secondary'>
          {getAuthor?.map((a) => (
            <div key={a._id} className='mr-5 mt-5'>
              <Avatar>
                <AvatarImage src={a.pictureId} width={100} height={100} className='rounded-full ' />
              </Avatar>
              <div className='text-3xl'>{a.name}</div>
              <div className='mt-5'>{a.job}</div>
              <div>{a.bio}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
