/* ================= NAVIGASI SIDEBAR ================= */
const crumbMap={beranda:'🏠 Beranda',struktur:'🌍 Struktur Bumi',lempeng:'🧩 Lempeng Tektonik',vulkanisme:'🌋 Vulkanisme',endogen:'⛰️ Tenaga Endogen',kuis:'📝 Kuis Interaktif'};
function gotoPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelector(`.nav-item[data-page="${name}"]`).classList.add('active');
  document.getElementById('crumb').textContent=crumbMap[name];
  document.querySelector('.pages').scrollTop=0;
}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>gotoPage(b.dataset.page)));
document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>gotoPage(b.dataset.goto)));

/* ================= SLIDER MATERI CONTROLLER ================= */
function initSliders(){
  document.querySelectorAll('.material-split').forEach(split=>{
    let currentSlide=0;
    const slides=split.querySelectorAll('.slide-item');
    const count=slides.length;
    const counterEl=split.querySelector('.slider-step-count');
    const fillEl=split.querySelector('.slider-stepper-fill');
    const btnPrev=split.querySelector('.btn-prev-slide');
    const btnNext=split.querySelector('.btn-next-slide');
    const mobileBtns=split.closest('.page').querySelectorAll('.mobile-toggle-btn');

    function updateSlide(){
      slides.forEach((s,i)=>{
        const isActive=i===currentSlide;
        s.classList.toggle('active',isActive);
        if(isActive)s.scrollTop=0;
      });
      if(counterEl)counterEl.textContent='Slide '+(currentSlide+1)+' dari '+count;
      if(fillEl)fillEl.style.width=((currentSlide+1)/count*100)+'%';
      if(btnPrev)btnPrev.disabled=currentSlide===0;
      if(btnNext){
        if(currentSlide===count-1){
          btnNext.innerHTML=btnNext.dataset.ctaLabel||'Selesai ✓';
        }else if(currentSlide===0 && btnNext.dataset.firstLabel){
          btnNext.innerHTML=btnNext.dataset.firstLabel;
        }else{
          btnNext.innerHTML='Berikutnya →';
        }
      }
    }

    if(btnPrev){
      btnPrev.addEventListener('click',()=>{
        if(currentSlide>0){currentSlide--;updateSlide();}
      });
    }

    if(btnNext){
      btnNext.addEventListener('click',()=>{
        if(currentSlide<count-1){
          currentSlide++;
          updateSlide();
        }else if(btnNext.dataset.ctaTarget){
          gotoPage(btnNext.dataset.ctaTarget);
        }
      });
    }

    mobileBtns.forEach(btn=>{
      btn.addEventListener('click',()=>{
        mobileBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        split.classList.toggle('show-model',btn.dataset.view==='model');
      });
    });

    updateSlide();
  });
}
initSliders();

