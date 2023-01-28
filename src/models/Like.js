import mongoose from 'mongoose';
import User from './User';

const LikeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
});

const Like = mongoose.models?.Like || mongoose.model('Like', LikeSchema);

export default Like;
