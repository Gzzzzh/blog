# filter组件设计

## props加defaultValues原因
加这个的原因是有些默认值可能是异步返回的,通过修改这个之后,后续reset重新取默认值是可以拿到异步返回的值

## 默认值和format值设置好后,修改表单数据formState有变化,但是视图里的值复原成默认值
### 原因
Object.assign(formState, { ...unref(formStateDefault) });

vue2中实际上还是旧的响应式写法,因此用这种方式会破坏了原来的响应式

### 解决
formState改为ref定义,支持重新赋值


## 筛选项和按钮项根据宽度自动决定占位大小,屏幕宽度改变时重新自动计算

### 默认筛选栏2行内容展示,超过后显示自动折叠,保证加上actions部分不超过2行
overflowIndex是核心判断,他返回一个index,这个index就是判断出到了哪个字段的时候超过了两行,字段index大于这个overflowIndex的都要隐藏
如果没有超过两行的字段会返回-1,此时代表着不会有展开收起的逻辑
```js
const overflowIndex = computed(() => {
  const currentColSpan = state.col.span;
  const actionColSpan = props.showAction ? (props.actionCol?.[state.col.size] || currentColSpan) : 0;
  let totalGrids = actionColSpan;
  return unref(visibleFields).findIndex((field) => {
    totalGrids += (field.col?.[state.col.size] || currentColSpan);
    return totalGrids / GRIDS_IN_ROW > THRESHOLD_ROWS; // 所有字段总占位数 / 24 得到是否超过限制的2行
  });
});
```

# hook里联动,三种方式调用table接口

## filter筛选栏点击查询,重置
通过在hook里生成一个filterOn对象返回出去,在组件中只需要v-on绑定即可
```js
const filterOn = {
  search: (values) => {
    filterParams = values
    filterProps.onSearch && filterProps.onSearch(values)
    if (isEqual(lastFilterParams, filterParams)) {
      refreshTable()
    } else {
      jumpPage(1)
    }
  },
  reset: (values) => {
    filterParams = values
    filterProps.onReset && filterProps.onReset(values)
    refreshTable()
  },
  change: (values) => {
    filterProps.onChange && filterProps.onChange(values)
    filterParams = values
  }
}
```

## table列表页页面, 排序点击
通过在hook里生成一个tableOn对象返回出去,在table组件中只需要v-on绑定即可,
```js
const tableOn = {
  change: (pagination, filters, sorter) => {
    tableParams = { pagination, filters, sorter }
    tableProps.pagination = pagination
    tableProps.onChange && tableProps.onChange(tableParams)
    refreshTable()
  }
}
```

## 手动调用refresh和jump api
完成了以上两点,这边就可以手动调用了
在setup中直接使用refreshTable或者jumpPage时会拿不到默认值，得onMounted里面拿

## 请求取消多次重复请求功能
1. 在useFilterHook中定义一个controller接收每一次的new AbortController();
2. 在每次接口调用之前判断列表是否在加载中和controller是否有值
3. 如果在加载中和controller有值,则先调用controller.abort()取消上一次的请求,然后重新new一个controller
4. 调用传进来的请求方法中把controller.signal传出去给axios请求配置

## 当有表单项是异步获取数据然后再设置默认值,如何保证初始化时能带上这个异步默认值参数
当初始化首次调用时 refreshTable 没有点击查询重置获取的filterParams 这里改用从filterProps中重新获取defaultValue和format处理 不用filterRef就不需要强行要等到onMounted里使用

当有异步筛选项时,就可以通过设置该表单项的onChange或者onInput事件拿到想要出初始值,再去做refreshTable初始化
