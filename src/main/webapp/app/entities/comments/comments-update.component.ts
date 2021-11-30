import { Component, Vue, Inject } from 'vue-property-decorator';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import NewsService from '@/entities/news/news.service';
import { INews } from '@/shared/model/news.model';

import { IComments, Comments } from '@/shared/model/comments.model';
import CommentsService from './comments.service';

const validations: any = {
  comments: {
    content: {},
    name: {},
    createTime: {},
    updateTime: {},
  },
};

@Component({
  validations,
})
export default class CommentsUpdate extends Vue {
  @Inject('commentsService') private commentsService: () => CommentsService;
  @Inject('alertService') private alertService: () => AlertService;

  public comments: IComments = new Comments();

  @Inject('newsService') private newsService: () => NewsService;

  public news: INews[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.commentsId) {
        vm.retrieveComments(to.params.commentsId);
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
    if (this.comments.id) {
      this.commentsService()
        .update(this.comments)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterDemoApp.comments.updated', { param: param.id });
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
      this.commentsService()
        .create(this.comments)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterDemoApp.comments.created', { param: param.id });
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
      this.comments[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.comments[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.comments[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.comments[field] = null;
    }
  }

  public retrieveComments(commentsId): void {
    this.commentsService()
      .find(commentsId)
      .then(res => {
        res.createTime = new Date(res.createTime);
        res.updateTime = new Date(res.updateTime);
        this.comments = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.newsService()
      .retrieve()
      .then(res => {
        this.news = res.data;
      });
  }
}
