
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "<ENTER VALUE>"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getFunctions(workspaceId) {
  let { data: functions, error } = await supabase
    .from('functions')
    .select(`*`)
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false });

  return functions;
}
