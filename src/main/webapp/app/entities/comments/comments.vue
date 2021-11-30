<template>
  <div>
    <h2 id="page-heading" data-cy="CommentsHeading">
      <span v-text="$t('jhipsterDemoApp.comments.home.title')" id="comments-heading">Comments</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterDemoApp.comments.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CommentsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-comments"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterDemoApp.comments.home.createLabel')"> Create a new Comments </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && comments && comments.length === 0">
      <span v-text="$t('jhipsterDemoApp.comments.home.notFound')">No comments found</span>
    </div>
    <div class="table-responsive" v-if="comments && comments.length > 0">
      <table class="table table-striped" aria-describedby="comments">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.comments.content')">Content</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.comments.name')">Name</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.comments.createTime')">Create Time</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.comments.updateTime')">Update Time</span></th>
            <th scope="row"><span v-text="$t('jhipsterDemoApp.comments.news')">News</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comments in comments" :key="comments.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CommentsView', params: { commentsId: comments.id } }">{{ comments.id }}</router-link>
            </td>
            <td>{{ comments.content }}</td>
            <td>{{ comments.name }}</td>
            <td>{{ comments.createTime ? $d(Date.parse(comments.createTime), 'short') : '' }}</td>
            <td>{{ comments.updateTime ? $d(Date.parse(comments.updateTime), 'short') : '' }}</td>
            <td>
              <div v-if="comments.news">
                <router-link :to="{ name: 'NewsView', params: { newsId: comments.news.id } }">{{ comments.news.title }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CommentsView', params: { commentsId: comments.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CommentsEdit', params: { commentsId: comments.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(comments)"
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
        ><span id="jhipsterDemoApp.comments.delete.question" data-cy="commentsDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-comments-heading" v-text="$t('jhipsterDemoApp.comments.delete.question', { id: removeId })">
          Are you sure you want to delete this Comments?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-comments"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeComments()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./comments.component.ts"></script>
