export interface User {
    id: number,
    name: string,
    username: string,
    email: string
}

export interface Post {
    id: number,
    title: string,
    body: string,
    imgURL: string
}

export interface APOD {
    title: string,
    imgUrl: string,
    explanation: string
}