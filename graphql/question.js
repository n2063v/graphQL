let graphql = require ('graphql');
let QUESTION = require('../models/Question');

// Defining the type
const QuestionType = new graphql.GraphQLObjectType({
    name: 'question',
    fields: () => {
        return {
            id: {type: graphql.GraphQLID},
            username: {type: graphql.GraphQLString},
            text: {type: graphql.GraphQLString}
        }
    }
});

let QuestionQueryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields:  () =>  {
        return {
            questions: {
                type: new graphql.GraphQLList(QuestionType),
                resolve:  () =>  {
                    return new Promise( (resolve, reject) => {
                        QUESTION.find((err, questions) => {
                            if (err) reject (err);
                            else resolve(questions);
                        });
                    });
                }
            }
        }
    }
});

let QuestionMutationAdd = {
    type: QuestionType,
    description: 'Add a question',
    args: {
        username: { name: 'Question username', type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        text: { name: 'Question text', type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
    },
    resolve: (root, args) => {
        let newQuestion = new QUESTION({ username: args.username, text: args.text });
        newQuestion.id = newQuestion._id;
        return new Promise((resolve, reject) => {
            newQuestion.save((err) => {
                if (err) reject (err);
                else resolve(newQuestion);
            });
        });
    }
};


let QuestionMutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: QuestionMutationAdd
    }
});



module.exports = new graphql.GraphQLSchema({
    query: QuestionQueryType,
    mutation: QuestionMutationType
});


