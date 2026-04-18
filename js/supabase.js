import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://cpyvyjxxgxllysqqwaii.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Ow_X8vNC1OHInvi8htTbGw_9MrHnn_C";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
