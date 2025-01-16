import{_ as o,c as n,R as t,o as r}from"./chunks/framework.D03bak1J.js";const d=JSON.parse('{"title":"原理","description":"","frontmatter":{},"headers":[],"relativePath":"JavaScript/refreshToken/无感刷新token.md","filePath":"JavaScript/refreshToken/无感刷新token.md"}'),s={name:"JavaScript/refreshToken/无感刷新token.md"};function a(i,e,c,l,k,g){return r(),n("div",null,e[0]||(e[0]=[t('<h1 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h1><p>当<strong>AccessToken</strong>失效时,需要重新发起请求去刷新<strong>AccessToken</strong>,该请求中携带了<strong>RefreshToken</strong>,请求拿到最新的<strong>AccessToken</strong>,然后再用最新的token去重新请求<strong>待请求队列</strong>的任务,即调用后发现token过期的接口存放队列</p><h1 id="流程" tabindex="-1">流程 <a class="header-anchor" href="#流程" aria-label="Permalink to &quot;流程&quot;">​</a></h1><ol><li>使<strong>AccessToken</strong>有效期为一天,RefreshToken有效期为一个月</li><li>用户首次登录时,服务端返回这两个Token,然后保存在本地</li><li>客户端每次请求时,只带上<strong>AccessToken</strong></li><li>如果请求返回401,证明<strong>AccessToken</strong>已经过期</li><li>客户端把401请求按顺序放到队列中,先进先出原则</li><li>客户端此时重新发送请求去获取最新的<strong>AccessToken</strong>,该请求带上<strong>RefreshToken</strong></li><li>假设<strong>RefreshToken</strong>请求也401,证明两个token过期,回到登录页</li><li>假设<strong>RefreshToken</strong>请求成功,此时更新最新的<strong>AccessToken</strong></li><li>最后将队列中缓存的请求按照先进先出的原则,带上最新的<strong>AccessToken</strong>重新请求</li></ol><h1 id="掘金-项目中无感刷新token的思考和实现" tabindex="-1"><a href="https://juejin.cn/post/7273025863980761088?searchId=20240311090252AD34DB3ABE779F06B159#heading-4" target="_blank" rel="noreferrer">掘金:项目中无感刷新token的思考和实现</a> <a class="header-anchor" href="#掘金-项目中无感刷新token的思考和实现" aria-label="Permalink to &quot;[掘金:项目中无感刷新token的思考和实现](https://juejin.cn/post/7273025863980761088?searchId=20240311090252AD34DB3ABE779F06B159#heading-4)&quot;">​</a></h1>',5)]))}const f=o(s,[["render",a]]);export{d as __pageData,f as default};
