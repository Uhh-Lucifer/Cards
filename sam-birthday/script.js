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
  { file: "photo1.jpg", x: 50, y: 50 },
  { file: "photo2.jpg", x: 50, y: 50 },
  { file: "photo3.jpg", x: 50, y: 50 },
  { file: "photo4.jpg", x: 50, y: 50 },
  { file: "photo5.jpg", x: 50, y: 50 },
  { file: "photo6.jpg", x: 50, y: 50 },
  { file: "photo7.jpg", x: 50, y: 50 }
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function makeImageDraggable(img, photo) {
  let dragging = false;

  img.style.objectPosition = `${photo.x}% ${photo.y}%`;
  img.style.cursor = "grab";
  img.draggable = false;

  img.addEventListener("pointerdown", (event) => {
    dragging = true;
    img.setPointerCapture(event.pointerId);
    img.style.cursor = "grabbing";
    event.preventDefault();
  });

  img.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    photo.x = clamp(photo.x - event.movementX * 0.15, 0, 100);
    photo.y = clamp(photo.y - event.movementY * 0.15, 0, 100);
    img.style.objectPosition = `${photo.x}% ${photo.y}%`;
  });

  function stopDragging(event) {
    if (!dragging) return;
    dragging = false;
    img.style.cursor = "grab";

    if (event.pointerId !== undefined) {
      try {
        img.releasePointerCapture(event.pointerId);
      } catch (error) {}
    }

    console.log(`${photo.file}: x=${photo.x.toFixed(1)}, y=${photo.y.toFixed(1)}`);
  }

  img.addEventListener("pointerup", stopDragging);
  img.addEventListener("pointercancel", stopDragging);
  img.addEventListener("lostpointercapture", () => {
    dragging = false;
    img.style.cursor = "grab";
  });
}

if (photoGrid) {
  collagePhotos.forEach((photo, index) => {
    const img = document.createElement("img");
    img.src = `assets/photos/${photo.file}`;
    img.alt = `Sam memory ${index + 1}`;
    img.loading = "lazy";
    img.decoding = "async";
    photoGrid.appendChild(img);
    makeImageDraggable(img, photo);
  });
}
