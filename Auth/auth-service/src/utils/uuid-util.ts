const regexUUID = new RegExp(
  '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

export const isUUID = (value: string | Array<string>): boolean => {
  if (Array.isArray(value)) {
    for (const uuid of value) {
      if (!regexUUID.test(uuid)) return false;
    }

    return true;
  }

  return regexUUID.test(<string>value);
};
