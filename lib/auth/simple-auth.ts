import { NextRequest, NextResponse } from 'next/server'

/**
 * Simple HTTP Basic Auth for internal dashboard.
 * Checks Authorization header against env vars.
 *
 * To upgrade to Clerk later:
 * 1. Replace this function with `import { auth } from '@clerk/nextjs/server'`
 * 2. Swap `await requireAuth(request)` with `const { userId } = await auth()`
 * 3. Re-add ClerkProvider to app/layout.tsx
 * 4. Re-add UserButton to dashboard layout
 */
export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Refyne Data Platform"',
      },
    })
  }

  // Decode Base64 credentials
  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  const [username, password] = credentials.split(':')

  // Validate against environment variables
  const validUsername = process.env.DASHBOARD_USERNAME
  const validPassword = process.env.DASHBOARD_PASSWORD

  if (!validUsername || !validPassword) {
    console.error('DASHBOARD_USERNAME and DASHBOARD_PASSWORD env vars are not set')
    return new NextResponse('Server configuration error', { status: 500 })
  }

  if (username !== validUsername || password !== validPassword) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Refyne Data Platform"',
      },
    })
  }

  // Auth successful
  return null
}
