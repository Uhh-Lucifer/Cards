const revealBtn = document.getElementById("revealBtn");
const messageBox = document.getElementById("messageBox");
const floatingIcons = document.getElementById("floatingIcons");

let launched = false;

function spawnIcon() {
  const icon = document.createElement("span");
  const symbols = ["🖤", "🦇", "❤"];
  icon.className = "float";
  icon.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  icon.style.left = `${Math.random() * 100}%`;
  icon.style.animationDuration = `${4 + Math.random() * 4}s`;
  icon.style.fontSize = `${20 + Math.random() * 18}px`;
  floatingIcons.appendChild(icon);

  setTimeout(() => icon.remove(), 8000);
}

revealBtn.addEventListener("click", () => {
  messageBox.classList.remove("hidden");

  if (!launched) {
    launched = true;
    revealBtn.textContent = "Message opened ✨";

    for (let i = 0; i < 16; i++) {
      setTimeout(spawnIcon, i * 180);
    }
  } else {
    for (let i = 0; i < 8; i++) {
      setTimeout(spawnIcon, i * 140);
    }
  }
});
