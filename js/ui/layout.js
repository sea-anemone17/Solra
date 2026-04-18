function maskEmail(email) {
  if (!email || !email.includes("@")) return "이메일 없음";

  const [local, domain] = email.split("@");
  if (!local || !domain) return "이메일 없음";

  if (local.length <= 2) {
    return `${local[0] || "*"}*@${domain}`;
  }

  return `${local[0]}${"*".repeat(Math.max(local.length - 2, 1))}${local[local.length - 1]}@${domain}`;
}

function renderHeaderAccount(auth) {
  if (!auth?.user) {
    return `
      <div class="header-account">
        <span class="header-status-badge is-idle">로그인 필요</span>
      </div>
    `;
  }

  return `
    <div class="header-account">
      <span class="header-status-badge is-online">연결됨</span>
      <span class="header-email">${maskEmail(auth.user.email)}</span>
      <button
        class="header-logout-btn"
        data-action="sign-out"
        type="button"
      >
        로그아웃
      </button>
    </div>
  `;
}

export function renderLayout({ currentPage, mainHtml, auth }) {
  return `
    <div class="page-shell">
      <header class="app-header app-header--service">
        <div class="app-header__top app-header__top--service">
          <div class="brand-block brand-block--service">
            <div class="brand-mark-row">
              <span class="brand-mark" aria-hidden="true"></span>
              <p class="brand-eyebrow">SOLRA PLATFORM</p>
            </div>

            <h1 class="brand-title">Solra</h1>
            <p class="brand-subtitle">
              공부를 게임처럼 처리하는 Task 플랫폼
            </p>
          </div>

          ${renderHeaderAccount(auth)}
        </div>

        <nav class="page-tabs page-tabs--service" aria-label="메인 탭">
          <button
            class="page-tab ${currentPage === "home" ? "is-active" : ""}"
            data-action="go-page"
            data-page="home"
            type="button"
          >
            홈
          </button>

          <button
            class="page-tab ${currentPage === "dm" ? "is-active" : ""}"
            data-action="go-page"
            data-page="dm"
            type="button"
          >
            DM
          </button>

          <button
            class="page-tab ${currentPage === "profile" ? "is-active" : ""}"
            data-action="go-page"
            data-page="profile"
            type="button"
          >
            프로필
          </button>

          <button
            class="page-tab ${currentPage === "notifications" ? "is-active" : ""}"
            data-action="go-page"
            data-page="notifications"
            type="button"
          >
            알림
          </button>
        </nav>
      </header>

      <main class="app-main">
        ${mainHtml}
      </main>
    </div>
  `;
}
