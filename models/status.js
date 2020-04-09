module.exports = function(sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        status: {
        type: DataTypes.STRING,
        allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        q1: DataTypes.STRING,
        q2: DataTypes.STRING,
        q3: DataTypes.STRING,
        q4: DataTypes.STRING,
        q5: DataTypes.STRING,
        q6: DataTypes.STRING
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