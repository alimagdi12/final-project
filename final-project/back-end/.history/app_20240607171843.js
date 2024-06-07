const express = require('express');
const http = require('http');
require('dotenv').config();
const connect = require('./db/connection');
const PORT = process.env.PORT;
const app = express();
const requestIp = require('request-ip');
const socket = require('socket.io');
const cors = require('cors');
const bodyParser = require("body-parser");
const server = http.createServer(app);
const jwt = require('jsonwebtoken');

// Middleware to get client's IP address
app.use(requestIp.mw());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST','PUT']
}));

const AuthRespositry = require('./repositories/auth/auth.repositry');
const AuthController = require('./controllers/auth/auth.controller');
const ProductRepositry = require('./repositories/products/products.repositry');
const ProductController = require('./controllers/products/products.controller');
const ProductStatusRepositry = require('./repositories/productStatus/productStatus.repositry');
const ProductStatusController = require('./controllers/productStatus/productStatus.controller');
const UserRoleRepository = require('./repositories/userRole/userRole.repository');
const UserRoleController = require('./controllers/userRole/userRole.controller');
const CategoryRepository = require('./repositories/category/category.repositry');
const CategoryController = require('./controllers/category/category.controller');
const SubcategoryRepository = require('./repositories/subcategory/subCategory.repository');
const SubcategoryController = require('./controllers/subCategory/subCategory.controller');
const UserRepository = require('./repositories/user/user.repository');
const UserController = require('./controllers/user/user.controller');
const AuctionRepository = require('./repositories/auction/auction.repository');
const AuctionController = require('./controllers/auction/auction.controller');
const BidRepository = require('./repositories/bid/bid.repository');
const BidController = require('./controllers/bid/bid.controllers');
const CartRepository = require('./repositories/cart/cart.repository');
const CartController = require('./controllers/cart/cart.controllers');
const PaymentRepository = require('./repositories/payment/payment.reposetory');
const PaymentController = require('./controllers/payment/payment.controller');

const authRepositry = new AuthRespositry();
const authController = new AuthController(authRepositry);
const productRespositry = new ProductRepositry();
const productController = new ProductController(productRespositry);
const productStatusRespositry = new ProductStatusRepositry();
const productStatusController = new ProductStatusController(productStatusRespositry);
const userRoleRepository = new UserRoleRepository();
const userRoleController = new UserRoleController(userRoleRepository);
const categoryRepository = new CategoryRepository();
const categoryController = new CategoryController(categoryRepository);
const subcategoryRepository = new SubcategoryRepository();
const subcategoryController = new SubcategoryController(subcategoryRepository);
const userRepository = new UserRepository();
const userController = new UserController(userRepository);
const auctionRepository = new AuctionRepository();
const auctionController = new AuctionController(auctionRepository);
const bidRepository = new BidRepository();
const bidController = new BidController(bidRepository);
const cartRepository = new CartRepository();
const cartController = new CartController(cartRepository);
const paymentRepository = new PaymentRepository();
const paymentController = new PaymentController(paymentRepository);

const authRoutes = require("./routes/auth/auth.routes");
const productsRoutes = require('./routes/products/products.routes');
const productStatusRoutes = require('./routes/productStatus/productStatus.routes');
const userRoleRoutes = require('./routes/userRole/userRole.routes');
const categoryRoutes = require('./routes/category/category.routes');
const subCategoryRoutes = require('./routes/subCategory/subCategory.routes');
const userRoutes = require('./routes/user/user.routes');
const auctionRoutes = require('./routes/auction/aucttion.routes');
const bidRoutes = require('./routes/bid/bid.routes');
const cartRoutes = require('./routes/cart/cart.routes');
const paymentRoutes = require('./routes/payment/payment.routes');
const favoriteRoutes = require('./routes/favorite/favorite.routes');

// executing the routes 
app.use("/api/v1/auth", [authRoutes(authController), userRoutes(userController), bidRoutes(bidController), cartRoutes(cartController), paymentRoutes(paymentController)]);
app.use("/api/v1/products", productsRoutes(productController));
app.use('/api/v1', [productStatusRoutes(productStatusController), auctionRoutes(auctionController), favoriteRoutes(userController)]);
app.use('/api/v1/admin', [
    userRoleRoutes(userRoleController),
    categoryRoutes(categoryController),
    subCategoryRoutes(subcategoryController)
]);

connect.connection
    .then(result => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