/* ================= KUIS ================= */
const quiz=[
 {q:'Berdasarkan metode studi seismik, berapa rentang ketebalan kerak benua?',opts:['5–10 km','30–70 km','100–150 km','2–5 km'],a:1,ex:'Kerak benua memiliki ketebalan 30–70 km, kaya Silika-Aluminium (SiAl), dan tersusun dari batuan granit felsik yang relatif ringan.'},
 {q:'Kerak samudra memiliki karakteristik batuan penyusun yang bersifat...',opts:['Felsik (granit)','Karbonat koral','Mafik (basalt)','Gambut sedimen'],a:2,ex:'Kerak samudra berketebalan 5–10 km, kaya Silika-Magnesium (SiMa), dan didominasi batuan basalt mafik berdensitas tinggi.'},
 {q:'Arus konveksi mantel yang menjadi mesin penggerak lempeng tektonik terjadi pada lapisan...',opts:['Inti dalam padat','Kerak bumi terluar','Inti luar cair','Mantel atas (astenosfer)'],a:3,ex:'Astenosfer adalah lapisan mantel atas yang bersifat plastis/deformabel, tempat mengalirnya arus konveksi termal pemindah lempeng litosfer.'},
 {q:'Perhatikan gambar. Dua lempeng yang saling menjauh dan magma naik membentuk kerak baru termasuk pergerakan...',img:`<svg viewBox="0 0 300 120"><rect y="95" width="300" height="25" fill="#0a2233"/><path d="M150 100 L138 100 C140 80 144 70 150 50 C156 70 160 80 162 100 Z" fill="#e4572e"/><path d="M0 60 L100 60 L118 75 L100 90 L0 90 Z" fill="#2c5a80"/><path d="M300 60 L200 60 L182 75 L200 90 L300 90 Z" fill="#2c5a80"/><path d="M40 25 l25 0 m0 0 l-8 -6 m8 6 l-8 6" stroke="#555" stroke-width="3" fill="none"/><path d="M260 25 l-25 0 m0 0 l8 -6 m-8 6 l8 6" stroke="#555" stroke-width="3" fill="none"/></svg>`,
  opts:['Konvergen','Divergen','Transform','Subduksi'],a:1,ex:'Batas divergen terjadi saat lempeng saling menjauh (seafloor spreading), menghasilkan punggungan tengah samudra seperti Mid-Atlantic Ridge.'},
 {q:"Gunung Kilauea di Hawai'i terkenal dengan aliran lava yang mengalir tenang. Jenis erupsi ini disebut...",opts:['Erupsi eksplosif','Erupsi efusif','Erupsi freatik','Erupsi plinian'],a:1,ex:'Magma basaltik encer bersilika rendah menghasilkan erupsi efusif (leleran lava tenang tanpa ledakan dahsyat).'},
 {q:'Awan panas guguran kubah lava (nuée ardente / wedhus gembel) dari puncak Gunung Merapi merupakan fenomena...',opts:['Tenaga eksogen','Sedimentasi fluviatil','Vulkanisme (tipe Merapi)','Pelapukan kimiawi'],a:2,ex:'Merupakan fenomena vulkanisme tipe Merapi: lava andesitik kental membentuk kubah lava yang tidak stabil lalu runtuh menjadi awan panas guguran.'},
 {q:'Perhatikan potongan kerak berikut. Blok tengah yang turun di antara dua blok yang naik disebut...',img:`<svg viewBox="0 0 300 130"><rect y="105" width="300" height="25" fill="#0a2233"/><path d="M20 60 L100 60 L100 105 L20 105 Z" fill="#6b4a2f"/><path d="M20 40 L100 40 L100 60 L20 60 Z" fill="#4a7c59"/><path d="M120 75 L180 75 L180 105 L120 105 Z" fill="#6b4a2f"/><path d="M120 55 L180 55 L180 75 L120 75 Z" fill="#4a7c59"/><path d="M200 60 L280 60 L280 105 L200 105 Z" fill="#6b4a2f"/><path d="M200 40 L280 40 L280 60 L200 60 Z" fill="#4a7c59"/><text x="120" y="97" fill="#fff" font-size="14" font-weight="800">?</text></svg>`,
  opts:['Horst','Graben (Slank)','Sesar Lembang','Antiklinorium'],a:1,ex:'Blok yang amblas turun di antara dua bidang patahan disebut Graben/Slank (contoh: Ngarai Sianok Bukittinggi); sedangkan blok yang tetap tinggi disebut Horst.'},
 {q:'Gempa Cianjur 2022 dan sesar aktif di Pulau Jawa (Sesar Cimandiri & Sesar Lembang) merupakan manifestasi dari tenaga...',opts:['Eksogen denudasi','Antropogenik murni','Endogen — Tektogenesis (Orogenesa)','Sedimentasi lakustrin'],a:2,ex:'Patahan/sesar aktif bersumber dari dalam bumi akibat tegasan lempeng tektonik, tergolong tenaga endogen konstruktif.'},
 {q:'Penurunan muka tanah (land subsidence) di pesisir Jakarta dan Semarang yang mencapai 5–15 cm/tahun terutama dipercepat oleh...',opts:['Arus konveksi mesosfer','Aktivitas antropogenik: eksploitasi air tanah berlebihan & beban bangunan','Pelapukan eksokarst dolina','Sedimentasi delta laut'],a:1,ex:'Eksploitasi air tanah dalam secara masif, beban infrastruktur fisik perkotaan, dan hilangnya resapan air adalah faktor antropogenik utama.'},
 {q:'Delta Bengawan Solo yang terus bertambah menjorok ke arah laut terbentuk oleh proses...',opts:['Sedimentasi muara (tenaga eksogen)','Tektogenesis orogenik','Vulkanisme eksplosif','Epirogenesa negatif'],a:0,ex:'Pengangkutan dan pengendapan material hasil erosi oleh aliran sungai di muara laut merupakan proses sedimentasi (tenaga eksogen).'},
  {q:'Batuan andesit penyusun Candi Borobudur dan Prambanan tergolong batuan...',opts:['Beku ekstrusif','Sedimen klastik','Metamorf regional','Beku intrusif'],a:0,ex:'Andesit terbentuk dari pembekuan cepat lava andesitik di busur vulkanik, sehingga tergolong batuan beku ekstrusif (vulkanik).'},
  {q:'Marmer dari Campurdarat, Tulungagung, terbentuk dari rekristalisasi batuan...',opts:['Batu pasir','Basalt','Batu bara','Batu gamping'],a:3,ex:'Marmer adalah batuan metamorf hasil rekristalisasi batu gamping oleh tekanan (P) dan temperatur (T) tinggi.'},
  {q:'Sesar naik (reverse/thrust) terbentuk terutama akibat gaya...',opts:['Regangan tensional','Geseran lateral murni','Pelapukan kimia','Kompresi horizontal'],a:3,ex:'Pada sesar naik, hanging wall terdorong naik akibat kompresi horizontal; sesar turun (normal) terjadi akibat regangan.'}
];
let qi=0,score=0;
const qbody=document.getElementById('q-body'),qres=document.getElementById('q-result');
function renderQ(){
  const d=quiz[qi];
  const hasImg=Boolean(d.img);
  qbody.innerHTML=`
    <div class="q-head">
      <div class="q-count">Soal ${qi+1} dari ${quiz.length}</div>
      <div class="q-tag">Evaluasi Litosfer</div>
    </div>
    <div class="q-progress"><i style="width:${((qi+1)/quiz.length)*100}%"></i></div>
    <div class="q-grid ${hasImg?'with-img':''}">
      ${hasImg?`<div class="q-img">${d.img}</div>`:''}
      <div>
        <div class="q-text">${d.q}</div>
        <div class="q-opts">
          ${d.opts.map((o,i)=>`<button class="q-opt" data-i="${i}"><span class="letter">${'ABCD'[i]}</span><span>${o}</span></button>`).join('')}
        </div>
      </div>
    </div>
    <div class="q-fb" id="q-fb"></div>
    <div class="q-actions"><button class="btn btn-magma" id="q-next" style="display:none">${qi===quiz.length-1?'Lihat Hasil 🏆':'Soal Berikutnya →'}</button></div>`;
  qbody.querySelectorAll('.q-opt').forEach(b=>b.addEventListener('click',()=>answer(+b.dataset.i)));
  document.getElementById('q-next').addEventListener('click',()=>{qi++;qi<quiz.length?renderQ():showResult();});
}
function answer(i){
  const d=quiz[qi],fb=document.getElementById('q-fb');
  qbody.querySelectorAll('.q-opt').forEach((b,j)=>{
    b.disabled=true;
    if(j===d.a)b.classList.add('correct');else if(j===i)b.classList.add('wrong');
  });
  const ok=i===d.a;if(ok)score++;
  fb.className='q-fb show '+(ok?'ok':'no');
  fb.innerHTML=(ok?'✔ <b>Benar!</b> ':'✘ <b>Salah.</b> ')+d.ex;
  document.getElementById('q-next').style.display='inline-flex';
}
function showResult(){
  qbody.style.display='none';
  const wrong=quiz.length-score,pct=Math.round(score/quiz.length*100);
  qres.style.display='block';
  qres.innerHTML=`
    <h3 style="font-size:1.5rem;margin-bottom:6px">Kuis Selesai! 🏆</h3>
    <p style="color:#9fb9c8;font-size:1.02rem;margin-bottom:18px">Berikut hasil evaluasi pembelajaranmu</p>
    <div class="score-ring" style="--p:${pct}"><b>${pct}<small>/100</small></b></div>
    <div class="r-stats">
      <div class="ok"><b>${score}</b><span>Benar</span></div>
      <div class="no"><b>${wrong}</b><span>Salah</span></div>
      <div><b>${quiz.length}</b><span>Total Soal</span></div>
    </div>
    <p style="color:#c8d8e2;font-size:1.02rem;line-height:1.6;margin-bottom:22px">${pct>=80?'Luar biasa! Kamu sudah menguasai dinamika litosfer. 🌋':pct>=60?'Bagus! Pelajari kembali bagian yang masih keliru ya.':'Ayo pelajari kembali materinya, lalu coba lagi!'}</p>
    <button class="btn btn-magma" onclick="resetQuiz()">↻ Ulangi Kuis</button>`;
}
function resetQuiz(){qi=0;score=0;qres.style.display='none';qbody.style.display='block';renderQ();}
renderQ();

