const makeSlugFrom = (from: string, signature: string) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  if (!from) {
    return `tirelire-${signature}-${timestamp}-${randomString}`;
  }
  const normalizedFrom = from
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `darna-${signature}-${normalizedFrom}-${timestamp}-${randomString}`;
};
export default makeSlugFrom;
