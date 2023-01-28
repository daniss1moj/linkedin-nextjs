import dbConnect from '@/util/mongo';
import User from '@/models/User';

export default async function handle(req, res) {
	const {
		query: { id },
	} = req;
	await dbConnect();
	if (req.method === 'GET') {
		try {
			const user = await User.findById(id);
			res.status(200).json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
