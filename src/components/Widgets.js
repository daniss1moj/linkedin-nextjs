import { FiberManualRecord, InfoRounded } from '@mui/icons-material';
import TimeAgo from 'timeago-react';
import Image from 'next/image';

const Widgets = ({ articles }) => {
	return (
		<div className="hidden xl:inline space-y-2">
			<div
				className="bg-white dark:bg-[#1d2226] py-2.5 rouned-lg space-y-2 w-11/12 overflow-hidden
        border border-gray-300 dark:border-none px-2.5">
				<div className="flex items-center justify-between">
					<h4>Linkedin News</h4>
					<InfoRounded className="w-5 h-5" />
				</div>
				<div className="space-y-1">
					{articles.slice(0, 5).map((article) => {
						return (
							<div
								key={article.url}
								className="flex space-x-2 items-center cursor-pointer   dark:hover:bg-black/20 py-2.5">
								<FiberManualRecord className="!h-2 !w-2" />
								<div>
									<h5 className="max-w-xs font-medium text-sm truncate pr-10">
										{article.title}
									</h5>
									<TimeAgo
										datetime={article.publishedAt}
										className="text-sm mt-0.5 dark:text-white/75 opacity-80"
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="bg-white dark:bg-[#1d2226] w-11/12 h-64 px-2.5 rounded-lg sticky top-20 border border-gray-300 dark:border-none">
				<div className="w-full h-full relative">
					<Image src="https://rb.gy/kbfeaa" fill objectFit="contain" priority />
				</div>
			</div>
		</div>
	);
};

export default Widgets;
