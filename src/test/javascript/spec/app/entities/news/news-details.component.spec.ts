/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import NewsDetailComponent from '@/entities/news/news-details.vue';
import NewsClass from '@/entities/news/news-details.component';
import NewsService from '@/entities/news/news.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('News Management Detail Component', () => {
    let wrapper: Wrapper<NewsClass>;
    let comp: NewsClass;
    let newsServiceStub: SinonStubbedInstance<NewsService>;

    beforeEach(() => {
      newsServiceStub = sinon.createStubInstance<NewsService>(NewsService);

      wrapper = shallowMount<NewsClass>(NewsDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { newsService: () => newsServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundNews = { id: 123 };
        newsServiceStub.find.resolves(foundNews);

        // WHEN
        comp.retrieveNews(123);
        await comp.$nextTick();

        // THEN
        expect(comp.news).toBe(foundNews);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundNews = { id: 123 };
        newsServiceStub.find.resolves(foundNews);

        // WHEN
        comp.beforeRouteEnter({ params: { newsId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.news).toBe(foundNews);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
