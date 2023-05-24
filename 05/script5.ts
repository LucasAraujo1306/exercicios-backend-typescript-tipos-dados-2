import fs from "fs";

type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco: Endereco | null;
};

function lerArquivo(): unknown {
  return JSON.parse(fs.readFileSync("./05/bc.json").toString());
}

function escreverArquivo(dados: any): void {
  fs.writeFileSync("./05/bc.json", JSON.stringify(dados));
}

function cadastrarUsuario(dados: Usuario): Usuario {
  let bd = lerArquivo() as Usuario[];
  bd.push(dados);
  escreverArquivo(bd);
  return dados;
}

const listarUsuarios = (): Usuario[] => {
  return lerArquivo() as Usuario[];
};

const detalharUsuario = (cpf: string): Usuario => {
  const dados = listarUsuarios();
  const usuario = dados.find((usuario) => usuario.cpf === cpf);
  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }
  return usuario;
};

const detalharUsuarioPorProfissao = (profissao: string): Usuario[] => {
  const dados = listarUsuarios();
  if (profissao) {
    const usuarios = dados.filter((usuario) => usuario.profissao === profissao);
    return usuarios;
  }
  return dados;
};

const atualizarUsuario = (cpf: string, dados: Usuario): Usuario => {
  const bd = listarUsuarios();
  const usuario = bd.find((usuario) => usuario.cpf === cpf);
  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }
  Object.assign(usuario, dados);
  escreverArquivo(bd);
  return dados;
};

const deletarUsuario = (cpf: string): void => {
  const bd = listarUsuarios();
  const usuario = bd.find((usuario) => usuario.cpf === cpf);
  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }
  //uma opcão de deletar o usuario menos segura e mais rapido
  const index = bd.indexOf(usuario);
  bd.splice(index, 1);
  escreverArquivo(bd);

  // outra opção de deletar o usuario legibilidade e a segurança
  // const osOutros = bd.filter((usuario) => usuario.cpf !== cpf);
  // escreverArquivo(osOutros);
  return;
};

// cadastrarUsuario({
//   nome: "mario",
//   email: "mario@gmail.com",
//   cpf: "70670123450",
//   profissao: "front",
//   endereco: {
//     cep: "54320550",
//     rua: "corrego",
//     bairro: "Jardin Jordão",
//     cidade: "Jaboatão dos Guararapes",
//   },
// });
const cpf = "70670123450";

// cadastrarUsuario({
//   nome: "felipe",
//   email: "felipe@gmail.com",
//   cpf: "7067012350",
//   profissao: "back",
//   endereco: {
//     cep: "54320550",
//     rua: "corrego",
//     bairro: "Jardin Jordão",
//     cidade: "Jaboatão dos Guararapes",
//   },
// });
const cpf2 = "7067012350";

// cadastrarUsuario({
//   nome: "maria",
//   email: "maria@gmail.com",
//   cpf: "70670123459",
//   profissao: "front",
//   endereco: {
//     cep: "54320550",
//     rua: "corrego",
//     bairro: "Jardin Jordão",
//     cidade: "Jaboatão dos Guararapes",
//   },
// });
const cpf3 = "70670123459";
//antes de deletar crie o usuarios
//deletarUsuario(cpf);
//deletarUsuario(cpf2);

console.log(detalharUsuarioPorProfissao(`front`));
