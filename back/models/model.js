const sequelize =require('../dbConfiguration')
const {DataTypes} =require('sequelize')
const Roles =sequelize.define('Roles',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    role: {type: DataTypes.STRING}
})
const Users=sequelize.define('Users',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    nickname:{type: DataTypes.STRING,allowNull: false},
    password:{type: DataTypes.STRING,allowNull: false},
    name: {type: DataTypes.STRING},
    sername: {type: DataTypes.STRING},
    phone:{type: DataTypes.INTEGER,unique: true},
    avatar: {type: DataTypes.STRING},
    date:{type: DataTypes.INTEGER},
    regdate:{type:DataTypes.INTEGER}
})
const Chats=sequelize.define('Chats',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING},
    createdate:{type:DataTypes.INTEGER},
    mode:{type:DataTypes.STRING},
    info:{type:DataTypes.STRING},
    moot:{type: DataTypes.BOOLEAN}
})
const Subscribers=sequelize.define('Sybscribers',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    subdate:{type:DataTypes.INTEGER},
})
const Files=sequelize.define('Files',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    file:{type: DataTypes.STRING}
})
const Messages=sequelize.define('Messages',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    message:{type: DataTypes.STRING},
    createdate:{type:DataTypes.INTEGER}
})

Users.hasMany(Roles)
Roles.belongsTo(Users)

Messages.hasMany(Files)
Files.belongsTo(Messages)

Chats.hasMany(Subscribers)
Subscribers.belongsTo(Chats)

Users.hasMany(Subscribers)
Subscribers.belongsTo(Users)

Chats.hasMany(Messages)
Messages.belongsTo(Chats)

Subscribers.hasMany(Messages)
Messages.belongsTo(Subscribers)

Chats.hasMany(Roles)
Roles.belongsTo(Chats)

