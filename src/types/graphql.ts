
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    id?: Nullable<number>;
    name: string;
    email: string;
    password: string;
}

export class UpdateUserInput {
    id: number;
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    confirmationToken?: Nullable<string>;
    active?: Nullable<boolean>;
}

export class ConfirmUserInput {
    email: string;
    confirmationToken: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class User {
    id: number;
    name: string;
    email: string;
    password?: Nullable<string>;
    createdAt: DateTime;
    confirmationToken?: Nullable<string>;
    active?: Nullable<boolean>;
}

export abstract class IQuery {
    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract loginInput(loginInput?: Nullable<LoginInput>): User | Promise<User>;

    abstract getSelfUser(): Nullable<User> | Promise<Nullable<User>>;

    abstract logout(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract confirmUserInput(confirmUserInput: ConfirmUserInput): User | Promise<User>;

    abstract loginInput(loginInput: LoginInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
