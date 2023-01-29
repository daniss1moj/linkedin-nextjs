import {
	MoreHorizRounded,
	CloseRounded,
	CommentOutlined,
	ThumbUpOffAltRounded,
	ThumbUpOffAltOutlined,
	ReplyRounded,
	DeleteRounded,
} from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '@/atoms/modalAtom';
import { handlePostState } from '@/atoms/postAtom';
import { useState } from 'react';
import { getPostState } from '@/atoms/postAtom';
import { useSession } from 'next-auth/react';
import TimeAgo from 'timeago-react';

import { AnimatePresence, motion } from 'framer-motion';

const dropIn = {
	hidden: {
		y: '-100%',
		opacity: 0,
	},
	visible: {
		y: '0',
		opacity: 1,
		transition: {
			duration: 0.1,
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: '100%',
		opacity: 0,
		transition: {
			duration: 0.2,
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
};

const gifYouUp = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

const Post = ({ post, modalPost }) => {
	const [modalOpen, setModalOpen] = useRecoilState(modalState);
	const [modalType, setModalType] = useRecoilState(modalTypeState);
	const [postState, setPostState] = useRecoilState(getPostState);
	const [handlePost, setHandlePost] = useRecoilState(handlePostState);
	const [showInput, setShowInput] = useState(false);
	const [openComments, setOpenComments] = useState(false);
	const [comment, setComment] = useState('');
	const { data: session } = useSession();

	const [liked, setLiked] = useState(
		Boolean(post.likes.find((like) => like.user === session.user.id)),
	);

	const truncate = (string, n) => {
		return string?.length > n ? string.substr(0, n - 1) + '...see more' : string;
	};

	const handleClickPostImg = (post) => {
		setModalOpen(true);
		setModalType('gifYouUp');
		setPostState(post);
	};

	const deletePost = async () => {
		const response = await fetch(`/api/posts/${post._id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});

		setHandlePost(true);
		setModalOpen(false);
	};

	const likePost = async () => {
		setLiked(!liked);
		const response = await fetch(`/api/posts/${post._id}/like`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user: session?.user?.id }),
		});
		setHandlePost(true);
	};

	const createComment = async () => {
		const response = await fetch(`/api/posts/${post._id}/comment`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user: session?.user?.id, text: comment }),
		});
		setHandlePost(true); // trigger csr rerender
		setComment('');
	};

	return (
		<div
			className={`bg-white dark:bg-[#1d2226]  ${
				modalPost ? '!rounded-r-lg' : 'rounded-lg'
			} space-y-2 py-2.5 px-2.5 border border-gray-300 dark:border-none`}>
			<div className="flex items-center  gap-x-2 cursor-pointer">
				<Avatar src={post.user.image} className="!h-10 !w-10 cursor-pointer" />
				<div className="mr-auto leading-none">
					<h6 className="font-medium hover:text-blue hove">{post.user.name}</h6>

					<p className="text-sm dark:text-white/75 opacity-80">{post.user.email}</p>
					<TimeAgo
						datetime={post.createdAt}
						className="text-xs dark:text-white/75 opacity-80"
					/>
				</div>
				{modalPost ? (
					<IconButton onClick={() => setModalOpen(false)}>
						<CloseRounded className="dark:text-white/75 h-7 w-7" />
					</IconButton>
				) : (
					<IconButton onClick={() => setModalOpen(false)}>
						<MoreHorizRounded className="dark:text-white/75 h-7 w-7" />
					</IconButton>
				)}
			</div>

			{post.text && (
				<div className="break-all md:break-normal">
					<p onClick={() => setShowInput(!showInput)}>
						{modalPost || showInput ? post.text : truncate(post.text, 150)}
					</p>
				</div>
			)}

			{post.photoUrl && !modalPost && (
				<img
					src={post.photoUrl}
					alt="postImage"
					className="w-full cursor-pointer"
					onClick={() => handleClickPostImg(post)}
				/>
			)}

			<div className="flex gap-x-2 items-center dark:border-t border-gray-600/80 pt-2 text-black/60 dark:text-white/75 ">
				<motion.button
					className={`postButton ${openComments && 'text-blue-500'}`}
					onClick={() => setOpenComments(!openComments)}
					whileTap={{
						scale: 1.2,
						transition: 0.3,
					}}>
					<CommentOutlined />
					<h4>Comments ({post.comments.length})</h4>
				</motion.button>

				<motion.button
					className={`postButton ${liked && 'text-blue-500'}`}
					onClick={likePost}
					whileTap={{
						scale: 1.2,
						transition: 0.3,
					}}>
					{liked ? (
						<ThumbUpOffAltRounded className="-scale-x-100" />
					) : (
						<ThumbUpOffAltOutlined className="-scale-x-100" />
					)}
					<h4>Like</h4>
				</motion.button>

				{session?.user?.id === post.user._id ? (
					<motion.button
						className="postButton focus:text-red-400"
						onClick={deletePost}
						whileTap={{
							scale: 1.2,
							transition: 0.3,
						}}>
						<DeleteRounded />
						<h4>Delete</h4>
					</motion.button>
				) : (
					<button className="postButton">
						<ReplyRounded className="-scale-x-100" />
						<h4>Share</h4>
					</button>
				)}
			</div>
			{openComments && (
				<AnimatePresence>
					<motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit">
						{!modalPost && (
							<div className="flex items-center gap-x-2">
								<Avatar
									src={session?.user?.image}
									className="!h-10 !w-10 cursor-pointer"
								/>
								<motion.input
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="rounded-full border border-gray-300 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									placeholder="Write a post"
								/>
								<button
									className=" font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/100 disabled:bg-white/75 disabled:cursor-not-allowed rounded-full px-3.5 py-1"
									disabled={!comment.trim()}
									type="submit"
									onClick={createComment}>
									Post
								</button>
							</div>
						)}
						{openComments && (
							<div
								className={`!mt-10 flex flex-col gap-y-5 w-full pr-3 ${
									modalPost &&
									'max-h-[120px] overflow-y-scroll  !scrollbar !scrollbar-track-transparent !scrollbar-thumb-slate-700 !scrollbar-thin'
								}`}>
								{post.comments.map((comment, i) => {
									return (
										<motion.div
											className="flex items-start gap-x-2"
											key={comment._id}
											variants={gifYouUp}
											initial="hidden"
											animate="visible"
											transition={{
												duration: 0.2,
												delay: 0.05 * i,
											}}>
											<Avatar
												src={comment?.user?.image}
												className="!h-10 !w-10 cursor-pointer !mt-1"
											/>
											<div className="bg-gray-100 text-black/70 dark:bg-gray-900 dark:text-white flex flex-col gap-y-3 p-2.5 rounded-2xl w-full">
												<div className="flex items-center justify-between">
													<h6 className="font-medium text-lg">
														{comment?.user?.name}
													</h6>
													<TimeAgo
														className="text-black/60 dark:text-gray-300 text-sm"
														datetime={comment.createdAt}
													/>
												</div>
												<p>{comment.text}</p>
											</div>
										</motion.div>
									);
								})}
							</div>
						)}
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
};

export default Post;
