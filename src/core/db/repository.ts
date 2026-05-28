import type { Knex } from "knex";
import { db } from "@/core/db/client";

export type PageOptions = {
  page?: number;
  perPage?: number;
};

export type Page<T> = {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

export abstract class BaseRepository<TRecord extends object> {
  protected constructor(
    protected readonly tableName: string,
    protected readonly database: Knex = db()
  ) {}

  protected table() {
    return this.database<TRecord>(this.tableName);
  }

  async paginate(query: Knex.QueryBuilder<TRecord, TRecord[]>, options: PageOptions = {}): Promise<Page<TRecord>> {
    const page = Math.max(options.page ?? 1, 1);
    const perPage = Math.min(Math.max(options.perPage ?? 20, 1), 100);
    const offset = (page - 1) * perPage;
    const countQuery = query.clone().clearSelect().clearOrder().count<{ count: string }>({ count: "*" }).first();
    const [totalResult, data] = await Promise.all([countQuery, query.clone().limit(perPage).offset(offset)]);
    const total = Number(totalResult?.count ?? 0);

    return {
      data: data as TRecord[],
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage)
      }
    };
  }
}
