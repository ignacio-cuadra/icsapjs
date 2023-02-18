import { fetchFactory, fetchWrapper } from "icfetcher";

const sapFetcherFactory =
  (baseUrl) =>
  ({ url, method, body }) => {
    console.log("URL", baseUrl + url);
    return fetchWrapper(
      fetchFactory({
        baseUrl,
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
