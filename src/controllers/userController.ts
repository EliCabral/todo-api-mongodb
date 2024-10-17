import { Request, Response } from 'express';
import UserService from '../services/userService';

export default {

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao listar usuários' });
    }
  },

  async createUser(req: Request, res: Response) {
    const { nome, sobrenome, cpf, telefone, email } = req.body;

    try {
      const newUser = await UserService.createUser(nome, sobrenome, cpf, telefone, email);

      return res.status(201).json(newUser);
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      return res.status(400).json({ error: error.message || 'Erro ao criar usuário' });
    }
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, sobrenome, cpf, email, telefone } = req.body;

    try {
      const updatedUser = await UserService.updateUser(id, { nome, sobrenome, cpf, email, telefone });

      if (updatedUser) {
        return res.status(200).json(updatedUser);
      } else {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error:any) {
      return res.status(400).json({ error: error.message || 'Erro ao atualizar usuário' });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    
    try {
      await UserService.deleteUser(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao excluir usuário' });
    }
  }

};
