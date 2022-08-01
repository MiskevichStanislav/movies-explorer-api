const { NODE_ENV, JWT_SECRET, BD } = process.env;

const ERRORS = {
  DEFAULT: 'Произошла ошибка.',
  AUTH: 'Необходима авторизация',
  MANY_REQUEST: 'Слишком много запросов, повторите попытку позже.',
  INCORRECT_REQUEST: 'Ресурс не найден. Проверьте URL и метод запроса',

  MOVIE: {
    INCORRECT_DATA: 'Переданы некорректные данные при сохранении фильма.',
    NOT_FOUND: 'Фильм не найден.',
    NO_ACCESS_RIGHTS: 'У вас недостаточно прав доступа.',
    ID: 'Передан некорректный id фильма.',
  },

  USER: {
    NOT_FOUND: 'Пользователь не найден.',
    ID: 'Передан некорректный id пользователя.',
    INCORRECT_UPDATE: 'Переданы некорректные данные при обновлении профиля.',
    INCORRECT_CREATE: 'Переданы некорректные данные при создании пользователя.',
    INCORRECT_LOGIN: 'Переданы некорректные данные при входе.',
    EXISTS: 'Такой пользовательуже существует!',
    AUTH: 'Неправильные почта или пароль',
  },
};

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

const addressMongoDB = NODE_ENV === 'production' ? BD : 'mongodb://localhost:27017/moviedb';

module.exports = {
  secretKey,
  ERRORS,
  addressMongoDB,
};
