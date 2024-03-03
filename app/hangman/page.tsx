"use client"
import HeaderMe from '@/components/layout/header';
import Header from '@/components/pages/header';
import { GuessedLetters, HangmanDrawing, Keyboard } from '@/components/pages/home/client';

import { generateRandomWord } from '@/lib/utils/generate-random-word';

import {
	Authenticated,
	Unauthenticated,
} from "convex/react";

export default function HomeHangman() {
	return (
		<>
		<HeaderMe />
		<Header />
		<main>

		<Authenticated>
			<section>
				<div className='max-w-maxi mx-auto py-6 flex items-center justify-center'>
					<HangmanDrawing />
				</div>
			</section>
			<section >
				<div className='max-w-maxi mx-auto py-6'>
					<p className='flex gap-3 items-center justify-center'>
						<GuessedLetters serverWord={generateRandomWord()} />
					</p>
				</div>
			</section>
			<section>
				<div className='max-w-3xl mx-auto py-6'>
					<div className='grid grid-cols-[repeat(auto-fit,_minmax(60px,_1fr))] gap-3'>
						<Keyboard />
					</div>
				</div>
			</section>
			</Authenticated>
		<Unauthenticated>
				<div className='flex items-center mt-8 justify-center text-sky-500'><h1>Sign in</h1></div>
			</Unauthenticated>
			
		</main>

</>
		
		
	);
}
