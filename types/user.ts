export interface GoogleUser {
    "id": string,
    "name": string,
    "givenName": string,
    "familyName": string,
    "email": string,
    "photo": string | null
}

export interface User {
    g_id: string,
    username: string,
    email: string,
    profile_pic: string | null
}