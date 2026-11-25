// ✏️ Put her name here (leave "" to show "Hey you…"). You can also share the
// link as https://your-site.vercel.app/?name=Sara and it'll pick the name up.
const HER_NAME = "";

(function () {
  const $ = (id) => document.getElementById(id);
  const screens = {
    ask: $("screen-ask"),
    yes: $("screen-yes"),
    no: $("screen-no"),
  };

  function show(which) {
    Object.values(screens).forEach((s) => s.classList.remove("is-active"));
    // force reflow so the entrance animation replays
    void screens[which].offsetWidth;
    screens[which].classList.add("is-active");
  }

  // name
  const urlName = new URLSearchParams(location.search).get("name");
  const name = (urlName || HER_NAME || "").trim().slice(0, 40);
  if (name) $("name").textContent = name;

  // floating background hearts
  const bg = $("bg");
  const glyphs = ["💖", "💗", "💕", "❤️", "💘"];
  function spawnFloat() {
    const el = document.createElement("span");
    el.className = "float-heart";
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = 14 + Math.random() * 26 + "px";
    const dur = 7 + Math.random() * 7;
    el.style.animationDuration = dur + "s";
    bg.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }
  setInterval(spawnFloat, 500);
  for (let i = 0; i < 8; i++) setTimeout(spawnFloat, i * 150);

  // heart confetti burst
  function confetti(count) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "confetti";
      el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = 18 + Math.random() * 28 + "px";
      const dur = 2.5 + Math.random() * 3;
      el.style.animationDuration = dur + "s";
      el.style.animationDelay = Math.random() * 1.2 + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (dur + 1.5) * 1000);
    }
  }

  $("yes").addEventListener("click", () => {
    show("yes");
    confetti(80);
    setTimeout(() => confetti(50), 1800);
  });

  $("no").addEventListener("click", () => show("no"));
  $("retry").addEventListener("click", () => show("ask"));
})();
