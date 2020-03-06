/*
 * @file: index.js
 * @description: It Contain function layer for user survey collection.
 * @author: Jasdeep Singh
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class UserSurveyClass {
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
  static existingSurvey({ userId }) {
    return this.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: 'surveys',
          localField: 'surveyId',
          foreignField: '_id',
          as: 'survey'
        }
      },
      { $unwind: '$survey' },
      {
        $group: {
          _id: '$survey._id',
          name: { $first: '$survey.name' },
          description: { $first: '$survey.description' }
        }
      },
      {
        $project: {
          _id: '$_id',
          name: '$name',
          description: '$description'
        }
      }
    ]);
  }
}

dbSchema.loadClass(UserSurveyClass);

export default mongoose.model('user_surveys', dbSchema);
