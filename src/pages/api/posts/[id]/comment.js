import { authOptions } from '../../auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import Comment from '@/models/Comment';
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
				const comment = await Comment.create(body);
				const post = await Post.findById(id);
				post.comments.push(comment);
				await post.save();
				res.status(201).json(post);
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
