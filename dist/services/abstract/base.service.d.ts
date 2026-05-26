import { DeepPartial, FindManyOptions, FindOptionsWhere } from "typeorm";
import { BaseRepository } from "../../repositories/abstract/base.repository";
export declare class BaseService<T extends object> {
    protected readonly repository: BaseRepository<T>;
    constructor(repository: BaseRepository<T>);
    findAll(options?: FindManyOptions<T>): Promise<T[]>;
    findById(where: FindOptionsWhere<T>, notFoundMessage?: string): Promise<T>;
    create(data: DeepPartial<T>): Promise<T>;
    update(where: FindOptionsWhere<T>, data: DeepPartial<T>, notFoundMessage?: string): Promise<(Awaited<T> & T) | null>;
    delete(where: FindOptionsWhere<T>, notFoundMessage?: string): Promise<T>;
}
//# sourceMappingURL=base.service.d.ts.map