import { supabase } from "../../../common/supabase";
import { getTokenFromReqHeaders, parseUserIdFromToken } from '../../../common/token';

export default async function handler(req, res) {
  // check the req
  if (req.method !== 'POST') return res.status(500).json({ error: 'Invalid request' });

  const token = getTokenFromReqHeaders(req.headers.authorization);
  const userId = parseUserIdFromToken(token);

  // check if user exists, if they don't provision a new user
  let data, users, error;
  (
    { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
  )

  if (error) return res.status(500).json({ error });
  if (users.length > 0) return res.status(200).json({ message: 'user exists' });

  // TODO: collect more data from the CLI
  (
    { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
      },
    ])
    .select()
  )
  return res.status(201).json({ output, num_tokens, duration_s });
}
