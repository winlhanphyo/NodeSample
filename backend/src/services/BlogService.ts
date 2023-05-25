import { Request, Response, NextFunction } from 'express';
import Blog from '../models/Blog';
import { BlogCreate } from '../interfaces/Blog';
import { validationResult } from 'express-validator';
const logger = require('../loggers/logger');
/**
 * get blog service.
 * @param _req 
 * @param res 
 * @param next 
 */
export const getBlogService = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    let condition: any = { deleted_at: null };
    const blogs = await Blog.find(condition);
    res.json({ data: blogs, status: 1 });
  } catch (err) {
    res.send("An error occured");
    logger.blogInfoLogger.log('error', 'Error Blog Lists')
  }
};

/**
 * create blog service
 * @param req 
 * @param res 
 * @param next 
 */
export const createBlogService = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const blogList: BlogCreate = req.body;
    const result: any = await Blog.insertMany(blogList);
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    res.send("An error occured");
    logger.blogInfoLogger.log('info', 'Error Create Blog')
  }
};

export const findBlogService = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      const error: any = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: blog, status: 1 });
  } catch (err) {
      res
        .status(404)
        .json({ message: "Blog not found!", status: 0 });
    logger.blogErrorLogger.log('error', 'Blog Not Found!')
  }
}

export const updateBlogService = async (
  req: any,
  res: Response,
  _next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const blog: any = await Blog.findById(req.params.id);
    if (!blog) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    blog.title = req.body.title;
    blog.description = req.body.description;
    const result = await blog.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
  } catch (err) {
    res.send("An error occured");
    logger.blogErrorLogger.log('info', 'Error Update Blog!')
  }
};

export const deleteBlogService = async (
  req: any,
  res: Response,
  _next: NextFunction
) => {
  try {
    const blog: any = await Blog.findById(req.params.id);
    if (!blog) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    blog.deleted_at = new Date();
    await blog.save();
    res.json({ message: "Deleted Successfully!", status: 1 });
  } catch (err) {
    res.send("An error occured");
    logger.blogErrorLogger.log('error', 'Error Delete Blog')
  }
};

export const findByNameService = async (
  req: any,
  res: Response,
  _next: NextFunction
) => {
  try {
    let condition: any = { title: { '$regex': req.body.title, '$options': 'i' }, deleted_at: null };
    const blogs = await Blog.find(condition);
    res.json({ data: blogs, status: 1 });
  } catch (err) {
    res.send("An error occured");
    logger.blogErrorLogger.log('error', 'Error Search Blog!')
  }
}