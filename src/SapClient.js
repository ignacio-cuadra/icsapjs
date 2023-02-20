import sapFetcherFactory from "./sapFetcherFactory.js";
export default class SapClient {
  sessionId = undefined;
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
    this.sessionId = response.data.SessionId;
    this.sessionTimeout = response.data.sessionTimeout;
    this.loggedInAt = new Date().getTime(); // check this
    this.sessionExpireAt = this.loggedInAt + this.sessionTimeout * 60; // check this
    return response;
  }
  isSessionExpired(aditionalTime = 1) {
    return new Date().getTime() + aditionalTime > this.sessionExpireAt; // check this
  }
  async fetch({ action, method = "GET", body = undefined, params }) {
    if (this.sesionId && this.isSessionExpired()) {
      this.sesionId = null;
    }
    if (!this.sesionId) {
      await this.login();
    }
    return await this.sapFecther({
      url: action,
      method,
      body,
      params,
      sessionId: this.sessionId,
    });
  }
}
