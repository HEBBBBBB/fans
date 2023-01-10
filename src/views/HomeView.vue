<template>
  <div class="home">
    <el-container class="container">
              
      <el-header class="header" style="background-color: #42b983;">
        <h2>粉丝经济</h2>
      </el-header>
      <el-container class="container">
        <!-- 侧边栏 -->
        <el-aside class="aside" style="width:200px">
          <el-row class="tac">
            <el-col :span="12">
              <el-menu default-active="1-1" class="el-menu-vertical-demo" @select="handleSelect"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>目录</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1" >销量表</el-menu-item>
                    <el-menu-item index="1-2">排行榜</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <!-- 主要内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- 主要内容 -->
      <!-- <el-main>
        <el-tabs id="tabContainer" type="border-card" tab-position="left" v-model="activeName" @tab-click="handleClick">
   
          
        </el-tabs>
      </el-main> -->
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {

  },
  data() {
    return {
      isCollapse: true,
      activeName: 'sale',
      input: "",
      // routerPath: [
      //   [
      //     {}
      //   ]
      // ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === '1-1') {
        this.$router.push({ path: 'saleNo', query: {"type":"7390"} })
      } else if (key === '1-2') { 
        this.$router.push({
          path: 'rank', query: { "type": "211640" } })
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.container{height: 100vh;}
.el-aside{width: 200px;height: 100%;overflow: hidden;}
.el-row {width: 100%;height: 100%;}
.el-col {width: 100%;height: 100%;}
.el-menu {width: 100%;height: 100%;}
.el-header{
  padding: 0;
  h2{margin: 0;line-height: 60px;}
}
#tabContainer{
  height: 100%;
}
</style>
