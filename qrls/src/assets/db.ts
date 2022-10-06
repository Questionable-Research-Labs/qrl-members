import { createClient } from "@supabase/supabase-js";

type QrlsMember = { id: number; created_at: Date; member: number };
type QrlsGuest = { id: number; created_at: Date; guest_name: string };
type QrlMember = { id: number; first_name: string; last_name: string };

export type Memeber = { name: string; id: number };
export type QrlsEntry = QrlsGuest | QrlsMember;
export type DbResponse<T> = Promise<T | string>;

const client = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);

export const getMembers = async (): DbResponse<Memeber[]> => {
  const { data, error } = await client
    .from<QrlMember>("members")
    .select("id,first_name,last_name");

  if (error) {
    return error.message;
  } else {
    return data.map(({ first_name, last_name, id }) => {
      return { name: `${first_name} ${last_name}`, id };
    });
  }
};

export const signInGuest = async (name: string): DbResponse<number> => {
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

export const undoSignIn = async (id: number): DbResponse<void> => {
  const { error } = await client.from("qrls").delete().match({ id });

  if (error) {
    return error.message;
  }
};

export const signInMember = async (id: number): DbResponse<number> => {
  const { data, error } = await client
    .from<QrlsEntry>("qrls")
    .insert({
      member: id,
    })
    .single();

  if (error) {
    return error.message;
  } else {
    return data.id;
  }
};
