// --- VARIABLES ---
const imageInput = document.getElementById("imageInput");
const userImage = document.getElementById("userImage");
const placeholder = document.getElementById("placeholder");
const placeholderText = document.getElementById("placeholderText");
const downloadBtn = document.getElementById("downloadBtn");

// Text inputs
const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const headingInput = document.getElementById("headingInput"); // ✅ ADDED
const themeRadios = document.getElementsByName("theme");

// SVG elements
const bgColorCard = document.getElementById("bgCardSvg");
const svgName1 = document.getElementById("svgName1");
const svgName2 = document.getElementById("svgName2");
const phraseText = document.getElementById("phraseText");
const mainBorder = document.getElementById("mainBorder");
const svgElement = document.getElementById("cardSvg");
const canvas = document.getElementById("exportCanvas");
const headdingText = document.getElementById("headdingText");
const ampersand = document.getElementById("ampersand");

// --- FUNCTIONS ---

// 1. Image Handling
imageInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    userImage.setAttribute("href", event.target.result);
    userImage.style.display = "block";
    placeholder.style.display = "none";
    placeholderText.style.display = "none";
    downloadBtn.disabled = false;
  };
  reader.readAsDataURL(file);
});

// 2. Real-time Name Update
function updateNames() {
  svgName1.textContent = name1Input.value || "Name 1";
  svgName2.textContent = name2Input.value || "Name 2";
}

name1Input.addEventListener("input", updateNames);
name2Input.addEventListener("input", updateNames);

// 3. Dynamic Heading (same pattern as names)
headingInput.addEventListener("input", () => {
  headdingText.textContent =
    headingInput.value || "Happy Valentine’s Day!";
});

// 4. Theme Change (ONLY CHANGE HERE)
function updateTheme() {
  let selectedTheme = "love";
  for (const radio of themeRadios) {
    if (radio.checked) selectedTheme = radio.value;
  }

  if (selectedTheme === "love") {
    headdingText.setAttribute("fill", "#c2185b");
    phraseText.textContent = "With all my love";
    phraseText.setAttribute("fill", "#880e4f");
    svgName1.setAttribute("fill", "#e91e63");
    svgName2.setAttribute("fill", "#e91e63");
    mainBorder.setAttribute("stroke", "#e91e63");
    mainBorder.setAttribute("stroke-dasharray", "0");
    bgColorCard.setAttribute("fill", "#fff0f5");
    ampersand.setAttribute("fill", "#ad1457");

    // ✅ default heading only if empty
    if (!headingInput.value) {
      headdingText.textContent = "Happy Valentine’s Day!";
    }

  } else {
    headdingText.setAttribute("fill", "#047480");
    phraseText.textContent = "Thank you for your amazing friendship!";
    phraseText.setAttribute("fill", "#0097a7");
    svgName1.setAttribute("fill", "#34c2d1");
    svgName2.setAttribute("fill", "#34c2d1");
    mainBorder.setAttribute("stroke", "#00bcd4");
    mainBorder.setAttribute("stroke-dasharray", "15, 10");
    bgColorCard.setAttribute("fill", "#d4f4fc");
    ampersand.setAttribute("fill", "#047480");

    // ✅ default heading only if empty
    if (!headingInput.value) {
      headdingText.textContent = "Best Friends Forever!";
    }
  }
}

themeRadios.forEach(radio =>
  radio.addEventListener("change", updateTheme)
);

// 5. Download (UNCHANGED)
downloadBtn.addEventListener("click", function () {
  const width = 800;
  const height = 1000;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const data = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();

  img.onload = function () {
    ctx.drawImage(img, 0, 0, width, height);
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `card-${name1Input.value || "valentine"}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };
  img.src = url;
});

const bg = document.querySelector(".animated-bg");
const hearts = ["❤", "💖", "💘", "💝"];

for (let i = 0; i < 30; i++) {
  const heart = document.createElement("span");
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  const size = 14 + Math.random() * 26;
  const speed = 12 + Math.random() * 15;

  heart.style.left = Math.random() * 100 + "%";
  heart.style.setProperty("--size", size + "px");
  heart.style.setProperty("--speed", speed + "s");

  bg.appendChild(heart);
}


