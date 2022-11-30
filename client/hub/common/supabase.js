
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ynmrxmxganprxliyqppn.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getFunctions(workspaceId) {
  let { data: functions, error } = await supabase
    .from('functions')
    .select(`*`)
    .eq('workspace_id', workspaceId);
  
    return functions;
}
