const Category = require('../../models/category/category.model');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require('../../config/firebase/firebase.config');
const fs = require('fs');
const stream = require('stream');

class CategoryRepository{
    constructor() { };

    async editCategory( body, files) {
        const id = body.id
        console.log(body);
        try {
            const category = await Category.findById(id);
            if (!category) {
                throw new Error('Category not found');
            } 
            if (body.title) {
                category.title = body.title;
            }
            if (files) {
                  const uploadPromises = files.map(async (file) => {
                    const storageRef = ref(storage, `categories/${category.folderName}/${Date.now()}-${file.originalname}`);
                    const metadata = { contentType: file.mimetype };

                    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);

                    // Get the download URL and push it to the images array
                    const imageUrl = await getDownloadURL(snapshot.ref);
                    category.imageUrl.images=[]
                    category.imageUrl.images.push(imageUrl);})

                    await Promise.all(uploadPromises);
                    console.log(files);
                    }
            await category.save();
            return category;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async addCategory(body) {
        try {
            const folderName = body.title + new Date().toISOString().split('T')[0];
            // Check if user already exists
            const existingCategory = await Category.findOne({ title:body.title });
                if (existingCategory) {
                    throw new Error('categoty already exists');
            }
            
            const newCategory = await new Category({
                title: body.title,
                imageUrl:{images:[]},
                folderName,
            });
            await newCategory.save();
            return newCategory

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };
    
    async getCategoryByNameAndAddImage(title, files) {
        try {
            const category = await Category.findOne({ title });
            if (category && files && files.length > 0) {
                if (!category.imageUrl) {
                    category.imageUrl = { images: [] };
                }

                // Upload images using the file buffer directly
                const uploadPromises = files.map(async (file) => {
                    const storageRef = ref(storage, `categories/${category.folderName}/${Date.now()}-${file.originalname}`);
                    const metadata = { contentType: file.mimetype };

                    // Upload the file buffer directly to Firebase Storage
                    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);

                    // Get the download URL and push it to the images array
                    const imageUrl = await getDownloadURL(snapshot.ref);
                    category.imageUrl.images.push(imageUrl);
                });

                await Promise.all(uploadPromises);
                await category.save();
            }
            return category;

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async getCategories() { 
        try { 
            const categories = await Category.find();
            return categories;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async deleteCategory(id) {
        try { 
            const category = await Category.findByIdAndDelete(id);
            return category;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    
};


module.exports = CategoryRepository;