import { Request } from 'express';
import { AppDataSource } from "../data-source"
import { Repository} from 'typeorm';
import { BaseNotification } from '../entity/BaseNotification';

export abstract class BaseController<T> extends BaseNotification {

  private _repository: Repository<T>;

  constructor(entity: any) {
    super();
    this._repository = AppDataSource.getRepository<T>(entity);
  }

  async all() {
    return this._repository.find();
  }

  async one(request: Request) {
    return this._repository.findOne(request.params);
  }

  async save(model: any) {

    if (model.uid) {
      let _modelInDB = await this._repository.findOne(model.uid);
      if (_modelInDB) {
        Object.assign(_modelInDB, model);
      }
    }

    if (this.valid())
      return this._repository.save(model);
    else
      return {
        status: 400,
        errors: this.allNotifications
      }
  }

  async remove(request: Request) {
    let uid = request.params.id;
    let model: any = await this._repository.find(request.params);
    if (model) {
      model.deleted = true;
    }
    return this._repository.save(model);
  }

  get repository(): Repository<T> {
    return this._repository;
  }

}