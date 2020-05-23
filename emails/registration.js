const { EMAIL_FROM, BASE_URL } = require('../keys');

module.exports = function regEmail(email) {
  return {
    to: email,
    from: EMAIL_FROM,
    subject: 'Аккаунт создан',
    html: `
      <h1>Добро пожаловать в наш магазин</h1>
      <p>Вы успешно создали аккаунт с email - ${email}</p>
      <hr />
      <a href="${BASE_URL}">Магазин курсов</a>
    `,
  };
};
