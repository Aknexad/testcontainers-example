import { repository } from './database';

class Logic {
  private repo = repository;
  constructor() {}

  async createTag(key: string) {
    await this.repo.databaseQuery.createTag(key);

    return {};
  }

  async getAllTags() {
    const tags = await this.repo.databaseQuery.getAllTags();

    if (tags.length === 0) {
      return {
        tags: [],
      };
    }

    const cleanTags = tags.map(tag => {
      return { id: tag._id, key: tag.key };
    });

    return {
      tags: cleanTags,
    };
  }

  async getTagById(id: string) {
    const tag = await this.repo.databaseQuery.getTagById(id);

    return tag;
  }

  async updateTag(id: string, key: string) {
    await this.repo.databaseQuery.updateTag(id, key);

    return {};
  }

  async deleteTag(id: string) {
    await this.repo.databaseQuery.deleteTag(id);

    return {};
  }
}

export { Logic };
