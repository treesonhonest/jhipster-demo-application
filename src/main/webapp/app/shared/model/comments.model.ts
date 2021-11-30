import { INews } from '@/shared/model/news.model';

export interface IComments {
  id?: number;
  content?: string | null;
  name?: string | null;
  createTime?: Date | null;
  updateTime?: Date | null;
  news?: INews | null;
}

export class Comments implements IComments {
  constructor(
    public id?: number,
    public content?: string | null,
    public name?: string | null,
    public createTime?: Date | null,
    public updateTime?: Date | null,
    public news?: INews | null
  ) {}
}
