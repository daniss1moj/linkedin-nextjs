import mongoose from 'mongoose';
import User from './User';
import Like from './Like';
import Comment from './Comment';

const PostSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		text: {
			type: String,
			required: true,
		},
		photoUrl: {
			type: String,
		},
		likes: {
			type: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Like',
				},
			],
		},
		comments: {
			type: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Comment',
				},
			],
		},
	},
	{
		timestamps: true,
	},
);

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;
