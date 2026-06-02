// ================= INIT =================
document.addEventListener("DOMContentLoaded", function () {
  // USERNAME
  let user = localStorage.getItem("username") || "Pengguna";
  let userDisplayNav = document.getElementById("userDisplayNav");
  if (userDisplayNav) userDisplayNav.innerText = user;

  // PROFILE IMAGE
  let savedImg = localStorage.getItem("profileImage");
  let navImg = document.getElementById("profileImage");
  let preview = document.getElementById("previewImage");

  if (savedImg) {
    if (navImg) navImg.src = savedImg;
    if (preview) preview.src = savedImg;
  }

  // UPLOAD FOTO
  let input = document.getElementById("uploadImage");
  if (input) {
    input.addEventListener("change", function () {
      let file = this.files[0];
      if (!file) return;

      let reader = new FileReader();
      reader.onload = function () {
        if (navImg) navImg.src = reader.result;
        if (preview) preview.src = reader.result;

        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  // DARK MODE LOAD
  let dark = localStorage.getItem("darkMode") === "true";
  if (dark) document.body.classList.add("dark");

  let toggle = document.querySelector(".switch input");
  if (toggle) toggle.checked = dark;

  // OVERLAY CLICK
  let overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.addEventListener("click", closeAll);
  }
});

// ================= LOGOUT =================
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// ================= DARK MODE =================
function toggleDark(el) {
  let isDark;

  if (el) {
    isDark = el.checked;
  } else {
    isDark = !document.body.classList.contains("dark");
  }

  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("darkMode", isDark);
}

// ================= SEARCH =================
function searchData() {
  let keyword = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(keyword) ? "block" : "none";
  });
}

// ================= PROFILE PANEL =================
function toggleProfilePanel(e) {
  e.stopPropagation();

  let panel = document.getElementById("profilePanel");
  let overlay = document.getElementById("overlay");

  if (panel.style.right === "0px") {
    panel.style.right = "-100%";
    overlay.classList.remove("active");
  } else {
    panel.style.right = "0px";
    overlay.classList.add("active");
  }
}

// ================= MENU =================
function toggleMenu(e) {
  e.stopPropagation();

  let nav = document.getElementById("navMenu");
  let overlay = document.getElementById("overlay");

  if (nav.style.right === "0px") {
    nav.style.right = "-100%";
    overlay.classList.remove("active");
  } else {
    nav.style.right = "0px";
    overlay.classList.add("active");
  }
}

// ================= CLICK LUAR =================
document.addEventListener("click", function (e) {
  let panel = document.getElementById("profilePanel");
  let nav = document.getElementById("navMenu");

  if (panel && !panel.contains(e.target) && !e.target.closest(".profile")) {
    panel.style.right = "-100%";
  }

  if (nav && !nav.contains(e.target) && !e.target.closest(".menu-toggle")) {
    nav.style.right = "-100%";
  }
});

// ================= CLOSE SEMUA =================
function closeAll() {
  let panel = document.getElementById("profilePanel");
  let nav = document.getElementById("navMenu");
  let overlay = document.getElementById("overlay");

  if (panel) panel.style.right = "-100%";
  if (nav) nav.style.right = "-100%";
  if (overlay) overlay.classList.remove("active");
}
// ================= LOAD DATA JSON =================
function loadCategory(category) {
  fetch("data/data.json")
    .then((res) => res.json())
    .then((data) => {
      let content = document.getElementById("content");
      if (!content) return;

      content.innerHTML = "";

      data[category].forEach((item) => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
          <img src="${item.gambar}">
          <p>${item.nama}</p>
          <button class="mic-btn">🎤 Ucapkan</button>
        `;

        content.appendChild(div);
      });
    })
    .catch(() => {
      alert("Gagal load data JSON!");
    });
}
