export function parseCookies(headers: Headers) {
  const cookieHeader = headers.get("cookie");
  if (!cookieHeader) return {};

  return cookieHeader
    .split(";")
    .reduce((cookies: Record<string, string>, pair) => {
      const [key, ...rest] = pair.split("=");
      const name = key?.trim();
      if (!name) return cookies;

      const value = rest.join("=").trim();
      try {
        cookies[name] = decodeURIComponent(value);
      } catch {
        cookies[name] = value; // fallback to raw value if decoding fails
      }
      return cookies;
    }, {});
}
