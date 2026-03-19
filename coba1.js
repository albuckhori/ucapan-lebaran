// PESAN LEBARAN
const messageText = `🌙✨ *Selamat Hari Raya Idul Fitri 1447 H* ✨🌙

Di hari yang suci ini,
saya Ananda al buckhori dan keluarga
maaf atas segala khilaf dan salah
Baik yang disengaja maupun tidak terucap.

Semoga amal ibadah kita diterima Allah SWT,
dan kita semua kembali fitri,
suci seperti bayi yang baru lahir.

✨ *Taqabbalallahu minna wa minkum* ✨
Semoga kita semua diberkahi kebahagiaan
di dunia dan akhirat.

*Mohon Maaf Lahir & Batin* ❤️`;

// ============================================
// SOUND (GANTI DENGAN FILE KAMU)
// ============================================
const backgroundSound = new Audio();
backgroundSound.loop = true;
backgroundSound.volume = 0.8;
backgroundSound.src = "takbiran.mp3"; // <-- GANTI DENGAN NAMA FILE SOUND KAMU

const buttonSound = new Audio();
buttonSound.volume = 0.3;
buttonSound.src = "fassounds-eid-mubarak-arabic-ramadan-background-music-301947.mp3";

// ============================================
// FUNGSI-FUNGSI
// ============================================

function openPage() {
  document.getElementById("opening").classList.add("hidden");
  document.getElementById("main").classList.remove("hidden");
  
  buttonSound.play().catch(() => {});
  
  backgroundSound.pause();
  backgroundSound.currentTime = 0;
  
  backgroundSound.play()
    .then(() => console.log("Sound berhasil diputar!"))
    .catch(e => {
      console.log("Autoplay diblokir:", e);
      document.body.addEventListener('click', function playNow() {
        backgroundSound.play();
        document.body.removeEventListener('click', playNow);
      }, { once: true });
    });
  
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("to");
  
  if (name) {
    document.getElementById("greeting").innerText = "🌺 Untuk " + name + " 🌺";
  } else {
    document.getElementById("greeting").innerText = "🌺 Untuk Keluarga & Sahabat 🌺";
  }
  
  typeMessage();
}

function goBack() {
  document.getElementById("main").classList.add("hidden");
  document.getElementById("opening").classList.remove("hidden");
  backgroundSound.pause();
  backgroundSound.currentTime = 0;
}

function typeMessage() {
  let i = 0;
  const msgElement = document.getElementById("message");
  msgElement.innerHTML = "";
  
  function typing() {
    if (i < messageText.length) {
      if (messageText.charAt(i) === '\n') {
        msgElement.innerHTML += '<br>';
      } else {
        msgElement.innerHTML += messageText.charAt(i);
      }
      i++;
      setTimeout(typing, 30);
    } else {
      msgElement.innerHTML += '<br><br>';
    }
  }
  
  typing();
}

function shareWA() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("to") || "Sahabat";
  
  const text = `Halo ${name}!%0A%0A🌙 *Selamat Idul Fitri 1447 H* 🌙%0A%0AMohon maaf lahir dan batin ya.%0ASemoga kita semua diberkahi kebahagiaan.%0A%0A_Taqabbalallahu minna wa minkum_ ✨%0A%0A--%0A[Dari seseorang yang selalu mendoakanmu] ❤️`;
  
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

window.onload = function() {
  if (window.location.hash === '#buka') {
    setTimeout(openPage, 500);
  }
};