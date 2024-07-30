export type ToDoItem = {
    id: number;
    value: string;
};

export type share_page = {
    share_Id: number;
    type: number;
    title: string;
    tags: string;
    address: string;
    picture: string;
};

export type request_page = {
    share_Id: number;
    user_Id: number;
    expiration: string;
    description: string;
};
