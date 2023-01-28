import dbConnect from '@/util/mongo';
import Post from '@/models/Post';
import User from '@/models/User';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
export default async function handler(req, res) {
	const { method, body } = req;
	const session = await unstable_getServerSession(req, res, authOptions);

	await dbConnect();

	if (method === 'GET') {
		try {
			const posts = await Post.find()
				.populate('user likes')
				.populate({
					path: 'comments',
					populate: {
						path: 'user',
					},
				})
				.sort({ createdAt: -1 });
			res.status(200).json(posts);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	}

	if (method === 'POST') {
		if (session) {
			try {
				const post = await Post.create(body);
				console.log(token);
				res.status(201).json(post);
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json({
				message: 'Unauthorized user',
			});
		}
	}
}
