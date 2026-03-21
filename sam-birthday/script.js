const revealBtn = document.getElementById("revealBtn");
const messageBox = document.getElementById("messageBox");
const floatingIcons = document.getElementById("floatingIcons");
const photoGrid = document.getElementById("photoGrid");

let launched = false;

function spawnIcon() {
  if (!floatingIcons) return;

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

if (revealBtn && messageBox) {
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
}

const collagePhotos = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg",
  "photo6.jpg",
  "photo7.jpg",
  "photo8.jpg"
];

if (photoGrid) {
  collagePhotos.forEach((fileName, index) => {
    const img = document.createElement("img");
    img.src = `assets/photos/${fileName}`;
    img.alt = `Sam memory ${index + 1}`;
    img.loading = "lazy";
    photoGrid.appendChild(img);
  });
}
