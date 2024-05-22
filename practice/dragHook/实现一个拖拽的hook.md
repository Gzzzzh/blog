<script setup>
  import move from './move.vue'
</script>

## 示例
<move />

## 实现过程
```js
import { onMounted, reactive } from 'vue'

export function useMoveHook({ target, parent = 'body' }) {
  // 记录移动结束的位置
  const resultPosition = reactive({ x: 0, y: 0 })
  // 移动元素的宽度
  let moveDomWidth = 0
  // 移动元素的高度
  let moveDomHeight = 0
  onMounted(() => {
    const moveDom = document.querySelector(target)
    const parentDom = document.querySelector(parent)

    moveDom.style.cssText += 'position: absolute; cursor: move;'
    // 是否正在拖拽
    let isDragging = false
    // 记录鼠标按下时相对整个页面的初始位置
    const initPosition = { x: 0, y: 0 }
    // 鼠标按下时移动元素相对于父元素的偏移量
    const moveDomOffset = { x: 0, y: 0 }
    const parentRect = parentDom.getBoundingClientRect()
    // 父元素的宽度
    const parentWidth = parentRect.width
    // 父元素的高度
    const parentHeight = parentRect.height

    const mousemove = (e) => {
      // 移动时鼠标在页面中位置
      const { pageX, pageY }  = e
      // 计算出当前鼠标移动的偏移量
      let moveX = pageX - initPosition.x
      let moveY = pageY - initPosition.y

      // 计算出移动元素在父元素最终的位置
      resultPosition.x = moveX + moveDomOffset.x
      resultPosition.y = moveY + moveDomOffset.y
      // 边界判断
      if (resultPosition.x < 0) {
        // 移动元素超出父元素左侧边界,则将移动元素移动到父元素左侧边界
        resultPosition.x = 0
        moveX = 0 - moveDomOffset.x
      } else if (resultPosition.x + moveDomWidth > parentWidth) {
        // 移动元素超出父元素右侧边界,则将移动元素移动到父元素右侧边界
        resultPosition.x = parentWidth - moveDomWidth
        moveX = resultPosition.x - moveDomOffset.x
      }

      if (resultPosition.y < 0) {
        // 移动元素超出父元素上方边界,则将移动元素移动到父元素上方边界
        resultPosition.y = 0
        moveY = 0 - moveDomOffset.y
      } else if (resultPosition.y + moveDomHeight > parentHeight) {
        // 移动元素超出父元素下方边界,则将移动元素移动到父元素下方边界
        resultPosition.y = parentHeight - moveDomHeight
        moveY = resultPosition.y - moveDomOffset.y
      }
      // 设置移动元素的位置,translate3D触发gpu加速渲染,不会引发回流
      moveDom.style.transform = `translate3D(${moveX}px, ${moveY}px, 0)`
    }
    // 移动元素的鼠标按下事件
    moveDom.onmousedown = function(e) {
      // 记录鼠标按下时相对整个页面的初始位置
      initPosition.x = e.pageX
      initPosition.y = e.pageY
      isDragging = true 

      // 记录鼠标按下时移动元素相对于父元素的偏移量
      moveDomOffset.y = moveDom.offsetTop
      moveDomOffset.x = moveDom.offsetLeft

      const moveDomRect = moveDom.getBoundingClientRect()
      // 移动元素的宽度
      moveDomWidth = moveDomRect.width
      // 移动元素的高度
      moveDomHeight = moveDomRect.height
      // 因为移动时鼠标可以在整个页面进行移动,所以要对整个页面进行监听鼠标移动事件
      document.addEventListener('mousemove', mousemove)
    }
    // 同理,因为鼠标可以在父元素之外的地方继续移动拖拽,因此鼠标释放事件要用整个页面监听
    // 如果用moveDom监听鼠标释放事件,在父元素之外的地方释放时,鼠标和移动元素实际上已经分离,此时无法触发移动元素的mouseup事件
    document.onmouseup = function(e) {
      // 防止后续没有释放的鼠标事件触发mouseup事件
      if (!isDragging) return
      isDragging = false
      // 设置移动元素的最终位置,清空3d偏移
      moveDom.style.left = resultPosition.x + 'px'
      moveDom.style.top = resultPosition.y + 'px'
      moveDom.style.transform = 'translate3D(0, 0, 0)'
      document.removeEventListener('mousemove', mousemove)
    }
  })
  return resultPosition
}
```

## Vue3DraggableResizable
[Vue3DraggableResizable](https://gitcode.com/a7650/vue3-draggable-resizable/blob/main/docs/document_zh.md)