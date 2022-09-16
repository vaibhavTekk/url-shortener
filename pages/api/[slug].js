import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.API_KEY);

export default async function handler(req, res) {
  const { data, error } = await supabase.from("links").select("link,slug").match({ slug: req.query.slug });
  if (data.length > 0) {
    res.redirect(data[0].link);
  } else {
    res.redirect("/404");
  }

}
