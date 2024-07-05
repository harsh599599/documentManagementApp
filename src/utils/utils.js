export function formatDate(timestamp) {
  const parsedTimestamp = parseInt(timestamp, 10);
  if (!isNaN(parsedTimestamp)) {
    const date = new Date(parsedTimestamp);
    const year = date.getUTCFullYear();
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + date.getUTCDate()).slice(-2);

    return `${year}-${month}-${day}`;
  } else {
    return "Invalid Date";
  }
}
export function bytesToSize(bytes) {
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}
