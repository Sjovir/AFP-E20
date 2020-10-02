const regexUUID = new RegExp(
    '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

export const isUUID = (value: string): boolean => {
    return regexUUID.test(value);
};
