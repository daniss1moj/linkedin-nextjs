import { authOptions } from '../../auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import Like from '@/models/Like';
import Post from '@/models/Post';
import dbConnect from '@/util/mongo';
export default async function handler(req, res) {
	const {
		method,
		body,
		query: { id },
	} = req;
	const session = await unstable_getServerSession(req, res, authOptions);
	await dbConnect();
	if (session) {
		if (method === 'POST') {
			try {
				const post = await Post.findById(id).populate('likes');
				if (post.likes.find((like) => like.user.toString() === session.user.id)) {
					post.likes = post.likes.filter(
						(like) => like.user.toString() !== session.user.id,
					);
				} else {
					const like = await Like.create(body);
					post.likes.push(like);
				}

				await post.save();
				const liked = Boolean(
					post.likes.find((like) => like.user.toString() === session.user.id),
				);
				res.status(201).json({ post, liked: liked });
			} catch (err) {
				res.status(500).json(err);
				console.log(err.message);
			}
		}
	} else {
		res.status(401).json({
			message: 'Unauthorized user',
		});
	}
}
