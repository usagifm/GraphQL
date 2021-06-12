const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql')

const {User, Article, Comment} = require('../models')

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User Type",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        role: {type: GraphQLString},
    })
})

const ArticleType = new GraphQLObjectType({
    name: "Article",
    description: "Article Type",
    fields: () => ({
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        category: {type: GraphQLString},
        body: {type: GraphQLString},
        author: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.authorId)
            }
        },
        comments: {
            type: GraphQLList(CommentType),
            resolve(parent, args){
                return Comment.find({articleId: parent.id})
            }
        }
    })
})

const CommentType = new GraphQLObjectType({
    name: "Comment",
    description: "Comment Type",
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)

            }
        },
        article: {
            type: ArticleType,
            resolve(parent, args){
                return Article.findById(parent.articleId)
            }
        }
    })
})


module.exports = {UserType, ArticleType, CommentType}