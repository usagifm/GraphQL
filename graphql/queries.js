const { GraphQLList, GraphQLID, GraphQLString, GraphQLInt } = require("graphql")
const { UserType, ArticleType, CommentType } = require("./types")
const { User, Article, Comment } = require("../models")
const { createJWTToken } = require("../jwt/auth")



const users = {
    type: new GraphQLList(UserType),
    description: "Get all Users from the DB",
    resolve(parent,args, {verified}){
        return User.find()
    },
}

const user = {
    type: UserType,
    description: "Get a user from the DB",
    args: {id: {type: GraphQLID }},
    resolve(parent, args,  {verified}){
        return User.findById(args.id)
    }
}


const article = {
    type: ArticleType,
    description: "Get a article from the DB",
    args: {
        _id: {type: GraphQLID},
    },
    resolve(_, args, {verified}){
        if (!verified){
            throw new Error("Unauthenticated")
        }

        return Article.findById(args._id)
    }
}

const articlesFilter = {
    type: new GraphQLList(ArticleType),
    // it just my "ngide" because im not really familiar with GraphQL and mongoDB agreggation
    description: "Get all article from the DB by 3 filter ",
    args: {
        category: {type: GraphQLString},
        sort: {type: GraphQLInt},
        dataPerPage : {type: GraphQLInt},

    },
    resolve(parent, args, {verified}){
        if (!verified){
            throw new Error("Unauthenticated")
        }

        // Article.aggregate([{$group: {_id: "$_id"}}, {$group: {_id: 1, total: {$sum: 1}}}]);

        return Article.aggregate([
            { $match: {category: args.category} },
            { $sort: {createdAt: args.sort} },
            { $limit: args.dataPerPage },
        ])
    }
}

const articlesByUser = {
    type: new GraphQLList(ArticleType),
    description: "Get all article from the DB by the User Logged in",

    
    resolve(parent, args, {verified}){
        if (!verified.user){
            throw new Error("Unauthenticated")
        }
        console.log("Verified : ",verified.user)
        return Article.find({authorId: verified.user._id})
    }
}


const articles = {
    type: new GraphQLList(ArticleType),
    description: "Get all articles from the DB",
    resolve(parent,args, {verified}){
        if (!verified){
            throw new Error("Unauthenticated")
        }
        return Article.find()
    },
}


const comment = {
    type: CommentType,
    description: "Get a comment from the DB",
    args: {
        id: {type: GraphQLID},
    },
    resolve(_, args, {verified}){
        if (!verified){
            throw new Error("Unauthenticated")
        }
        return Comment.findById(args.id)
    }
}



const comments = {
    type: new GraphQLList(CommentType),
    description: "Get all comments from the DB",
    resolve(parent,args, {verified}){
        if (!verified){
            throw new Error("Unauthenticated")
        }
        return Comment.find()
    },
}




module.exports = { users,user,articlesFilter,articlesByUser,articles,article,comment,comments }