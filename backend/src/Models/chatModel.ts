import { User, GroupAdmin } from "Interfaces/ChatInterFace";
import mongoose, { Document, Schema } from 'mongoose';

interface Chat extends Document {
    isGroupChat: boolean;
    users: User[];
    chatName: string;
    groupAdmin?: GroupAdmin; // Optional for non-group chats
    latestMessage?: mongoose.Schema.Types.ObjectId;
}

//model for storing the Chats

const chatSchema = new Schema<Chat>({
   chatName: { type: String, trim: true },
   isGroupChat: { type: Boolean, default: false},
   users: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatUsers",
    },
   ],
   latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
   },
   groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatUsers"
   }
},
{
    timestamps: true
});

const ChatModel = mongoose.model<Chat>('Chat', chatSchema);
export default ChatModel;

