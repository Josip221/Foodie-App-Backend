//const { createChatroom1 } = require('../controllers/controllersChatroom');

module.exports = io => {
  const createChatroom = async function () {
    //await createChatroom1();
    console.log('create chat room');
  };
  return { createChatroom };
};
