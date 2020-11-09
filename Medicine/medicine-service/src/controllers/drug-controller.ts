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
      const allDrugs = await this.drugRepository.getAll();
      ctx.response.body = allDrugs;

      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  async get(ctx: Context, next: Next) {
    const { drugUUID } = ctx.params;

    if (!this.validIdentifiers(ctx, drugUUID)) return;

    try {
      const drugs = await this.drugRepository.get(drugUUID);
      if (drugs && drugs.length > 0) {
        ctx.response.body = drugs[0];
      } else {
        ctx.response.body = null;
      }

      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}
