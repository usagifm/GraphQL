// Initialize all required stuff needed
const { GraphQLSchema, GraphQLObjectType } = require("graphql")


// Import queries
const { users,user,articlesFilter,articlesByUser,articles,article,comment,comments } = require("./queries")

// Import mutations
const { register, login, createArticle,createComment,updateArticle,deleteArticle,deleteComment, updateComment } = require("./mutation")

// Import queryType
const QueryType = new GraphQLObjectType({
    name : "QueryType",
    description: "Queries",
    fields: { users, user,articlesFilter,articlesByUser,articles,article,comments,comment }
})

// Import mutationType
const MutationType = new GraphQLObjectType({
    name : "MutationType",
    description: "Mutations",
    fields: { register, login, createArticle,createComment,updateArticle,deleteArticle,deleteComment, updateComment }
})

module.exports = new GraphQLSchema({

    query: QueryType,
    mutation: MutationType,
})