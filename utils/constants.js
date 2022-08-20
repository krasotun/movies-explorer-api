const PORT = 3000;
const DB_ADRESS = 'mongodb://localhost:27017/diploma';
const USER_SCHEMA_REQ_MSGS = {
  EMAIL: 'Электронная почта (e-mail)  явлется обязательным полем для заполнения',
  PASSWORD: 'Пароль (password) явлется обязательным полем для заполнения',
  NAME: 'Имя пользователя (name) явлется обязательным полем для заполнения',
};
const USER_SCHEMA_VAL_MSGS = {
  EMAIL: 'Введенное значение не явлется корректным адресом e-mail',
  NAME: 'Необходимая длина от 2 до 30 символов',
};
const BAD_REQ_MSG = 'Данные переданы неверно';
const DUPLICATE_DATA_MSG = 'Данные уже есть в базе данных';
module.exports = {
  PORT,
  DB_ADRESS,
  USER_SCHEMA_REQ_MSGS,
  USER_SCHEMA_VAL_MSGS,
  BAD_REQ_MSG,
  DUPLICATE_DATA_MSG,
};
