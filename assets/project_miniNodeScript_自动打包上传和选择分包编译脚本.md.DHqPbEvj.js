import{_ as i,c as a,R as n,o as h}from"./chunks/framework.D03bak1J.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"project/miniNodeScript/自动打包上传和选择分包编译脚本.md","filePath":"project/miniNodeScript/自动打包上传和选择分包编译脚本.md"}'),t={name:"project/miniNodeScript/自动打包上传和选择分包编译脚本.md"};function l(e,s,p,k,E,r){return h(),a("div",null,s[0]||(s[0]=[n('<h2 id="自动打包上传" tabindex="-1">自动打包上传 <a class="header-anchor" href="#自动打包上传" aria-label="Permalink to &quot;自动打包上传&quot;">​</a></h2><h3 id="原理-使用微信的开发者工具命令行调用功能-开发者工具指定一个端口号-会通过这个端口号开启一个服务进行打包上传等其他操作" tabindex="-1">原理: 使用微信的开发者工具命令行调用功能,开发者工具指定一个端口号,会通过这个端口号开启一个服务进行打包上传等其他操作 <a class="header-anchor" href="#原理-使用微信的开发者工具命令行调用功能-开发者工具指定一个端口号-会通过这个端口号开启一个服务进行打包上传等其他操作" aria-label="Permalink to &quot;原理: 使用微信的开发者工具命令行调用功能,开发者工具指定一个端口号,会通过这个端口号开启一个服务进行打包上传等其他操作&quot;">​</a></h3><p>主要是修改manifest.json中微信的appid,然后通过shell.exec执行打包脚本和上传命令</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">shell.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">exec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">`npm run build:mp-weixin${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">env</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} &amp;&amp; ${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} upload --project ${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dist</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} -v ${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">answers</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">version</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> defaultVersion</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} -d ${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">answers</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">desc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> answers</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">version</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> defalutVersion</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="选择分包编译" tabindex="-1">选择分包编译 <a class="header-anchor" href="#选择分包编译" aria-label="Permalink to &quot;选择分包编译&quot;">​</a></h2><ol><li>为了解决冷启动时间过长,热更新过慢,代码太大了</li><li>原理是uni编译时会优先选择pages.js返回的pagesJson配置</li><li>获取views下面模块的文件夹名称,给开发选择</li><li>选择对应要编译的分包名称后对pages.json里面进行遍历搜索,没有选择的分包直接把里面的pages置空,这样就不会引入该分包的模块了</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pagesJson.subPackages.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">sub</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">subModules.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">includes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sub.root)) {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    sub.pages </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div>',7)]))}const g=i(t,[["render",l]]);export{o as __pageData,g as default};
