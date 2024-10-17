"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./config/db"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
// Conectar ao MongoDB
(0, db_1.default)();
// Middleware
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// Rotas
app.use('/api', users_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
