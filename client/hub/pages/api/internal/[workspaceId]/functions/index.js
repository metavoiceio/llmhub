import { supabase } from '../../../../../common/supabase';

// TODO: move to frontend
async function handlePost(workspaceId, req) {
  return await supabase
    .from('functions')
    .insert([
      {
        name: req.body.name,
        is_public: true,
        workspace_id: workspaceId,
      },
    ]);
}

export default async function handler(req, res) {
  const { workspaceId } = req.query

  if (req.method === 'POST') {
    const { data, error } = await handlePost(workspaceId, req)

    if (error) return res.status(500).json(error);
    return res.status(201).json({ 'status': 'done' });
  }

  return res.status(500).json({ error: 'invalid route' });
}
