import dbConnect from '@/lib/mongodb';
import Invoice from '@/models/Invoice';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const invoice = await Invoice.create(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
