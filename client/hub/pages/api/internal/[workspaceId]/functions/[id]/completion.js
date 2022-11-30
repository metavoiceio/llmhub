import { supabase } from '../../../../../../common/supabase';

function mockCompletionApiCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      output: 'This is a generated output by a LLM',
      num_tokens: 2048,
      duration_s: 2.4
    }), 2000);
  });
}

export default async function handler(req, res) {
  const { workspaceId, id } = req.query

  if (req.method !== 'POST') return res.status(500).json({ error: 'Invalid request' });

  const { prompt, input, model, config } = req.body;

  // call completion API
  const { output, num_tokens, duration_s } = await mockCompletionApiCall();

  // insert to experiments
  const { data, error } = await supabase
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
    .select();

  if (error) return res.status(500).json({ error });

  // update functions
  const functionsOp = await supabase
    .from('functions')
    .update({ 'current_experiment_id': data[0].id })
    .eq('id', id)

  if (functionsOp.error) return res.status(500).json({ error });

  // return to frontend
  return res.status(201).json({ status: 'success' })
}
