import Link from 'next/link';
import { ResetBoard } from './client';

export default function Header() {
	return (
		<header className='border-b'>
			<div className='max-w-maxi mx-auto py-4 flex items-center justify-between'>
				<p>
				</p>
				<p>
					<ResetBoard>🛝 Play again</ResetBoard>
				</p>
			</div>
		</header>
	);
}
