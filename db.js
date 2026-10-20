import { DataTypes, Sequelize } from "sequelize";
import _ from "lodash";
import { faker } from "@faker-js/faker";

import { DB_CONFIG } from "./config.js"

const Conn = new Sequelize({
    database: DB_CONFIG.DB_NAME,
    username: DB_CONFIG.DB_USERNAME,
    password: DB_CONFIG.DB_PASSWORD,
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
        type: DataTypes.STRING,
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
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),

        }).then(person => {
            return person.createPost({
                title: `Sample title by ${person.firstName}`,
                content: 'This is a sample article',
            })
        })
    })
})

export default Conn;