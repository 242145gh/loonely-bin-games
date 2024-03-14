
import ReactMarkdown from 'react-markdown';
import { CopyIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


interface MarkdownProps {
  text: string;
}

export default function Markdown({ text }: MarkdownProps) {
  const [copied, setCopy] = useState(false);
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 text-neutral-n5 ">{children}</p>,
        pre: ({ children }) => (
          <div className="mb-4 max-h-72 w-full overflow-x-auto rounded bg-black-900 p-2">
            <pre className="text-neutral-n5">{children}</pre>
          </div>
        ),
        code: ({ children }) => (
          <>
            <div className='absolute right-0 p-2'>
            <HoverCard>
  <HoverCardTrigger>

            <CopyToClipboard text={text} onCopy={() => setCopy(true)}>
              <Button onClick={() => {}} variant="ghost">
                <CopyIcon width={24} height={24}/>
              </Button>
              </CopyToClipboard></HoverCardTrigger>
              <HoverCardContent>
    
    Copy
  </HoverCardContent>
</HoverCard>
              {copied && <span style={{ color: 'green' }}>Copied.</span>}
            </div>
            <div className='overflow-x-auto border p-2 shadow ring-4 mt-2 mb-2 ml-2 mr-2 rounded'>
              <code className="break-words bg-black text-slate-400">
                {children}
              </code>
            </div>
          </>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-inside list-decimal text-neutral-n5">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="text-neutral-n5">{children}</li>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
