export function removeWhiteSpaces(string: string) {
  return string.replace(/\s/g, "");
}

export function formatString(string?: string) {
  if (string) {
    string = string.replace(/\s+/g, "");
    return string.replace(/(\d{3})(?=\d)/g, "$1 ");
  }
  return "";
}

export function gridDateFormater(date: string) {
  return new Date(date).toLocaleString("pt-PT", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export function parseJwt(token: string) {
  if (!token) return;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
}
