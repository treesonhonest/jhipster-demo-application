<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterDemoApp.comments.home.createOrEditLabel"
          data-cy="CommentsCreateUpdateHeading"
          v-text="$t('jhipsterDemoApp.comments.home.createOrEditLabel')"
        >
          Create or edit a Comments
        </h2>
        <div>
          <div class="form-group" v-if="comments.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="comments.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.comments.content')" for="comments-content">Content</label>
            <input
              type="text"
              class="form-control"
              name="content"
              id="comments-content"
              data-cy="content"
              :class="{ valid: !$v.comments.content.$invalid, invalid: $v.comments.content.$invalid }"
              v-model="$v.comments.content.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.comments.name')" for="comments-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="comments-name"
              data-cy="name"
              :class="{ valid: !$v.comments.name.$invalid, invalid: $v.comments.name.$invalid }"
              v-model="$v.comments.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.comments.createTime')" for="comments-createTime"
              >Create Time</label
            >
            <div class="d-flex">
              <input
                id="comments-createTime"
                data-cy="createTime"
                type="datetime-local"
                class="form-control"
                name="createTime"
                :class="{ valid: !$v.comments.createTime.$invalid, invalid: $v.comments.createTime.$invalid }"
                :value="convertDateTimeFromServer($v.comments.createTime.$model)"
                @change="updateInstantField('createTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.comments.updateTime')" for="comments-updateTime"
              >Update Time</label
            >
            <div class="d-flex">
              <input
                id="comments-updateTime"
                data-cy="updateTime"
                type="datetime-local"
                class="form-control"
                name="updateTime"
                :class="{ valid: !$v.comments.updateTime.$invalid, invalid: $v.comments.updateTime.$invalid }"
                :value="convertDateTimeFromServer($v.comments.updateTime.$model)"
                @change="updateInstantField('updateTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.comments.news')" for="comments-news">News</label>
            <select class="form-control" id="comments-news" data-cy="news" name="news" v-model="comments.news">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="comments.news && newsOption.id === comments.news.id ? comments.news : newsOption"
                v-for="newsOption in news"
                :key="newsOption.id"
              >
                {{ newsOption.title }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.comments.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./comments-update.component.ts"></script>
