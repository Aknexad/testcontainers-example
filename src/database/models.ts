import mongoose from 'mongoose';

interface ITags {
  workspaceId: mongoose.Schema.Types.ObjectId;
  key: string;
}

const TagsSchema = new mongoose.Schema<ITags>({
  key: { type: String, required: true },
});

export const Tags = mongoose.model<ITags>('tags', TagsSchema);
