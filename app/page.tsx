"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, RotateCcw } from "lucide-react";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

const NiaLoveWebsite = () => {
  const [stage, setStage] = useState("loading");
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [openedCards, setOpenedCards] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Melodi untuk setiap emosi
  const melodyByEmotion = {
    bahagia: [
      { freq: 392.0, dur: 0.3 }, // G
      { freq: 493.88, dur: 0.3 }, // B
      { freq: 587.33, dur: 0.3 }, // D
      { freq: 659.25, dur: 0.4 }, // E
      { freq: 587.33, dur: 0.3 }, // D
      { freq: 523.25, dur: 0.3 }, // C
      { freq: 587.33, dur: 0.5 }, // D
    ],
    sedih: [
      { freq: 261.63, dur: 0.8 }, // C
      { freq: 246.94, dur: 0.8 }, // B
      { freq: 220.0, dur: 1.0 }, // A
      { freq: 196.0, dur: 0.6 }, // G
      { freq: 220.0, dur: 1.0 }, // A
      { freq: 246.94, dur: 0.8 }, // B
    ],
    marah: [
      { freq: 329.63, dur: 0.2 }, // E
      { freq: 392.0, dur: 0.2 }, // G
      { freq: 329.63, dur: 0.2 }, // E
      { freq: 440.0, dur: 0.3 }, // A
      { freq: 329.63, dur: 0.2 }, // E
      { freq: 392.0, dur: 0.4 }, // G
    ],
    capek: [
      { freq: 261.63, dur: 1.0 }, // C
      { freq: 293.66, dur: 1.0 }, // D
      { freq: 329.63, dur: 1.2 }, // E
      { freq: 293.66, dur: 1.0 }, // D
      { freq: 261.63, dur: 1.0 }, // C
    ],
    motivasi: [
      { freq: 329.63, dur: 0.4 }, // E
      { freq: 392.0, dur: 0.4 }, // G
      { freq: 523.25, dur: 0.5 }, // C
      { freq: 587.33, dur: 0.6 }, // D
      { freq: 659.25, dur: 0.8 }, // E
      { freq: 587.33, dur: 0.4 }, // D
      { freq: 523.25, dur: 0.5 }, // C
    ],
    badmood: [
      { freq: 277.18, dur: 0.9 }, // Cs
      { freq: 261.63, dur: 0.9 }, // C
      { freq: 246.94, dur: 1.0 }, // B
      { freq: 261.63, dur: 0.9 }, // C
      { freq: 277.18, dur: 1.0 }, // Cs
    ],
  };

  // Play music based on emotion
  useEffect(() => {
    if (!selectedEmotion) return;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    let isPlaying = true;
    let noteIndex = 0;

    const playNote = (frequency, duration) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.frequency.value = frequency;
      osc.type = selectedEmotion === "marah" ? "square" : "sine";

      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration
      );

      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + duration);
    };

    const playMelody = () => {
      if (!isPlaying) return;

      const melody = melodyByEmotion[selectedEmotion];
      const note = melody[noteIndex % melody.length];

      playNote(note.freq, note.dur);
      noteIndex++;

      setTimeout(() => {
        if (isPlaying) playMelody();
      }, note.dur * 1000);
    };

    playMelody();

    return () => {
      isPlaying = false;
    };
  }, [selectedEmotion]);

  const emotions = {
    bahagia: {
      color: "from-blue-300 to-cyan-200",
      dark: "bg-blue-400",
      text: "text-blue-900",
      flower: "🌼",
    },
    sedih: {
      color: "from-purple-300 to-indigo-200",
      dark: "bg-purple-400",
      text: "text-purple-900",
      flower: "🌺",
    },
    marah: {
      color: "from-red-300 to-orange-200",
      dark: "bg-red-400",
      text: "text-red-900",
      flower: "🌹",
    },
    capek: {
      color: "from-yellow-300 to-amber-200",
      dark: "bg-yellow-400",
      text: "text-yellow-900",
      flower: "🌻",
    },
    motivasi: {
      color: "from-green-300 to-emerald-200",
      dark: "bg-green-400",
      text: "text-green-900",
      flower: "🌸",
    },
    badmood: {
      color: "from-gray-400 to-slate-300",
      dark: "bg-gray-500",
      text: "text-gray-900",
      flower: "🌷",
    },
  };

  const handleSelectEmotion = (emotion) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedEmotion(emotion);
      setIsTransitioning(false);
    }, 1200);
  };

  const handleBackHome = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedEmotion(null);
      setCurrentPage(0);
      setIsTransitioning(false);
    }, 1200);
  };

  const messages = {
    bahagia: [
      "Senyummu adalah alasan aku bahagia setiap hari 💫",
      "Terus bersinar seperti itu, dunia membutuhkan cahayamu",
      "Aku bangga melihatmu bahagia seperti ini",
      "Kebahagiaan yang kau rasakan adalah keindahan terbesar",
      "Semoga bahagia ini selalu menemani harimu",
      "Kau paling cantik ketika tersenyum sebahagia ini",
      "Aku ingin melihat senyum itu setiap hari",
      "Bahagiamu adalah bahagiaku juga",
      "Terima kasih sudah membawa kegembiraan ke hidupku",
      "Kau adalah alasan terbaik untuk tersenyum",
      "Nikmati setiap momen indah ini, kau layak",
      "Kebahagiaanmu menginspirasi aku",
      "Aku cinta melihat cahaya di matamu",
      "Teruskan menari dalam kebahagiaan ini, sayang",
      "Kau membuat segala sesuatu lebih berwarna",
      "Bahagia itu terlihat cantik di dirimu",
      "Aku akan selalu ada untuk menjaga bahagiamu",
      "Kau istimewa dan patut dibahagiakan",
      "Mari ciptakan lebih banyak momen bahagia bersama",
      "Kau adalah kebahagiaan yang nyata bagiku",

      "Melihatmu bahagia membuat hatiku tenang",
      "Tawamu adalah musik favoritku",
      "Setiap senyummu membawa kedamaian",
      "Hari terasa sempurna saat kau bahagia",
      "Bahagiamu memberi harapan baru",
      "Aku bersyukur bisa menyaksikan senyummu",
      "Kau pantas mendapatkan semua kebahagiaan ini",
      "Kebahagiaanmu memancarkan kehangatan",
      "Aku jatuh cinta pada senyummu lagi dan lagi",
      "Tak ada yang lebih indah dari melihatmu bahagia",
      "Senyummu membuat dunia terasa lebih ringan",
      "Bahagia bersamamu adalah anugerah",
      "Aku ingin menjadi bagian dari bahagiamu",
      "Kau membuat hari biasa terasa istimewa",
      "Melihatmu tertawa adalah kebahagiaanku",
      "Kau membawa sinar ke hari-hariku",
      "Bahagia bersamamu adalah impianku",
      "Aku senang melihatmu menikmati hidup",
      "Senyummu menyembuhkan lelahku",
      "Kau membuat hatiku penuh rasa syukur",

      "Setiap kebahagiaanmu berarti besar bagiku",
      "Aku ingin menjaga senyum itu selamanya",
      "Bahagia di wajahmu adalah pemandangan terbaik",
      "Kau layak merasakan bahagia tanpa batas",
      "Aku bahagia hanya dengan melihatmu tersenyum",
      "Kau membuat kebahagiaan terasa sederhana",
      "Hatiku hangat melihat senyummu",
      "Bahagia itu terasa lebih nyata bersamamu",
      "Aku ingin menjadi alasan senyummu",
      "Kau membawa kebahagiaan ke setiap sudut hidupku",
      "Melihatmu bahagia membuat segalanya terasa cukup",
      "Senyummu adalah hadiah terindah",
      "Aku jatuh cinta pada caramu bahagia",
      "Kau membuat kebahagiaan terasa mudah",
      "Bahagiamu memberi arti pada hariku",
      "Aku ingin berbagi tawa dan bahagia denganmu",
      "Kau adalah sumber kebahagiaanku",
      "Melihatmu bahagia membuatku ingin lebih baik",
      "Senyummu adalah alasan aku bertahan",
      "Bahagia bersamamu adalah tujuan hatiku",
    ],
    sedih: [
      "Boleh menangis, itu tanda hatimu masih hidup",
      "Aku di sini untuk menemanimu dalam kesedihan ini",
      "Air matamu tidak sia-sia, aku mengerti",
      "Kau tidak sendirian dalam kesendirian ini",
      "Kesedihan ini akan berlalu, seperti semua hal indah",
      "Aku ingin memelukmu dan mengatakan semuanya akan baik",
      "Kau kuat, bahkan di saat-saat terlemahmu",
      "Izinkan dirimu berduka, itu bagian dari penyembuhan",
      "Aku mencintaimu, terutama di saat-saat seperti ini",
      "Sedihmu juga valid dan penting",
      "Jangan menyimpan semuanya sendiri, ceritakan padaku",
      "Dalam setiap kegelapan, ada cahaya di ujung terowongan",
      "Kau lebih kuat dari yang kau kira",
      "Aku bangga dengan keberanian hatimu",
      "Mari lewati ini bersama, langkah demi langkah",
      "Kau akan tersenyum lagi, aku janji",
      "Hatiku ada untuk dirimu kapan saja",
      "Kesedihan ini tidak mendefinisikan siapa dirimu",
      "Kau layak mendapatkan ketenangan dan kedamaian",
      "Aku akan menjadi kekuatanmu sampai kamu menemukan milikmu",

      "Tidak apa-apa merasa lelah hari ini",
      "Aku tahu hatimu sedang berat, dan itu wajar",
      "Kesedihanmu tidak membuatmu lemah",
      "Aku tetap di sini, meski kau hanya ingin diam",
      "Menangislah jika itu yang hatimu butuhkan",
      "Aku mendengarkan, tanpa menghakimi",
      "Hari ini mungkin gelap, tapi kau tidak sendirian",
      "Aku tahu ini menyakitkan, dan aku peduli",
      "Tak apa jika kau belum kuat hari ini",
      "Kau tidak perlu berpura-pura baik-baik saja",
      "Hatimu berhak merasa sedih",
      "Aku akan duduk di sisimu selama yang kau butuhkan",
      "Kesedihan ini hanyalah satu bab, bukan akhir cerita",
      "Kau tetap berharga meski sedang hancur",
      "Aku di sini, bahkan saat kata-kata tak cukup",
      "Tidak semua luka harus disembunyikan",
      "Aku percaya kau akan bangkit, pelan-pelan",
      "Hatimu layak diperlakukan dengan lembut",
      "Aku memegang harapan saat kau kehilangannya",
      "Kau tidak sendirian menghadapi rasa ini",

      "Beri waktu pada hatimu untuk bernapas",
      "Aku tidak akan pergi meski kau sedang rapuh",
      "Kesedihan ini tidak menghapus cahaya dalam dirimu",
      "Aku tahu ini berat, dan itu tidak apa-apa",
      "Diam pun tak apa, aku tetap di sini",
      "Hatimu sedang belajar bertahan",
      "Aku akan menemani malam-malam terberatmu",
      "Kau boleh istirahat dari dunia sejenak",
      "Aku mengerti jika hari ini terasa terlalu berat",
      "Tak apa jika kau belum bisa tersenyum",
      "Aku di sini untuk memeluk lukamu",
      "Kesedihan ini bukan kelemahan",
      "Kau pantas dicintai, bahkan saat sedih",
      "Aku tetap memilihmu, dalam keadaan apa pun",
      "Hatimu akan menemukan damainya lagi",
      "Aku akan menjaga harapan itu untukmu",
      "Pelan-pelan saja, tidak perlu terburu-buru",
      "Kau tidak rusak, kau hanya terluka",
      "Aku percaya pada proses penyembuhanmu",
      "Aku bersamamu, hari ini dan seterusnya",
    ],
    marah: [
      "Kemarahanmu adalah hak, jangan menekan itu",
      "Kau boleh kesal, itu respons yang natural",
      "Aku mendengar, aku memahami, aku di sini",
      "Ledakkan semuanya jika perlu, aku akan mendengarkan",
      "Kemarahanmu penting, suaramu penting",
      "Tidak ada yang salah dengan merasa marah",
      "Mari cari solusi bersama-sama",
      "Aku bersamamu bahkan saat kau kesal",
      "Kau berhak untuk membela diri dan perasaanmu",
      "Kehangatan hatimu akan melebihi kemarahan ini",
      "Ini juga akan berlalu, dan aku akan tetap di sini",
      "Kemarahanmu tidak membuatku berhenti mencintaimu",
      "Mari bicara, aku siap mendengarkan",
      "Kau layak untuk diperlakukan dengan baik",
      "Kesan pertamamu tentang situasi ini bisa berubah",
      "Aku percaya pada kebijaksanaan hatimu",
      "Kita bisa melewati ini dengan kepala tegak",
      "Kemarahanmu menunjukkan kau peduli",
      "Ambil napas, aku di sini untuk mendukungmu",
      "Kau lebih besar dari kemarahan ini",

      "Tak apa jika hatimu sedang panas",
      "Aku tidak takut pada emosimu",
      "Kemarahan ini tidak membuatmu buruk",
      "Aku di sini untuk mendengarkan, bukan menghakimi",
      "Luapkan saja, aku tetap tinggal",
      "Perasaanmu valid, sepenuhnya",
      "Kau berhak merasa tidak adil",
      "Aku tahu ini menyebalkan, dan itu wajar",
      "Kemarahan ini punya alasan",
      "Aku ingin mengerti dari sudut pandangmu",
      "Tak apa jika suaramu bergetar",
      "Aku akan mendengar sampai selesai",
      "Kemarahan ini bukan musuhmu",
      "Hatimu sedang melindungi diri",
      "Aku bersamamu di tengah emosi ini",
      "Kau tidak berlebihan dengan perasaanmu",
      "Aku tidak akan meninggalkanmu karena ini",
      "Kemarahan ini tidak menghapus kebaikanmu",
      "Aku percaya kau bisa mengelolanya",
      "Aku tetap melihatmu dengan penuh hormat",

      "Tarik napas perlahan, aku menemanimu",
      "Tak apa jika kau butuh waktu",
      "Kemarahan ini bisa jadi awal kejelasan",
      "Aku ada di sisimu, bukan melawanmu",
      "Kau boleh marah tanpa harus terluka",
      "Aku ingin memahami, bukan memenangkan argumen",
      "Kemarahan ini akan menemukan jalannya keluar",
      "Hatimu pantas didengar",
      "Aku percaya pada kekuatan kendalimu",
      "Tak apa jika dunia terasa tidak adil sekarang",
      "Aku akan tetap lembut padamu",
      "Kemarahan ini tidak mendefinisikan dirimu",
      "Aku bersedia menunggu sampai kau tenang",
      "Kau tetap berharga, bahkan saat marah",
      "Aku tidak pergi hanya karena emosi ini",
      "Kemarahan ini bisa berubah jadi kejelasan",
      "Aku di sini untuk meredakan, bukan memadamkanmu",
      "Kau tidak sendirian menghadapi rasa ini",
      "Aku menghormati batasanmu",
      "Kita akan bicara lagi saat hatimu siap",
    ],
    capek: [
      "Kelelahanmu adalah bukti kerja kerasmu",
      "Boleh istirahat, dunia bisa menunggu",
      "Kau sudah cukup untuk hari ini",
      "Mari rebah dan biarkan aku mengurus segalanya",
      "Tidak ada yang salah dengan merasa capek",
      "Tubuhmu meminta istirahat, dengarkan itu",
      "Kau tidak perlu sempurna, terutama sekarang",
      "Tidur yang nyenyak adalah hadiah terbaik untuk dirimu",
      "Aku akan memastikanmu bisa beristirahat dengan tenang",
      "Kelelahanmu adalah kesempatan untuk reset",
      "Kau sudah melakukan cukup, aku bangga",
      "Mari ciptakan ruang tenang hanya untukmu",
      "Energimu akan kembali, percayakan pada waktu",
      "Jangan dorong diri sendiri terlalu keras",
      "Istirahat adalah bentuk self-love",
      "Kau berhak mendapatkan kedamaian dan keheningan",
      "Mari buat hari ini tentang pemulihan",
      "Kelelahan ini adalah sinyal untuk bergerak lebih lambat",
      "Aku akan menjagamu sementara kau beristirahat",
      "Setiap momen istirahat membawamu lebih dekat pada kesehatan",

      "Tak apa jika hari ini terasa berat",
      "Kau tidak malas, kau hanya lelah",
      "Istirahat bukan berarti menyerah",
      "Tubuh dan hatimu butuh jeda",
      "Aku tahu kau sudah berusaha sekuat tenaga",
      "Boleh berhenti sebentar tanpa rasa bersalah",
      "Kau tidak harus menyelesaikan semuanya hari ini",
      "Pelan-pelan saja, tidak perlu terburu-buru",
      "Aku di sini agar kau bisa bernapas lega",
      "Tak apa jika produktivitasmu menurun hari ini",
      "Kau tetap berharga meski sedang lelah",
      "Mari letakkan beban itu sebentar",
      "Hatimu pantas diperlakukan dengan lembut",
      "Kau boleh memprioritaskan dirimu sendiri",
      "Aku akan menemanimu dalam diam",
      "Hari ini cukup sampai di sini",
      "Kau tidak sendirian menanggung lelah ini",
      "Biarkan tubuhmu memulihkan diri",
      "Aku bangga pada ketahananmu",
      "Kau layak mendapatkan istirahat tanpa alasan",

      "Pejamkan mata, lepaskan hari ini",
      "Tak apa jika kau belum kuat besok",
      "Istirahat adalah bagian dari perjalanan",
      "Kau sudah berlari cukup jauh",
      "Berhenti sejenak bukan kegagalan",
      "Aku akan menahan dunia sebentar untukmu",
      "Kau boleh mengurangi ritme hidupmu",
      "Kelelahan ini tidak mendefinisikan dirimu",
      "Tubuhmu tahu apa yang dibutuhkan",
      "Aku percaya kau akan pulih",
      "Tak apa jika kau hanya ingin diam",
      "Hari ini tentang merawat diri",
      "Kau tidak harus selalu kuat",
      "Biarkan aku menjadi sandaranmu",
      "Energi akan kembali saat waktunya tepat",
      "Kau sudah cukup berjuang",
      "Istirahat ini adalah hadiah yang pantas",
      "Aku di sini sampai kau merasa lebih baik",
      "Kau boleh mematikan dunia sejenak",
      "Besok adalah hari baru, setelah kau beristirahat",
    ],
    motivasi: [
      "Kau lebih kuat dari semua tantangan di hadapanmu",
      "Bermimpi besar dan berani meraihnya, aku percaya padamu",
      "Setiap langkah kecil adalah kemenangan besar",
      "Kau tidak perlu sempurna untuk memulai",
      "Aku bangga dengan keberanian dan komitmenmu",
      "Tidak ada yang mustahil untuk hati yang sungguh-sungguh",
      "Kegagalan adalah guru terbaik, bukan akhir",
      "Kau memiliki potensi yang tak terbatas",
      "Masa depan sangat cerah, percayakan padaku",
      "Setiap hari adalah kesempatan baru untuk bersinar",
      "Jangan berhenti, kau hampir sampai ke sana",
      "Kau adalah inspirasi bagiku setiap hari",
      "Keputusanmu hari ini membentuk masa depanmu",
      "Aku akan mendukungmu dalam setiap langkah",
      "Besar atau kecil, setiap upaya berarti",
      "Kau memiliki apa yang diperlukan untuk berhasil",
      "Percayakan pada proses, percayakan pada dirimu",
      "Kemenangan menanti mereka yang berani mencoba",
      "Aku percaya pada versi terbaik darimu",
      "Kau akan mencapai semua yang kau impikan",

      "Terus maju meski perlahan",
      "Setiap usaha hari ini membawa dampak esok hari",
      "Kau sedang tumbuh, bahkan saat terasa sulit",
      "Keberanianmu lebih besar dari rasa takutmu",
      "Langkahmu hari ini lebih berarti dari kemarin",
      "Jangan ragu pada kemampuanmu sendiri",
      "Kau diciptakan untuk hal-hal besar",
      "Fokus pada kemajuan, bukan kesempurnaan",
      "Kau sudah melangkah sejauh ini, lanjutkan",
      "Usahamu tidak akan mengkhianati hasil",
      "Percaya diri adalah kekuatan terbesarmu",
      "Kau layak meraih impianmu",
      "Hari ini adalah kesempatan untuk menjadi lebih baik",
      "Ketekunanmu akan membuahkan hasil",
      "Kau punya alasan untuk terus berjuang",
      "Jangan bandingkan perjalananmu dengan orang lain",
      "Kau sedang berada di jalur yang tepat",
      "Setiap tantangan membentuk dirimu",
      "Tetap berdiri meski dunia meragukanmu",
      "Kau mampu melampaui batasmu",

      "Keberhasilan dimulai dari keberanian mencoba",
      "Jangan biarkan keraguan menghentikanmu",
      "Potensimu lebih besar dari yang kau sadari",
      "Kau pantas meraih kemenanganmu sendiri",
      "Teruslah bergerak, sekecil apa pun",
      "Keyakinanmu adalah bahan bakar terkuat",
      "Kau tidak terlambat, ini waktumu",
      "Mimpi itu valid dan layak diperjuangkan",
      "Setiap hari kau menjadi versi yang lebih kuat",
      "Kau punya kendali atas langkahmu",
      "Kesabaranmu sedang diuji, bukan sia-sia",
      "Terus berusaha, hasil akan mengikuti",
      "Kau punya cahaya yang tak bisa dipadamkan",
      "Konsistensi kecil menghasilkan perubahan besar",
      "Kau lebih dekat dari yang kau kira",
      "Kepercayaan pada diri sendiri mengubah segalanya",
      "Jangan berhenti saat lelah, berhentilah saat selesai",
      "Kau mampu bangkit berkali-kali",
      "Hari ini kau memilih untuk tidak menyerah",
      "Aku percaya, kau akan sampai di sana",
    ],
    badmood: [
      "Hari buruk ini tidak mendefinisikan harimu besok",
      "Boleh merasa off, itu wajar terjadi",
      "Aku di sini, sekalipun suasanamu tidak bagus",
      "Hal buruk ini akan berlalu, percayakan padaku",
      "Tidak perlu tersenyum jika kau tidak ingin",
      "Moodmu didengar, dimengerti, dan dihargai",
      "Mari buat sesuatu yang kecil untuk membaik sedikit",
      "Aku tidak akan pergi, aku tetap di sini",
      "Bad mood hari ini bukan refleksi dari siapa dirimu",
      "Izinkan dirimu untuk tidak dalam kondisi terbaik",
      "Segera akan lebih baik, aku yakin itu",
      "Mari lewati ini dengan lembut dan sabar",
      "Kau masih berharga, bahkan di saat seperti ini",
      "Aku cinta dirimu dalam setiap state emosi",
      "Kadang kita semua memiliki hari buruk",
      "Mari fokus pada hal-hal kecil yang menenangkan",
      "Perlu bantuan? Aku siap mendengarkan",
      "Mood buruk ini akan teratasi",
      "Kau lebih dari bad mood hari ini",
      "Besok adalah hari baru penuh dengan kemungkinan",

      "Tak apa jika hari ini terasa berat",
      "Kau tidak harus baik-baik saja sekarang",
      "Aku tetap memilih ada di sisimu",
      "Bad mood ini bukan kegagalan",
      "Kau boleh menarik diri sebentar",
      "Aku mengerti jika energimu menurun",
      "Perasaan ini valid dan nyata",
      "Mari bernapas perlahan bersama",
      "Kau tidak sendirian menghadapi ini",
      "Tak apa jika dunia terasa menyebalkan",
      "Aku ada untuk mendengarkan tanpa menghakimi",
      "Mood ini tidak menghapus kebaikanmu",
      "Kau tetap berarti, apa pun rasanya",
      "Hari ini boleh berjalan lebih pelan",
      "Aku tahu ini tidak nyaman, tapi akan berlalu",
      "Tak perlu menjelaskan apa pun jika tak ingin",
      "Kau boleh diam, aku tetap menemani",
      "Bad mood ini hanya singgah sementara",
      "Aku percaya kau bisa melewatinya",
      "Hatimu layak diperlakukan lembut",

      "Beri waktu pada dirimu untuk menyesuaikan",
      "Tak apa jika fokusmu berantakan hari ini",
      "Kau tidak berlebihan dengan perasaanmu",
      "Aku di sini meski suasana tidak ideal",
      "Mari lepaskan tekanan untuk jadi baik-baik saja",
      "Bad mood ini tidak menentukan nilaimu",
      "Kau boleh istirahat dari ekspektasi",
      "Aku akan menunggu sampai kau merasa lebih ringan",
      "Tak apa jika senyum belum datang",
      "Hari ini cukup bertahan, itu sudah hebat",
      "Kau tetap layak disayangi",
      "Aku percaya besok akan terasa berbeda",
      "Mari cari satu hal kecil yang menenangkan",
      "Kau tidak perlu memaksa diri",
      "Bad mood ini bukan akhir cerita",
      "Aku tetap di sini, konsisten",
      "Hatimu sedang butuh ruang",
      "Tak apa jika emosimu naik turun",
      "Kau lebih kuat dari hari buruk ini",
      "Aku bersamamu melewati suasana ini",

      "Pelan-pelan saja, tidak perlu buru-buru",
      "Kau boleh mematikan dunia sejenak",
      "Aku tidak menuntut apa pun darimu",
      "Bad mood ini akan mereda",
      "Kau tidak rusak, hanya sedang lelah",
      "Aku menghargai kejujuran emosimu",
      "Tak apa jika hari ini tidak produktif",
      "Kau tetap cukup apa adanya",
      "Aku di sini sampai rasanya lebih baik",
      "Hari ini tidak menentukan seluruh hidupmu",
    ],
  };

  const TransitionOverlay = ({ emotion }) => {
    const emotionData = emotions[emotion];
    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `bloomZoom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                i * 0.08
              }s forwards`,
            }}
          >
            {emotionData.flower}
          </div>
        ))}
      </div>
    );
  };

  const LoadingScreen = () => {
    if (!mounted) {
      return (
        <div className="fixed inset-0 bg-gradient-to-b from-pink-200 via-rose-100 to-pink-50 flex items-center justify-center overflow-hidden z-50">
          <div className="relative z-10 text-center">
            <div className="text-5xl mb-4 animate-bounce">💕</div>
            <h1 className="text-5xl font-bold text-pink-600 mb-4">
              Untuk Sayangkuu
            </h1>
            <p className="text-xl text-pink-500 mb-8">
              Hadiah cinta spesial untuk gadis tercantik
            </p>
            <div className="h-1 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 rounded-full w-32 mx-auto mb-8"></div>
            <p className="text-pink-400 text-sm animate-pulse">Loading...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-gradient-to-b from-pink-200 via-rose-100 to-pink-50 flex items-center justify-center overflow-hidden z-50">
        {[...Array(8)].map((_, i) => (
          <div
            key={`right-${i}`}
            className="absolute text-6xl animate-pulse"
            style={{
              right: "-50px",
              top: `${Math.random() * 100}%`,
              animation: `floatInLeft 8s ease-in-out ${i * 0.3}s forwards`,
              transformStyle: "preserve-3d",
            }}
          >
            🌸
          </div>
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`left-${i}`}
            className="absolute text-6xl animate-pulse"
            style={{
              left: "-50px",
              top: `${Math.random() * 100}%`,
              animation: `floatInRight 8s ease-in-out ${i * 0.3}s forwards`,
              transformStyle: "preserve-3d",
            }}
          >
            🌹
          </div>
        ))}

        <div className="relative z-10 text-center">
          <div className="text-5xl mb-4 animate-bounce">💕</div>
          <h1 className="text-5xl font-bold text-pink-600 mb-4">
            Untuk Sayanagkuu
          </h1>
          <p className="text-xl text-pink-500 mb-8">
            Hadiah cinta spesial untuk gadis tercantik
          </p>
          <div className="h-1 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 rounded-full w-32 mx-auto mb-8"></div>
          <p className="text-pink-400 text-sm animate-pulse">Loading...</p>
        </div>

        <style>{`
          @keyframes floatInLeft {
            0% {
              opacity: 0;
              transform: translateX(-100px) translateY(0px) rotateZ(0deg);
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateX(100vw) translateY(-100px) rotateZ(180deg);
            }
          }
          @keyframes floatInRight {
            0% {
              opacity: 0;
              transform: translateX(100px) translateY(0px) rotateZ(0deg);
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateX(-100vw) translateY(-100px) rotateZ(-180deg);
            }
          }
        `}</style>
      </div>
    );
  };

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-pink-50 animate-fadeIn">
      {isTransitioning && <TransitionOverlay emotion="motivasi" />}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 mb-4">
            Untuk Sayangkuu 💕
          </h1>
          <p className="text-pink-700 text-lg">
            Pilih suasana hatimu, dan temukan pesan yang dibuat dengan penuh
            cinta untuk mu
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {Object.entries(emotions).map(([key, style]) => (
            <button
              key={key}
              onClick={() => handleSelectEmotion(key)}
              disabled={isTransitioning}
              className={`bg-gradient-to-br ${style.color} ${style.dark} text-white p-6 rounded-3xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="text-4xl mb-2">
                {key === "bahagia" && "😊"}
                {key === "sedih" && "😢"}
                {key === "marah" && "😠"}
                {key === "capek" && "😴"}
                {key === "motivasi" && "💪"}
                {key === "badmood" && "😑"}
              </div>
              <div className="capitalize">
                {key === "motivasi"
                  ? "Butuh Motivasi"
                  : key === "badmood"
                  ? "Bad Mood"
                  : key}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-pink-500 text-sm">Dibuat dengan ❤️ untuk mu</p>
        </div>
      </div>
    </div>
  );

  const CardScreen = () => {
    const emotionData = emotions[selectedEmotion];
    const emotionMessages = messages[selectedEmotion] || [];
    const totalCards = 100;
    const cardsPerPage = 12;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const startIdx = currentPage * cardsPerPage;
    const visibleCards = Array.from(
      { length: Math.min(cardsPerPage, totalCards - startIdx) },
      (_, i) => startIdx + i
    );

    const handleCardClick = (index) => {
      setOpenedCards((prev) => ({
        ...prev,
        [index]: true,
      }));
    };

    const isCardOpened = (index) => openedCards[index] || false;
    const remainingCards = totalCards - Object.keys(openedCards).length;

    return (
      <div
        className={`min-h-screen bg-gradient-to-b ${emotionData.color} pb-12 animate-fadeIn`}
      >
        {isTransitioning && <TransitionOverlay emotion={selectedEmotion} />}
        <div className="sticky top-0 z-20 backdrop-blur-sm bg-white/30 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
            <button
              onClick={handleBackHome}
              disabled={isTransitioning}
              className="flex items-center gap-2 text-pink-700 hover:text-pink-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
              <span>Kembali</span>
            </button>
            <div className="text-center">
              <h2 className={`text-3xl font-bold text-white capitalize mb-1`}>
                {selectedEmotion === "badmood"
                  ? "Bad Mood"
                  : selectedEmotion === "motivasi"
                  ? "Butuh Motivasi"
                  : selectedEmotion}
              </h2>
              <p className="text-white text-sm font-semibold">
                Kartu tersisa: {remainingCards}
              </p>
            </div>
            <button
              onClick={() => {
                setOpenedCards({});
                setCurrentPage(0);
              }}
              disabled={isTransitioning}
              className="flex items-center gap-2 text-pink-700 hover:text-pink-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Reset semua kartu"
            >
              <RotateCcw size={20} />
              <span className="text-sm">Reset</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {visibleCards.map((index) => (
              <div key={index} className="h-32 perspective">
                <button
                  onClick={() => handleCardClick(index)}
                  disabled={isTransitioning}
                  className={`w-full h-full rounded-2xl font-bold text-white transition-all duration-500 cursor-pointer relative ${
                    isCardOpened(index)
                      ? `${emotionData.dark} shadow-lg`
                      : "bg-white/40 hover:bg-white/60 shadow-md hover:shadow-xl hover:-translate-y-1"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{
                    transformStyle: isCardOpened(index)
                      ? "preserve-3d"
                      : "flat",
                  }}
                >
                  {isCardOpened(index) ? (
                    <div className="text-center h-full flex flex-col items-center justify-center px-3 py-2">
                      <p className="text-xs leading-tight">
                        {emotionMessages[index % emotionMessages.length]}
                      </p>
                    </div>
                  ) : (
                    <div className="text-3xl">✨</div>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled={isTransitioning}
                className={`w-10 h-10 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentPage === page
                    ? "bg-white text-pink-600 shadow-lg"
                    : "bg-white/40 text-white hover:bg-white/60"
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => setStage("home"), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {stage === "loading" && <LoadingScreen />}
      {stage === "home" && !selectedEmotion && <HomeScreen />}
      {selectedEmotion && <CardScreen />}

      <style>{`
        @keyframes bloomZoom {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
            filter: blur(10px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1.5) rotate(720deg) translateY(-100px);
            filter: blur(0px);
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in;
        }
      `}</style>
    </>
  );
};

export default NiaLoveWebsite;
