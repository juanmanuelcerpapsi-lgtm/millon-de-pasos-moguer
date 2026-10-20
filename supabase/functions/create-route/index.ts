import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ADMIN_KEY = Deno.env.get("ADMIN_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!ADMIN_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Faltan variables de entorno: ADMIN_KEY, SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
}

serve(async (req) => {
  const suppliedKey = req.headers.get("x-admin-key");

  if (!suppliedKey || suppliedKey !== ADMIN_KEY) {
    return new Response(
      JSON.stringify({ error: "No autorizado" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "JSON inválido" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const name = String(body.name ?? "").trim();
  const description = String(body.description ?? "").trim();

  if (!name) {
    return new Response(
      JSON.stringify({ error: "El nombre del sendero es obligatorio" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data, error } = await supabase
    .from("routes")
    .insert([
      {
        name,
        description,
        created_by: "admin"
      }
    ])
    .select();

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ route: data?.[0] ?? null }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
