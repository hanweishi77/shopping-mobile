<template>
  <div>
    <van-nav-bar title="商品搜索"  left-arrow
      @click-left="$router.go(-1)"
    />
    <van-search  placeholder="请输入搜索关键词" show-action>
      <template #action>
        <div @click="$router.push('/searchList')">搜索</div>
      </template>
    </van-search>
    <div class='title'><span>最近搜索</span><van-icon name="delete-o" size="24"/></div>
    <div class='flex'>
      <van-tag round type="primary" size="large" color="gray">手机</van-tag>
      <van-tag round type="primary" size="large" color="gray">冰箱</van-tag>
      <van-tag round type="primary" size="large" color="gray">洗衣机</van-tag>
      <van-tag round type="primary" size="large" color="gray">手机</van-tag>
      <van-tag round type="primary" size="large" color="gray">冰箱</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchIndex'
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
