/* ===== DATA EKSTRAKURIKULER ===== */
const ekskulData = [
  { nama: "Paskibra",  ikon: "🚩", warna: "#d62828", info: "Melatih baris-berbaris, disiplin, dan menjadi petugas upacara bendera.", jadwal: "Sabtu, 07.30" },
  { nama: "Pramuka",   ikon: "⛺", warna: "#8d6e3f", info: "Belajar kemandirian, kepemimpinan, dan keterampilan alam lewat kegiatan kemah.", jadwal: "Jumat, 13.00" },
  { nama: "PMR",       ikon: "➕", warna: "#e63946", info: "Belajar pertolongan pertama dan kesehatan, serta siaga membantu saat ada kejadian.", jadwal: "Rabu, 15.30" },
  { nama: "Jepang",     ikon: "🎌", warna: "#d90429", info: "Mempelajari bahasa, budaya, dan seni Jepang seperti anime, kaligrafi, dan origami.", jadwal: "Kamis, 15.30" },
  { nama: "Silat",     ikon: "🥋", warna: "#5a189a", info: "Seni bela diri untuk melatih fisik, mental, dan sportivitas. Terbuka untuk ikut kejuaraan.", jadwal: "Kamis, 16.00" },
  { nama: "Foster",    ikon: "🗣️", warna: "#0077b6", info: "Wadah belajar bahasa Inggris lewat debat, speech, dan permainan bahasa.", jadwal: "Selasa, 15.30" },
  { nama: "Voli",      ikon: "🏐", warna: "#f77f00", info: "Latihan servis, smash, dan strategi tim untuk mengikuti turnamen antar sekolah.", jadwal: "Rabu, 15.30" },
  { nama: "Futsal",    ikon: "⚽", warna: "#2a9d8f", info: "Mengasah teknik dan kerja sama tim lewat latihan rutin dan pertandingan persahabatan.", jadwal: "Rabu, 15.30" },
  { nama: "Jurnalis",  ikon: "📰", warna: "#264653", info: "Belajar menulis berita, memotret, dan mengelola mading serta media sosial sekolah.", jadwal: "Rabu, 15.30" },
  { nama: "MTQ",       ikon: "📖", warna: "#2d6a4f", info: "Melatih tilawah, tahfidz, dan seni baca Al-Qur'an untuk persiapan lomba.", jadwal: "Selasa, 15.30" },
  { nama: "Rebana",    ikon: "🥁", warna: "#9c6644", info: "Seni musik hadrah dan rebana dengan lantunan sholawat di berbagai acara sekolah.", jadwal: "Selasa, 15.30" },
  { nama: "Rohis",     ikon: "🕌", warna: "#1b998b", info: "Kajian keislaman, kegiatan sosial, dan pembinaan akhlak bersama teman sebaya.", jadwal: "Selasa, 15.30" },
  { nama: "Padus",     ikon: "🎤", warna: "#c9184a", info: "Paduan suara untuk melatih vokal, harmonisasi, dan tampil di upacara serta pentas seni.", jadwal: "Senin, 15.30" },
  { nama: "Drumband",  ikon: "🎺", warna: "#3a0ca3", info: "Memainkan alat musik marching band dan atraksi kostum di berbagai parade.", jadwal: "Selasa, 15.30" },
  { nama: "Tari",      ikon: "💃", warna: "#e5989b", info: "Belajar tari tradisional dan modern, serta tampil di pentas seni dan festival budaya.", jadwal: "Selasa, 15.30" }
];

const daftarEkskul = document.getElementById("daftarEkskul");
const ekskul = document.getElementById("ekskul");

// Buat kartu info ekskul dan isi opsi dropdown dari satu sumber data
ekskulData.forEach((e) => {
  const kartu = document.createElement("article");
  kartu.className = "item";
  kartu.style.setProperty("--c", e.warna);
  kartu.innerHTML =
    `<span class="ico">${e.ikon}</span><h3>${e.nama}</h3><p>${e.info}</p>` +
    `<div class="jadwal">Jadwal: ${e.jadwal}</div><button type="button">Daftar ekskul ini</button>`;
  kartu.querySelector("button").addEventListener("click", () => {
    ekskul.value = e.nama;
    cekEkskul();
    document.getElementById("daftar").scrollIntoView();
  });
  daftarEkskul.appendChild(kartu);

  const opt = document.createElement("option");
  opt.value = opt.textContent = e.nama;
  ekskul.appendChild(opt);
});

