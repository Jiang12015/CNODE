<template>
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="..\assets\loading.gif">
    </div>
    <div class="posts" v-else>
      <ul>
        <li>
          <nav class="nav">
            <router-link to="/" :class="{active: $route.query.tab == 'all' || !$route.query.tab}">全部</router-link>
            <router-link to="/?tab=good" :class="{active: $route.query.tab == 'good'}">精华</router-link>
            <router-link to="/?tab=share" :class="{active: $route.query.tab == 'share'}">分享</router-link>
            <router-link to="/?tab=ask" :class="{active: $route.query.tab == 'ask'}">问答</router-link>
            <router-link to="/?tab=job" :class="{active: $route.query.tab == 'job'}">招聘</router-link>
          </nav>
        </li>
        <li v-for="post in posts">
          <!-- 头像 -->
          <img :src="post.author.avatar_url" alt>
          <!-- 回复量/浏览量 -->
          <span class="allcount">
            <span class="reply_count">{{post.reply_count}}</span>
            <span>/{{post.visit_count}}</span>
          </span>
          <!-- 帖子分类 -->
          <span
            :class="[{put_good:(post.good== true),put_top:(post.top==true),
          'topiclist-tab':(post.good !=true && post.top !=true)}]"
          >{{post | tabFormatter}}</span>
          <!-- 标题 -->
          <router-link
            :to="{name:'post_content',params:{
            id:post.id,
            name:post.author.loginname
          }}"
          >
            <span>{{post.title}}</span>
          </router-link>
          <!-- 最终回复时间 -->
          <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
        </li>
        <li>
          <!--分页-->
          <pagination ></pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pagination from './Pagination'
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: []
    };
  },
  components:{pagination},
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          page: 1,
          limit: 20
        })
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
        })
        .catch(err => {
          //处理返回失败后的问题
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.posts {
  margin-top: 10px;
}

.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
  background: #f5f5f5;
}

li:last-child:hover {
  background: white;
}

li span {
  line-height: 30px;
}

.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.nav {
  height: 40px;
  background-color: #f5f5f5;
  a {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
    &:hover {
      color: #9e78c0;
    }
    &.active {
      color: red;
      border-radius: 3px;
    }
  }
}

.toobar span:hover {
  color: #9e78c0;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
</style>
