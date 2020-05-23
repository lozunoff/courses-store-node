const { EMAIL_FROM, BASE_URL } = require('../keys');

module.exports = function resetEmail(email, token) {
  return {
    to: email,
    from: EMAIL_FROM,
    subject: 'Сброс пароля',
    html: `
      <h1>Вы забыли пароль?</h1>
      <p>Если нет, проигнорируйте данное письмо.</p>
      <p>Иначе нажмите на ссылку ниже:</p>
      <p><a href="${BASE_URL}/auth/password/${token}">Восстановить доступ</a></p>
      <hr />
      <a href="${BASE_URL}">Магазин курсов</a>
    `,
  };
};