/* ===== SLIDER ===== */
const slides = document.querySelectorAll(".slide");
const dotsBox = document.getElementById("dots");
let idx = 0, timer;

slides.forEach((_, i) => {
  const d = document.createElement("button");
  d.setAttribute("aria-label", "Slide " + (i + 1));
  d.addEventListener("click", () => { tampil(i); mulaiAuto(); });
  dotsBox.appendChild(d);
});

function tampil(i) {
  idx = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle("active", n === idx));
  dotsBox.querySelectorAll("button").forEach((d, n) => d.classList.toggle("on", n === idx));
}
function mulaiAuto() {
  clearInterval(timer);
  timer = setInterval(() => tampil(idx + 1), 5000);
}
document.getElementById("prev").addEventListener("click", () => { tampil(idx - 1); mulaiAuto(); });
document.getElementById("next").addEventListener("click", () => { tampil(idx + 1); mulaiAuto(); });
tampil(0);
mulaiAuto();

/* ===== VALIDASI FORM ===== */
const form = document.getElementById("formDaftar");
const pesanSukses = document.getElementById("pesanSukses");
const nama = document.getElementById("nama");
const email = document.getElementById("email");
const password = document.getElementById("password");
const konfirmasi = document.getElementById("konfirmasi");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setStatus(input, pesan) {
  const errorEl = document.getElementById(input.id + "Error");
  if (pesan) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    errorEl.textContent = pesan;
    return false;
  }
  input.classList.add("valid");
  input.classList.remove("invalid");
  errorEl.textContent = "";
  return true;
}
function cekNama() {
  const v = nama.value.trim();
  if (v === "") return setStatus(nama, "Nama lengkap wajib diisi.");
  if (v.length < 3) return setStatus(nama, "Nama minimal 3 karakter.");
  return setStatus(nama, "");
}
function cekEmail() {
  const v = email.value.trim();
  if (v === "") return setStatus(email, "Email wajib diisi.");
  if (!emailRegex.test(v)) return setStatus(email, "Format email tidak valid (contoh: nama@email.com).");
  return setStatus(email, "");
}
function cekPassword() {
  const v = password.value;
  if (v === "") return setStatus(password, "Password wajib diisi.");
  if (v.length < 8) return setStatus(password, "Password minimal 8 karakter.");
  return setStatus(password, "");
}
function cekKonfirmasi() {
  const v = konfirmasi.value;
  if (v === "") return setStatus(konfirmasi, "Konfirmasi password wajib diisi.");
  if (v !== password.value) return setStatus(konfirmasi, "Konfirmasi password tidak sama dengan password.");
  return setStatus(konfirmasi, "");
}
function cekEkskul() {
  if (ekskul.value === "") return setStatus(ekskul, "Pilih salah satu ekstrakurikuler.");
  return setStatus(ekskul, "");
}

nama.addEventListener("input", cekNama);
email.addEventListener("input", cekEmail);
password.addEventListener("input", () => { cekPassword(); if (konfirmasi.value !== "") cekKonfirmasi(); });
konfirmasi.addEventListener("input", cekKonfirmasi);
ekskul.addEventListener("change", cekEkskul);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  pesanSukses.textContent = "";
  const hasil = [cekNama(), cekEmail(), cekPassword(), cekKonfirmasi(), cekEkskul()];
  if (hasil.every(Boolean)) {
    pesanSukses.textContent = "Pendaftaran berhasil! Selamat bergabung di " + ekskul.value + ", " + nama.value.trim() + ".";
    alert("Pendaftaran Berhasil!");
    form.reset();
    document.querySelectorAll(".valid").forEach((el) => el.classList.remove("valid"));
  }
});