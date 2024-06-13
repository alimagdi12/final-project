const Blog = require('../../models/blog/blog.model');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require('../../config/firebase/firebase.config');

class BlogRepository {
    async createBlog(body, files) {
        console.log(files);
        try {
            const { title, content, author } = body;
            const folderName = title + new Date().toISOString().split('T')[0];
    
            const blog = new Blog({
                title,
                imagesUrl: { images: [] },
                content,
                author,
                folderName
            });
    
            const uploadPromises = files.map(async (file) => {
                const storageRef = ref(storage, `images/${folderName}/${Date.now()}-${file.originalname}`);
                const metadata = { contentType: file.mimetype };
                const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
                const imageUrl = await getDownloadURL(snapshot.ref);
                blog.imagesUrl.images.push(imageUrl);
            });
    
            await Promise.all(uploadPromises);
            await blog.save();
    console.log(blog);
            return blog; // Return the created blog post
    
        } catch (err) {
            throw err;
        }
    }
    

    async getBlog(blogId) {
        const blog = await Blog.findById(blogId).populate('author').populate('comments.userId');
        if (!blog) throw new Error('Blog not found');
        return blog;
    }

    async getAllBlogs() {
        return await Blog.find().populate('author');
    }

    async updateBlog(blogId, data) {
        const blog = await Blog.findByIdAndUpdate(blogId, data, { new: true }).populate('author');
        if (!blog) throw new Error('Blog not found');
        return blog;
    }

    async deleteBlog(blogId) {
        const blog = await Blog.findByIdAndDelete(blogId);
        if (!blog) throw new Error('Blog not found');
        return blog;
    }

    async addComment(blogId, commentData) {
        const blog = await Blog.findById(blogId);
        if (!blog) throw new Error('Blog not found');
        blog.comments.push(commentData);
        await blog.save();
        return blog;
    }

    async deleteComment(blogId, commentId) {
        const blog = await Blog.findById(blogId);
        if (!blog) throw new Error('Blog not found');
        blog.comments.id(commentId).remove();
        await blog.save();
        return blog;
    }
}

module.exports = BlogRepository;
