function maskEmail(email) {
  if (!email || !email.includes("@")) return "이메일 없음";

  const [local, domain] = email.split("@");
  if (!local || !domain) return "이메일 없음";

  if (local.length <= 2) {
    return `${local[0] || "*"}*@${domain}`;
  }

  return `${local[0]}${"*".repeat(Math.max(local.length - 2, 1))}${local[local.length - 1]}@${domain}`;
}

export function renderAuthPanel({ auth }) {
  const isLoggedIn = !!auth.user;
  const maskedEmail = isLoggedIn ? maskEmail(auth.user.email) : null;

  if (isLoggedIn) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div class="panel-header__text">
            <p class="section-eyebrow">AUTH</p>
            <h2 class="panel-title">인증 상태</h2>
            <p class="panel-subtitle">현재 계정으로 데이터가 동기화됩니다.</p>
          </div>
        </div>

        <div class="detail-card">
          <div class="card">
            <strong>로그인됨</strong>
            <p class="muted">${maskedEmail}</p>
          </div>

          ${
            auth.statusMessage
              ? `<div class="card"><p class="muted">${auth.statusMessage}</p></div>`
              : ""
          }

          <div class="button-row">
            <button class="btn btn--ghost" data-action="sign-out" type="button">
              로그아웃
            </button>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">AUTH</p>
          <h2 class="panel-title">로그인 / 회원가입</h2>
          <p class="panel-subtitle">기기 간 연동을 위해 같은 계정으로 접속하세요.</p>
        </div>
      </div>

      <div class="detail-card">
        <div class="field-group">
          <label class="field-label" for="auth-email-input">이메일</label>
          <input
            id="auth-email-input"
            class="input"
            data-action="update-auth-email"
            type="email"
            placeholder="example@email.com"
            value="${auth.emailDraft || ""}"
          />
        </div>

        <div class="field-group">
          <label class="field-label" for="auth-password-input">비밀번호</label>
          <input
            id="auth-password-input"
            class="input"
            data-action="update-auth-password"
            type="password"
            placeholder="비밀번호 입력"
            value="${auth.passwordDraft || ""}"
          />
        </div>

        ${
          auth.statusMessage
            ? `<div class="card"><p class="muted">${auth.statusMessage}</p></div>`
            : ""
        }

        <div class="button-row">
          <button class="btn btn--primary" data-action="sign-in" type="button">
            로그인
          </button>
          <button class="btn btn--secondary" data-action="sign-up" type="button">
            회원가입
          </button>
        </div>
      </div>
    </section>
  `;
}
