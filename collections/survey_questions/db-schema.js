/*
 * @file: db-schema.js
 * @description: It Contain db schema for survey collection.
 * @author: Jasdeep Singh
 */

import mongoose from 'mongoose';

const surveyQuestionsSchema = new mongoose.Schema(
  {
    surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'surveys' },
    type: {
      type: Number,
      default: 2 // 1=> internal, 2=> external
    },
    pageNumber: {
      type: Number,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    elements: [
      {
        name: { type: String, required: true },
        refName: { type: String, default: null },
        refValue: { type: String, default: '' },
        type: { type: String, required: true }, // text, checkbox, radio, textarea, select etc.
        choices: { type: Array, default: [] }
      }
    ]
  },
  { timestamps: true }
);

export default surveyQuestionsSchema;
