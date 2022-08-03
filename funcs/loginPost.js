const crypto = require('crypto');

const getToken = () => crypto.randomBytes(8).toString('hex');

const isEmailValid = (request, response, next) => {
  const { email } = request.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValid = emailRegex.test(email);
  if (!email || email === '') {
    return response.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!isValid) {
    return response.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } return next();
};

const isPasswordValid = (request, response, next) => {
  const { password } = request.body;
  if (!password || password === '') {
    return response.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return response.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
  });
  } return next();
};

module.exports = {
  isEmailValid,
  isPasswordValid,
  getToken,
};