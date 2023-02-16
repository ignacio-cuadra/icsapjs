class SapClient {
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
  }
  sapFetcher({ action, method, params, header }) {
    // todo
  }
}
