export const listaProjetos = [
  {
    id: 1,
    nome: 'Projeto 1',
    descricao: 'Descrição projeto 1',
    ownerId: 1,
    membros: [
      {
        id: 1,
        nome: 'Jessica Pergentino',
        email: 'jessicapergentino@hotmail.com',
        organizacao: 'UCSAL',
        permissao: 'ADMIN'
      },
      {
        id: 2,
        nome: 'Demetrius',
        email: 'jessicapergentino@hotmail.com',
        organizacao: 'UCSAL',
        permissao: 'MEMBRO'
      }
    ],
    criterios: [
      {
        id: 1,
        nome: 'Critério 1'
      },
      {
        id: 2,
        nome: 'Critério 2'
      }
    ],
    dataEntrega: new Date(2020, 4, 30),
    createdAt: new Date(2020, 4, 17)
  },
  {
    id: 2,
    nome: 'Projeto 2',
    descricao: 'Descrição projeto 2',
    ownerId: 1,
    membros: [
      {
        id: 1,
        nome: 'Jessica Pergentino',
        email: 'jessicapergentino@hotmail.com',
        organizacao: 'UCSAL',
        permissao: 'ADMIN'
      }
    ],
    criterios: [
      {
        id: 10,
        nome: 'Critério 1'
      },
      {
        id: 11,
        nome: 'Critério 2'
      }
    ],
    dataEntrega: new Date(2020, 4, 30),
    createdAt: new Date(2020, 4, 17)
  }
]

export const listaUsuarios = [
  {
    id: 1,
    nome: 'Jessica Pergentino',
    email: 'jessicapergentino@hotmail.com',
    organizacao: 'UCSAL',
    permissao: 'ADMIN'
  },
  {
    id: 2,
    nome: 'Demetrius',
    email: 'jessicapergentino@hotmail.com',
    organizacao: 'UCSAL',
    permissao: 'MEMBRO'
  },
  {
    id: 3,
    nome: 'Usuário Qualquer',
    email: 'jessicapergentino@hotmail.com',
    organizacao: 'UCSAL',
    permissao: 'MEMBRO'
  }
]
