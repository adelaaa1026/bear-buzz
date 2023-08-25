import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ksgceipzlcnjlrrslloa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZ2NlaXB6bGNuamxycnNsbG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwMTAzNDQsImV4cCI6MjAwNTU4NjM0NH0.4UvVYTbVnQaPkx2OPkV2XPeHu-ole4ndIHV0RboMw-w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
