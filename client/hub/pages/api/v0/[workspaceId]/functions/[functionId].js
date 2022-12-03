import { supabase } from '../../../../../common/supabase';
import { getTokenFromReqHeaders, parseUserIdFromToken } from '../../../../../common/token';
import { mockCompletionApiCall } from '../../../internal/[workspaceId]/functions/[id]/completion';

export default async function handler(req, res) {
  let data, workspaces, error;
  const { workspaceId, functionId } = req.query;

  // check the req
  if (req.method !== 'POST' || !req.body.input || !req.body.mode) return res.status(500).json({ error: 'Invalid request' });

  // get workspace details of user
  const token = getTokenFromReqHeaders(req.headers.authorization);
  (
    { data: workspaces, error } = await supabase
      .from('workspaces')
      .select()
      .eq('user_id', parseUserIdFromToken(token))
  )
  if (error || workspaces.length == 0) res.status(401).json({ message: 'Not authorised' });

  // simplification: at present functions are public, so anyone can execute them
  // against credit to their account
  // fetch deployment details
  let functions;
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

  // make request to completions API
  const { experiments: { prompt, model, config } } = deployments[0];
  const { output, num_tokens, duration_s } = await mockCompletionApiCall();

  // register the function call with DB
  (
    { data, error } = await supabase
      .from('function_calls')
      .insert([{
        deployment_id: functions[0].current_deployment_id,
        input: req.body.input,
        output,
        num_tokens,
        duration_s,
        workspace_id: workspaces[0].id,
        mode: req.body.mode
      }])
  )
  if (error) return res.status(500).json({ error });

  return res.status(201).json({ output, num_tokens, duration_s });
}
