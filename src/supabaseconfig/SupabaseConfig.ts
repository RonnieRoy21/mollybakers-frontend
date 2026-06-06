import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

export const supabase = createClient<Database>(
  "https://benstmobfeaydjzujcvp.supabase.co",
  "sb_publishable_w6QAuodru4KW8tkzJZCjmQ_OUsms3cG",
);
