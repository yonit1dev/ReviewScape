class User {
  constructor(
    private readonly id: number,
    private readonly fullName: string,
    private readonly username: string,
    private readonly email: string,
    private readonly password: string,
    private readonly phone: string,
    private readonly role: string[],
    private readonly token: Array<string>,
    private readonly wishlist: Array<object>,
    private readonly reviews: Array<object>,
    private readonly surveyReponses: Array<object>
  ) {}
}

export { User };
