type UnknownObject = { [key: string]: unknown };

export const camelcase = (str: string) =>
  str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

export const camelcaseKeys = (obj: UnknownObject): UnknownObject => {
  return Object.entries(obj).reduce((acc: UnknownObject, [key, value]) => {
    const camelcaseKey = camelcase(key);
    // Check if the value is an object, if so apply camelcaseKeys recursively
    const newValue =
      typeof value === "object" && value !== null && !Array.isArray(value)
        ? camelcaseKeys(value as UnknownObject)
        : value;
    return { ...acc, [camelcaseKey]: newValue };
  }, {});
};

export const snakecase = (str: string) =>
  str.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`);

export const snakecaseKeys = (obj: UnknownObject): UnknownObject => {
  return Object.entries(obj).reduce((acc: UnknownObject, [key, value]) => {
    const snakecaseKey = snakecase(key);
    // Check if the value is an object, if so apply camelcaseKeys recursively
    const newValue =
      typeof value === "object" && value !== null && !Array.isArray(value)
        ? snakecaseKeys(value as UnknownObject)
        : value;
    return { ...acc, [snakecaseKey]: newValue };
  }, {});
};
