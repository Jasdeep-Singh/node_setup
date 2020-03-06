/*
 * @file: db-schema.js
 * @description: It Contain db schema for users survey collection.
 * @author: Jasdeep Singh
 */

import mongoose from 'mongoose';

const surveyQuestionsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'surveys' },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'survey_questions'
    },
    elements: [
      {
        _id: { type: String, required: true },
        value: { type: String, default: null }
      }
    ]
  },
  { timestamps: true }
);

export default surveyQuestionsSchema;
