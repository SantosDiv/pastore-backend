module.exports = {
  userNotFound: {
    code: 'user_not_found',
    message: 'Usuário e/ou senha inválido',
  },
  userAlreadyExist: {
    code: 'user_already_exist',
    message: 'User already exist',
  },
  userNotDeleted: {
    code: 'user_not_deleted',
    message: 'User not deleted',
  },
  emailInvalid: '"email" must be a valid email',
  scheduleQueryInvalid: {
    code: 'query_invalid',
    message: 'é preciso indicar o mês, ano e o userId para uma busca válida',
  },
  cityNotCreated: {
    code: "city_not_created",
    message: "Ocorreu um erro ao criar esta cidade",
  },
  cityNotFound: {
    code: "city_not_found",
    message: "A cidade não foi encontrada",
  },
  eventAlreadyExists: {
    code: 'event_already_exists',
    message: 'O evento já existe no nosso banco de dados',
  },
  eventNotFound: {
    code: 'event_not_found',
    message: 'Evento não encontrado',
  },
};