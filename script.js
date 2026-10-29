
/* =========================================
   JUST US 💗 — COMPLETE SCRIPT.JS
   Gallery, Letter, Butterflies, Garden & Music
========================================= */


/* ---------- MEMORIES GALLERY DATA ---------- */

const memoryItems = [
  {
    type: "photo",
    src: "assets/photos/photo2.jpeg",
    title: "Our favourite smile",
    caption: "A little moment I will always cherish. ♡",
    emoji: "📸"
  },
  {
    type: "photo",
    src: "assets/photos/photo4.jpeg",
    title: "A beautiful day",
    caption: "A memory close to my heart. 🌷",
    emoji: "🌸"
  },
  {
    type: "photo",
    src: "assets/photos/photo5.jpeg",
    title: "Little happiness",
    caption: "Some moments make ordinary days special. ✨",
    emoji: "💗"
  },
  {
    type: "video",
    src: "assets/videos/Video1.mp4",
    title: "Our little video",
    caption: "A moment worth keeping. 🎞️",
    emoji: "🎬"
  },
  {
    type: "photo",
    src: "assets/photos/photo8.jpeg",
    title: "That special moment",
    caption: "One of my favourite memories. 🧸",
    emoji: "💕"
  },
  {
    type: "video",
    src: "assets/videos/video2.mp4",
    title: "Another memory",
    caption: "A tiny piece of our story. 💞",
    emoji: "🎥"
  }
];


/* ---------- MEMORIES GALLERY ---------- */

const gallery = document.querySelector("#gallery");

if (gallery) {
  gallery.replaceChildren();

  memoryItems.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "memory-card reveal";

    const tiltValues = [-1.2, 0.8, -0.6, 0.7, -1, 0.5];

    card.style.setProperty(
      "--tilt",
      `${tiltValues[index % tiltValues.length]}deg`
    );

    const media = document.createElement("div");
    media.className = "memory-media";

    const placeholder = document.createElement("div");
    placeholder.className = "media-placeholder";

    placeholder.innerHTML = `
      <span>${item.emoji}</span>
      <small>Loading memory...<br>${item.src}</small>
    `;

    media.appendChild(placeholder);

    if (item.type === "photo") {
      const img = new Image();

      img.alt = item.title;
      img.loading = "eager";
      img.decoding = "async";

      img.onload = () => {
        media.replaceChildren(img);
        console.log("Photo loaded:", item.src);
      };

      img.onerror = () => {
        placeholder.innerHTML = `
          <span>📷</span>
          <small>Photo not found<br>${item.src}</small>
        `;

        console.error("Photo load failed:", item.src);
      };

      img.src = item.src;

    } else if (item.type === "video") {
      const video = document.createElement("video");

      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;

      video.onloadeddata = () => {
        media.replaceChildren(video);
        console.log("Video loaded:", item.src);
      };

      video.onerror = () => {
        placeholder.innerHTML = `
          <span>🎬</span>
          <small>Video not found<br>${item.src}</small>
        `;

        console.error("Video load failed:", item.src);
      };

      video.src = item.src;
      video.load();
    }

    const title = document.createElement("h3");
    title.textContent = item.title;

    const caption = document.createElement("p");
    caption.textContent = item.caption;

    card.append(media, title, caption);
    gallery.appendChild(card);
  });
}


/* ---------- OPEN / CLOSE LETTER ---------- */

const envelope = document.querySelector("#envelope");
const letter = document.querySelector("#letterContent");
const hint = document.querySelector("#envelopeHint");

