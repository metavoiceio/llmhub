import { supabase } from '../../../../../../common/supabase';
import { authOptions } from '../../../../auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const { workspaceId, functionId, mode } = req.query
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method !== 'GET') return res.status(500).json({ error: 'Invalid request' });

  let users, error;
  (
    { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
  )
  if (error) return res.status(500).json({ error });

  let newLikes = users[0].likes;
  if (mode === 'true') {
    newLikes.push(parseInt(functionId));
  } else {
    newLikes = newLikes.filter(l => l !== parseInt(functionId))
  }

  // update users
  (
    { data: users, error } = await supabase
      .from('users')
      .update({ likes: newLikes })
      .eq('id', session.user.id)
  )
  if (error) return res.status(500).json({ error });

  // update function likes
  let data
  (
    { data, error } = await supabase
      .rpc('increment_likes', { value: mode === 'true' ? 1 : -1, row_id: functionId })
  )

  // return to frontend
  return res.status(200).json({ status: 'success' })
}
