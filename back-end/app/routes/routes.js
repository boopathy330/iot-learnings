module.exports = (app) => {
  const roomLevel = require("../controllers/roomLevel.controller.js");

  // Create a new roomLevel
  app.post("/roomLevel", roomLevel.create);

  // Retrieve all roomLevels
  app.get("/roomLevel", roomLevel.findAll);

  // Retrieve a single roomLevel with roomLevelId
  app.get("/roomLevel/:roomLevelId", roomLevel.findOne);

  // Update a roomLevel with roomLevelId
  app.put("/roomLevel/:roomLevelId", roomLevel.update);

  // Delete a roomLevel with roomLevelId
  app.delete("/roomLevel/:roomLevelId", roomLevel.delete);

  // Create a new roomLevel
  app.delete("/roomLevel", roomLevel.deleteAll);
};
