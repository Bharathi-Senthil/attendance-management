import { FindOptions, Model } from "sequelize";

type Constructor<T> = new (...args: any[]) => T;

type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;

export abstract class IRepository<T extends Model> {
  constructor(protected model: ModelType<T>) {}

  get(id: string, options?: any): Promise<T | null> {
    return this.model.findByPk<T>(id, options);
  }

  getAll(options?: any): Promise<T[] | null> {
    return this.model.findAll<T>(options);
  }

  find(where: FindOptions<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }

  create(data: T): Promise<T> {
    return this.model.create(data.dataValues);
  }

  update(id: any, data: T): Promise<any> {
    return this.model.update(data.dataValues, {
      where: { id },
    });
  }

  delete(id: any): Promise<number> {
    return this.model.destroy({
      where: { id },
    });
  }
}
