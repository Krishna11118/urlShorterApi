import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  customAlias: {
    type: String,
    unique: true,
    sparse: true,
  },
  topic: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: [{
    timestamp: Date,
    ipAddress: String,
    userAgent: String,
    os: String,
    device: String,
    geolocation: {
      country: String,
      city: String,
    },
  }],
});

export default mongoose.model('Url', urlSchema);

