import { Request, Response, NextFunction } from 'express';
import {
  getBlogService,
  createBlogService,
  findBlogService,
  updateBlogService,
  deleteBlogService,
  findByNameService
} from '../services/BlogService';


export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getBlogService(req, res, next);
};

export const createBlog = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  createBlogService(req, res, next);
}

export const findBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findBlogService(req, res, next);
}

export const updateBlog = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  updateBlogService(req, res, next);
};

export const deleteBlog = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  deleteBlogService(req, res, next);
};

export const findByName = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  findByNameService(req, res, next);
}