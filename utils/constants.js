const PORT = 3000;
const DB_ADDRESS = 'mongodb://localhost:27017/diploma';

const USER_SCHEMA_REQ_MSGS = {
  EMAIL: 'Электронная почта (e-mail)  явлется обязательным полем для заполнения',
  PASSWORD: 'Пароль (password) явлется обязательным полем для заполнения',
  NAME: 'Имя пользователя (name) явлется обязательным полем для заполнения',
};
const USER_SCHEMA_VAL_MSGS = {
  EMAIL: 'Введенное значение не явлется корректным адресом e-mail',
  NAME: 'Необходимая длина от 2 до 30 символов',
};

const MOVIE_SCHEMA_REQ_MSGS = {
  COUNTRY: 'Страна (country)  явлется обязательным полем для заполнения',
  DIRECTOR: 'Режиссер (director) явлется обязательным полем для заполнения',
  DURATION: 'Длительность фильма (duration) явлется обязательным полем для заполнения',
  YEAR: 'Год выпуска фильма (year) явлется обязательным полем для заполнения',
  DESCRIPTION: 'Описание фильма (description) явлется обязательным полем для заполнения',
  IMAGE: 'Постер фильма (image) явлется обязательным полем для заполнения',
  TRAILER: 'Ссылка на трейлер фильма (trailerLink) явлется обязательным полем для заполнения',
  THUMBNAIL: 'Миниатюрное изображение постера к фильму (thumbnail) явлется обязательным полем для заполнения',
  OWNER: 'id пользователя, который сохранил фильм (owner) явлется обязательным полем для заполнения',
  MOVIEID: 'id фильма (movieId) явлется обязательным полем для заполнения',
  NAMERU: 'Название фильма на русском языке(nameRU) явлется обязательным полем для заполнения',
  NAMEEN: 'Название фильма на английском языке(nameEN) явлется обязательным полем для заполнения',
};
const MOVIE_SCHEMA_VAL_MSGS = {
  IMAGE_LINK: 'Не является корректным URL адресом для постера к фильму',
  TRAILER_LINK: 'Не является корректным URL адресом для трейлера к фильму',
  THUMBNAIL_LINK: 'Не является корректным URL адресом для миниатюрного изображения к фильму',
};

const BAD_REQ_MSG = 'Данные переданы неверно';
const DUPLICATE_DATA_MSG = 'Данные уже есть в базе данных';
const AUTH_ERR_MSG = 'Неверный e-mail или пароль';
const NEED_AUTH_MSG = 'Необходима авторизация';
const SRV_SIDE_ERR = 'На сервере произошла ошибка';
const VAL_ERR = 'ValidationError';

module.exports = {
  PORT,
  DB_ADDRESS,
  USER_SCHEMA_REQ_MSGS,
  USER_SCHEMA_VAL_MSGS,
  MOVIE_SCHEMA_REQ_MSGS,
  MOVIE_SCHEMA_VAL_MSGS,
  BAD_REQ_MSG,
  DUPLICATE_DATA_MSG,
  AUTH_ERR_MSG,
  NEED_AUTH_MSG,
  SRV_SIDE_ERR,
  VAL_ERR,
};
