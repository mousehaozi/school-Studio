const resourceBaseUrl = (import.meta.env.VITE_RESOURCE_BASE_URL || "").replace(
  /\/+$/,
  ""
);

const absoluteUrlPattern = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i;
const ignoredUrlPattern = /^(?:data|blob):/i;

export function getResourceUrl(url) {
  if (!url || absoluteUrlPattern.test(url) || ignoredUrlPattern.test(url)) {
    return url;
  }

  const resourcePath = `/${url.replace(/^\/+/, "")}`;

  if (
    resourceBaseUrl.startsWith("/") &&
    (resourcePath === resourceBaseUrl ||
      resourcePath.startsWith(`${resourceBaseUrl}/`))
  ) {
    return resourcePath;
  }

  return `${resourceBaseUrl}${resourcePath}`;
}

export function getResourceHtml(html) {
  if (!html) return html;

  return html.replace(
    /(<img\b[^>]*?\bsrc=["'])([^"']+)(["'][^>]*>)/gi,
    (_, prefix, url, suffix) => `${prefix}${getResourceUrl(url)}${suffix}`
  );
}
