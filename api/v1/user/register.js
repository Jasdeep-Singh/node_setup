/*
 * @file: register.js
 * @description: It Contain register router/api.
 * @author: Jasdeep Singh
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { register } from '../../../controllers/user';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user:
 *  post:
 *   tags: ["user"]
 *   summary: user add api
 *   description: api used to add users
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           firstName:
 *             type: string
 *             required:
 *           lastName:
 *             type: string
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .label('First name'),
  lastName: Joi.string()
    .optional()
    .allow('')
    .label('Last name'),
  email: Joi.string()
    .email()
    .required()
    .label('Email'),
  password: Joi.string()
    .trim()
    .required()
});

app.post(
  '/user',
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  register
);

export default app;
