import mongoose from 'mongoose';
import User from './User';

const CommentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		text: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Comment = mongoose.models?.Comment || mongoose.model('Comment', CommentSchema);

export default Comment;
