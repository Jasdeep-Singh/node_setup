/*
 * @file: db-schema.js
 * @description: It Contain db schema for user collection.
 * @author: Jasdeep Singh
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    loginToken: [
      {
        token: {
          type: String,
          default: ''
        },
        createdAt: {
          type: Date,
          default: new Date()
        }
      }
    ],
    status: {
      type: Number,
      default: 1 // 0 account deleted, 1 active, 2 block
    },
    lastLogin: {
      type: Date,
      default: null
    },
    settings: {
      notifications: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

export default userSchema;
