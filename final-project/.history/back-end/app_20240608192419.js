
const express = require('express');
const http = require('http');
require('dotenv').config();
const connect = require('./db/connection')
const PORT = process.env.PORT;
const app = express();
const requestIp = require('request-ip');
const socket = require('socket.io');
const cors = require('cors');
const bodyParser = require("body-parser");
const server = http.createServer(app);


const jwt = require('jsonwebtoken');



const MessageRepository = require('./repositories/Messages/Messages.repository');
const MessageController = require('./controllers/Messages/Messages.controller');
const messagesRepository = new MessageRepository()
const mesaagecontroller = new MessageController(messagesRepository)


// Helper function to get user ID from token
const getUserIdFromToken = (socket) => {
    return new Promise((resolve, reject) => {
        const token = socket.handshake.headers['jwt'];
        
        if (!token) {
            return reject(new Error('No token provided'));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(new Error('Failed to authenticate token'));
            }

            resolve(decoded.userId);
        });
    });
};

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Chat history (in-memory for demonstration purposes, use a database in production)
let chatHistory = [];

io.on('connection', async (socket) => {
    console.log('A connection started', socket.id);
    try {
        const userId = await getUserIdFromToken(socket);
        if (userId) {
            console.log(`User ${userId} connected with socket ID ${socket.id}`);
        }
    } catch (err) {
        console.error('Error getting user ID from token:', err.message);
        socket.disconnect();
        return;
    }

    // Send chat history to the newly connected client
    socket.emit('chat history', chatHistory);

    socket.on('chat message', async (message) => {
        console.log(message);
        chatHistory.push(message.message);
        messagesRepository.createMessage(message.sender,"6643adccc5f7d7391c1fbd11",message.message)
        console.log('hambozo');
        
        io.emit('chat message', message); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', async () => {
        console.log('A connection disconnected', socket.id);
    });
});

// API endpoint to fetch chat history
app.get('/api/chat-history', (req, res) => {
    res.json(chatHistory);
});


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST','PUT']
}));

// calling AuthRespositry and AuthController
const AuthRespositry = require('./repositories/auth/auth.repositry');
const AuthController = require('./controllers/auth/auth.controller');
// calling ProductRepositry and ProductController
const ProductRepositry = require('./repositories/products/products.repositry');
const ProductController = require('./controllers/products/products.controller');
// calling ProductStatusRepositry and ProductStatusController
const ProductStatusRepositry = require('./repositories/productStatus/productStatus.repositry');
const ProductStatusController = require('./controllers/productStatus/productStatus.controller');
// calling userRoleRepository and UserRoleController
const UserRoleRepository = require('./repositories/userRole/userRole.repository');
const UserRoleController = require('./controllers/userRole/userRole.controller');
// calling CategoryRepository and CategoryController
const CategoryRepository = require('./repositories/category/category.repositry');
const CategoryController = require('./controllers/category/category.controller');
// calling categoryRepository and CategoryController
const SubcategoryRepository = require('./repositories/subcategory/subCategory.repository');
const SubcategoryController = require('./controllers/subCategory/subCategory.controller');
// calling UserRepository and UserController
const UserRepository = require('./repositories/user/user.repository');
const UserController = require('./controllers/user/user.controller');
// calling AuctionRepository and AuctionController
const AuctionRepository = require('./repositories/auction/auction.repository');
const AuctionController = require('./controllers/auction/auction.controller');
// calling BidRepository and BidController
const BidRepository = require('./repositories/bid/bid.repository');
const BidController = require('./controllers/bid/bid.controllers');
// calling CartRepository and CartController
const CartRepository = require('./repositories/cart/cart.repository');
const CartController = require('./controllers/cart/cart.controllers');
// calling CartRepository and CartController
const PaymentRepository = require('./repositories/payment/payment.reposetory');
const PaymentController = require('./controllers/payment/payment.controller');
// calling wishListRepository and wishListController
const WishListRepository = require('./repositories/wishlist/wishlist.repository');
const WishListController = require('./controllers/wishlist/wishlist.controllers');
// Import chatController
const ChatRepository = require('./repositories/chat/chat');
const ChatController = require('./controllers/chat/chat');








// Create instances of AuthRepository and AuthController
const authRepositry = new AuthRespositry();
const authController = new AuthController(authRepositry);
// Create instances of ProductRepositry and ProductController
const productRespositry = new ProductRepositry();
const productController = new ProductController(productRespositry);
// Create instances of ProductStatusRepositry and ProductStatusController
const productStatusRespositry = new ProductStatusRepositry();
const productStatusController = new ProductStatusController(productStatusRespositry);
// Create instances of userRoleRepository and userRoleController
const userRoleRepository = new UserRoleRepository();
const userRoleController = new UserRoleController(userRoleRepository);
// Create instances of userRoleRepository and userRoleController
const categoryRepository = new CategoryRepository();
const categoryController = new CategoryController(categoryRepository);
// Create instances of subCategoryRepository and subCategoryController
const subcategoryRepository = new SubcategoryRepository();
const subcategoryController = new SubcategoryController(subcategoryRepository);
// Create instances of userRepository and userController
const userRepository = new UserRepository(io);
const userController = new UserController(userRepository);
// Create instances of AuctionRepository and AuctionController
const auctionRepository = new AuctionRepository();
const auctionController = new AuctionController(auctionRepository);
// Create instances of BidRepository and BidController
const bidRepository = new BidRepository(io);
const bidController = new BidController(bidRepository);
// Create instances of CartRepository and CartController
const cartRepository = new CartRepository();
const cartController = new CartController(cartRepository);
// Create instances of CartRepository and CartController
const paymentRepository = new PaymentRepository();
const paymentController = new PaymentController(paymentRepository);
// Create instances of CartRepository and CartController
const wishlistRepository = new WishListRepository();
const wishlistController = new WishListController(wishlistRepository);
//Chat
const chatRepository = new ChatRepository();
const chatController = new ChatController(chatRepository);


// routes of the whole application
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
const wishListRoutes = require('./routes/wishlist/wishlist.routes');
const MessagesRouter = require('./routes/Messages/Messages.routes');


// Middleware to get client's IP address
app.use(requestIp.mw());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// executing the routes 
app.use("/api/v1/auth", [authRoutes(authController), userRoutes(userController), bidRoutes(bidController), cartRoutes(cartController), paymentRoutes(paymentController), wishListRoutes(wishlistController), MessagesRouter(mesaagecontroller)]);
app.use("/api/v1/products", productsRoutes(productController));
app.use('/api/v1', [productStatusRoutes(productStatusController), auctionRoutes(auctionController)]);
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