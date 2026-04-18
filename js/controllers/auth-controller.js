import { signUp, signIn, signOut, getCurrentUser } from "../auth.js";

export async function refreshAuthUser(state) {
  const { user, error } = await getCurrentUser();

  if (error) {
    state.auth.user = null;
    state.auth.statusMessage = "사용자 확인 중 오류가 발생했습니다.";
    return;
  }

  state.auth.user = user ?? null;

  if (user?.email) {
    state.auth.statusMessage = "계정 연결 완료";
  }
}

export async function handleSignUp(state) {
  const email = state.auth.emailDraft.trim();
  const password = state.auth.passwordDraft.trim();

  if (!email || !password) {
    state.auth.statusMessage = "이메일과 비밀번호를 입력해 주세요.";
    return;
  }

  const { error } = await signUp(email, password, state.profile.solverName);

  if (error) {
    state.auth.statusMessage = `회원가입 실패: ${error.message}`;
    return;
  }

  state.auth.statusMessage =
    "회원가입 요청이 완료되었습니다. 이메일 인증이 필요한 설정일 수도 있습니다.";
  await refreshAuthUser(state);
}

export async function handleSignIn(state) {
  const email = state.auth.emailDraft.trim();
  const password = state.auth.passwordDraft.trim();

  if (!email || !password) {
    state.auth.statusMessage = "이메일과 비밀번호를 입력해 주세요.";
    return;
  }

  const { error } = await signIn(email, password);

  if (error) {
    state.auth.statusMessage = `로그인 실패: ${error.message}`;
    return;
  }

  state.auth.statusMessage = "로그인되었습니다.";
  await refreshAuthUser(state);
}

export async function handleSignOut(state) {
  const { error } = await signOut();

  if (error) {
    state.auth.statusMessage = `로그아웃 실패: ${error.message}`;
    return;
  }

  state.auth.user = null;
  state.auth.statusMessage = "로그아웃되었습니다.";
}
