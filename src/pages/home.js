import { GrLinkedin } from 'react-icons/gr';
import HeaderLink from '@/components/HeaderLink';
import Image from 'next/image';
import src from '@/assets/people.svg';
import {
	OndemandVideoSharp,
	Group,
	Explore,
	BusinessCenter,
	ArrowForwardIosRounded,
} from '@mui/icons-material';
import Head from 'next/head';
import { getProviders, signIn } from 'next-auth/react';
const Home = ({ providers }) => {
	return (
		<div>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="flex justify-between items-center py-4 px-4 max-w-screen-lg mx-auto">
				<GrLinkedin className="w-10 h-10 text-[#28168c]" />
				<div className="flex items-center sm:divide-x divide-gray-300">
					<div className="hidden sm:flex gap-x-5 pr-4">
						<HeaderLink Icon={Explore} text="Discover" />
						<HeaderLink Icon={Group} text="People" />
						<HeaderLink Icon={OndemandVideoSharp} text="Learning" />
						<HeaderLink Icon={BusinessCenter} text="Jobs" />
					</div>
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<div className="pl-4">
								<button
									className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
									onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
									Sign in
								</button>
							</div>
						</div>
					))}
				</div>
			</header>
			<main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
				<div className="space-y-6 xl:space-y-10">
					<h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug">
						Welcome to social media
					</h1>
					<div className="space-y-4">
						<div className="intent">
							<h2 className="text-xl">Search for a job</h2>
							<ArrowForwardIosRounded className="text-gray-700" />
						</div>
						<div className="intent">
							<h2 className="text-xl">Find a person you know</h2>
							<ArrowForwardIosRounded className="text-gray-700" />
						</div>
						<div className="intent">
							<h2 className="text-xl">Learn a new skill</h2>
							<ArrowForwardIosRounded className="text-gray-700" />
						</div>
					</div>
				</div>
				<div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
					<Image src={src} fill priority alt="bg" />
				</div>
			</main>
		</div>
	);
};

export default Home;

export async function getServerSideProps(context) {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
