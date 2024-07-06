import User from "../models/User.model";
import Post from "../models/Post.model";

// Post Creation
export const createPost = async (req, res) => {
  try {
    const { userId, discription, pictureUrl } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: User.firstName,
      lastName: User.lastName,
      location: User.location,
      discription,
      userPictureUrl: User.pictureUrl,
      pictureUrl,
      likes: {},
      comment: [],
    });

    // Save the new Post
    await newPost.save();
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// GetFeedPosts
export const GetFeedPosts = async (req, res) => {
  try {
    const feedPosts = await Post.find();
    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Read User Posts
export const getUserPosts = async (req, res) => {
  try {
    // Get User Id
    const { userId } = req.params;
    const userPostFound = await Post.find({ userId });
    res.status(200).json(userPostFound);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const Postfound = Post.find({id});
        const isLiked = Postfound.likes.get(userId);

        if(isLiked){
            Postfound.likes.delete(userId);
        } else {
            Postfound.likes.set(userId, true);
        }

        // Updating the post by like
        const updatedPost = Post.findByIdAndUpdate(
            id,
            {likes: Postfound.likes},
            {new : true},
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(404).json({error: err.message});
    }
};
