import { fetchFactory, fetchWrapper } from "icfetcher";

const sapFetcherFactory =
  (baseUrl) =>
  ({ url, method, body, params, sessionId }) => {
    const headers = {};
    if (sessionId) {
      headers.Cookie = `B1SESSION=${sessionId}`;
    }
    return fetchWrapper(
      fetchFactory({
        baseUrl,
        params,
        headers,
        isJson: true,
        url,
        method,
        body,
        autoBodyStringfy: true,
        autoClearUndefinedBodyAttributes: true,
      })
    );
  };

export default sapFetcherFactory;
