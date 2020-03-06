/*
 * @file: index.js
 * @description: It's combine all survey routers.
 * @author: Jasdeep Singh
 */
import addSurvey from './add';
import addQuestions from './add-questions';
import getQuestions from './get-questions';
import saveSurvey from './save';
import existingSurvey from './existing';

export default [
  addSurvey,
  addQuestions,
  getQuestions,
  saveSurvey,
  existingSurvey
];
