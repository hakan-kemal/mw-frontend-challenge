import { useEffect, useState } from "react";

const API_URL = "https://php-api.mywheels.dev/api/";

export const useApi = ({ method, params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(
    () => {
      (async () => {
        setIsLoading(true);

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-Simple-Auth-App-Id":
              "1_4ufl98675y8088ko4k80wow4soo0g8cog8kwsssoo4k4ggc84k",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 0,
            method,
            params,
          }),
        });

        setData(await response.json());
        setIsLoading(false);
      })()
    },
    [setIsLoading, setData]
  );

  return { isLoading, data };
};
