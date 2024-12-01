import mongoose, { Schema } from 'mongoose';


//Model for the sendig meassage
const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatUsers",
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
},
{
    timestamps: true
});

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;