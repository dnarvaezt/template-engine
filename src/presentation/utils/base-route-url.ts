export function getBaseRouteUrl(
  origin: string,
  route?: string,
  args?: Record<string, string | number | boolean>
): string {
  const path = route === origin ? origin : `${origin}${route}`
  if (!args || Object.keys(args).length === 0) return path
  return Object.entries(args).reduce((url, [key, value]) => {
    return url.replace(`:${key}`, String(value))
  }, path)
}
