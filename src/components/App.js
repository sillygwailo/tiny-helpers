import { html } from 'htm/preact';
import { useEffect, useState } from 'preact/hooks';

import Helper from './Helper.js';

function updateHistory({ tag }) {
  // todo fix the back button
  history.pushState({}, document.title, `/${tag === 'all' ? '' : tag}`);
}

export function App({ helpers, tags, currentTag }) {
  const filterHelpers = (helpers, activeTag) =>
    activeTag === 'all'
      ? helpers
      : helpers.filter(helper => helper.tagSlugs.includes(activeTag));
  const [activeTag, setActiveTag] = useState(currentTag);
  const [activeHelpers, setActiveHelpers] = useState(
    filterHelpers(helpers, activeTag)
  );

  useEffect(() => {
    setActiveHelpers(filterHelpers(helpers, activeTag));
    updateHistory({ tag: activeTag });
  }, [activeTag]);

  return html`
    <div class="container">
      <div class="sidebar">
        <div class="sidebar__header">
          <h1>Tiny helpers</h1>
        </div>
        <div class="topbar">
          <a class="btn btn--ghost" href="https://twitter.com/tinyhelpersdev">
            Follow on Twitter
            <svg
              viewBox="0 0 300 300"
              height="300"
              width="300"
              focusable="false"
            >
              <g transform="translate(-539.17946,-568.85777)" id="layer1">
                <path
                  id="path3611"
                  d="m 633.89823,812.04479 c 112.46038,0 173.95627,-93.16765 173.95627,-173.95625 0,-2.64628 -0.0539,-5.28062 -0.1726,-7.90305 11.93799,-8.63016 22.31446,-19.39999 30.49762,-31.65984 -10.95459,4.86937 -22.74358,8.14741 -35.11071,9.62551 12.62341,-7.56929 22.31446,-19.54304 26.88583,-33.81739 -11.81284,7.00307 -24.89517,12.09297 -38.82383,14.84055 -11.15723,-11.88436 -27.04079,-19.31655 -44.62892,-19.31655 -33.76374,0 -61.14426,27.38052 -61.14426,61.13233 0,4.79784 0.5364,9.46458 1.58538,13.94057 -50.81546,-2.55686 -95.87353,-26.88582 -126.02546,-63.87991 -5.25082,9.03545 -8.27852,19.53111 -8.27852,30.73006 0,21.21186 10.79366,39.93837 27.20766,50.89296 -10.03077,-0.30992 -19.45363,-3.06348 -27.69044,-7.64676 -0.009,0.25652 -0.009,0.50661 -0.009,0.78077 0,29.60957 21.07478,54.3319 49.0513,59.93435 -5.13757,1.40062 -10.54335,2.15158 -16.12196,2.15158 -3.93364,0 -7.76596,-0.38716 -11.49099,-1.1026 7.78383,24.2932 30.35457,41.97073 57.11525,42.46543 -20.92578,16.40207 -47.28712,26.17062 -75.93712,26.17062 -4.92898,0 -9.79834,-0.28036 -14.58427,-0.84634 27.05868,17.34379 59.18936,27.46396 93.72193,27.46396"
                />
              </g>
            </svg>
          </a>

          <a class="btn btn--ghost" href="https://tiny-helpers.dev/feed.xml"
            >Check RSS
            <svg
              focusable="false"
              width="100pt"
              height="100pt"
              viewBox="0 0 100 100"
            >
              <path
                d="m0 0v25c41.625 0 75 33.375 75 75h25c0-55.125-44.875-100-100-100zm0 37.5v25c20.875 0 37.5 16.625 37.5 37.5h25c0-34.375-28.125-62.5-62.5-62.5zm0 37.5v25h25c0-13.875-11.25-25-25-25z"
              />
            </svg>
          </a>

          <a
            class="btn btn--cta"
            href="https://github.com/stefanjudis/tiny-helpers#contributing"
            >Add helper
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="m82.102 58h-24.102v24.102c0 4.3984-3.6016 8-8 8s-8-3.6016-8-8v-24.102h-24.102c-4.3984 0-8-3.6016-8-8s3.6016-8 8-8h24.102v-24.102c0-4.3984 3.6016-8 8-8s8 3.6016 8 8v24.102h24.102c4.3984 0 8 3.6016 8 8s-3.6016 8-8 8z"
                fill-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div class="sidebar__body">
          <p class="sidebar__explainer">
            A collection of single-purpose online tools for web developers...
          </p>
          <ol class="sidebar__tags u-margin-bottom-l">
            <li class="sidebar__tag">
              <a
                href="/"
                class="${'all' === activeTag ? 'isActive' : ''}"
                onClick=${event => {
                  event.preventDefault();
                  setActiveTag('all');
                }}
                >All
              </a>
              <div class="sidebar__tagCount">${helpers.length}</div>
            </li>
            ${tags.map(
              tag =>
                html`
                  <li class="sidebar__tag">
                    <a
                      href="/${tag.slug}"
                      class="${tag.slug === activeTag ? 'isActive' : ''}"
                      onClick=${event => {
                        event.preventDefault();
                        setActiveTag(tag.slug);
                      }}
                    >
                      ${tag.name}
                    </a>
                    <div class="sidebar__tagCount">${tag.count}</div>
                  </li>
                `
            )}
          </ol>
          <div class="sidebar__broughtToYou">
            Brought to you by
            <a href="https://twitter.com/stefanjudis">Stefan Judis</a>
          </div>
        </div>
      </div>
      <main class="canvas">
        <div class="canvas__body">
          ${activeHelpers.length
            ? html`
                <ul class="canvas-grid">
                  ${activeHelpers.map(
                    helper =>
                      html`
                        <li class="canvas-grid__item">
                          <${Helper} helper="${helper}" />
                        </li>
                      `
                  )}
                </ul>
              `
            : html`
                That's no valid tag or?
              `}
        </div>
      </main>
    </div>
  `;
}
