export function renderLayout({ profileHtml, homeHtml, dmHtml, notificationsHtml }) {
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
      </header>

      <main class="app-grid">
        <aside class="left-column">
          ${profileHtml}
        </aside>

        <section class="center-column">
          ${homeHtml}
          ${dmHtml}
        </section>

        <aside class="right-column">
          ${notificationsHtml}
        </aside>
      </main>
    </div>
  `;
}