if (envelope && letter) {
  envelope.addEventListener("click", () => {
    const open = envelope.getAttribute("aria-expanded") !== "true";

    envelope.setAttribute("aria-expanded", String(open));
    envelope.classList.toggle("is-open", open);
    letter.hidden = !open;

    if (hint) {
      hint.textContent = open
        ? "Your letter is open ♡"
        : "Tap the envelope to open your letter";
    }

    envelope.setAttribute(
      "aria-label",
      open ? "Close the envelope" : "Open the letter"
    );

    let butterfly = letter.querySelector(".letter-butterfly");

    if (open && !butterfly) {
      butterfly = document.createElement("span");
      butterfly.className = "letter-butterfly";
      butterfly.setAttribute("aria-hidden", "true");

      butterfly.innerHTML = `
        <svg class="real-butterfly"
             viewBox="0 0 120 100"
             xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="letterWingPink"
              x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ffe8f4"/>
              <stop offset="55%" stop-color="#f58cbd"/>
              <stop offset="100%" stop-color="#c28be8"/>
            </linearGradient>
          </defs>

          <g class="wing wing-left">
            <path
              d="M58 49 C45 20 19 12 15 30 C12 45 34 57 56 58
                 C37 63 34 78 44 81 C54 78 59 65 60 53Z"
              fill="url(#letterWingPink)"
              stroke="#fff"
              stroke-width="2"/>

            <path
              d="M52 50 L25 31 M53 59 L42 72"
              fill="none"
              stroke="#fff7fc"
              stroke-width="1.5"/>
          </g>

          <g class="wing wing-right">
            <path
              d="M62 49 C75 20 101 12 105 30 C108 45 86 57 64 58
                 C83 63 86 78 76 81 C66 78 61 65 60 53Z"
              fill="url(#letterWingPink)"
              stroke="#fff"
              stroke-width="2"/>

            <path
              d="M68 50 L95 31 M67 59 L78 72"
              fill="none"
              stroke="#fff7fc"
              stroke-width="1.5"/>
          </g>

          <ellipse cx="60" cy="56" rx="2.4" ry="12" fill="#81517d"/>
          <circle cx="60" cy="43" r="3" fill="#81517d"/>

          <path
            d="M59 41 Q53 32 50 35 M61 41 Q67 32 70 35"
            fill="none"
            stroke="#81517d"
            stroke-width="1.3"
            stroke-linecap="round"/>
        </svg>
      `;

      letter.appendChild(butterfly);
    }

    if (!open && butterfly) {
      butterfly.remove();
    }

    if (
      open &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const rect = envelope.getBoundingClientRect();

      for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement("span");

        sparkle.className = "letter-sparkle";
        sparkle.textContent = ["✦", "✧", "♡"][i % 3];

        sparkle.style.left = `${rect.left + rect.width / 2}px`;
        sparkle.style.top = `${rect.top + rect.height / 2}px`;

        sparkle.style.setProperty(
          "--spark-x",
          `${Math.random() * 150 - 75}px`
        );

        sparkle.style.setProperty(
          "--spark-y",
          `${Math.random() * 110 - 55}px`
        );

        document.body.appendChild(sparkle);

        sparkle.addEventListener(
          "animationend",
          () => sparkle.remove(),
          { once: true }
        );
      }

      setTimeout(() => {
        letter.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }, 250);
    }
  });
}


/* ---------- MOBILE MENU ---------- */

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}


/* ---------- SURPRISE POPUP ---------- */

const dialog = document.querySelector("#surprise");
const surpriseBtn = document.querySelector("#surpriseBtn");

if (dialog && surpriseBtn) {
  surpriseBtn.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    for (let i = 0; i < 22; i++) {
      const petal = document.createElement("span");

      petal.className = "petal";
      petal.textContent = ["♡", "✿", "✧", "♥"][
        Math.floor(Math.random() * 4)
      ];

      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.fontSize = `${14 + Math.random() * 20}px`;

      petal.style.setProperty(
        "--drift",
        `${Math.random() * 150 - 75}px`
      );

      petal.style.animationDuration =
        `${2.8 + Math.random() * 2}s`;

      document.body.appendChild(petal);

      petal.addEventListener(
        "animationend",
        () => petal.remove(),
        { once: true }
      );

      setTimeout(() => petal.remove(), 6000);
    }
  });

  function closeDialog() {
    if (dialog.open && typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  document
    .querySelector("#closeSurprise")
    ?.addEventListener("click", closeDialog);

  document
    .querySelector("#dialogOkay")
    ?.addEventListener("click", closeDialog);

  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      closeDialog();
    }
  });
}


/* ---------- REVEAL ANIMATIONS ---------- */

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(
    ".section-heading, .timeline-card, .promise-card, .closing, .memory-card"
  ).forEach(element => revealObserver.observe(element));

} else {
  document.querySelectorAll(
    ".section-heading, .timeline-card, .promise-card, .closing, .memory-card"
  ).forEach(element => element.classList.add("is-visible"));
}



/* ---------- BACKGROUND MUSIC + PROMPT ---------- */

