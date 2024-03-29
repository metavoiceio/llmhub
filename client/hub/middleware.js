import withAuth from "next-auth/middleware"
import { supabase } from './common/supabase';
import { parseUserIdFromToken, getTokenFromReqHeaders } from './common/token';

// TODO sidroopdaska: do we need to check for function ownership as well?
// FIX: with regexp, this is very brittle!
const PATTERNS = [
  [
    new URLPattern({ pathname: '/api/internal/:workspaceId/*' }),
    ({ pathname }) => pathname.groups,
  ],
  [
    new URLPattern({ pathname: '/api/v0/:workspaceId/*' }),
    ({ pathname }) => pathname.groups,
  ],
  [
    new URLPattern({ pathname: '/:workspaceId/*' }),
    ({ pathname }) => pathname.groups,
  ],
  [
    new URLPattern({ pathname: '/:workspaceId' }),
    ({ pathname }) => pathname.groups,
  ]
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
      let workspaces, error;
      console.log(req.nextUrl.href)
      try {
        // route - /share
        if (req.nextUrl.href.includes('share') && !req.nextUrl.href.includes('fork')) {
          // check if workspaceId owns referenced functionId
          const workspaceId = parseInt(req.nextUrl.href.split('/functions')[0].split('/')[3]);
          const functionId = req.nextUrl.href.split('/functions/')[1].split('/')[0];
          let functions;
          (
            { data: functions, error } = await supabase
              .from('functions')
              .select('*')
              .eq('id', functionId)
          )
          return functions.length > 0 && functions[0].workspace_id === workspaceId;
        };

        // route - /welcome
        if (req.nextUrl.href.includes('welcome')) return !!token;

        // route - /api/v0/user, ensure valid token
        if (req.nextUrl.href.includes('api/v0/users')) {
          token = getTokenFromReqHeaders(req.headers.get("Authorization"));
          return token && parseUserIdFromToken(token)
        }

        // route - /api/v0/* ensure user has a valid workspace
        if (req.nextUrl.href.includes('api/v0')) {
          if (!token) token = getTokenFromReqHeaders(req.headers.get("Authorization"));
          (
            { data: workspaces, error } = await supabase
              .from('workspaces')
              .select()
              .eq('user_id', parseUserIdFromToken(token))
          )

          // TODO sidroopdaska: can't return a useful message from here. Move to API handler?
          if (workspaces.length === 0) {
            console.log(`token: ${token} doesn't have a valid workspace`)
          }
          return !error && workspaces.length > 0;
        }

        // route - /:workspaceId/*, /api/internal/*
        // check if token exists & user owns workspace
        const { workspaceId } = params(req.url);
        (
          { data: workspaces, error } = await supabase
            .from('workspaces')
            .select('*')
            .eq('id', workspaceId)
        )
        return !!token && !error && workspaces[0].user_id === parseUserIdFromToken(token);
      } catch (error) {
        console.log(error);
        return false;
      }
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
  matcher: ['/((?!auth|_next/static|favicon.ico|android-chrome-233x233.png).*)(.+)']
}
