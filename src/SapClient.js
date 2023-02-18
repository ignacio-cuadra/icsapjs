import sapFetcherFactory from "./sapFetcherFactory.js";
export default class SapClient {
  sesionId = undefined;
  sessionTimeout = undefined;
  loggedInAt = undefined;
  sessionExpireAt = undefined;
  constructor({ host, port, database, username, password, language }) {
    this.host = host;
    this.port = port;
    this.database = database;
    this.username = username;
    this.password = password;
    this.language = language;
    this.sapFecther = sapFetcherFactory(`https://${host}:${port}/b1s/v1`);
  }
  async login() {
    const response = await this.sapFecther({
      url: "/Login",
      method: "POST",
      body: {
        UserName: this.username,
        Password: this.password,
        CompanyDB: this.database,
        Language: this.language,
      },
    });
    this.sesionId = response.SessionId;
    this.sessionTimeout = response.sessionTimeout;
    this.loggedInAt = new Date().getTime(); // check this
    this.sessionExpireAt = this.loggedInAt + this.sessionTimeout * 60; // check this
    return response;
  }
  isSessionExpired(aditionalTime = 1) {
    return new Date().getTime() + aditionalTime > this.sessionExpireAt; // check this
  }
}
// self-signed certificate
