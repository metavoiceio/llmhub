// TODO sidroopdaska: blanket with auth token check
// TODO sidroopdaska: get workspaceId from userId
import { supabase } from '../../../../common/supabase';
import { mockCompletionApiCall } from '../../internal/[workspaceId]/functions/[id]/completion';

export default async function handler(req, res) {
  const { workspaceId, functionId } = req.query;

  // check if the user can access this route

  // check if the method is supported
  if (req.method !== 'POST') return res.status(500).json({ error: 'Invalid request' });

  // simplifications: at present functions are public, so anyone can execute them
  // against credit to their account
  // fetch deployment details

  let data, error, functions;
  (
    { data: functions, error } = await supabase
      .from('functions')
      .select('*')
      .eq('id', functionId)
  )

  if (error) return res.status(500).json({ error });

  // fetch experiment info from current_deployment_id
  let deployments;
  (
    { data: deployments, error } = await supabase
      .from('deployments')
      .select(`
        experiments (
          id,
          prompt,
          model,
          config
        )
      `)
      .eq('id', functions[0].current_deployment_id)
  )
  if (error) return res.status(500).json({ error });

  const {experiments: { prompt, model, config} } = deployments[0];
  const { output, num_tokens, duration_s } = await mockCompletionApiCall();

  // register the function call with DB
  (
    {data, error} = await supabase
      .from('function_calls')
      .insert([{
        deployment_id: functions[0].current_deployment_id,
        input: req.body.input,
        output,
        num_tokens,
        duration_s,
        workspace_id: 2
      }])
  )
  if (error) return res.status(500).json({ error });
  
  return res.status(201).json({status: 'success'});
}
