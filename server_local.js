const app = require("./server");
const PORT = process.env.PORT || 3030;

app
  .listen(PORT)
  .on("listening", () =>
    console.log(`Feathersjs service started on port ${PORT}`)
  );
