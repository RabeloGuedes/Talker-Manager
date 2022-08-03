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

const isTokenValid = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({
      message: 'Token inválido',
    });
  } return next();
};

const isNameValid = (request, response, next) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return response.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  } return next();
};

const isAgeValid = (request, response, next) => {
  const { age } = request.body;
  if (!age || age === '') {
    return response.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return response.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  } return next();
};

const isTalkValid = (request, response, next) => {
  const { talk } = request.body;
  if (!talk) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  } return next();
};

const isWatchedAtValid = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  const regexWatchedAt = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const isValid = regexWatchedAt.test(watchedAt);
  if (!watchedAt || watchedAt === '') {
    return response.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!isValid) {
    return response.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  } return next();
};

const isRateValid = (request, response, next) => {
  const { talk: { rate } } = request.body;
  if (!rate && rate !== 0) {
    return response.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (rate < 1 || rate > 5) {
    return response.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } return next();
};

module.exports = {
  isEmailValid,
  isPasswordValid,
  getToken,
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
};