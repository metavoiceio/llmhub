import { supabase } from '../../../../../../common/supabase';
import { authOptions } from '../../../../auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"

export function mockCompletionApiCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      output: 'This is a generated output by a LLM',
      num_tokens: 2048,
      duration_s: 2.4
    }), 2000);
  });
}

export async function completionApiCall(prompt, input, config) {
  let res = await fetch('https://api.llmhub.com/completion', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      prompt,
      input,
      config
    })
  })
  res = await res.json();
  return {
    output: res['output'],
    num_tokens: res['num_tokens'],
    duration_s: res['duration_s']
  }
}

export default async function handler(req, res) {
  const { workspaceId, id } = req.query 
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method !== 'POST') return res.status(500).json({ error: 'Invalid request' });

  const { prompt, input, model, config } = req.body;
  const { output, num_tokens, duration_s } = await completionApiCall(
    prompt,
    input,
    {
      ...config,
      engine: model,
      user: String(session.user.id)
    }
  );

  let data, error;
  // update usage_tokens in the workspace
  // https://github.com/supabase/supabase/discussions/909#discussioncomment-546117
  (
    { data, error } = await supabase
      .rpc('increment', { tokens: num_tokens, workspace_id: workspaceId })
  )

  // insert to experiments
  let experiments
  (
    { data: experiments, error } = await supabase
      .from('experiments')
      .insert([
        {
          prompt,
          model,
          config,
          input,
          output,
          num_tokens,
          duration_s,
          function_id: id
        },
      ])
      .select()
  )

  if (error) return res.status(500).json({ error });

  // update functions
  const functionsOp = await supabase
    .from('functions')
    .update({ 'current_experiment_id': experiments[0].id })
    .eq('id', id)

  if (functionsOp.error) return res.status(500).json({ error });

  // return to frontend
  return res.status(201).json({ status: 'success' })
}
