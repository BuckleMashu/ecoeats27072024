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
    expiration: string;
};

export type request_page = {
    share_Id: number;
    user_Id: number;
    description: string;
};

export type userD = {
    user_Id: number;
    name: string;
    birthday: string;
    email: string;
    phone_Number: number;
    address: string;
    followers: string;
    following: string;
    redeemed_Coupons: string
    bio: string;
    pf: string;
    share_Posts: string;
    explore_Posts: string;
}

//add new variable for each respective datatable below
