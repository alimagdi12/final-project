const Product = require('../../models/products/product.model');
const Category = require('../../models/category/category.model');
const SubCategory = require('../../models/subCategory/subCategory.model');
const User = require('../../models/user/user.model');
const ProductStatus = require('../../models/productStatus/productStatus.model');
const jwt = require("jsonwebtoken");



class ProductRepositry{
    constructor() { }

    async addProduct(productData , token , files) {
        try {
            const { title , imagesUrl, categoryId, quantity, location, price , productStatus } = productData;
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await User.findOne({ email });
            const userId = user._id;
            const folderName = title + new Date().toISOString().split('T')[0];
            const status = await ProductStatus.findOne({ status: productStatus });
            const statusId = status._id;
            const product = new Product({
                title,
                imagesUrl: { images:[] },
                userId,
                categoryId,
                quantity,
                location,
                price,
                folderName,
                status:statusId
            })
            if (files && files.length > 0) {
            files.forEach(file => {
                product.imagesUrl.images.push(file.filename); 
            });
            }
            await product.save();

        } catch (err) {
            throw err;
        }
        
    }



    async getProducts() {
        try {
            const products = await Product.find().populate('status userId categoryId subCategoryId').exec();
            return products;
        } catch (err) {
            throw new Error(err.message) ;
        }
    }


    async getProductById(id) {
        try {
            const product = await Product.findById(id).populate('status userId categoryId subCategoryId').exec();
            return product;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    


    async editProduct(id , productData , token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            const userEmail = decodedToken.email;
            console.log(userEmail.toString());
            const { updatedTitle, updatedQuantity, updatedPrice } = productData;
            const product = await Product.findById(id);
            if (userEmail.toString() !== 'alimagdi12367@gmail.com' && product.userId.toString() !== userId.toString()) {
                throw new Error('You are not authorized to edit this product');
            }

            product.title = updatedTitle;
            product.quantity = updatedQuantity;
            product.price = updatedPrice;
            await product.save();
            return product;
        } catch (err) {
            throw new Error(err.message);
        }
    }


    async deleteProduct(id,token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            const userEmail = decodedToken.email;
            const product = await Product.findById(id);
            if (userEmail.toString() !== 'alimagdi12367@gmail.com' && product.userId.toString() !== userId.toString()) {
                throw new Error('You are not authorized to edit this product');
            }
            const deletedProduct = await Product.findByIdAndDelete(id);
            return deletedProduct
        } catch (err) {
            throw new Error(err.message);
        }
    }

}


module.exports = ProductRepositry;

