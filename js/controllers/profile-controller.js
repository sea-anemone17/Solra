import { saveProfile } from "../sync.js";

export function openProfileEditor(state) {
  state.profileEditor.isOpen = true;
  state.profileEditor.nameDraft = state.profile.solverName;
  state.profileEditor.bioDraft = state.profile.bio;
  state.profileEditor.tagsDraft = state.profile.tags.join(", ");
}

export function cancelProfileEdit(state) {
  state.profileEditor.isOpen = false;
}

export async function handleSaveProfile(state) {
  const name = state.profileEditor.nameDraft.trim();
  const bio = state.profileEditor.bioDraft.trim();
  const tags = state.profileEditor.tagsDraft
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!name) {
    alert("이름을 입력해 주세요.");
    return;
  }

  state.profile.solverName = name;
  state.profile.bio = bio || "소개가 없습니다.";
  state.profile.tags = tags;

  if (!state.auth.user) {
    state.auth.statusMessage = "로그인 후 프로필을 저장할 수 있습니다.";
    state.profileEditor.isOpen = false;
    return;
  }

  const { data, error } = await saveProfile(state.auth.user.id, state.profile);

  if (error) {
    state.auth.statusMessage = `프로필 저장 실패: ${error.message}`;
    return;
  }

  if (data) {
    state.profile.solverName = data.solver_name ?? state.profile.solverName;
    state.profile.bio = data.bio ?? state.profile.bio;
    state.profile.tags = data.tags ?? state.profile.tags;
    state.profile.avatarUrl = data.avatar_path ?? state.profile.avatarUrl;
    state.profile.level = data.level ?? state.profile.level;
    state.profile.xp = data.xp ?? state.profile.xp;
    state.profile.completeCount =
      data.complete_count ?? state.profile.completeCount;
    state.profile.reviewCount =
      data.review_count ?? state.profile.reviewCount;
  }

  state.profileEditor.isOpen = false;
  state.auth.statusMessage = "프로필이 저장되었습니다.";
}
