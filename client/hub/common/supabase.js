
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ynmrxmxganprxliyqppn.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey);

// export function getFunctions

