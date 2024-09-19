# 表单

## 实现
1. form的rules通过onReady时调用ref实例手动setRules，因为微信小程序通过props传对象时，对象里面的方法会自动去除掉
2. 通过工具方法$parent，指定组件名，向上查找到父组件实例，不用provide和inject是因为支付宝和头条小程序不支持
3. form-item初始化时会通过上面找到的form实例把自己添加到form的children中，方便form调用

## 如何实现表单校验
### form中使用全部校验方法
1. form中使用收集form-item实例的fields数组进行遍历，调用form-item里的validate方法，把校验的结果存到数组中，等遍历完成数等于fields长度时，resolvePromise，传递结果出去

### 清空校验和重置初始值
1. form中循环遍历操作form-item实例里的resetField,对每个字段重置初始值this.parent.model[this.prop] = this.initialValue;和清空校验状态


## 新增
### 指定字段校验
1. 传入指定字段key数组,然后过滤下找到他们的form-item实例,调用里面的validate方法,执行传入的callback回调把结果放进去

### 指定字段去除校验
1. 传入指定字段key数组,然后过滤下找到他们的form-item实例,调用里面的clearValidate方法,清空校验状态

### 增加prop支持链式a.b.c写法
```js
/**
 * @description 获取某个对象下的属性，用于通过类似'a.b.c'的形式去获取一个对象的的属性的形式
 * @param {object} obj 对象
 * @param {string} key 需要获取的属性字段
 * @returns {*}
 */
function getProperty(obj, key) {
	if (!obj) {
		return
	}
	if (typeof key !== 'string' || key === '') {
		return ''
	}
	if (key.indexOf('.') !== -1) {
		const keys = key.split('.')
		let firstObj = obj[keys[0]] || {}

		for (let i = 1; i < keys.length; i++) {
			if (firstObj) {
				firstObj = firstObj[keys[i]]
			}
		}
		return firstObj
	}
	return obj[key]
}

const formData = {
  a: {
    b: {
      c: 1
    }
  }
}

getProperty(formData, 'a.b.c') // 1
```

### 去除了头条小程序的兼容,不使用$parent向上找指定父级,而是采用provide和inject来传递