import{_ as i,c as a,R as h,o as n}from"./chunks/framework.D03bak1J.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"practice/dataScreenScale/大屏自适应scale方案.md","filePath":"practice/dataScreenScale/大屏自适应scale方案.md"}'),k={name:"practice/dataScreenScale/大屏自适应scale方案.md"};function t(l,s,p,e,E,r){return n(),a("div",null,s[0]||(s[0]=[h(`<h2 id="前提" tabindex="-1">前提 <a class="header-anchor" href="#前提" aria-label="Permalink to &quot;前提&quot;">​</a></h2><p>假设屏幕宽度为1920 * 1080,宽高比约为1.7</p><h2 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h2><h3 id="设计稿和屏幕宽高比同为1-1" tabindex="-1">设计稿和屏幕宽高比同为1:1 <a class="header-anchor" href="#设计稿和屏幕宽高比同为1-1" aria-label="Permalink to &quot;设计稿和屏幕宽高比同为1:1&quot;">​</a></h3><p>这种情况下,直接缩放就行了</p><h3 id="屏幕的宽高比比设计稿的宽高比要小" tabindex="-1">屏幕的宽高比比设计稿的宽高比要小 <a class="header-anchor" href="#屏幕的宽高比比设计稿的宽高比要小" aria-label="Permalink to &quot;屏幕的宽高比比设计稿的宽高比要小&quot;">​</a></h3><p>为了简单计算, 假设设计稿宽度为2160 * 1080,宽高比为2</p><p>设计稿宽度大于屏幕宽度,此时为了全部内容展示完全,我们设计稿的宽度要缩小,当设计稿的宽度缩小到1920时,设计稿高度也要等比例缩小,此时设计稿高度肯定小于1080,于是出现了上下留白</p><p>此时缩放的比例应该是 屏幕宽度 / 设计稿宽度 , 这是因为设计稿比屏幕宽度大,因此要把设计稿缩小,这样计算出来的倍数小于1</p><h3 id="屏幕的宽高比比设计稿的宽高比要大" tabindex="-1">屏幕的宽高比比设计稿的宽高比要大 <a class="header-anchor" href="#屏幕的宽高比比设计稿的宽高比要大" aria-label="Permalink to &quot;屏幕的宽高比比设计稿的宽高比要大&quot;">​</a></h3><p>为了简单计算, 假设设计稿宽度为1620 * 1080,宽高比为1.5</p><p>此时可以看出可以直接展示全部内容,因此直接居中就行,这个例子我们看不出要怎么处理,我们换个例子</p><p>假设设计稿宽度为1920 * 1920,宽高比为1</p><p>设计稿高度大于屏幕高度,此时为了全部内容展示完全,我们设计稿的高度要缩小,当设计稿的高度缩小到1080时,设计稿宽度也要等比例缩小,此时设计稿宽度肯定小于1920,于是出现了左右留白</p><p>此时缩放的比例应该是 屏幕高度 / 设计稿高度, 这是因为设计稿比屏幕高度大,因此要把设计稿缩小,这样计算出来的倍数小于1</p><h2 id="留白问题怎么处理" tabindex="-1">留白问题怎么处理? <a class="header-anchor" href="#留白问题怎么处理" aria-label="Permalink to &quot;留白问题怎么处理?&quot;">​</a></h2><p>只要让屏幕背景色或者背景图片符合主题即可,就不会出现突兀的空白</p><h2 id="总结公式" tabindex="-1">总结公式 <a class="header-anchor" href="#总结公式" aria-label="Permalink to &quot;总结公式&quot;">​</a></h2><p>C = 屏幕宽度 / 屏幕高度</p><p>D = 设计稿宽度 / 设计稿高度</p><p>WW = 屏幕宽度 / 设计稿宽度</p><p>HH = 屏幕高度 / 设计稿高度</p><p>当 C / D &lt; 1, scale = WW</p><p>当 C / D &gt; 1, scale = HH</p><p>转换一下,简化一下可以得出</p><p>C / D &lt; 1 ==&gt; WW / HH &lt; 1</p><p>C / D &gt; 1 ==&gt; WW / HH &gt; 1</p><p>最终得到 scale = WW / HH &lt; 1 ? WW : HH ==&gt; WW &lt; HH ? WW : HH</p><h2 id="autofit-js" tabindex="-1">autofit.js <a class="header-anchor" href="#autofit-js" aria-label="Permalink to &quot;autofit.js&quot;">​</a></h2><h3 id="autofit缩放过程" tabindex="-1">autofit缩放过程 <a class="header-anchor" href="#autofit缩放过程" aria-label="Permalink to &quot;autofit缩放过程&quot;">​</a></h3><ol><li>获取当前可视窗口宽高<strong>clientWidth</strong>,<strong>clientHeight</strong></li><li>通过上方<strong>WW &lt; HH ? WW : HH</strong>公式计算出当前scale缩放值</li><li>缩放后会导致出现白边,此时通过<strong>可视窗口宽高 / 缩放倍数</strong>后 可以得到当前填满白边的宽高,例如 100的宽高,0.5缩放后,变为50宽高,此时填充白边的话,就是需要100 / 0.5 也就是200 才能像原来一样覆盖满100</li><li>计算忽略缩放元素在缩放后的宽高,可以直接采用设置值,否则需要反向计算缩放值<strong>1 / currScale</strong>,例如整体缩放为0.5,此时要单独重新缩放2才能正常显示为原来的宽高</li></ol><h3 id="核心源码keepfit" tabindex="-1">核心源码keepfit <a class="header-anchor" href="#核心源码keepfit" aria-label="Permalink to &quot;核心源码keepfit&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> keepFit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">dw</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">dh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">dom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ignore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">limit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> clientHeight </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.documentElement.clientHeight;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> clientWidth </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.documentElement.clientWidth;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  currScale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    clientWidth </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> clientHeight </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dw </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dh </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> clientWidth </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dw </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> clientHeight </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dh;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  currScale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">abs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currScale) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> limit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currScale.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toFixed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 缩放后会导致出现白边,此时通过屏幕宽高 / 缩放倍数后 可以得到当前填满白边的宽高</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 例如 100的宽高,0.5缩放后,变为50宽高,此时填充白边的话,就是需要100 / 0.5 也就是200 才能像原来一样覆盖满100</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> height </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(clientHeight </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currScale);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> width </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(clientWidth </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currScale);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  dom.style.height </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">height</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}px\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  dom.style.width </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">width</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}px\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  dom.style.transform </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`scale(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">currScale</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">})\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ignoreStyleDOM</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#ignoreStyle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ignoreStyleDOM.innerHTML </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">of</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ignore) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> itemEl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item.el </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item.dom;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;string&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (itemEl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">itemEl) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`autofit: bad selector: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">itemEl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      continue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> realScale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item.scale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item.scale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currScale;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> realFontSize </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> realScale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currScale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item.fontSize </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;autofit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> realWidth </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> realScale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currScale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item.width </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;autofit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> realHeight </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> realScale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currScale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item.height </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;autofit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> regex </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RegExp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">itemEl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\x20</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">|{)\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> isIgnored </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> regex.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ignoreStyleDOM.innerHTML);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (isIgnored) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      continue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ignoreStyleDOM.innerHTML </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">itemEl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} { </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      transform: scale(\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">realScale</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">})!important;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      transform-origin: 0 0;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      width: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">realWidth</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}!important;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      height: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">realHeight</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}!important;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    }\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (realFontSize) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ignoreStyleDOM.innerHTML </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">itemEl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} div ,\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">itemEl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} span,\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">itemEl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} a,\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">itemEl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} * {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        font-size: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">realFontSize</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}px;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      }\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,33)]))}const y=i(k,[["render",t]]);export{g as __pageData,y as default};
