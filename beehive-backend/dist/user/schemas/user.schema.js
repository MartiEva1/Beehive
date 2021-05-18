"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    birth: Date,
    img: String,
    created_at: { type: Date, default: Date.now }
});
//# sourceMappingURL=user.schema.js.map