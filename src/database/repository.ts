import { Tags } from './models';

const databaseQuery = {
  createTag: async (key: string) => {
    return await Tags.create({ key });
  },

  getAllTags: async () => {
    return await Tags.find();
  },

  getTagById: async (id: string) => {
    return await Tags.findById(id);
  },

  updateTag: async (id: string, key: string) => {
    return await Tags.findByIdAndUpdate(id, { key });
  },

  deleteTag: async (id: string) => {
    return await Tags.findByIdAndDelete(id);
  },
};

export { databaseQuery };
