import * as React from 'react'
import { Container } from 'semantic-ui-react'
import Hello from "./Hello";
import Async, { Props as AsyncProps } from 'react-promise'
import { validate } from "ski-mask";

const TopLevelContainer = () => (
  <Container>
    <div>
      <Hello name="JSON Schema Help" />
      <Async promise={message} then={(msg) => <div>{JSON.stringify(msg)}</div>} catch={JSON.stringify} />
    </div>
  </Container>
)

const json = {
  "schema": "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
  "data": {
    "schema": "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0",
    "data": {
      "targetUrl": "https://myawesomeurl.com/data",
      "elementId": "bestElementEver"
    }
  }
}

const resolverConfig =   {
  "schema": "iglu:com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0",
  "data":
  {
    "cacheSize": 500,
    "repositories":
    [
      {
        "name": "Iglu Central",
        "priority": 0,
        "vendorPrefixes":
        [
          "com.snowplowanalytics.snowplow"
        ],
        "connection":
        {
          "http":
          {
            "uri": "http://iglucentral.com"
          }
        }
      },
      {
        "name": "My Iglu Server",
        "priority": 1,
        "vendorPrefixes":
        [
          "com.my-iglu-server"
        ],
        "connection":
        {
          "http":
          {
            "uri": "http://awesome-schemas.my-iglu-server.com"
          }
        }
      }
    ]
  }
};

const message = validate(json, resolverConfig);

export default TopLevelContainer
