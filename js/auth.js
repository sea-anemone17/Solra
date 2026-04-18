import { supabase } from "./supabase.js";

export async function signUp(email, password, solverName = "New Solver") {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        solver_name: solverName
      }
    }
  });

  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user ?? null, error };
}
