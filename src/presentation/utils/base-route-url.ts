export function getBaseRouteUrl(
  origin: string,
  route: string,
  args?: Record<string, string | number | boolean>
): string {
  try {
    if (route === origin) return origin

    const path = `${origin}/${route}`.replace(/([^:])\/+/g, '$1/')

    if (!args || Object.keys(args).length === 0) return path

    return Object.entries(args).reduce((url, [key, value]) => {
      return url.replace(`:${key}`, String(value))
    }, path)
  } catch (error) {
    console.error('Error building route URL:', error)
    return origin
  }
}
