
'use client';
import '../globals.css';

import Search from '@/components/Search';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import HeaderMe from "@/components/layout/header";

//const searchClient = algoliasearch(
 // '1KIE511890',
 // 'd5802c3142d1d81cebdac1ccbb02ea9f'
//);

const searchClient = algoliasearch
(
  '5JJ918ZR72',
  '3386d55e39a56cac0e99ffb161b8c1a2'
);


console.log(searchClient)
export default function Home() {
  return (
    <>
   <HeaderMe />
    <InstantSearch searchClient={searchClient}>
      <Search />
      
    </InstantSearch>
    </>
  );
}
