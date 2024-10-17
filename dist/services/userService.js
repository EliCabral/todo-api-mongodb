"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
exports.default = {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.default.find();
        });
    },
    createUser(nome, sobrenome, cpf, telefone, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield userModel_1.default.findOne({ $or: [{ email }, { cpf }, { telefone }] });
            if (userExists) {
                throw new Error('E-mail, CPF ou telefone já cadastrados.');
            }
            const newUser = new userModel_1.default({ nome, sobrenome, cpf, telefone, email });
            return yield newUser.save();
        });
    },
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, cpf, telefone } = data;
            if (email || cpf || telefone) {
                const sameUser = yield userModel_1.default.findOne({
                    $or: [{ email }, { cpf }, { telefone }],
                    _id: { $ne: id } // $ne = not equal
                });
                if (sameUser) {
                    throw new Error('Usuário com o mesmo e-mail, CPF ou telefone já existe na base de dados.');
                }
            }
            return yield userModel_1.default.findByIdAndUpdate(id, data, { new: true });
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userModel_1.default.findByIdAndDelete(id);
        });
    }
};
