import {
  AggregateOptions,
  Attributes,
  CountOptions,
  CountWithOptions,
  FindAndCountOptions,
  FindOptions,
  GroupedCountResultItem,
} from 'sequelize';
import { Model } from 'sequelize';
import { SetRequired } from 'sequelize/types/utils/set-required';

export class ModelService<M extends Model> {
  constructor(private readonly model: typeof Model<M>) {}

  async findOne(options: FindOptions<Attributes<M>>): Promise<M> {
    const res: M = await this.model.findOne.bind(this.model)(options);
    return res;
  }

  async findAll(options: FindOptions<Attributes<M>>): Promise<M[]> {
    return await this.model.findAll.bind(this.model)(options);
  }

  async findAndCountAll(
    options: SetRequired<FindAndCountOptions<Attributes<M>>, 'group'>,
  ): Promise<{ rows: M[]; count: GroupedCountResultItem[] }>;
  async findAndCountAll(
    options: Omit<FindAndCountOptions<Attributes<M>>, 'group'>,
  ): Promise<{ rows: M[]; count: number }>;
  async findAndCountAll(
    options: FindAndCountOptions<Attributes<M>>,
  ): Promise<{ rows: M[]; count: number | GroupedCountResultItem[] }> {
    return await this.model.findAndCountAll.bind(this.model)(options);
  }

  async findById(id: number): Promise<M> {
    return await this.model.findByPk.bind(this.model)(id);
  }

  async count(options: CountWithOptions<Attributes<M>>): Promise<GroupedCountResultItem[]>;
  async count(options: Omit<CountOptions<Attributes<M>>, 'group'>): Promise<number>;
  async count(options: CountOptions<Attributes<M>>): Promise<number | GroupedCountResultItem[]> {
    return await this.model.count.bind(this.model)(options);
  }

  async sum(field: keyof Attributes<M>, options: AggregateOptions<M, Attributes<M>>): Promise<number> {
    return await this.model.sum.bind(this.model)(field, options);
  }

  async updateById(id: number, data: Partial<Attributes<M>>): Promise<M> {
    return await this.model.update.bind(this.model)(data, { where: { id } });
  }
}
