'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeetingRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MeetingRoom.init({
    unit: DataTypes.STRING,
    meeting_room: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    meeting_date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    number_of_participants: DataTypes.INTEGER,
    type_of_consumption: DataTypes.STRING,
    nominal_consumption: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MeetingRoom',
    tableName: 'meeting_rooms',
    timestamps: true,
  });
  return MeetingRoom;
};