import express from 'express';
import { getBlogs, createBlog, findBlog, updateBlog, deleteBlog, findByName } from '../controllers/BlogController';
import { body } from 'express-validator';

const router = express.Router();

router
  .route("/")
  .get(getBlogs)
  .post(
    [
      body("title").notEmpty().withMessage("Tilte must not be empty"),
      body("description").notEmpty().withMessage("Description must note be empty")
    ],
    createBlog);

router
  .route("/search")
  .post(findByName)

router
  .route("/:id")
  .get(findBlog)
  .put(
    [
      body("title").notEmpty().withMessage("Tilte must not be empty"),
      body("description").notEmpty().withMessage("Description must note be empty")
    ],
    updateBlog)
  .delete(deleteBlog)
export default router;