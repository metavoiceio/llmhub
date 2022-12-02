import jwt_decode from "jwt-decode";

export const parseUserIdFromToken = (token) => {
  if (!token || !token.sub) throw Error('Invalid token');

  return parseInt(token.sub.split('|')[1]);
}

export const getTokenFromReqHeaders = (authorisationAttr) => {
  if (authorisationAttr.split(" ")[0] !== "Bearer") throw Error('Missing Bearer token');

  const urlEncodedToken = authorisationAttr.split(" ")[1]
  const token = decodeURIComponent(urlEncodedToken);
  return jwt_decode(token);
}
