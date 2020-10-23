import { Next, Context } from 'koa';
import { Service } from 'typedi';

import DrugRepository from '../database/drug-repository';
import AbstractController from './abstract-controller';

@Service()
export default class DrugController extends AbstractController {
  constructor(private drugRepository: DrugRepository) {
    super();
  }

  async getAll(ctx: Context, next: Next) {
    try {
      const allCitizens = await this.drugRepository.getAll();
      ctx.response.body = allCitizens;

      await next();
    } catch (err) {
      ctx.response.body = 500;
    }
  }

  async get(ctx: Context, next: Next) {
    const id = ctx.params.drugUUID;

    if (!this.validIdentifiers(ctx, id)) return;

    try {
      const citizen = await this.drugRepository.get(id);
      if (citizen && citizen.length > 0) {
        ctx.response.body = citizen[0];
      } else {
        ctx.response.body = '';
      }

      await next();
    } catch (err) {
      ctx.response.body = 500;
    }
  }
}
