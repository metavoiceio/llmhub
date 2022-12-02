import withAuth from "next-auth/middleware"
import { supabase } from './common/supabase';

// TODO sidroopdaska: do we need to check for function ownership as well?
// FIX: with regexp, this is very brittle!
// TODO sidroopdaska: remove harcoding for user_id check
const PATTERNS = [
  [
    new URLPattern({ pathname: '/:workspaceId/functions/:functionId/*' }),
    ({ pathname }) => pathname.groups,
  ],
  [
    new URLPattern({ pathname: '/:workspaceId/functions/:functionId' }),
    ({ pathname }) => pathname.groups,
  ],
  [
    new URLPattern({ pathname: '/:workspaceId' }),
    ({ pathname }) => pathname.groups,
  ],
];

const params = (url) => {
  const input = url.split('?')[0]
  let result = {}

  for (const [pattern, handler] of PATTERNS) {
    const patternResult = pattern.exec(input)
    if (patternResult !== null && 'pathname' in patternResult) {
      result = handler(patternResult)
      break
    }
  }
  return result
}

export default withAuth({
  callbacks: {
    async authorized({ req, token }) {
      if (req.nextUrl.href.includes('welcome')) return !!token;

      // check if token exists & user owns workspace
      const { workspaceId } = params(req.url);
      const { data: workspaces, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('id', workspaceId)

      return !!token && !error && workspaces[0].user_id === parseInt(token.sub.split('|')[1]);
    },
  },
})

export const config = {
  /*
    * Match all request paths except for the ones starting with:
    * - auth
    * - _next/static (static files)
    * - favicon.ico (favicon file)
    */
  matcher: ['/((?!auth|_next/static|favicon.ico).*)(.+)']
}
