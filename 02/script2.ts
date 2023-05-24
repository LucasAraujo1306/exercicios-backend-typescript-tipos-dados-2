import fs from "fs";

function lerArquivo(): unknown {
  return JSON.parse(fs.readFileSync("./02/bc.json").toString());
}

function escreverArquivo(dados: any): void {
  fs.writeFileSync("./02/bc.json", JSON.stringify(dados));
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

const usuario1 = cadastrarUsuario({
  nome: "Lucas",
  email: "XXXXXXXXXXXXXXX",
  cpf: "XXXXXXXXXXXXXXX",
  profissao: "Programador",
  endereco: {
    cep: "XXXXXXXXXXXXXXX",
    rua: "XXXXXXXXXXXXXXX",
    complemento: "XXXXXXXXXXXXXXX",
    bairro: "XXXXXXXXXXXXXXX",
    cidade: "XXXXXXXXXXXXXXX",
  },
});

console.log(usuario1);
console.log(listarUsuarios());
