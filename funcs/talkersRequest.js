const fs = require('fs').promises;

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  if (JSON.parse(talkers).length) return JSON.parse(talkers);
  return [];
};

const sendTalkers = async (_request, response) => {
  const talkers = await getTalkers();
  response.status(200).send(talkers);
};

module.exports = { sendTalkers, getTalkers };