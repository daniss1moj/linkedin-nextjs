import { modalState } from '@/atoms/modalAtom';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { handlePostState } from '@/atoms/postAtom';
const Form = () => {
	const [input, setInput] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const [modalOpen, setModalOpen] = useRecoilState(modalState);
	const [handlePost, setHandlePost] = useRecoilState(handlePostState);

	const { data: session } = useSession();

	const uploadPost = async (e) => {
		e.preventDefault();
		const response = await fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				text: input,
				photoUrl,
				user: session.user.id,
			}),
		});
		const data = await response.json();
		setHandlePost(true);
		setModalOpen(false);
	};

	return (
		<form className="flex flex-col relative gap-y-2 text-black/80 dark:text-white/75">
			<textarea
				placeholder="What do you want to talk about?"
				rows="4"
				className="bg-transparent focus:outline-none dark:placeholder-white/75 resize-none"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Add a photo URL (optional)"
				className="bg-transparent focus:outline-none truncate
				max-w-xs md:max-w-sm dark:placeholder-white/75"
				value={photoUrl}
				onChange={(e) => setPhotoUrl(e.target.value)}
			/>
			<button
				className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/100 disabled:bg-white/75 disabled:cursor-not-allowed rounded-full px-3.5 py-1"
				disabled={!input.trim()}
				type="submit"
				onClick={uploadPost}>
				Post
			</button>
		</form>
	);
};

export default Form;
