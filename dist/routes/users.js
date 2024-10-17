"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
router.get('/users', userController_1.default.getUsers);
router.post('/users', userController_1.default.createUser);
router.put('/users/:id', userController_1.default.updateUser);
router.delete('/users/:id', userController_1.default.deleteUser);
exports.default = router;
