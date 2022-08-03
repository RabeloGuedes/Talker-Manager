const fs = require('fs').promises;

const getBySearch = async (search) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  const talkersParsed = JSON.parse(talkers);
  if (search === '') {
    return talkersParsed;
  }
  const talkersFiltered = talkersParsed.filter((talker) => talker.name.includes(search));
  return talkersFiltered;
};

module.exports = { getBySearch };