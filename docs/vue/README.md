## vuex

创建 store 对象

```js
//vuex是单数据流的
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

```js
beforeCreate 
created 
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeUnmount -> onBeforeUnmount
unmounted -> onUnmounted
errorCaptured -> onErrorCaptured
renderTracked -> onRenderTracked
renderTriggered -> onRenderTriggered
```

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
input v-model='input' :bind='$arttss'></input>
```

## vue3获取路由信息
```js
import { useRoute } from 'vue-router'
setup(){
  const route = useRoute()
  console.log(route)
}
```

## vue3获取vuex
```js
import { useStore } from 'vuex'
 const store = useStore()
```


## 导航守卫
```js
const router = new VueRouter({ ... })
//to: Route: 即将要进入的目标 路由对象
//from: Route: 当前导航正要离开的路由
//next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。调用了才能跳转页面
router.beforeEach((to, from, next) => {
  // ...
})
```

## 路由元信息
```js
//定义路由的时候可以配置 meta 字段
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
//那么如何访问这个 meta 字段呢
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## axios.defaults.baseURL
```js
//使用axios后，因为调用接口，接口前面的hostname很多都是一样的，可以用到axios的一个配置
axios.defaults.baseURL ='https://apis.wwy.com/api/'
//之后调用就简单很多
axios.get('/sd?id=1').then(res=>{
  console.log(res)
})
```

## 把token设置在头部信息
```js
//登录时需要把token穿在header上
axios.defaults.headers.common.Authorization = `Bearer ${token}`
//浏览器存token
localStorage.setItem('token',token)
```
## Reactiv
```js
import { ref, computed, reactive, toRefs } from 'vue'

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

setup() {
  const data: DataProps  = reactive({
    count: 0,
    increase: () => { data.count++},
    double: computed(() => data.count * 2)
  })
  const refData = toRefs(data)
  return {
    ...refData
  }
}
//toRefs 保证 reactive 对象属性保持响应性。

```

## 关于setup
```sh
1.由于在执行setup函数的时候，还没有执行 created 生命周期方法，所以在 setup 函数中，是无法使用 data 和 methods
2.由于不能再 setup 函数中使用 data 和 methods，所以 Vue 为了避免我们的错误使用，它直接将 setup 函数中的 this 修改成了 undefined
3.setup 函数只能是同步的，不能是异步的，async setup() {} 错误使用
```

## 关于ref
```js
let state = ref({
  a:'a',
  gf:{
    b:'b',
    c:{
      c:'c'
    }
  }
})
//要获取c或者其他字段，只需一个value
state.value.gf.c.c
```

## VUE3.0是如何变快的
```sh
1.diff方法优化：http://vue-next-template-explorer.netlify.app/

  1)Vue2 中的虚拟dom是进行全量的对比
  2)Vue3 新增了静态标记(PatchFlag)
　　　　在与上次虚拟节点进行对比时候，只对比带有 patch flag 的节点

　　　　并且可以通过 flag 的信息得知当前节点要对比的具体内容

　　　　在创建虚拟dom的时候，会根据DOM中的内容会不会发生变化，添加静态标记

2.hoistStatic 静态提升

  1)Vue2中无论元素是否参与更新，每次都会重新创建，然后再渲染
  2)Vue3中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可
　　

3.cacheHandlers 事件侦听缓存

  1)默认情况下 onClick 会被视为动态绑定，所以每次都会去追踪它的变化
  2)但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可  
  3)在Vue3中的diff算法中，只有存在静态标记的节点才会进行追踪，事件侦听缓存本质上是去除了不必要的diff比较
　　

4.SSR渲染

  1)当有大量静态的内容时候，这些内容会被当做纯字符串推进一个Buffer里面，即使存在动态的绑定，会通过模板插值嵌入进去。这样会比通过虚拟dom来渲染快上很多。
  2)当静态内容达到一定量级时候，会使用_createStaticVNode方法在客户端dom来渲染一个static node，这些静态node，会被直接innerHtml，就不需要创建对象，然后根据对象渲染。
