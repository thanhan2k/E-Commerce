const userRouter = require('./user');
const productRouter = require('./product');
const productCategoryRouter = require('./productCategory');
const blogRouter = require('./blog')
const blogCategoryRouter = require('./blogCategory');
const brandRouter = require('./brand')
const couponRouter = require('./coupon')
const { notFound, errHandler } = require('../middlewares/errHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/prod-cate', productCategoryRouter);
    app.use('/api/blog-cate', blogCategoryRouter);
    app.use('/api/blog', blogRouter)
    app.use('/api/brand', brandRouter)
    app.use('/api/coupon', couponRouter)

    app.use(notFound);
    app.use(errHandler);
};

module.exports = initRoutes;
