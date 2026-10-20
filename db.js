import { DataTypes, Sequelize } from "sequelize";
import _ from "lodash";
import Faker from "@faker-js/faker";

const Conn = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    host: 'localhost'
})

const modelNamePerson = 'person';

/** @type {import('sequelize').ModelAttributes} */
const personAttributes = {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
}

const Person = Conn.define(modelNamePerson, personAttributes);

const modelNamePost = 'post';

const postAttributes = {
    title: {
        types: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
const Post = Conn.define(modelNamePost, postAttributes);

// Relationships
Person.hasMany(Post);
Post.belongsTo(Person)

Conn.sync({ force: true }).then(() => {
    _.times(10, () => {
        return Person.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        })
    })
})

export default Conn;