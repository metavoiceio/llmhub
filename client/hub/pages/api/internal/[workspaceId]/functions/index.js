import { supabase } from '../../../../../common/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(500).json({ message: 'Invalid method' });
  if (!req.body.name) return res.status(500).json({ message: 'Invalid request' });

  const { workspaceId } = req.query
  let data, error, dataToInsert;

  if (req.body.functionToFork) {
    let experiments;
    // takes url of the form http://localhost:3000/[workspaceId]/functions/[functionId]/share and extracts [functionId]
    const targetFunctionId = req.body.functionToFork.split('functions/')[1].split('/')[0];

    // fetch all the experiments of the target function
    (
      { data: experiments, error } = await supabase
        .from('experiments')
        .select('id')
        .eq('function_id', targetFunctionId)
    )
    if (error || experiments.length === 0) return res.status(500).json({ message: 'Invalid function URL' })

    const targetExperimentIds = experiments.map((exp, idx) => exp.id);
    dataToInsert = {
      name: req.body.name,
      is_public: true,
      workspace_id: workspaceId,
      fork_function_url: req.body.functionToFork,
      fork_function_experiments_snapshot: targetExperimentIds
    }
  } else {
    dataToInsert = {
      name: req.body.name,
      is_public: true,
      workspace_id: workspaceId,
    }
  }

  // created new function entry
  (
    { data, error } = await supabase
      .from('functions')
      .insert([dataToInsert])
      .select()
  )

  if (error) return res.status(500).json(error);

  return res.status(201).json(data);
}
