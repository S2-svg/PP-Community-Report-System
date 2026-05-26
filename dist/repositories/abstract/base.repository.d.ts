import { DeepPartial, EntityTarget, FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
export declare class BaseRepository<T extends object> {
    private readonly entity;
    constructor(entity: EntityTarget<T>);
    protected repository(): Repository<T>;
    findAll(options?: FindManyOptions<T>): Promise<T[]>;
    findById(where: FindOptionsWhere<T>): Promise<T | null>;
    create(data: DeepPartial<T>): Promise<T>;
    update(where: FindOptionsWhere<T>, data: DeepPartial<T>): Promise<(Awaited<T> & T) | null>;
    delete(where: FindOptionsWhere<T>): Promise<T | null>;
}
//# sourceMappingURL=base.repository.d.ts.map