export function getBaseRouteUrl(
  origin: string,
  route?: string,
  args?: Record<string, string | number | boolean>
): string {
  // If no route is provided, return the current path
  if (!route) return window.location.pathname

  // Clean the route by removing all slashes and origin
  const cleanRoute = route
    .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
    .replace(origin, '') // Remove origin if present
    .replace(/^\/+|\/+$/g, '') // Remove any remaining leading/trailing slashes

  // Get the current pathname from window.location
  const currentPath = window.location.pathname

  // Get all segments of the current path
  const pathSegments = currentPath.split('/').filter(Boolean)

  // Get all segments of the new route
  const routeSegments = cleanRoute.split('/').filter(Boolean)

  // Find the index of the last segment that matches the route
  const lastMatchingIndex = pathSegments.findIndex((segment) =>
    routeSegments.includes(segment)
  )

  // If we found a matching segment, use all segments up to that point as the parent path
  const parentPath =
    lastMatchingIndex >= 0
      ? pathSegments.slice(0, lastMatchingIndex).join('/')
      : ''

  // Construct the full path ensuring no double slashes
  const fullPath = parentPath
    ? `/${parentPath}/${cleanRoute}`
    : `/${cleanRoute}`

  // Replace any path parameters with their values
  if (args && Object.keys(args).length > 0) {
    return Object.entries(args).reduce((url, [key, value]) => {
      return url.replace(`:${key}`, String(value))
    }, fullPath)
  }

  return fullPath
}
