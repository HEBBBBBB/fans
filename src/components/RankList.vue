<template>
  <div class="contain">
    <div style="text-align: left;padding-bottom: 20px;">
      <el-button :plain="true" @click="clickRankReload">刷新数据</el-button>
      <p>标题:{{ typeName }}</p>
      <p>最近更新时间:{{ lastUpdate }}</p>
    </div>
    <el-tab-pane label="排行榜" name="rank" style="display: block;">
      <el-table :data="tableData" stripe style="width: 100%;">
        <el-table-column prop="sum" label="数量"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="last_order" label="最后订单时间"></el-table-column>
        <el-table-column prop="fullname" label="全名"></el-table-column>
      </el-table>
    </el-tab-pane>
  </div>
</template>

<script>
export default {
  name: 'RankList',
  data() { 
    return {
      type:"",
      typeName: "type_name",
      lastUpdate: "2023/01/01 00:00:00",
      tableData: [
        {
          sum: '1',
          name: '陈奕迅',
          nickname: '肥陈',
          last_order: '2023/01/01 00:00:00',
          fullname: '陈奕迅'
        },
        {
          sum: '2',
          name: '张敬轩',
          nickname: '丧轩',
          last_order: '2023/01/01 00:00:00',
          fullname: '张敬轩'
        },
      ]
    }
  },
  mounted() { 
    console.log(this.$route);
    this.type = this.$route.query.type;
    if (this.type == 'undefined') { 
      this.$message.error("type参数错误");
    }
    console.log(this.type);
    this.loadRank(() => {
      this.$message({
        message: '获取成功',
        type: 'success'
      });
    })
  },
  methods: {
    loadRank(_callback, _error) {
      this.axios.post('/api/rank', "type=" + this.type).then((res) => {
        console.log(res)
        let result = res.data;
        if (result.code == 200) {
          this.tableData = result.data;
          this.lastUpdate = result.last_update;
          this.typeName = result.type_name;
          !!_callback && _callback();
        } else {
          !!_error && _error();
        }
      })
    },
    clickRankReload() {
      this.axios.post('/api/rank_reload', "type=" + this.type).then((res) => {
        console.log(res)
        let result = res.data;
        if (result.code == 200) {
          this.loadRank(() => {
            this.$message({
              message: '刷新成功',
              type: 'success'
            });
          })

        } else {
          this.$message.error('刷新失败：' + result.result);
        }
      })
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
