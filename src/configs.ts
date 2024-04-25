import { ToastProviderProps } from "@chakra-ui/react";
import { SWRConfiguration } from "swr";
import { getRequest } from "./lib";

export const chakraOptions: ToastProviderProps = {
  defaultOptions: {
    position: "top-right",
    icon: undefined,
    duration: 3000,
    isClosable: true,
  },
};

export const swrOptions: SWRConfiguration = {
  fetcher: (url: string, config) => getRequest(url, config),
};
