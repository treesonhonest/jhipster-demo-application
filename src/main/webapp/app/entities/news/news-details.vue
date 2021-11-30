<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="news">
        <h2 class="jh-entity-heading" data-cy="newsDetailsHeading">
          <span v-text="$t('jhipsterDemoApp.news.detail.title')">News</span> {{ news.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterDemoApp.news.title')">Title</span>
          </dt>
          <dd>
            <span>{{ news.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterDemoApp.news.content')">Content</span>
          </dt>
          <dd>
            <span>{{ news.content }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterDemoApp.news.top')">Top</span>
          </dt>
          <dd>
            <span>{{ news.top }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterDemoApp.news.topTime')">Top Time</span>
          </dt>
          <dd>
            <span v-if="news.topTime">{{ $d(Date.parse(news.topTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterDemoApp.news.createTime')">Create Time</span>
          </dt>
          <dd>
            <span v-if="news.createTime">{{ $d(Date.parse(news.createTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterDemoApp.news.updateTime')">Update Time</span>
          </dt>
          <dd>
            <span v-if="news.updateTime">{{ $d(Date.parse(news.updateTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterDemoApp.news.readCount')">Read Count</span>
          </dt>
          <dd>
            <span>{{ news.readCount }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="news.id" :to="{ name: 'NewsEdit', params: { newsId: news.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./news-details.component.ts"></script>
