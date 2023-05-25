import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deleted_at: {
    type: Date
  },
},
  {
    timestamps: true
  }
);

blogSchema.plugin(require('mongoose-autopopulate'));
export default model("blog", blogSchema)