```

## vite
```js
//Vite是Vue作者开发的一款意图取代webpack的工具
//其实现原理是利用ES6的import会发送请求去加载文件的特性，拦截这些请求，做一些预编译，省去webpack冗长的打包时间
// 1. 安装Vite
npm install -g create-vite-app
// 2. 创建Vue3项目
create-vite-app projectName
// 3. 安装依赖运行项目
cd projectName
npm install
npm run dev
```

## reactive：响应式数据（json/arr）
```js
//ref的底层是reactive
//reactive的底层是proxy
//reactive要对象才会响应式，如果是简单的数据就不会响应式
<template>
  <div>
    <p>{{time}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
/*
    reactive的用法与ref的用法相似，也是将数据变成响应式数据，当数据发生变化时UI也会自动更新。
    不同的是ref用于基本数据类型，而reactive是用于复杂数据类型，比如对象和数组
*/
// toRefs解构
import { reactive,toRefs } from 'vue'
export default {
  name: 'App',
  setup() {
    //   赋值
    let state = reactive({
      time: new Date(),
    })

    function myFn() {
    /*
        reactive中传递的参数必须是json对象或者数组，如果传递了其他对象（比如new Date()），在默认情况下修改对象，
        界面不会自动更新，如果也需要具有响应式，可以通过重新赋值的方式实现
    */
      const newTime = new Date(state.time.getTime())
      newTime.setDate(newTime.getDate() + 1)
      state.time = newTime
      // state.time.setDate(state.time.getDate() + 1) ,页面不更新
      　　console.log(state)    // reactive将传递的对象包装成了proxy对象
    }

    return {
      ...toRefs(state),
      myFn,
    }
  }
}
</script>
```

## mvvm
```sh
  简单来说，就是数据变了，视图自动变化
```

## 抽象语法树和虚拟节点的区别
<img src='/image/chouxiangyufashuhexunijiedian.png'/>

```sh
抽象语法树的终点是h函数（渲染函数），
h函数的执行会变成虚拟节点，
虚拟节点经过diff或者patch就会在界面上进行显示
抽象语法树是不会进行diff的
```

## v-model
```js
//注意这是2.x版本
//在 2.x 中，在组件上使用 v-model 相当于绑定 value prop 和 input 事件：
<ChildComponent v-model="pageTitle" />

// 是以下的简写:

<ChildComponent :value="pageTitle" @input="pageTitle = $event" > </ChildComponent>

//如果要将属性或事件名称更改为其他名称，则需要在 ChildComponent 组件中添加 model 选项：
//ParentComponent.vue 

<ChildComponent v-model="pageTitle" />

// ChildComponent.vue

export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    // 这将允许 `value` 属性用于其他用途
    value: String,
    // 使用 `title` 代替 `value` 作为 model 的 prop
    title: {
      type: String,
      default: 'Default title'
    }
  }
}

//所以，在这个例子中 v-model 是以下的简写：
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
//例子
//父组件
<template>
    <div>
        <search v-model="keywords"></search>
        <button @click="submit">提交</button>
    </div>
</template>
<script>
import search from '@/components/index/search.vue'
export default {
    data() {
        return {
            keywords: ''
        }
    },
    components: {
        search
    },
    methods: {
        submit() {
            console.log('keywords:', this.keywords)
        }
    }
}
</script>
//子组件
<template>
    <div>
        <input :value="value" @input="$emit('input', $event.target.value)" type="text" name="keywords">
    </div>
</template>
<script>
export default {
    props: ['value']
}
</script>

//使用 v-bind.sync
//在某些情况下，我们可能需要对某一个 prop 进行“双向绑定”(除了前面用 v-model 绑定 prop 的情况)。为此，我们建议使用 update:myPropName 抛出事件。//例如，对于在上一个示例中带有 title prop 的 ChildComponent，我们可以通过下面的方式将分配新 value 的意图传达给父级：
this.$emit('update:title', newValue)
//如果需要的话，父级可以监听该事件并更新本地 data property。例如：
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
//为了方便起见，我们可以使用 .sync 修饰符来缩写，如下所示：
<ChildComponent :title.sync="pageTitle" />
//例子
<!DOCTYPE html>
<html>
<head>
	<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.js"></script>
</head>
<body>

<div id="app">

	<!-- 展示在子组件编辑时,父元素数据的变化 -->
	data1: {{data1}} <br>
	data2: {{data2}} <br>

	<!-- 声明两个子组件,并为其传入父元素的变量,作为初始值参数 -->
	<!-- 通过sync修饰符配合组件内的$emit('update:prop',...) -->
	<!-- 使父组件(根vue实例)和子组件的数据进行同步 -->
	son1: <cpnt :prop.sync="data1"></cpnt> <br>
	son2: <cpnt :prop.sync="data2"></cpnt>

</div>

