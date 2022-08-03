const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const { sendTalkers, getTalkers } = require('./funcs/talkersRequest');
const { sendTalker } = require('./funcs/talkerRequest');
const {
  isEmailValid,
  isPasswordValid,
  getToken,
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
} = require('./funcs/validadePost');
const { getBySearch } = require('./funcs/getBySearch');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', isTokenValid, async (request, response) => {
  const { q } = request.query;
  const searchResult = await getBySearch(q);
  return response.status(200).json(searchResult);
});

app.get('/talker', sendTalkers);

app.get('/talker/:id', sendTalker);

app.post('/login', isEmailValid, isPasswordValid, (_request, response) => response
  .status(HTTP_OK_STATUS).json({ token: getToken() }));

app.post('/talker',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid, async (request, response) => {
    const { name, age, talk: { watchedAt, rate } } = request.body;
    const talker = { name, age, talk: { watchedAt, rate } };
    const talkers = await getTalkers();
    talker.id = Number(talkers.length) + 1;
    talkers.push(talker);
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
    return response.status(201).json(talker);
  });

  app.put('/talker/:id',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid, async (request, response) => {
    const { name, age, talk: { watchedAt, rate } } = request.body;
    const { id } = request.params;
    const talkers = await getTalkers();
    const newTalkers = talkers.filter(({ id: talkerId }) => Number(talkerId) !== Number(id));
    await fs.writeFile('./talker.json', JSON.stringify(newTalkers));
    const talker = { id, name, age, talk: { watchedAt, rate } };
    talker.id = Number(newTalkers.length) + 1;
    newTalkers.push(talker);
    await fs.writeFile('./talker.json', JSON.stringify(newTalkers));
    return response.status(200).json(talker);
  });

  app.delete('/talker/:id', isTokenValid, async (request, response) => {
    const { id } = request.params;
    const talkers = await getTalkers();
    const newTalkers = talkers.filter(({ id: talkerId }) => Number(talkerId) !== Number(id));
    await fs.writeFile('./talker.json', JSON.stringify(newTalkers));
    return response.status(204).json(newTalkers);
  });

app.listen(PORT, () => {
  console.log('Online');
});
