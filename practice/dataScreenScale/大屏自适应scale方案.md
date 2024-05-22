## 前提
假设屏幕宽度为1920 * 1080,宽高比约为1.7

## 原理

### 设计稿和屏幕宽高比同为1:1

这种情况下,直接缩放就行了

### 屏幕的宽高比比设计稿的宽高比要小

为了简单计算, 假设设计稿宽度为2160 * 1080,宽高比为2

设计稿宽度大于屏幕宽度,此时为了全部内容展示完全,我们设计稿的宽度要缩小,当设计稿的宽度缩小到1920时,设计稿高度也要等比例缩小,此时设计稿高度肯定小于1080,于是出现了上下留白

此时缩放的比例应该是 屏幕宽度 / 设计稿宽度  , 这是因为设计稿比屏幕宽度大,因此要把设计稿缩小,这样计算出来的倍数小于1

### 屏幕的宽高比比设计稿的宽高比要大

为了简单计算, 假设设计稿宽度为1620 * 1080,宽高比为1.5

此时可以看出可以直接展示全部内容,因此直接居中就行,这个例子我们看不出要怎么处理,我们换个例子

假设设计稿宽度为1920 * 1920,宽高比为1

设计稿高度大于屏幕高度,此时为了全部内容展示完全,我们设计稿的高度要缩小,当设计稿的高度缩小到1080时,设计稿宽度也要等比例缩小,此时设计稿宽度肯定小于1920,于是出现了左右留白

此时缩放的比例应该是 屏幕高度 / 设计稿高度, 这是因为设计稿比屏幕高度大,因此要把设计稿缩小,这样计算出来的倍数小于1

## 留白问题怎么处理?
只要让屏幕背景色或者背景图片符合主题即可,就不会出现突兀的空白

## 总结公式

C = 屏幕宽度 / 屏幕高度

D = 设计稿宽度 / 设计稿高度

WW = 屏幕宽度 / 设计稿宽度

HH = 屏幕高度 / 设计稿高度

当 C / D < 1, scale = WW

当 C / D > 1, scale = HH

转换一下,简化一下可以得出

C / D < 1 ==> WW / HH < 1

C / D > 1 ==> WW / HH > 1

最终得到 scale = WW / HH < 1 ? WW : HH  ==> WW < HH ? WW : HH

## autofit.js

### autofit缩放过程
1. 获取当前可视窗口宽高**clientWidth**,**clientHeight**
2. 通过上方**WW < HH ? WW : HH**公式计算出当前scale缩放值
3. 缩放后会导致出现白边,此时通过**可视窗口宽高 / 缩放倍数**后 可以得到当前填满白边的宽高,例如 100的宽高,0.5缩放后,变为50宽高,此时填充白边的话,就是需要100 / 0.5 也就是200 才能像原来一样覆盖满100
4. 计算忽略缩放元素在缩放后的宽高,可以直接采用设置值,否则需要反向计算缩放值**1 / currScale**,例如整体缩放为0.5,此时要单独重新缩放2才能正常显示为原来的宽高

### 核心源码keepfit
```js
function keepFit(dw, dh, dom, ignore, limit) {
  let clientHeight = document.documentElement.clientHeight;
  let clientWidth = document.documentElement.clientWidth;
  currScale =
    clientWidth / clientHeight < dw / dh ? clientWidth / dw : clientHeight / dh;
  currScale = Math.abs(1 - currScale) > limit ? currScale.toFixed(2) : 1;
  // 缩放后会导致出现白边,此时通过屏幕宽高 / 缩放倍数后 可以得到当前填满白边的宽高
  // 例如 100的宽高,0.5缩放后,变为50宽高,此时填充白边的话,就是需要100 / 0.5 也就是200 才能像原来一样覆盖满100
  let height = Math.round(clientHeight / currScale);
  let width = Math.round(clientWidth / currScale);
  dom.style.height = `${height}px`;
  dom.style.width = `${width}px`;
  dom.style.transform = `scale(${currScale})`;
  const ignoreStyleDOM = document.querySelector("#ignoreStyle");
  ignoreStyleDOM.innerHTML = "";
  for (let item of ignore) {
    let itemEl = item.el || item.dom;
    typeof item == "string" && (itemEl = item);
    if (!itemEl) {
      console.error(`autofit: bad selector: ${itemEl}`);
      continue;
    }
    let realScale = item.scale ? item.scale : 1 / currScale;
    let realFontSize = realScale != currScale ? item.fontSize : "autofit";
    let realWidth = realScale != currScale ? item.width : "autofit";
    let realHeight = realScale != currScale ? item.height : "autofit";
    let regex = new RegExp(`${itemEl}(\x20|{)`, "gm");
    let isIgnored = regex.test(ignoreStyleDOM.innerHTML);
    if (isIgnored) {
      continue;
    }
    ignoreStyleDOM.innerHTML += `\n${itemEl} { 
      transform: scale(${realScale})!important;
      transform-origin: 0 0;
      width: ${realWidth}!important;
      height: ${realHeight}!important;
    }`;
    if (realFontSize) {
      ignoreStyleDOM.innerHTML += `\n${itemEl} div ,${itemEl} span,${itemEl} a,${itemEl} * {
        font-size: ${realFontSize}px;
      }`;
    }
  }
}
```