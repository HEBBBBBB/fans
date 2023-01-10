<template>
  <div class="contain">
    <div style="text-align: left;padding-bottom: 20px;">
      <el-button :plain="true" @click="clickSaleNoReload">刷新数据</el-button>
      <p>标题:{{ typeName }}</p>
      <p>最近更新时间:{{ lastUpdate }}</p>
    </div>
    <el-tab-pane  label="销量表" name="sale" style="display: block;">
      <el-table :data="tableData" stripe style="width: 100%;">
        <el-table-column prop="member" label="成员">
        </el-table-column>
        <el-table-column prop="count" label="数量">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </div>
</template>

<script>
export default {
  name: 'SaleList',
  data() { 
    return {
      type:"",
      typeName: "type_name",
      lastUpdate: "2023/01/01 00:00:00",
      tableData: [
        // {
        //   member: '陈奕迅',
        //   count: '20'
        // },
        // {
        //   member: '张敬轩',
        //   count: '18'
        // }
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
    this.loadSale(() => {
      this.$message({
        message: '获取成功',
        type: 'success'
      });
    })
  },
  methods: {
    loadSale(_callback, _error) {
      this.axios.post('/api/saleNo', "type=" + this.type).then((res) => {
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
    clickSaleNoReload() {
      this.axios.post('/api/saleNo_reload', "type=" + this.type).then((res) => {
        console.log(res)
        let result = res.data;
        if (result.code == 200) {
          this.loadSale(() => {
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
