export class User {
  #username: string = '';
  #email: string = '';
  #password: string = '';

  constructor(username: string, email: string, password: string) {
    this.#email = email;
    this.#username = username;
    this.#password = password;
  }

  get username(): string {
    return this.#username;
  }

  set username(username: string) {
    this.#username = username;
  }

  get email(): string {
    return this.#email;
  }

  set email(email: string) {
    this.#email = email;
  }

  get password(): string {
    return this.#password;
  }

  set password(password: string) {
    this.#password = password;
  }

  toJson() {
    return {
      username: this.#username,
      email: this.#email,
      password: this.#password,
    };
  }
}
