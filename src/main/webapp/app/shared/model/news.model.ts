import { IComments } from '@/shared/model/comments.model';

export interface INews {
  id?: number;
  title?: string | null;
  content?: string | null;
  top?: boolean | null;
  topTime?: Date | null;
  createTime?: Date | null;
  updateTime?: Date | null;
  readCount?: number | null;
  comments?: IComments[] | null;
}

export class News implements INews {
  constructor(
    public id?: number,
    public title?: string | null,
    public content?: string | null,
    public top?: boolean | null,
    public topTime?: Date | null,
    public createTime?: Date | null,
    public updateTime?: Date | null,
    public readCount?: number | null,
    public comments?: IComments[] | null
  ) {
    this.top = this.top ?? false;
  }
}
