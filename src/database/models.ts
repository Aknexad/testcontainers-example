import mongoose from 'mongoose';

interface ITags {
  key: string;
}

const TagsSchema = new mongoose.Schema<ITags>({
  key: { type: String, required: true },
});

export const Tags = mongoose.model<ITags>('tags', TagsSchema);
