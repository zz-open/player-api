export function buildUrl(baseUrl, params) {
    const url = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      url.append(key, value);
    }
    
    return `${baseUrl}?${url.toString()}`;
  }