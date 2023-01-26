const HeaderLink = ({ text, Icon, avatar, feed, active, hidden }) => {
	return (
		<div
			className={` ${
				hidden && 'hidden md:inline-flex'
			} flex flex-col gap-y-1 items-center justify-center cursor-pointer
        ${
			feed
				? 'text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 gap-y-1'
				: 'text-gray-500 hover:text-gray-700'
		} ${active && '!text-black dark:!text-white'}`}>
			{avatar ? <Icon className="!h-7 !w-7 lg:!-mb-1" /> : <Icon />}
			<h4 className={`text-sm ${feed && 'hidden lg:flex justify-center w-full mx-auto'}`}>
				{text}
			</h4>
			{active && (
				<span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full"></span>
			)}
		</div>
	);
};

export default HeaderLink;
