<template>
  <div class="comment-list-container">
    <div class="sanjiao"></div>
    <ul>
      <li>
        <div class="title">
          <p>于鹏</p>
          <p>2020/01/03 08:48:53</p>
        </div>
        <div>其实我是支持灭霸的理想，但是方式太简单残暴(过瘾是过瘾，从未加过如此牛逼的响指)，复联3结尾锤哥(不对，应该叫斧哥了)就应该一斧子把灭霸的手砍下来，切吧切吧剁了。</div>
      </li>
      <el-divider></el-divider>
      <li>
        <div class="title">
          <p>于鹏</p>
          <p>2020/01/03 08:48:53</p>
        </div>
        <div>其实我是支持灭霸的理想，但是方式太简单残暴(过瘾是过瘾，从未加过如此牛逼的响指)，复联3结尾锤哥(不对，应该叫斧哥了)就应该一斧子把灭霸的手砍下来，切吧切吧剁了。</div>
      </li>
      <el-divider></el-divider>
    </ul>
    <el-pagination background layout="total,sizes, prev, pager, next, jumper" :total="45" :current-page="2" :page-sizes="[5, 10, 20, 50]"
                   :page-size="5" class="comment-pagination">
    </el-pagination>
  </div>
</template>
<style lang="scss" scoped>
.comment-list-container {
  clear: both;

  //三角
  .sanjiao {
    width: 0;
    height: 0;
    overflow: hidden;
    font-size: 0;
    /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
    line-height: 0;
    /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
    border-width: 10px;
    border-style: solid dashed dashed dashed;
    /*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
    border-color:  transparent transparent #f5f5f5 transparent;
    /* 定位*/
    position: relative;
    margin-bottom: -16px;
    left: 15px;

  }


  ul {
    background-color: #f5f5f5;
    list-style-type: none;
    padding: 0 20px;
    text-align: left;

    .title {
      display: flex;
      justify-content: space-between;
    }
  }

  .comment-pagination {
    padding-bottom: 20px;
  }
}
</style>

