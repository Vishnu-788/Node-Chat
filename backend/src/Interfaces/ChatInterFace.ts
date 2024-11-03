interface User {
    name: string;
    email: string;
}

interface GroupAdmin {
    name: string;
    email: string;
}

interface Chat {
    isGroupChat: boolean;
    users: User[];
    _id: string;
    chatName: string;
    groupAdmin?: GroupAdmin; // Optional, since not all chats have a group admin
}

export { User, GroupAdmin, Chat };