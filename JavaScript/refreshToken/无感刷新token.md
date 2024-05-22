# 原理
当**AccessToken**失效时,需要重新发起请求去刷新**AccessToken**,该请求中携带了**RefreshToken**,请求拿到最新的**AccessToken**,然后再用最新的token去重新请求**待请求队列**的任务,即调用后发现token过期的接口存放队列

# 流程
1. 使**AccessToken**有效期为一天,RefreshToken有效期为一个月
2. 用户首次登录时,服务端返回这两个Token,然后保存在本地
3. 客户端每次请求时,只带上**AccessToken**
4. 如果请求返回401,证明**AccessToken**已经过期
5. 客户端把401请求按顺序放到队列中,先进先出原则
6. 客户端此时重新发送请求去获取最新的**AccessToken**,该请求带上**RefreshToken**
7. 假设**RefreshToken**请求也401,证明两个token过期,回到登录页
8. 假设**RefreshToken**请求成功,此时更新最新的**AccessToken**
9. 最后将队列中缓存的请求按照先进先出的原则,带上最新的**AccessToken**重新请求

# [掘金:项目中无感刷新token的思考和实现](https://juejin.cn/post/7273025863980761088?searchId=20240311090252AD34DB3ABE779F06B159#heading-4)