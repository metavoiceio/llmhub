
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ynmrxmxganprxliyqppn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlubXJ4bXhnYW5wcnhsaXlxcHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk1NDU3MjAsImV4cCI6MTk4NTEyMTcyMH0.5oaHv2n7NJ2b5OjlDwjdpzilcjujnd2zj1JUkA_zOhU';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getFunctions(workspaceId) {
  let { data: functions, error } = await supabase
    .from('functions')
    .select(`*`)
    .eq('workspace_id', workspaceId);
  
    return functions;
}