(() => {
  const music = document.getElementById("backgroundMusic");
  const soundBtn = document.getElementById("soundBtn");
  const musicPrompt = document.getElementById("musicPrompt");

  if (!music) {
    console.error("Audio element #backgroundMusic not found.");
    return;
  }

  music.volume = 0.35;

  function updateButton(playing) {
    if (!soundBtn) return;

    soundBtn.innerHTML = playing
      ? '♫ <span>Sound on</span>'
      : '♫ <span>Sound off</span>';

    soundBtn.setAttribute("aria-pressed", String(playing));
  }

  function showPrompt(show) {
    if (musicPrompt) {
      musicPrompt.classList.toggle("is-hidden", !show);
    }
  }

  async function startMusic() {
    try {
      // Start playback directly from the user's click when possible.
      await music.play();
      updateButton(true);
      showPrompt(false);
      console.log("Music playing successfully.");
    } catch (error) {
      updateButton(false);
      showPrompt(true);
      console.error("Music playback failed:", error.name, error.message);
    }
  }

  // Try autoplay on page load.
  startMusic();

  // Sound ON/OFF button.
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      if (music.paused) {
        startMusic();
      } else {
        music.pause();
        updateButton(false);
        showPrompt(true);
      }
    });
  }

  // Tap the prompt to retry playback.
  if (musicPrompt) {
    musicPrompt.addEventListener("click", startMusic);
  }

  music.addEventListener("playing", () => {
    updateButton(true);
    showPrompt(false);
  });

  music.addEventListener("pause", () => {
    updateButton(false);
  });

  music.addEventListener("error", () => {
    console.error("Audio file failed to load:", music.currentSrc, music.error);
    updateButton(false);
    showPrompt(true);
  });
})();


/* ---------- MAGICAL GARDEN: STARS, PETALS & BUTTERFLIES ---------- */

(() => {
  if (document.body.dataset.magicGardenReady === "true") {
    return;
  }

  document.body.dataset.magicGardenReady = "true";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const magicLayer = document.createElement("div");

  magicLayer.className = "magic-garden";
  magicLayer.setAttribute("aria-hidden", "true");

  document.body.appendChild(magicLayer);

  if (!reducedMotion) {
    /* Twinkling stars */
    const starSymbols = ["✦", "✧", "⋆", "·", "✶"];

    for (let i = 0; i < 32; i++) {
      const star = document.createElement("span");

      star.className = "garden-star";

      star.textContent = starSymbols[
        Math.floor(Math.random() * starSymbols.length)
      ];

      star.style.left = `${Math.random() * 98}%`;
      star.style.top = `${Math.random() * 100}%`;

      star.style.setProperty(
        "--star-size",
        `${8 + Math.random() * 15}px`
      );

      star.style.setProperty(
        "--star-duration",
        `${2.5 + Math.random() * 4}s`
      );

      star.style.setProperty(
        "--star-delay",
        `${Math.random() * 5}s`
      );

      magicLayer.appendChild(star);
    }

    /* Falling petals */
    const petalSymbols = ["🌸", "✿", "♡", "✧"];

    function releasePetal() {
      if (
        document.hidden ||
        magicLayer.childElementCount > 65
      ) {
        return;
      }

      const petal = document.createElement("span");

      petal.className = "garden-petal";

      petal.textContent = petalSymbols[
        Math.floor(Math.random() * petalSymbols.length)
      ];

      petal.style.left = `${Math.random() * 100}%`;

      petal.style.setProperty(
        "--petal-size",
        `${10 + Math.random() * 12}px`
      );

      petal.style.setProperty(
        "--fall-duration",
        `${7 + Math.random() * 7}s`
      );

      petal.style.setProperty(
        "--fall-drift",
        `${Math.random() * 140 - 70}px`
      );

      petal.style.setProperty(
        "--fall-rotate",
        `${Math.random() * 540 - 270}deg`
      );

      magicLayer.appendChild(petal);

      petal.addEventListener(
        "animationend",
        () => petal.remove(),
        { once: true }
      );
    }

    for (let i = 0; i < 7; i++) {
      setTimeout(releasePetal, i * 450);
    }

    window.setInterval(releasePetal, 1200);
  }

  /* Butterflies on memory cards */
  function addButterflies() {
    document
      .querySelectorAll(".memory-card .memory-media")
      .forEach(media => {
        if (media.querySelector(".memory-butterfly")) {
          return;
        }

        const butterfly = document.createElement("span");

        butterfly.className = "memory-butterfly";
        butterfly.textContent = "🦋";
        butterfly.setAttribute("aria-hidden", "true");

        media.appendChild(butterfly);
      });
  }

  addButterflies();

  if (gallery && "MutationObserver" in window) {
    const galleryObserver = new MutationObserver(addButterflies);

    galleryObserver.observe(gallery, {
      childList: true
    });
  }

  /* Small sparkle trail on desktop */
  if (
    !reducedMotion &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    let lastTrailTime = 0;

    document.addEventListener("pointermove", event => {
      const now = performance.now();

      if (now - lastTrailTime < 700) {
        return;
      }

      lastTrailTime = now;

      const trail = document.createElement("span");

      trail.className = "butterfly-trail";
      trail.textContent = "✧";
      trail.style.left = `${event.clientX}px`;
      trail.style.top = `${event.clientY}px`;

      magicLayer.appendChild(trail);

      trail.addEventListener(
        "animationend",
        () => trail.remove(),
        { once: true }
      );
    }, { passive: true });
  }
})();
