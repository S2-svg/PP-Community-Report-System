import { DeepPartial, EntityTarget, FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";

export class BaseRepository<T extends object> {
  constructor(private readonly entity: EntityTarget<T>) {}

  protected repository(): Repository<T> {
    return AppDataSource.getRepository(this.entity);
  }

  findAll(options?: FindManyOptions<T>) {
    return this.repository().find(options);
  }

  findById(where: FindOptionsWhere<T>) {
    return this.repository().findOne({ where });
  }

  create(data: DeepPartial<T>) {
    return this.repository().save(this.repository().create(data));
  }

  async update(where: FindOptionsWhere<T>, data: DeepPartial<T>) {
    const item = await this.findById(where);
    if (!item) {
      return null;
    }

    return this.repository().save(Object.assign(item, data));
  }

  async delete(where: FindOptionsWhere<T>) {
    const item = await this.findById(where);
    if (!item) {
      return null;
    }

    await this.repository().delete(where);
    return item;
  }
}
