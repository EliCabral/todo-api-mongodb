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
const userService_1 = __importDefault(require("../services/userService"));
exports.default = {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.default.getUsers();
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(400).json({ error: 'Erro ao listar usuários' });
            }
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, sobrenome, cpf, telefone, email } = req.body;
            try {
                // Passar argumentos separadamente, conforme definido na assinatura do método
                const newUser = yield userService_1.default.createUser(nome, sobrenome, cpf, telefone, email);
                return res.status(201).json(newUser);
            }
            catch (error) {
                console.error('Erro ao criar usuário:', error);
                return res.status(400).json({ error: error.message || 'Erro ao criar usuário' });
            }
        });
    },
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nome, sobrenome, cpf, email, telefone } = req.body;
            try {
                const updatedUser = yield userService_1.default.updateUser(id, { nome, sobrenome, cpf, email, telefone });
                if (updatedUser) {
                    return res.status(200).json(updatedUser);
                }
                else {
                    return res.status(404).json({ error: 'Usuário não encontrado' });
                }
            }
            catch (error) {
                return res.status(400).json({ error: error.message || 'Erro ao atualizar usuário' });
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield userService_1.default.deleteUser(id);
                return res.status(204).send();
            }
            catch (error) {
                return res.status(400).json({ error: 'Erro ao excluir usuário' });
            }
        });
    }
};
