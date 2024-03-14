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

  const [formattedData, setFormattedData] = useState<string | null>(null);
  const [author, setUserId] = useState<string>('');
  const [extractedMarkdown, setExtractedString] = useState<string | null>(null);
  const [markdownWithoutBackticks, setMarkdownWithoutBackticks] = useState<string | null>(null);


  const getBlog = useQuery(api.myFunctions.getBlog, { _id: params._id });
  const getAuthor = useQuery(api.myFunctions.getAuthor, { userId: author });

  useEffect(() => {
    if (getBlog && getBlog.length > 0) {
      displayData(getBlog[0].body);
      setUserId(getBlog[0].userId);
      extractMarkDown(getBlog[0].body);
    }
  }, [getBlog]);

  function displayData(jsonData: string) {
    // Replace newline characters with <br> tags
    const formattedDataValue = jsonData.replace(/\\n/g, '<br>');
    setFormattedData(formattedDataValue);
  }

  function extractMarkDown(markDown: string) {
    const regex = /`([^`]*)`/g;
    const matches = markDown.match(regex);
    const extractedContent = matches ? matches[0].replace(/`/g, '').trim() : "";
    const markdownWithoutBackticks = matches ? markDown.replace(matches[0], extractedContent) : markDown;
    setExtractedString("`" + extractedContent + "`");
    setMarkdownWithoutBackticks(markdownWithoutBackticks);
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
                </div>
                <div className='flex ml-5 mr-5 mb-5 justify-center relative'>
                  {formattedData && (
                    <>
                      
                        <div dangerouslySetInnerHTML={{ __html: markdownWithoutBackticks }} />
                      
                     
                      <Markdown text={extractedMarkdown} />
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
