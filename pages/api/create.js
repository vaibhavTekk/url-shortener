import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.API_KEY);

export default async function create(req, res) {
  const link = req.body.link;
  const slug = req.body.slug;
  const { data, error } = await supabase.from("links").insert({ link, slug });
  console.log(error);
  if (error) {
    res.json({ slug: null, error: error.message });
  } else {
    res.json({ slug: data[0].slug, error: null });
  }
}
