export const defaultPayload = {
  schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
  data: {
    schema: "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0",
    data: {
      targetUrl: "https://myawesomeurl.com/data",
      elementId: "bestElementEver",
    },
  },
};

export const defaultResolverConfig = {
  schema: "iglu:com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0",
  data: {
    cacheSize: 500,
    repositories: [
      {
        name: "Iglu Central",
        priority: 0,
        vendorPrefixes: [
          "com.snowplowanalytics.snowplow",
          "com.snowplowanalytics.iglu"
        ],
        connection: {
          http: {
            uri: "http://iglucentral.com",
          },
        },
      }
    ],
  },
};
