import { findUserByEmail } from "./userModel.js";

const user = await findUserByEmail("admin@example.com");
console.log(user);