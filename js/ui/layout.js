export function renderLayout({ currentPage, mainHtml }) {
  return `
    <div class="page-shell">
      <header class="app-header">
        <div class="app-header__top">
          <div class="brand-block">
            <p class="brand-eyebrow">SOLRA</p>
            <h1 class="brand-title">Solra</h1>
            <p class="brand-subtitle">공부를 게임처럼 처리하는 Task 플랫폼</p>
          </div>
        </div>

        <nav class="page-tabs" aria-label="메인 탭">
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
