import supportedFields from "./supportedFields";

const getComponent = (field) => supportedFields[field].Component;

export { getComponent };
