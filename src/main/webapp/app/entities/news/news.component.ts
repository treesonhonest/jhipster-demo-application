import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { INews } from '@/shared/model/news.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import NewsService from './news.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class News extends mixins(JhiDataUtils) {
  @Inject('newsService') private newsService: () => NewsService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public news: INews[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllNewss();
  }

  public clear(): void {
    this.retrieveAllNewss();
  }

  public retrieveAllNewss(): void {
    this.isFetching = true;
    this.newsService()
      .retrieve()
      .then(
        res => {
          this.news = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: INews): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeNews(): void {
    this.newsService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterDemoApp.news.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllNewss();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
