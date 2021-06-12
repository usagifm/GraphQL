const { GraphQLString } = require('graphql')

const { ArticleType, CommentType } = require("./types")

const { User, Article, Comment } = require("../models")
const { createJWTToken } = require("../jwt/auth")
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);



const register = {
    type: GraphQLString,
    description: "Register for user",
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        role: { type: GraphQLString },
    },
    async resolve(parent, args) {
        var { name, username, password, email, role } = args

        var hash = bcrypt.hashSync(password, salt);

        password = hash;

        const user = new User({ name, username, password, email, role })

        await user.save()
        const token = createJWTToken(user)

        return token
    }
}


const login = {
    type: GraphQLString,
    description: "Login for user",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email }).select("+password")
        if (!user) {
            throw new Error("User Not Found !")
        }
        var cek = bcrypt.compareSync(args.password, user.password);
        if (user && cek != true) {
            throw new Error("Wrong password !")
        }

        const token = createJWTToken(user)
        return token

    }

}

const createArticle = {
    type: ArticleType,
    description: "Create an article",
    args: {
        title: { type: GraphQLString },
        category: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    resolve(parent, args, { verified }) {
        console.log("Verified : ", verified)

        if (!verified) {
            throw new Error("Unauthorized")
        }
        const article = new Article({
            authorId: verified.user._id,
            title: args.title,
            category: args.category,
            body: args.body,
        })

        return article.save()
    }
}

const updateArticle = {
    type: ArticleType,
    description: "update an article",
    args: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        category: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    async resolve(parent, args, { verified }) {
        if (!verified) {
            throw new Error("Unauthenticated")
        }

        const updatedArticle = await Article.findOneAndUpdate(
            {
                _id: args._id, authorId: verified.user._id
            }, { title: args.title, body: args.body }, 
            {
            new: true,
            runValidators: true
        })


        if (!updatedArticle) {
            throw new Error("Article Not Found!")
        }

        return updatedArticle

    },

}



const deleteArticle = {
    type: ArticleType,
    description: "delete an article",
    args: {
        _id: { type: GraphQLString },
    },
    async resolve(parent, args, { verified }) {
        if (!verified) {
            throw new Error("Unauthenticated")
        }

        const deletedArticle = await Article.findOneAndDelete(
            {
                _id: args._id, authorId: verified.user._id
            })


        if (!deletedArticle) {
            throw new Error("Article Not Found!")
        }

        return "Article Deleted"

    },

}

const createComment = {
    type: CommentType,
    description: "Create a comment",
    args: {
        comment: { type: GraphQLString },
        articleId: { type: GraphQLString },

    },
    resolve(parent, args, { verified }) {

        if (!verified) {
            throw new Error("Unauthenticated")
        }

        const comment = new Comment({
            userId: verified.user._id,
            comment: args.comment,
            articleId: args.articleId
        })
        return comment.save()
    }


}

const deleteComment = {
    type: CommentType,
    description: "delete a comment",
    args: {
        id: { type: GraphQLString },
    },
    async resolve(parent, args, { verified }) {
        if (!verified) {
            throw new Error("Unauthenticated")
        }

        const deletedComment = await Comment.findOneAndDelete(
            {
                _id: args.id, userId: verified.user._id
            })


        if (!deletedComment) {
            throw new Error("Comment Not Found!")
        }

        return "Comment Deleted"

    },

}

const updateComment = {
    type: CommentType,
    description: "update a comment",
    args: {
        id: { type: GraphQLString },
        comment: { type: GraphQLString },
    },
    async resolve(parent, args, { verified }) {
        if (!verified) {
            throw new Error("Unauthenticated")
        }

        const updatedComment = await Comment.findOneAndUpdate(
            {
                _id: args.id, userId: verified.user._id
            }, { comment: args.comment}, 
            {
            new: true,
            runValidators: true
        })


        if (!updatedComment) {
            throw new Error("Comment Not Found!")
        }

        return updatedComment

    },

}


module.exports = { register, login, createArticle, createComment,updateArticle,deleteArticle, deleteComment, updateComment }