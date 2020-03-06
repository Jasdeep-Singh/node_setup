/*
 * @file: db-schema.js
 * @description: It Contain db schema for survey collection.
 * @author: Jasdeep Singh
 */

import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default surveySchema;
