import Head from 'next/head';
import Image from 'next/image';

import { getSession, signOut, useSession } from 'next-auth/react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import Feed from '@/components/Feed';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '@/atoms/modalAtom';
import Modal from '@/components/Modal';
import axios from 'axios';
import Widgets from '@/components/Widgets';
import { connectToDatabase } from '@/util/mongo';

export default function Home({ posts, articles }) {
	const router = useRouter();
	const [modalOpen, setModalOpen] = useRecoilState(modalState);
	const [modalType, setModalType] = useRecoilState(modalTypeState);
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/home');
		},
	});

	if (status === 'loading') {
		return `Loading or not authenticated`;
	}

	return (
		<div className="bg-[#f3f2ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
			<Head>
				<title>Linkedin</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className="flex justify-center gap-x-5 px-4 sm:px-12">
				<div className="flex flex-col md:flex-row gap-5">
					<Sidebar />
					<Feed posts={posts} />
				</div>
				<Widgets articles={articles} />
				<AnimatePresence>
					{modalOpen && (
						<Modal handleClose={() => setModalOpen(false)} type={modalType} />
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	//Check if user is authenticated
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: '/home',
			},
		};
	}

	// Get posts on SSR
	const { db } = await connectToDatabase();
	const posts = await db.collection('posts').find().sort({ timestamp: -1 }).toArray();

	const {
		data: { articles },
	} = await axios.get(
		`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`,
	);

	return {
		props: {
			articles: articles,
			session,
			posts: posts,
		},
	};
}
