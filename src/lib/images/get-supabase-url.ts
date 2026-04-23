const SUPABASE_PROJECT_URL = "https://mqupvuhrhdxfoesburac.supabase.co";
const BUCKET = "wildrosecollective";

export function getSupabaseImageUrl(path: string): string {
  const cleaned = path.replace(/^\/+/, "");
  return `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${BUCKET}/${cleaned}`;
}
