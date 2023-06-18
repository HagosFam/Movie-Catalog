export class Login {
  #username: string = '';
  #password: string = '';

  constructor(username: string, password: string) {
    (this.username = username), (this.password = password);
  }

  set username(username: string) {
    this.#username = username;
  }

  set password(password: string) {
    this.#password = password;
  }

  get username(): string {
    return this.#username;
  }

  get password(): string {
    return this.#password;
  }

  toJson() {
    return { password: this.#password, username: this.#username };
  }
}
