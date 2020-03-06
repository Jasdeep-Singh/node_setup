/*
 * @file: index.js
 * @description: It Contain function layer for user collection.
 * @author: Jasdeep Singh
 */

import mongoose from 'mongoose';
import dbSchema from './db-schema';

class UserClass {
  static findOneByCondition(condition) {
    return this.findOne(condition);
  }
  static findByCondition(condition) {
    return this.find(condition);
  }
  static checkEmail(email) {
    return this.findOne({ email });
  }
  static saveUser(payload) {
    return this(payload).save();
  }
  static updateUser(payload) {
    let updateData = {
      $set: {
        ...payload
      }
    };
    return this.findByIdAndUpdate(payload.userId, updateData, { new: true });
  }
  static onLoginDone(userId, loginToken) {
    let updateData = {
      $push: {
        loginToken: {
          token: loginToken
        }
      },
      $set: {
        lastLogin: new Date()
      }
    };
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }
}

dbSchema.loadClass(UserClass);

export default mongoose.model('User', dbSchema);
