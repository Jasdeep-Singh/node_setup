/*
 * @file: index.js
 * @description: It Contain function layer for survey collection.
 * @author: Jasdeep Singh
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class SurveyQuestionsClass {
  static add(payload) {
    return this(payload).save();
  }
  static findOneByCondition(condition) {
    return this.findOne(condition);
  }
  static findByCondition(condition) {
    return this.find(condition);
  }
  static updateSurvey(payload) {
    let updateData = {
      $set: {
        ...payload
      }
    };
    return this.findByIdAndUpdate(payload.id, updateData, { new: true });
  }
}

dbSchema.loadClass(SurveyQuestionsClass);

export default mongoose.model('survey_questions', dbSchema);
