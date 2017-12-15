import { defaultResolverConfig, defaultPayload } from "./DefaultValues";
import * as WebStorage from "store";

export const getResolverConfig = (): string => {
	return WebStorage.get("resolverConfig") || formatJson(defaultResolverConfig)
}

export const setResolverConfig = (resolverConfig: object): void => {
	WebStorage.set("resolverConfig", formatJson(resolverConfig));
}

export const getPayload = (): string => formatJson(defaultPayload);

export const formatJson = (json: object): string => JSON.stringify(json, null, 4);
