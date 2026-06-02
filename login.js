function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("username", user);
    localStorage.setItem("stars", 0); //Kalau mau progress tersimpan:HAPUS baris ini
    localStorage.setItem("progress", JSON.stringify([]));
    window.location.href = "home.html";
  } else {
    alert("Isi username dan password!");
  }
}
