const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comments',
    }
  ]
},
  { timestamps: true });

const MessageModel = mongoose.model("messages", MessageSchema) 
                                // (CollectionName, Schema)
// 'messages' is the collection or document name, DB name is in the connection URL in the .env file.
//    | -DB NAME (matrix-master)
//       [Collection or Document Name] 
//    |   - messages
//    |   - users
//    |   - comments

module.exports = MessageModel