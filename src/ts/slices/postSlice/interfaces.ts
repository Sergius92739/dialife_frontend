export interface IPostState {
    posts: IPost[];
    popularPosts: IPost[];
    isLoading: boolean;
    error: Error | null;
    status: string | null;
}

export interface IPost {
    _id: string;
    username: string;
    avatar: string;
    title: string;
    text: string;
    imgUrl: string;
    views: number;
    likes: string[];
    dislikes: string[];
    author: string;
    comments: [];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IComment {
    _id: string;
    comment: string;
    answerTo: {
        username: string;
        avatar: string;
        userId: string;
        comment: string;
    },
    author: {
        username: string;
        avatar: string;
        comment: string
        userId: string;
    };
    postId: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
