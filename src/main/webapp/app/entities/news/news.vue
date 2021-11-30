<template>
  <div>
    <h2 id="page-heading" data-cy="NewsHeading">
      <span v-text="$t('jhipsterDemoApp.news.home.title')" id="news-heading">News</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterDemoApp.news.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'NewsCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-news">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterDemoApp.news.home.createLabel')"> Create a new News </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && news && news.length === 0">
      <span v-text="$t('jhipsterDemoApp.news.home.notFound')">No news found</span>
    </div>
    <div class="table-responsive" v-if="news && news.length > 0">
      <table class="table table-striped" aria-describedby="news">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.news.title')">Title</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.news.content')">Content</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.news.top')">Top</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.news.topTime')">Top Time</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.news.createTime')">Create Time</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.news.updateTime')">Update Time</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.news.readCount')">Read Count</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="news in news" :key="news.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'NewsView', params: { newsId: news.id } }">{{ news.id }}</router-link>
            </td>
            <td>{{ news.title }}</td>
            <td>{{ news.content }}</td>
            <td>{{ news.top }}</td>
            <td>{{ news.topTime ? $d(Date.parse(news.topTime), 'short') : '' }}</td>
            <td>{{ news.createTime ? $d(Date.parse(news.createTime), 'short') : '' }}</td>
            <td>{{ news.updateTime ? $d(Date.parse(news.updateTime), 'short') : '' }}</td>
            <td>{{ news.readCount }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'NewsView', params: { newsId: news.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'NewsEdit', params: { newsId: news.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(news)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="jhipsterDemoApp.news.delete.question" data-cy="newsDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-news-heading" v-text="$t('jhipsterDemoApp.news.delete.question', { id: removeId })">
          Are you sure you want to delete this News?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-news"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeNews()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./news.component.ts"></script>
