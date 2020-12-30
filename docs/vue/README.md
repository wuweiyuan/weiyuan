## vuex

创建 store 对象

```js
const store = new Vuex.Store({
  //state 中存放的就是全局共享的数据
  state: {
    count: 0,
  },
  //用于变更store中的数据，可以监控所有数据的变化 ,入参就是state这个对象  ,step是传过来的参数
  //不要在mutations中执行异步代码
  //只有mutations才有权利修改state中的值
  mutations: {
    add(state, step) {
      //变更状态
      state.count += step;
    },
  },
  //用于处理异步任务，但是还是要通过出发mutations的方式来简洁变更数据，context实例对象
  //在actions中，不能直接修改state中的值，必须通过context.commit()触发
  //携带参数跟mutations一样
  actions: {
    addSync(context, step) {
      setTimeout(() => {
        console.log(step);
        context.commit("add");
      }, 1000);
    },
  },
});
```

将 store 挂载到 vue 实例中

```js
new Vue({
  el: "app",
  render: (h) => h(app),
  router,
  //将store挂载到vue实例中
  //所有组件，就可以直接从store中获取全局数据了
  store,
});
```

## 组件访问 vuex 中 state 中的数据方式

```js
//第一种
this.$store.state.全局数据名称
//第二种
//从vuex中按需导入mapSate函数
import {mapState } from 'vuex';
//通过刚才导入的mapState函数，将当前的组件需要的全局数据，映射为当前组件的computed计算属性
computed:{
  ...mapState(['count'])
}

```

## 调用 mutations 中的函数方式

```js
//第一种
//2的是参数
this.$store.commit('add',1)
//第二种
//从vuex中按需导入mapMutations函数
import {mapMutations} from 'vuex'
//映射为methods函数
methods:{
  ...mapMutations(['add','addN'])
}
//调用
this.add()

```

## 触发 Action

```js
  //第一种方式 2 为参数
  this.$store.dispatch('addSync'.2)
  //第二种
  //从vuex中按需导入mapActions函数
  import {mapActions} from 'vuex'
  //映射成methods方法
  methods:{
    ...mapAction([addSync])
  }
```
