'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('meeting_rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      meetingRoom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      meetingDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      waktuMulai: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      waktuSelesai: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      jumlahPeserta: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jenisKonsumsi: {
        type: Sequelize.STRING,
        allowNull: true, // Bisa null jika tidak ada konsumsi
      },
      nominalKonsumsi: {
        type: Sequelize.INTEGER,
        allowNull: true, // Bisa null jika tidak ada konsumsi
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('meeting_rooms');
  }
};
