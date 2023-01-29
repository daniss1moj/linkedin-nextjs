import dbConnect from '@/util/mongo';
import Post from '@/models/Post';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import Comment from '@/models/Comment';
import Like from '@/models/Like';

export default async function handler(req, res) {
	const {
		method,
		query: { id },
	} = req;
	const session = await unstable_getServerSession(req, res, authOptions);

	await dbConnect();
	if (session) {
		if (method === 'DELETE') {
			try {
				const post = await Post.findOne({ _id: id });
				await Promise.all(
					post.comments.map((comment) => {
						return Comment.findByIdAndDelete(comment._id);
					}),
				);
				await Promise.all(
					post.likes.map((like) => {
						return Like.findByIdAndDelete(like._id);
					}),
				);
				await post.remove();
				res.status(201).json({
					message: 'Post has sucessfully deleted!',
				});
			} catch (err) {
				res.status(500).json(err);
			}
		}
	} else {
		res.status(401).json({
			message: 'Unauthorized',
		});
	}
}
