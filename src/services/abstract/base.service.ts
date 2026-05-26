import { DeepPartial, FindManyOptions, FindOptionsWhere } from "typeorm";
import { BaseRepository } from "../../repositories/abstract/base.repository";
import { AppError } from "../../middlewares/error.middleware";

export class BaseService<T extends object> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  findAll(options?: FindManyOptions<T>) {
    return this.repository.findAll(options);
  }

  async findById(where: FindOptionsWhere<T>, notFoundMessage = "Record not found") {
    const item = await this.repository.findById(where);
    if (!item) {
      throw new AppError(404, notFoundMessage);
    }

    return item;
  }

  create(data: DeepPartial<T>) {
    return this.repository.create(data);
  }

  async update(where: FindOptionsWhere<T>, data: DeepPartial<T>, notFoundMessage = "Record not found") {
    await this.findById(where, notFoundMessage);
    return this.repository.update(where, data);
  }

  async delete(where: FindOptionsWhere<T>, notFoundMessage = "Record not found") {
    const deleted = await this.repository.delete(where);
    if (!deleted) {
      throw new AppError(404, notFoundMessage);
    }

    return deleted;
  }
}
