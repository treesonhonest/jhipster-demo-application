<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterDemoApp.news.home.createOrEditLabel"
          data-cy="NewsCreateUpdateHeading"
          v-text="$t('jhipsterDemoApp.news.home.createOrEditLabel')"
        >
          Create or edit a News
        </h2>
        <div>
          <div class="form-group" v-if="news.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="news.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.news.title')" for="news-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="news-title"
              data-cy="title"
              :class="{ valid: !$v.news.title.$invalid, invalid: $v.news.title.$invalid }"
              v-model="$v.news.title.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.news.content')" for="news-content">Content</label>
            <textarea
              class="form-control"
              name="content"
              id="news-content"
              data-cy="content"
              :class="{ valid: !$v.news.content.$invalid, invalid: $v.news.content.$invalid }"
              v-model="$v.news.content.$model"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.news.top')" for="news-top">Top</label>
            <input
              type="checkbox"
              class="form-check"
              name="top"
              id="news-top"
              data-cy="top"
              :class="{ valid: !$v.news.top.$invalid, invalid: $v.news.top.$invalid }"
              v-model="$v.news.top.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.news.topTime')" for="news-topTime">Top Time</label>
            <div class="d-flex">
              <input
                id="news-topTime"
                data-cy="topTime"
                type="datetime-local"
                class="form-control"
                name="topTime"
                :class="{ valid: !$v.news.topTime.$invalid, invalid: $v.news.topTime.$invalid }"
                :value="convertDateTimeFromServer($v.news.topTime.$model)"
                @change="updateInstantField('topTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.news.createTime')" for="news-createTime">Create Time</label>
            <div class="d-flex">
              <input
                id="news-createTime"
                data-cy="createTime"
                type="datetime-local"
                class="form-control"
                name="createTime"
                :class="{ valid: !$v.news.createTime.$invalid, invalid: $v.news.createTime.$invalid }"
                :value="convertDateTimeFromServer($v.news.createTime.$model)"
                @change="updateInstantField('createTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.news.updateTime')" for="news-updateTime">Update Time</label>
            <div class="d-flex">
              <input
                id="news-updateTime"
                data-cy="updateTime"
                type="datetime-local"
                class="form-control"
                name="updateTime"
                :class="{ valid: !$v.news.updateTime.$invalid, invalid: $v.news.updateTime.$invalid }"
                :value="convertDateTimeFromServer($v.news.updateTime.$model)"
                @change="updateInstantField('updateTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterDemoApp.news.readCount')" for="news-readCount">Read Count</label>
            <input
              type="number"
              class="form-control"
              name="readCount"
              id="news-readCount"
              data-cy="readCount"
              :class="{ valid: !$v.news.readCount.$invalid, invalid: $v.news.readCount.$invalid }"
              v-model.number="$v.news.readCount.$model"
            />
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
            :disabled="$v.news.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./news-update.component.ts"></script>
