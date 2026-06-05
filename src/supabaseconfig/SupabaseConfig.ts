import { createClient } from "@supabase/supabase-js";
const url: string = "https://benstmobfeaydjzujcvp.supabase.co/rest/v1/";
const annonKey: string = "sb_publishable_w6QAuodru4KW8tkzJZCjmQ_OUsms3cG";

export const supabase = createClient(url, annonKey);
