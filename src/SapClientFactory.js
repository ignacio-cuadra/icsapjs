export default sapClientFactory = ({
  host = process.env.ICSAP_HOST,
  port = process.env.ICSAP_PORT,
  database = process.env.ICSAP_DATABASE,
  username = process.env.ICSAP_USERNAME,
  password = process.env.ICSAP_PASSWORD,
  language = process.env.ICSAP_LANGUAGE,
}) => {
  return new SapClient({ host, port, database, username, password, language });
};
