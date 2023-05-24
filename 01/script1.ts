import fs from "fs";

function lerArquivo(): unknown {
  return JSON.parse(fs.readFileSync("../bd.json").toString());
}

// console.log(lerArquivo());

function escreverArquivo(dados: any): void {
  fs.writeFileSync("../bd.json", JSON.stringify(dados));
}
// const dados = lerArquivo() as string[];
// dados.push("Oi");
// escreverArquivo(dados);

//console.log(lerArquivo());
