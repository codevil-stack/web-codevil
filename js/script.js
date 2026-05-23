function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const modalContent = document.getElementById('modalContent');
    const iframe = document.getElementById('modalIframe');

    // 1. Bersihkan iframe terlebih dahulu untuk membuang cache browser
    iframe.removeAttribute('src');

    // 2. Aktifkan pointer-events & siapkan animasi
    modal.classList.remove('pointer-events-none');

    // 3. Amankan area modal agar klik internal tidak bocor ke luar
    modalContent.onclick = function(e) {
        e.stopPropagation();
    };

    // 4. Jalankan animasi blur dan pop-up secara mulus
    modal.classList.remove('opacity-0', 'backdrop-blur-0');
    modal.classList.add('opacity-100', 'backdrop-blur-xl');
    
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');

    // 5. ISI LINK VIDEO HANYA SETELAH MODAL BERHASIL TERBUKA (Menghindari bug redirect Firefox)
    setTimeout(() => {
        // Kita tambahkan parameter &rel=0 agar setelah video habis, tidak memunculkan rekomendasi video orang lain
        iframe.setAttribute('src', videoUrl + "?autoplay=1&rel=0");
    }, 100);
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalContent = document.getElementById('modalContent');
    const iframe = document.getElementById('modalIframe');

    // 1. Kembalikan efek animasi memudar
    modal.classList.remove('opacity-100', 'backdrop-blur-xl');
    modal.classList.add('opacity-0', 'backdrop-blur-0');

    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');

    // 2. Hancurkan link src video dan kunci kembali modal setelah animasi selesai (500ms)
    setTimeout(() => {
        modal.classList.add('pointer-events-none');
        iframe.removeAttribute('src'); // Menghapus total atribut src agar video mati total
    }, 500);
}

function toggleFaq(button) {
        // Ambil elemen konten (div jawaban) yang ada persis di bawah button
        const content = button.nextElementSibling;
        // Ambil indikator tanda "+" atau "-" di dalam tombol
        const indicator = button.querySelector('span:last-child');
        
        // Cek apakah kontainer sedang terbuka
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
            // Kalau terbuka, kita tutup dengan set maxHeight ke 0
            content.style.maxHeight = "0px";
            indicator.textContent = "+";
            indicator.style.transform = "rotate(0deg)";
        } else {
            // Kalau tertutup, kita hitung tinggi asli kontennya lalu set ke maxHeight
            content.style.maxHeight = content.scrollHeight + "px";
            indicator.textContent = "−"; // Memakai tanda minus tipografi premium
            indicator.style.transform = "rotate(180deg)";
        }
    }

// Jalankan inisialisasi pihak ketiga setelah DOM web benar-benar siap
document.addEventListener("DOMContentLoaded", function() {
    // 1. Inisialisasi Ikon Lucide terlebih dahulu
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // 2. Inisialisasi Animasi AOS
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic'
        });
    }
});