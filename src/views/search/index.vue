<template>
  <div>
    <van-nav-bar title="商品搜索"  left-arrow
      @click-left="$router.go(-1)"
    />
    <van-search v-model.trim="searchWord" placeholder="请输入搜索关键词" show-action clearable>
      <template #action>
        <div @click="goSearch(searchWord)">搜索</div>
      </template>
    </van-search>
    <div class='title'>
      <span>最近搜索</span>
      <van-icon name="delete-o" size="24" @click="clear" />
    </div>
    <div class='flex'>
      <van-tag v-for="(item, index) in historySearch"
        @click='goSearch(item)'
        round type="primary" size="large" color="gray" :key='index'>
        {{item}}
      </van-tag>
    </div>
  </div>
</template>

<script>
import { getHistorySearch, setHistorySearch } from '@/utils/storage.js'
export default {
  name: 'searchIndex',
  data () {
    return {
      searchWord: '', // 输入框的内容
      historySearch: getHistorySearch() // 历史记录
    }
  },
  methods: {
    goSearch (key) {
      const index = this.historySearch.indexOf(key)
      if (index !== -1) {
        // 存在相同的项，将原有关键字移除
        this.historySearch.splice(index, 1)
      }
      if (key !== '') {
        this.historySearch.unshift(key)
      }
      setHistorySearch(this.historySearch)
      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.historySearch = [] // 页面搜索历史清空
      setHistorySearch([]) // 清空本地localstorage中该数据
    }
  }
}
</script>

<style scoped>
   ::v-deep .van-search__action {
    width: 75px;
    background-color: #c21401;
    color: #fff;
    text-align: center;
    border-radius: 0 12% 12% 0;
    margin-right: 15px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin: 15px;
  }
  .flex {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    margin: 10px 15px;
  }
  .van-tag {
    margin: 5px 10px;
  }
</style>
