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
  //Getter用于对store中的数据进行加工处理形成新的数据
  //不会修改源数据
  //有包装数据的作用
  //类似vue的计算性属性
  //store中的数据发生变化，getter的数据也会跟着变化
  getters: {
    showNumber(state) {
      return "当前最新的数量是" + state.count;
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

## 使用 getter 的方式

```js
//第一种
this.$store.getters.名称
//第二种
import  {mapGetters} from 'vuex'
computed:{
   ...mapGetters(['showNumber'])
}
```

## vue 按需加载组建

```js
//这个是在路由里面实现的
{
  path:'/wwy',
  name:'wwy',
  component:()=>import('../views/wwy.vue')//关键代码
}
```

## vue3 中，如果使用了 reactive，如果需要响应式，应该还需再用 toRefs

```js
const data: DataInter = reactive({
  count: 0,
  doubule: computed(() => {
    return data.count * 2;
  }),
  onClick: () => {
    data.count++;
  },
});
const refData = toRefs(data);
```

## vue3 和 vue2 生命周期的变化

<img src='/image/vue3life.png'/>

## vue3 onRenderTriggered 可以监视数据的变化(类似一个生命周期)

```js
onRenderTriggered((event) => {
  console.log(event);
});
```

## vue3watch 使用

```js
//aaa是监听的变量
watch(aaa,(new,old)=>{

})
//也可以同时监听两个变量
watch([aaa,bbb],()=>{

})
//如果要监听reactive中的某一个值。z这样才不会报错
watch([aaa,()=>data.count],()=>{

})
```

## vue3 teleport 瞬间移动

```js
//可以把弹窗挂载在其他dom节点（音乐有些弹窗在很深的子组件里面，可以让它挂在外面的dom），避免被污染
//mount为外面id为mount的dom节点
<teleport to="mount">//这里面是要挂载的组件</teleport>
```

## Suspense 是 vue3 推出的一个内置的特殊的组件，需要返回一个 promise

<img src='/image/suspensePromise.png'/>
可以显示接口还没返回时，需要显示的内容，而且#default里面可以包裹多个组件，等全部接口都完成，再一起显示。
<img src='/image/suspenseHtml.png'/>

## vue3获取节点
```js
//例如html
<div ref='dom'></div>
//则在setup需要
const dom = ref<null|HTMLElement>(null)
return{
  dom
}
//之后在setup里面，就可以通过dom.value获取到dom节点
```

## vue3自定义组件属性如何传到组件内部想要的dom节点上
```js
//例如这是组件
<my-input placeholder='请输入文字' type='text'></my-input>
//组件的html
<div class='myClass'>
  <input v-model='input'></input>
</div>
//如何把placeholder='请输入文字' type='text'弄进input这个dom节点呢
//首先设置
inheritAttrs:false,
//这个属性跟setup同级
//最后
input v-model='input' :bind='$artts'></input>
```