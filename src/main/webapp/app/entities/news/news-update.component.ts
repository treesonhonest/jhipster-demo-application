import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import CommentsService from '@/entities/comments/comments.service';
import { IComments } from '@/shared/model/comments.model';

import { INews, News } from '@/shared/model/news.model';
import NewsService from './news.service';

const validations: any = {
  news: {
    title: {},
    content: {},
    top: {},
    topTime: {},
    createTime: {},
    updateTime: {},
    readCount: {},
  },
};

@Component({
  validations,
})
export default class NewsUpdate extends mixins(JhiDataUtils) {
  @Inject('newsService') private newsService: () => NewsService;
  @Inject('alertService') private alertService: () => AlertService;

  public news: INews = new News();

  @Inject('commentsService') private commentsService: () => CommentsService;

  public comments: IComments[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.newsId) {
        vm.retrieveNews(to.params.newsId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.news.id) {
      this.newsService()
        .update(this.news)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterDemoApp.news.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.newsService()
        .create(this.news)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterDemoApp.news.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.news[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.news[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.news[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.news[field] = null;
    }
  }

  public retrieveNews(newsId): void {
    this.newsService()
      .find(newsId)
      .then(res => {
        res.topTime = new Date(res.topTime);
        res.createTime = new Date(res.createTime);
        res.updateTime = new Date(res.updateTime);
        this.news = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.commentsService()
      .retrieve()
      .then(res => {
        this.comments = res.data;
      });
  }
}
