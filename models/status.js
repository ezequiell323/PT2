module.exports = function(sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        status: {
        type: DataTypes.STRING,
        allowNull: false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Status.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Status.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
          });
      };


    return Status;
};