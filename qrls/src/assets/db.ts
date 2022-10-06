import { createClient } from "@supabase/supabase-js";

type QrlsMember = { id: number; created_at: Date; member: number };
type QrlsGuest = { id: number; created_at: Date; guest_name: string };

export type QrlsEntry = QrlsGuest | QrlsMember;

const client = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);

export const signInGuest = async (name: string): Promise<number | string> => {
  const { data, error } = await client
    .from<QrlsEntry>("qrls")
    .insert({
      guest_name: name,
    })
    .single();

  if (error) {
    return error.message;
  } else {
    return data.id;
  }
};

export const undoSignIn = async (id: number): Promise<string | null> => {
  const { error } = await client.from("qrls").delete().match({ id });

  if (error) {
    return error.message;
  }
};
