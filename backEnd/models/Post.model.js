import mongoose from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    discription: String,
    pictureUrl: String,
    userPictureUrl: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamp: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
