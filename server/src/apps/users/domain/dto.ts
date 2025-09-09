export type RegisterInput = {
    name: string;
    email: string;
    password: string;
    profilePic: string | null;
};
export type LoginInput = {
    email: string;
    password: string;
}
