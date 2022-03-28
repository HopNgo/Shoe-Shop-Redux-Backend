import { commentModel } from "../model/comment.js"

export const getAllComments = async (req, res) => {
    try {
        const comments = await commentModel.find().sort({ updatedAt: -1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const addComment = async (req, res) => {
    try {
        const newComment = {
            body: req.body.body,
            productSlug: req.body.productSlug,
            name: req.body.name,
            userId: req.body.userId,
            parentId: req.body.parentId,
            avatarUrl: req.body.avatarUrl
        }
        const newCommentModel = new commentModel(newComment);
        await newCommentModel.save();
        res.status(200).json(newCommentModel);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const deleteComment = async (req, res) => {
    try {
        const commentDeleted = await commentModel.findOneAndDelete({ _id: req.body.id });
        res.status(200).json(commentDeleted);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const updateComment = async (req, res) => {
    try {
        const newUpdateComment = req.body;
        const commentUpdated = await commentModel.findOneAndUpdate({ _id: newUpdateComment._id }, newUpdateComment, { new: true });
        res.status(200).json(commentUpdated);
    } catch (err) {
        res.status(500).json(err);
    }
}