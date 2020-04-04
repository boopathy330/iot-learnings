const sql = require("../../db.js");

// constructor
const RoomLevel = function (roomLevel) {
  this.id = roomLevel.id;
  this.temperature = roomLevel.temperature;
  this.humidity = roomLevel.humidity;
  this.created_time = roomLevel.createTime;
  this.updated_time = roomLevel.updatedTime;
};

RoomLevel.create = (newRoomLevel, result) => {
  sql.query("INSERT INTO room_level SET ?", newRoomLevel, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created roomLevel: ", { id: res.insertId, ...newRoomLevel });
    result(null, { id: res.insertId, ...newRoomLevel });
  });
};

RoomLevel.findById = (roomLevelId, result) => {
  sql.query(
    `SELECT * FROM room_level WHERE id = ${roomLevelId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found roomLevel: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found RoomLevel with the id
      result({ kind: "not_found" }, null);
    }
  );
};

RoomLevel.getAll = (result) => {
  sql.query("SELECT * FROM room_level", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("room_level: ", res);
    result(null, res);
  });
};

RoomLevel.updateById = (id, roomLevel, result) => {
  sql.query(
    "UPDATE room_level SET temperature = ?, humidty = ? WHERE id = ?",
    [roomLevel.temperature, roomLevel.humidty, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found RoomLevel with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated roomLevel: ", { id: id, ...roomLevel });
      result(null, { id: id, ...roomLevel });
    }
  );
};

RoomLevel.remove = (id, result) => {
  sql.query("DELETE FROM room_level WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found RoomLevel with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted roomLevel with id: ", id);
    result(null, res);
  });
};

RoomLevel.removeAll = (result) => {
  sql.query("DELETE FROM room_level", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} room_level`);
    result(null, res);
  });
};

module.exports = RoomLevel;
