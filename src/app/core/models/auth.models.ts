export interface UnidadeStored {
  id: number;
  nome: string;
}

export interface UsuarioStored {
  nome_usuario: string;
  access: string;
  unidade_padrao: UnidadeStored;
  funcoes_padrao: string[];
}
