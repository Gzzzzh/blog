import{_ as a,c as s,R as l,o as e}from"./chunks/framework.D03bak1J.js";const E=JSON.parse('{"title":"问题","description":"","frontmatter":{},"headers":[],"relativePath":"project/miniDetail/小程序项目详情优化过程.md","filePath":"project/miniDetail/小程序项目详情优化过程.md"}'),t={name:"project/miniDetail/小程序项目详情优化过程.md"};function n(h,i,p,r,k,o){return e(),s("div",null,i[0]||(i[0]=[l(`<h1 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h1><p>在招商好房2.0ui换新的时候,甲方体验时发现有两个问题:</p><ol><li>详情页白屏时间过长,体验人员反馈要等几秒,扫码和点击进入其他的页面时几乎没有白屏</li><li>详情中的全屏图展示出现后,滑动不上去,操作不跟手,滑动了之后没能马上上去,打开的页面越多卡的越久(首页&gt;帮我找房&gt;结果列表&gt;详情页)</li><li>导致想进详情看楼盘信息,用户等待加载的流程很长,体验很差</li><li>上面问题处理完后产品希望减少小程序的启动耗时,加快进入小程序项目详情页的体验</li></ol><h1 id="问题分析" tabindex="-1">问题分析 <a class="header-anchor" href="#问题分析" aria-label="Permalink to &quot;问题分析&quot;">​</a></h1><h2 id="白屏处理" tabindex="-1">白屏处理 <a class="header-anchor" href="#白屏处理" aria-label="Permalink to &quot;白屏处理&quot;">​</a></h2><ol><li>小程序在冷启动时,会先在本身的loading页对主包和当前访问的页面的分包进行加载,加载完成后直接进入页面,打开其他页面时是几乎没有白屏</li><li>通过开发工具直接编译详情页打开,在白屏的时候发现生命周期里的log日志和请求有在正常打印和响应</li><li>结合有全屏图的时候才会有白屏问题,查看全屏图相关逻辑发现,全屏图在没加载出来之前对详情内容的view做了opacity:0的隐藏</li><li>全屏图基于项目详情接口返回,返回后开始加载全屏图,全屏图加载完成后才解除隐藏</li><li>跟产品和用户沟通后,觉得这是不合理的,可以接受在详情接口返回后,直接展示详情内容,全屏图加载完成后再展示全屏图,避免白屏</li></ol><h2 id="全屏图滑动卡顿" tabindex="-1">全屏图滑动卡顿 <a class="header-anchor" href="#全屏图滑动卡顿" aria-label="Permalink to &quot;全屏图滑动卡顿&quot;">​</a></h2><ol><li>全屏图没有遮罩进行阻挡滑动,滑动操作的回调并没有立马执行,而是有一点延迟,打开的页面越多延迟越长</li><li>发现可以进行滑动操作时都和底部出现的楼盘顾问信息卡片展示内容的时机一致,合理怀疑是楼盘顾问信息获取和展示的逻辑存在长任务,导致信息展示过慢和出现交互时间过长性能指标问题</li><li>获取顾问信息接口响应在70毫秒左右,发现是接口响应完成后就开始卡没法进行其他交互</li><li>发现是顾问信息是全局vuex里存放和获取的,而该计算属性字段在全局mixins里,打开的页面和组件越多,越多这个计算属性watcher</li><li>页面打开时最少更改两次,一次清空,一次获取,根据一些业务逻辑最多可以更改三次,会多次触发这个计算属性所有的watcher和一些用到该属性的视图更新,这就是导致卡顿的长任务,长任务执行完显示了底部顾问卡片信息,此时之前阻塞的滑动事件也开始处理</li><li>把全局mixins里的计算属性去掉,改到只在用到的页面组件里定义,减少无用watcher</li><li>优化属性变更逻辑,去除初始化清空方法,后端提供新判断接口直接返回当前展示的顾问,减少vuex里顾问属性的频繁变更,改为只会调用一次</li></ol><h1 id="性能指标" tabindex="-1">性能指标 <a class="header-anchor" href="#性能指标" aria-label="Permalink to &quot;性能指标&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> performance</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> wx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getPerformance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> observer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> performance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createObserver</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">entryList</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;performance&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, entryList.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getEntries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">observer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">observe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ entryTypes: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;render&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;navigation&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] })</span></span></code></pre></div><h2 id="白屏和滑动卡顿优化后-杀死后冷启动直接进详情页面" tabindex="-1">白屏和滑动卡顿优化后(杀死后冷启动直接进详情页面) <a class="header-anchor" href="#白屏和滑动卡顿优化后-杀死后冷启动直接进详情页面" aria-label="Permalink to &quot;白屏和滑动卡顿优化后(杀死后冷启动直接进详情页面)&quot;">​</a></h2><p>appLaunch: 起点为小程序拉起,终点为首个页面 firstRender 结束时间(该页面onReady的时间) 2820 onReady是初次渲染完成;</p><p>fcp: 2903 , 减去appLaunch开始时间得到;</p><p>lcp: 3065 , 减去appLaunch开始时间得到;</p><p>可以看出第一次冷启动时耗时主要在小程序拉起到页面onReady之间的过程,后续的问题就是要降低这块的时间,加快详情页onReady完的时间</p><h2 id="优化" tabindex="-1">优化 <a class="header-anchor" href="#优化" aria-label="Permalink to &quot;优化&quot;">​</a></h2><ol><li>对详情页面部分从线上展厅包单独分包出来,减少小程序拉起进入时加载的资源,同时增加preload预加载分包,在线上展厅分包时提前加载详情页的分包</li><li>使用异步分包组件方式,实现一个plugins自动配置页面使用到的分包组件的占位组件componentHolder,有效降低了主包的大小</li><li>appLaunch花费1700, fcp 能稳定在2秒附近</li></ol>`,17)]))}const c=a(t,[["render",n]]);export{E as __pageData,c as default};
