const fs = require('fs').promises;

const talkersPath = './talker.json';

const getTalker = async (id) => {
  const talkers = await fs.readFile(talkersPath, 'utf8');
  return JSON.parse(talkers).find((currentTalker) => currentTalker.id === Number(id));
};

const sendTalker = async (request, response) => {
  const talker = await getTalker(request.params.id);
  if (talker) {
    return response.status(200).json(talker);
  }
  return response.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
};

module.exports = { sendTalker };