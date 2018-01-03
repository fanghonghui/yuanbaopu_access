/**
 * Created by feixiangming on 17/4/17.
 */

module.exports = app => {
    return  async (ctx, next) => {
        const start = new Date();
        /****
         *  服务端serve返回的数据暂时不需要encode
         * ****/

        await next();

        const ms = new Date() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
        //设置运行跨域
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        ctx.set('Access-Control-Allow-Credentials', true)
    }
};
