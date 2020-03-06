/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Jasdeep Singh
 */

import user from "./v1/user";
import survey from "./v1/survey";

/*********** Combine all Routes ********************/
export default [...user, ...survey];
