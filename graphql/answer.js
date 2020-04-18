let graphql = require ('graphql');
let ANSWER = require('../models/Answer');

// Defining the type
const AnswerType = new graphql.GraphQLObjectType({
    name: 'answer',
    fields: () => {
        return {
            id: {type: graphql.GraphQLID},
            username: {type: graphql.GraphQLString},
            text: {type: graphql.GraphQLString},
            questionId: {type: graphql.GraphQLID},
        }
    }
});

let AnswerQueryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields:  () =>  {
        return {
            answers: {
                type: new graphql.GraphQLList(AnswerType),
                args: {
                    questionId: { name: 'Question Id', type: new graphql.GraphQLNonNull(graphql.GraphQLID)}
                },
                resolve:  (root, {questionId}) =>  {
                    return new Promise( (resolve, reject) => {
                        ANSWER.find({questionId}, (err, answers) => {
                            if (err) reject (err);
                            else resolve(answers);
                        });
                    });
                }
            }
        }
    }
});

let AnswerMutationAdd = {
    type: AnswerType,
    description: 'Add an answer to the question',
    args: {
        username: { name: 'Answer username', type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        text: { name: 'Answer text', type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        questionId: { name: 'Question', type: new graphql.GraphQLNonNull(graphql.GraphQLID) }
    },
    resolve: (root, args) => {
        let newAnswer = new ANSWER({ username: args.username, text: args.text, questionId: args.questionId });
        newAnswer.id = newAnswer._id;
        return new Promise((resolve, reject) => {
            newAnswer.save((err) => {
                if (err) reject (err);
                else resolve(newAnswer);
            });
        });
    }
};


let AnswerMutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: AnswerMutationAdd
    }
});



module.exports = new graphql.GraphQLSchema({
    query: AnswerQueryType,
    mutation: AnswerMutationType
});

