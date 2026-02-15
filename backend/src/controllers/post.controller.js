import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    try{

        const {name, description , age} = req.body;

        if(!name || !description || !age ){
            return res.status(400).json({
                message: "All fields are required. Please provide name, description and age."
            });

        }

            const post =await Post.create({name , description , age});
            
            res.status(201).json({
                message:"Post created successfully", post
            });

        
            }catch(error){
                res.status(500).json({
                    message: "Internal Server error. Please try again later."
                });

    }

}

//Read all post
const getPosts = async (req, res) => {


    try{
        const posts = await Post.find();
        res.status(200).json({      
            message: "Posts retrieved successfully",
            posts
        });
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server error. Please try again later.",error: error.message
        });
    }
}

const updatePost = async (req, res) => {

    try {
        // basic validation to check if the post is empty
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message: "Post data is required to update."
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, 
            { new: true });
        
        if(!post){
            return res.status(404).json({
                message: "Post not found."
            });
        }

        res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error. Please try again later.",error: error.message
        });
        
    }
    // Implementation for updating a post
}

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).json({
                message: "Post not found."
            });
        }
        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error. Please try again later.",error: error.message
        });
    }
}

export{
    createPost , getPosts, updatePost , deletePost   
}