/* ================= PRELOADER LOGIC ================= */
(function(){
  const pre=document.getElementById('preloader');
  const bar=document.getElementById('pre-bar');
  const status=document.getElementById('pre-status');
  if(!pre||!bar)return;

  let progress=0;
  const statusMessages=[
    'Menyiapkan media interaktif...',
    'Memuat visualisasi 3D bumi...',
    'Menyusun materi geografi...',
    'Siap untuk belajar!'
  ];

  const timer=setInterval(()=>{
    progress+=Math.floor(Math.random()*18)+12;
    if(progress>100)progress=100;
    bar.style.width=progress+'%';

    if(progress>=30&&progress<65&&status)status.textContent=statusMessages[1];
    else if(progress>=65&&progress<95&&status)status.textContent=statusMessages[2];
    else if(progress>=95&&status)status.textContent=statusMessages[3];

    if(progress>=100){
      clearInterval(timer);
      setTimeout(()=>{
        pre.classList.add('fade-out');
        setTimeout(()=>pre.remove(),600);
      },400);
    }
  },110);

  // Fallback safeguard (maksimal 2.8 detik)
  setTimeout(()=>{
    if(pre&&!pre.classList.contains('fade-out')){
      bar.style.width='100%';
      pre.classList.add('fade-out');
      setTimeout(()=>pre.remove(),600);
    }
  },2800);
})();

/* ================= REFERENSI LITERATUR ================= */
(function(){
  const refs=document.getElementById('refs');
  const open=document.getElementById('btn-refs');
  if(!refs||!open)return;
  open.addEventListener('click',()=>refs.showModal());
  refs.querySelector('.refs-close').addEventListener('click',()=>refs.close());
  refs.addEventListener('click',e=>{if(e.target===refs)refs.close();});
})();

// Global window bindings
window.gotoPage = gotoPage;
window.resetQuiz = resetQuiz;