<script type="text/javascript">

	//全局注册一个组件:cpnt
	//功能为一个普通表单
	//从复元素的一个变量获得初始值
	//并在输入时体型父元素修改变量
	//该组件和外界唯一的接口就是prop
	Vue.component('cpnt',{
		props:['prop'],
		template:`<input type='text' v-model="value">`,
		//通过v-model与value保持同步
		data(){
			return {
				value:this.prop
			}
		},
		watch:{//监听value的变化
			value(new_val){
				this.$emit('update:prop',new_val)
			}
		}
	})

	//一个data中有两个变量的vue实例
	let vm=new Vue({
		el:"#app",
		data:{
			data1:"",
			data2:''
		}
	})

</script>
</body>
</html>

//下面是3.x版本的v-model

//在 3.x 中，自定义组件上的 v-model 相当于传递了 modelValue prop 并接收抛出的 update:modelValue 事件：
<ChildComponent v-model="pageTitle" />

//是以下的简写:

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>


//例子
//父组件
<test v-model="aaaa"></test>
<div>父组件{{ aaaa }}</div>
const aaaa: Ref<string> = ref("sssss");

//子组件
//test.js
<template>
  <div id="shabi">
    <input type="text" :value="modelValue" @input="handleInput" />
    <div>自组件{{ modelValue }}</div>
  </div>
</template>

<script lang='ts'>
// import func from "vue-editor-bridge";

export default {
  props: ["modelValue"],
  setup(props, context) {
    const handleInput = function (e: any) {
      console.log("ssss", props, props.modelValue);
      context.emit("update:modelValue", e.target.value + "1");
    };
    return {
      handleInput,
    };
  },
};
</script>

```

## 响应式原理
```sh
1.数据要实现响应式，都需要observe，observe的作用就是看看传进来的对象有没有__ob__属性，如果没有就要new Observer这个对象。
2.Observer这个类的目的是将一个对象转化为每个层级的属性都是响应式的（可以被侦测的）对象
3.Observer就给进来的对象都添加__ob__这个属性，并指向当前的Observer
4.Observer可以监听数组和对象
5.defineReact是这个响应式的核心方法，用来定义响应式，这个方法中使用了Object.defineproperty
6.如果式数组的话，会改写数组的七个方法，并将数组的原型指向处理过原型上（push,pop,shift,unshift,splice,sort,reverse）
7.Dep，功能是添加依赖和通知依赖，每一个Observer的实例上，都要有一个Dep，里面的subs数组，放的都是Watcher的实例，
8.Watcher,进入依赖收集阶段，把全局的Dep.target设置为Watcher本身
```

## mustache模板引擎
```sh
1.mustache的使用方法是Mustache.render(templateStr, data);
2.原理就是吧模板字符串编译成tokens，然后和数据结合，编程dom字符串
3.tokens是一个js的嵌套数组，就是模板字符串的js表示
4.处理tokens的是Scanner这个类，就是扫描器，收集“{{”，“}}”之前，中间，后面的内容
5.收集tokens处理成token的算法需要用到栈的思想，这个算法把js的引用用到了极致
6.之后就是结合数据生成dom字符串
```
## 虚拟dom和diff算法

<img src='/image/diff.png'/>



```sh

1.虚拟dom它是一个object对象模型 用来模拟真实的dom，作用是高效的渲染页面 减少不必要的dom操作 提高渲染效率
2.diff算法可以进行细化对比，实现最小量更新，是发生在虚拟dom上的
3.key很重要，key是这个节点的唯一标识，告诉diff算法，在更改前后它们是同一个DOM节点。
4.算法流程图，最复杂的是旧节点和新节点都是有children属性，就是依次比较，新前和旧后，新后与旧后，新后和旧前，新前和旧后。
5.命中一种旧不再判断了，如果都没命中，就需要循环来寻找了，就在剩余的旧节点里面找新前的这项，如果旧节点里面有，就是移动节点，把找到的旧节点设为undefine，如果剩余旧节点没有，那这个就是新的节点，旧需要创建新节点，这两种情况都是移动到旧前前面。
6.最后就是看谁前循环完，旧先执行完，就是有新节点有要新插入的，也是插入到旧前前面，新先执行完，就是老节点有要删除的，在旧前和旧后之间的全删除。

```

## AST模板编译抽象语法树
```sh
1.抽象语法树本质上就是一个js对象，通过抽象语法树进行过度，让编译工作变得简单
2.主函数也是用栈的算法，还有用了很多正则
```

## $set
```
1. Vue使用了Object.defineProperty实现双向数据绑定
2. 在初始化实例时对属性执行 getter/setter 转化
3. 属性必须在data对象上存在才能让Vue将它转换为响应式的(这也就造成了Vue无法检测到对象属性的添加或删 除)
```