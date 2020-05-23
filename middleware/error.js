module.exports = function errorHandler(req, res) {
  res.status(404).render('404', {
    title: 'Страница не найдена',
  });
};
