export const isArbitrary = (value: string): boolean => {
  return value.startsWith("[") && value.endsWith("]");
};

export const extractArbitrary = (value: string): string => {
  // strip brackets and convert underscores to spaces
  return value.slice(1, -1).replace(/_/g, " ");
};
