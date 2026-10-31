import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  const emailFrom = Deno.env.get("EMAIL_FROM") ?? "B&G Shop <notifications@bgshop.example>";
  const siteUrl = Deno.env.get("SITE_URL") ?? "";
  const client = createClient(supabaseUrl, serviceRoleKey);
  const accessToken = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!accessToken) return new Response("Authentification requise", { status: 401, headers: corsHeaders });

  const { data: authData, error: authError } = await client.auth.getUser(accessToken);
  if (authError || !authData.user) {
    return new Response("Session invalide", { status: 401, headers: corsHeaders });
  }
  const { data: profile } = await client.from("profiles").select("role").eq("id", authData.user.id).single();
  if (profile?.role !== "admin") {
    return new Response("Accès réservé aux administrateurs", { status: 403, headers: corsHeaders });
  }
  if (!resendApiKey) {
    return new Response("RESEND_API_KEY non configurée", { status: 500, headers: corsHeaders });
  }

  const body = await request.json();
  const title = String(body.title ?? "Nouvel article disponible");
  const text = String(body.text ?? "Un nouvel article vient d’être publié sur B&G Shop.");

  const recipients = new Set<string>();
  let page = 1;
  while (true) {
    const { data, error } = await client.auth.admin.listUsers(page, 100);
    if (error) return new Response(error.message, { status: 500, headers: corsHeaders });
    data.users.forEach((user) => {
      if (user.email && !user.banned_until) recipients.add(user.email);
    });
    if (data.users.length < 100) break;
    page += 1;
  }

  if (recipients.size === 0) {
    return new Response(JSON.stringify({ sent: 0 }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const response = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([...recipients].map((email) => ({
      from: emailFrom,
      to: [email],
      subject: title,
      html: `<p>${text}</p>${siteUrl ? `<p><a href="${siteUrl}">Voir sur B&amp;G Shop</a></p>` : ""}`,
    }))),
  });
  if (!response.ok) {
    return new Response(await response.text(), { status: 502, headers: corsHeaders });
  }
  return new Response(JSON.stringify({ sent: recipients.size }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
