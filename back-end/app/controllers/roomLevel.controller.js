const RoomLevel = require("../models/roomLevel.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a RoomLevel
  const roomLevel = new RoomLevel({
    id: req.body.id,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
  });

  // Save RoomLevel in the database
  RoomLevel.create(roomLevel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the RoomLevel.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  RoomLevel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving RoomLevels.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  RoomLevel.findById(req.params.roomLevelId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found RoomLevel with id ${req.params.roomLevelId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving RoomLevel with id " + req.params.roomLevelId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  RoomLevel.updateById(
    req.params.customerId,
    new RoomLevel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found roomLevel with id ${req.params.roomLevelId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating roomLevel with id " + req.params.roomLevelId,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  RoomLevel.remove(req.params.roomLevelId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found RoomLevel with id ${req.params.roomLevelId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete RoomLevel with id " + req.params.roomLevelId,
        });
      }
    } else res.send({ message: `RoomLevel was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  RoomLevel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    else res.send({ message: `All RoomLevels were deleted successfully!` });
  });
};
