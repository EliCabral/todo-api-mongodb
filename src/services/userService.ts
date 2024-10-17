import User, {IUser} from "../models/userModel";

export default {
  async getUsers(): Promise<IUser[]> {
    return await User.find();
  },

  async createUser(nome: string, sobrenome: string, cpf: string, telefone: string, email: string): Promise<IUser> {
    const userExists = await User.findOne({ $or: [{ email }, { cpf }, { telefone }] });

    if (userExists) {
      throw new Error('E-mail, CPF ou telefone já cadastrados.');
    }

    const newUser = new User({ nome, sobrenome, cpf, telefone, email });
    
    return await newUser.save();
  },

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const { email, cpf, telefone } = data;

    if (email || cpf || telefone) {
      const sameUser = await User.findOne({
        $or: [{ email }, { cpf }, { telefone }],
        _id: { $ne: id } // $ne = not equal
      });
      if (sameUser) {
        throw new Error('Usuário com o mesmo e-mail, CPF ou telefone já existe na base de dados.');
      }
    }

    return await User.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

};
