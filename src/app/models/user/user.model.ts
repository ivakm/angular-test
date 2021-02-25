export interface iUserData {
  readonly email: string,
  readonly password: number,
  readonly pin: number
}

export class ModelUser implements iUserData {
  readonly email: string;
  readonly password: number;
  readonly pin: number;

  constructor({
                email = null,
                password = null,
                pin = null
              } = {}) {
    this.email = email;
    this.password = password;
    this.pin = pin;
  }

  clone(): ModelUser {
    return new ModelUser(this.serialize());
  }

  serialize(): iUserData {
    return {
      email: this.email,
      password: this.password,
      pin: this.pin,
    }
  }

  toJson() {
    return {
      email: this.email,
      password: this.password,
      pin: this.pin,
    }
  }

}
