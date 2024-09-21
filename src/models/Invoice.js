import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  invoiceNo: String,
  billFrom: {
    name: String,
    address: String,
    contact: String,
    gstin: String,
  },
  billTo: {
    name: String,
    address: String,
    contact: String,
    gstin: String,
  },
  invoiceDate: Date,
  dueDate: Date,
  items: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
      totalPrice: Number,
    }
  ],
  gst: Number,
  totalAmount: Number,
  bankDetails: {
    accountNumber: String,
    bankName: String,
    ifscCode: String,
  },
  status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
});

export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
