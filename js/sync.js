import { supabase } from "./supabase.js";

export async function loadProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
}

export async function saveProfile(userId, profile) {
  const payload = {
    id: userId,
    solver_name: profile.solverName,
    bio: profile.bio,
    tags: profile.tags,
    avatar_path: profile.avatarUrl || "",
    level: profile.level,
    xp: profile.xp,
    complete_count: profile.completeCount,
    review_count: profile.reviewCount
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(payload)
    .select()
    .single();

  return { data, error };
}
