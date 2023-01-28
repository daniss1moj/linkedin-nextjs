import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { handlePostState, useSSRPostsState } from '@/atoms/postAtom';
import Post from './Post';
const Feed = ({ posts }) => {
	const [realTimePosts, setRealTimePosts] = useState([]);
	const [handlePost, setHandlePost] = useRecoilState(handlePostState);
	const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('http://localhost:3000/api/posts', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			setRealTimePosts(data);
			setHandlePost(false);
			setUseSSRPosts(false);
		};
		fetchPosts();
	}, [handlePost]);

	return (
		<div className="space-y-6 pb-24 max-w-lg">
			<Input />
			{!useSSRPosts
				? realTimePosts.map((post) => {
						return <Post key={post._id} post={post} />;
				  })
				: posts.map((post) => <Post key={post._id} post={post} />)}
		</div>
	);
};

export default Feed;
