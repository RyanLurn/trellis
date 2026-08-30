import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD } from "@/utils/http/constants/response-statuses/error/server";

export default createServerEntry({
  fetch(request) {
    try {
      return handler.fetch(request);
    } catch (error) {
      const unexpectedError = new UnexpectedError({
        failedTo: "handle request",
        cause: error,
        context: { source: "src/server.ts" },
      });

      console.error(unexpectedError.deepSerialize());

      const httpStatus =
        HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD["INTERNAL_SERVER_ERROR"];
      return Response.json(unexpectedError.shallowSerialize(), {
        status: httpStatus.code,
        statusText: httpStatus.text,
      });
    }
  },
});
