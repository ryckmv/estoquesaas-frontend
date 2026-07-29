export type Role =
  | "admin"
  | "gerente"
  | "funcionario";


export function temPermissao(
  role: Role,
  permissoes: Role[]
) {

  return permissoes.includes(role);

}