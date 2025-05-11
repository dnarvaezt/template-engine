export function getBaseRouteUrl(
  origin: string,
  pathname?: string,
  args?: Record<string, string | number | boolean>
): string {
  try {
    if (!pathname || origin === pathname) return origin

    const href = `${origin}${pathname === '/' ? '' : pathname}`

    if (!args || Object.keys(args).length === 0) return href

    return Object.entries(args).reduce((url, [key, value]) => {
      return url.replace(`:${key}`, String(value))
    }, href)
  } catch (error) {
    console.error('Error building route URL:', error)
    return origin
  }
}
