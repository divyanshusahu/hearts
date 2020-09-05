const service = require("feathers-mongoose");

const Play = require("../../models/Play");
const Room = require("../../models/Room");
const shuffle_deck = require("../../utils/shuffle_deck");

module.exports = (app) => {
  app.use("/plays", service({ Model: Play }));

  app.service("/plays").hooks({
    before: {
      create: [
        async (context) => {
          const room = await Room.findById(context.data._roomid);
          const no_of_players = room.players.length;
          const jump = no_of_players === 4 ? 13 : 10;
          const DeckOfCards = shuffle_deck(no_of_players);
          let decks = {};
          for (let i = 0; i < no_of_players; i++) {
            decks[room.players[i]] = DeckOfCards.slice(
              jump * i,
              jump * i + jump
            );
          }
          context.data.chance = room.players[0];
          context.data.decks = decks;
          return context;
        },
      ],
    },
  });
};
