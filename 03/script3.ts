import fs from "fs";

function lerArquivo(): unknown {
  return JSON.parse(fs.readFileSync("./03/bc.json").toString());
}

function escreverArquivo(dados: any): void {
  fs.writeFileSync("./03/bc.json", JSON.stringify(dados));
}

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

// cadastrarUsuario({
//   nome: "Lucas",
//   email: "lucas@gmail.com",
//   cpf: "7067012345",
//   profissao: "Programador",
//   endereco: {
//     cep: "54320550",
//     rua: "corrego",
//     bairro: "Jardin Jordão",
//     cidade: "Jaboatão dos Guararapes",
//   },
// });

const cpf = "7067012345";

console.log(detalharUsuario(cpf));

atualizarUsuario(cpf, {
  nome: "Lucas",
  email: "lucas@gmail.com",
  cpf: "7067012345",
  profissao: "Programador Back",
  endereco: {
    cep: "54320550",
    rua: "corrego",
    bairro: "Jardin Jordão",
    cidade: "Jaboatão dos Guararapes",
  },
});
