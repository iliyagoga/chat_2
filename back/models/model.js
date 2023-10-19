const sequelize =require('../dbConfiguration')
const {DataTypes, BIGINT} =require('sequelize')
const Roles =sequelize.define('Roles',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    role: {type: DataTypes.STRING}
})
const Users=sequelize.define('Users',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    nickname:{type: DataTypes.STRING,allowNull: false,unique:true},
    password:{type: DataTypes.STRING,allowNull: false},
    name: {type: DataTypes.STRING},
    sername: {type: DataTypes.STRING},
    phone:{type: DataTypes.INTEGER,unique: true},
    avatar: {type: DataTypes.STRING},
    date:{type: DataTypes.STRING},
    regdate:{type:DataTypes.STRING}
})
const Chats=sequelize.define('Chats',{
    id: {type: DataTypes.STRING, primaryKey: true, unique:true},
    name: {type: DataTypes.STRING,unique:true},
    avatar: {type: DataTypes.STRING},
    info:{type:DataTypes.STRING},
    moot:{type: DataTypes.BOOLEAN},
    type:{type:DataTypes.STRING,allowNull:false},
    vision:{type:DataTypes.BOOLEAN,allowNull:false}
})
const Local=sequelize.define('Local',{
    id: {type: DataTypes.STRING, primaryKey: true, unique:true},
    type:{type:DataTypes.STRING,allowNull:false}
})
const Subscribers=sequelize.define('Subscribers',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    subscriber:{type: DataTypes.STRING},
    mode:{type:DataTypes.BOOLEAN}
})
const Senders=sequelize.define('Senders',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    sender:{type: DataTypes.STRING}
})
const Recipients=sequelize.define('Recipients',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    recipient:{type: DataTypes.STRING}
})
const Files=sequelize.define('Files',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    file:{type: DataTypes.STRING},
    type:{type: DataTypes.BIGINT}
})
const Messages=sequelize.define('Messages',{
    id: {type: DataTypes.STRING,unique:true, primaryKey: true},
    message:{type: DataTypes.STRING},
    createdate:{type:DataTypes.STRING}
})
const Bans=sequelize.define('Bans',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
})

Users.hasMany(Roles)
Roles.belongsTo(Users)

Messages.hasMany(Files)
Files.belongsTo(Messages)


Chats.belongsToMany(Users, {through: 'Subscribers'})
Users.belongsToMany(Chats, {through: 'Subscribers'})

Chats.hasMany(Messages)
Messages.belongsTo(Chats)

Chats.hasMany(Bans)
Bans.belongsTo(Chats)

Users.hasMany(Bans)
Bans.belongsTo(Users)

Local.hasMany(Messages)
Messages.belongsTo(Local)

Local.hasMany(Subscribers)
Subscribers.belongsTo(Local)

Messages.hasOne(Senders)
Senders.belongsTo(Messages)

Messages.hasOne(Recipients)
Recipients.belongsTo(Messages)

Chats.hasMany(Roles)
Roles.belongsTo(Chats)
module.exports={Users,Chats, Roles,Messages, Files, Subscribers,Local,Senders,Recipients,Bans}

