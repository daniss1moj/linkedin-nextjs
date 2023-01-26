import { GrLinkedin } from 'react-icons/gr';
import {
	SearchRounded,
	Group,
	BusinessCenter,
	Chat,
	Notifications,
	HomeRounded,
	AppsOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import HeaderLink from './HeaderLink';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const spring = {
	type: 'spring',
	stiffness: 700,
	damping: 30,
};

const Header = () => {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme, theme } = useTheme();
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	console.log(theme);
	return (
		<header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg w-full mx-auto">
			<div className="flex items-center gap-x-2 w-full max-w-xs">
				{mounted && (
					<>
						{resolvedTheme === 'dark' ? (
							<GrLinkedin className="w-10 h-10 text-[#edebf9]" />
						) : (
							<GrLinkedin className="w-10 h-10 text-[#28168c]" />
						)}
					</>
				)}

				<div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
					<SearchRounded />
					<input
						type="text"
						placeholder="search"
						className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
					/>
				</div>
			</div>
			<div className="flex items-center gap-x-6">
				<HeaderLink Icon={HomeRounded} text="Home" feed active />
				<HeaderLink Icon={Group} text="My Network" feed />
				<HeaderLink Icon={BusinessCenter} text="Jobs" feed hidden />
				<HeaderLink Icon={Chat} text="Messaging" feed />
				<HeaderLink Icon={Notifications} text="Notifications" feed />
				{/* <HeaderLink Icon={Avatar} text="Me" feed avatar hidden /> */}
				<HeaderLink Icon={AppsOutlined} text="Work" feed hidden />
				{mounted && (
					<div
						className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative 
                    ${resolvedTheme === 'dark' ? 'justify-start' : 'justify-end'}`}
						onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
						<span className="absolute left-0">🌜</span>
						<motion.div
							className="w-5 h-5 bg-white rounded-full z-40"
							layout
							transition={spring}
						/>
						<span className="absolute right-0.5">🌞</span>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
