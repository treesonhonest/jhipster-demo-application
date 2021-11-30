/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import NewsService from '@/entities/news/news.service';
import { News } from '@/shared/model/news.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('News Service', () => {
    let service: NewsService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new NewsService();
      currentDate = new Date();
      elemDefault = new News(123, 'AAAAAAA', 'AAAAAAA', false, currentDate, currentDate, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            topTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            createTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            updateTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a News', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            topTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            createTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            updateTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            topTime: currentDate,
            createTime: currentDate,
            updateTime: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a News', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a News', async () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            content: 'BBBBBB',
            top: true,
            topTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            createTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            updateTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            readCount: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            topTime: currentDate,
            createTime: currentDate,
            updateTime: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a News', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a News', async () => {
        const patchObject = Object.assign(
          {
            title: 'BBBBBB',
            top: true,
            createTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            readCount: 1,
          },
          new News()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            topTime: currentDate,
            createTime: currentDate,
            updateTime: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a News', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of News', async () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            content: 'BBBBBB',
            top: true,
            topTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            createTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            updateTime: dayjs(currentDate).format(DATE_TIME_FORMAT),
            readCount: 1,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            topTime: currentDate,
            createTime: currentDate,
            updateTime: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of News', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a News', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a News', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
