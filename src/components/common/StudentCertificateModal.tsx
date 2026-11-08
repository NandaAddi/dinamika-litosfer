import React, { useEffect, useRef, useState } from 'react';
import { progressStore, getRankTitle, ProgressData } from '../../data/progressStore';
import { sound } from '../../utils/soundEffects';

interface StudentCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentCertificateModal: React.FC<StudentCertificateModalProps> = ({
  isOpen,
  onClose
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<ProgressData>(() => progressStore.getData());
  const [name, setName] = useState(data.profile.name || '');
  const [school, setSchool] = useState(data.profile.school || '');
  const [className, setClassName] = useState(data.profile.className || '');

  useEffect(() => {
    return progressStore.subscribe(() => {
      const fresh = progressStore.getData();
      setData({ ...fresh });
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleNameChange = (val: string) => {
    setName(val);
    progressStore.setProfile({ name: val });
  };

  const handleSchoolChange = (val: string) => {
    setSchool(val);
    progressStore.setProfile({ school: val });
  };

  const handleClassChange = (val: string) => {
    setClassName(val);
    progressStore.setProfile({ className: val });
  };

  const handlePrint = () => {
    sound.snap();
    window.print();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const rank = getRankTitle(data.xp);
  const badgesList = Object.values(data.badges);
  const challenges = data.completedChallenges || [];
  const challengesCount = challenges.length;
  const quiz = data.quizResult || {
    score: 0,
    total: 13,
    percentage: 0,
    completedAt: new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  const isTuntas = quiz.percentage >= 75;
  const predikat =
    quiz.percentage >= 90
      ? 'Sangat Mahir (Kategori A)'
      : quiz.percentage >= 75
      ? 'Mahir / Tuntas (Kategori B)'
      : 'Perlu Pendalaman Konsep (Kategori C)';

  return (
    <dialog
      ref={dialogRef}
      id="certificate-dialog"
      aria-labelledby="cert-modal-title"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="refs-head no-print">
        <div className="shortcuts-modal-title">
          <span className="shortcuts-title-icon">📄</span>
          <div>
            <h3 id="cert-modal-title">Portofolio Asesmen Belajar Geografi</h3>
            <p className="shortcuts-title-sub">
              Pratinjau lembar portofolio asesmen formatif Kurikulum Merdeka siap cetak ke format PDF (Ukuran A4).
            </p>
          </div>
        </div>
        <button
          type="button"
          className="refs-close"
          aria-label="Tutup pratinjau sertifikat"
          onClick={() => {
            sound.snap();
            onClose();
          }}
        >
          ✕
        </button>
      </div>

      <div className="cert-dialog-body">
        {/* Form Identitas Peserta Didik (Hanya tampil di layar) */}
        <div className="cert-identity-form no-print">
          <div className="cert-form-title">
            <span>✏️ IDENTITAS PESERTA DIDIK (Lengkapi sebelum mencetak)</span>
          </div>
          <div className="cert-form-grid">
            <div className="cert-form-field">
              <label htmlFor="student-name">Nama Lengkap Siswa:</label>
              <input
                id="student-name"
                type="text"
                placeholder="Contoh: Ahmad Rizky Ramadhan"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div className="cert-form-field">
              <label htmlFor="student-class">Kelas / Rombel:</label>
              <input
                id="student-class"
                type="text"
                placeholder="Contoh: XI-Geografi 2"
                value={className}
                onChange={(e) => handleClassChange(e.target.value)}
              />
            </div>
            <div className="cert-form-field">
              <label htmlFor="student-school">Asal Sekolah (SMA/MA):</label>
              <input
                id="student-school"
                type="text"
                placeholder="Contoh: SMAN 1 Malang"
                value={school}
                onChange={(e) => handleSchoolChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ================= DOKUMEN CETAK A4 (Printable Sheet) ================= */}
        <div className="certificate-sheet" id="certificate-printable">
          {/* KOP RESMI UNIVERSITAS NEGERI MALANG */}
          <div className="cert-doc-header">
            <img
              src="/assets/images/Lambang-UM.webp"
              alt="Lambang Universitas Negeri Malang"
              className="cert-um-logo"
            />
            <div className="cert-institution-text">
              <h4>KEMENTERIAN PENDIDIKAN TINGGI, SAINS, DAN TEKNOLOGI</h4>
              <h3>UNIVERSITAS NEGERI MALANG (UM)</h3>
              <h5>FAKULTAS ILMU SOSIAL · DEPARTEMEN GEOGRAFI</h5>
              <p>Program Diktisaintek Berdampak · Laboratorium Pembelajaran Geografi Digital</p>
            </div>
          </div>

          <div className="cert-double-line"></div>

          {/* JUDUL DOKUMEN */}
          <div className="cert-title-section">
            <h2>PORTOFOLIO ASESMEN FORMATIF DIGITAL</h2>
            <p className="cert-theme">Materi: Dinamika Litosfer dan Pengaruhnya Terhadap Kehidupan</p>
            <span className="cert-kurikulum-tag">Fase E / F · Kurikulum Merdeka</span>
          </div>

          {/* TABEL IDENTITAS SISWA */}
          <div className="cert-info-box">
            <table className="cert-info-table">
              <tbody>
                <tr>
                  <td className="lbl">Nama Peserta Didik</td>
                  <td className="sep">:</td>
                  <td className="val"><strong>{name || '__________________________'}</strong></td>
                  <td className="lbl">Tanggal Asesmen</td>
                  <td className="sep">:</td>
                  <td className="val">{quiz.completedAt || '—'}</td>
                </tr>
                <tr>
                  <td className="lbl">Kelas / Rombel</td>
                  <td className="sep">:</td>
                  <td className="val">{className || '__________________________'}</td>
                  <td className="lbl">Pangkat Karir</td>
                  <td className="sep">:</td>
                  <td className="val"><strong>{rank.title} (Level {rank.level})</strong></td>
                </tr>
                <tr>
                  <td className="lbl">Asal Sekolah</td>
                  <td className="sep">:</td>
                  <td className="val">{school || '__________________________'}</td>
                  <td className="lbl">Akumulasi XP</td>
                  <td className="sep">:</td>
                  <td className="val"><strong>{data.xp} Poin</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* HASIL KUIS DAN CAPAIAN NILAI */}
          <div className="cert-section-title">I. REKAPITULASI HASIL ASESMEN FORMATIF (13 SOAL)</div>
          <div className="cert-score-grid">
            <div className="cert-score-card">
              <span className="sc-lbl">Jawaban Benar</span>
              <span className="sc-val">{quiz.score} / {quiz.total}</span>
            </div>
            <div className="cert-score-card">
              <span className="sc-lbl">Nilai Konversi</span>
              <span className="sc-val highlight">{quiz.percentage}</span>
            </div>
            <div className="cert-score-card">
              <span className="sc-lbl">Status Ketuntasan</span>
              <span className={`sc-badge ${isTuntas ? 'tuntas' : 'remedial'}`}>
                {isTuntas ? 'TUNTAS' : 'BELUM TUNTAS'}
              </span>
            </div>
            <div className="cert-score-card">
              <span className="sc-lbl">Predikat Kompetensi</span>
              <span className="sc-val small">{predikat}</span>
            </div>
          </div>

          {/* ANALISIS SUB-TOPIK & MISI INKUIRI 3D */}
          <div className="cert-section-title">
            II. PENGUASAAN SUB-TOPIK &amp; EKSPLORASI INKUIRI 3D ({challengesCount} / 4 Misi Tuntas)
          </div>
          <table className="cert-topic-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Sub-Topik Pembelajaran</th>
                <th>Investigasi Objek 3D &amp; Inkuiri</th>
                <th>Status Kompetensi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Struktur Interior Bumi &amp; Seismik P/S</td>
                <td>Misi Geodynamo: Konveksi Logam Inti Luar Cair</td>
                <td>
                  <span className="check">
                    {challenges.includes('inquiry-struktur') ? '✓ Inkuiri Tuntas (+75 XP)' : '✓ Diselesaikan'}
                  </span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Dinamika Lempeng Tektonik &amp; Batas Kerak</td>
                <td>Misi Megathrust: Geometri Slab Penunjaman Samudra</td>
                <td>
                  <span className="check">
                    {challenges.includes('inquiry-lempeng') ? '✓ Inkuiri Tuntas (+75 XP)' : '✓ Diselesaikan'}
                  </span>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Vulkanisme Semeru &amp; Karakteristik Erupsi</td>
                <td>Misi Dapur Magma: Pelacakan Batolit Mahameru</td>
                <td>
                  <span className="check">
                    {challenges.includes('inquiry-vulkanisme') ? '✓ Inkuiri Tuntas (+75 XP)' : '✓ Diselesaikan'}
                  </span>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Tenaga Endogen &amp; Siklus Petrologi</td>
                <td>Misi Graben: Amblasan Blok Patahan Sianok</td>
                <td>
                  <span className="check">
                    {challenges.includes('inquiry-endogen') ? '✓ Inkuiri Tuntas (+75 XP)' : '✓ Diselesaikan'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* LENCANA PRESTASI YANG DIPEROLEH */}
          <div className="cert-section-title">III. LENCANA PRESTASI KOMPETENSI (BADGES EARNED)</div>
          <div className="cert-badges-row">
            {badgesList.map((b) => (
              <div key={b.id} className={`cert-badge-item ${b.unlocked ? 'earned' : 'locked'}`}>
                <span className="cert-badge-ic">{b.unlocked ? b.icon : '🔒'}</span>
                <div className="cert-badge-name">{b.title}</div>
                <div className="cert-badge-state">{b.unlocked ? 'Terverifikasi' : 'Belum Terbuka'}</div>
              </div>
            ))}
          </div>

          {/* PENGESAHAN DAN TANDA TANGAN */}
          <div className="cert-signatures">
            <div className="sig-col">
              <p>Mengetahui,</p>
              <p><strong>Peserta Didik</strong></p>
              <div className="sig-space"></div>
              <p className="sig-name">( {name || '...........................................'} )</p>
            </div>
            <div className="sig-col">
              <p>Malang, {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Guru Mata Pelajaran Geografi</strong></p>
              <div className="sig-space"></div>
              <p className="sig-name">( ..................................................... )</p>
              <p className="sig-nip">NIP. </p>
            </div>
          </div>
        </div>
      </div>

      <div className="shortcuts-dialog-foot no-print">
        <button
          type="button"
          className="btn btn-magma"
          onClick={handlePrint}
        >
          🖨️ Cetak / Simpan PDF (A4)
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            sound.snap();
            onClose();
          }}
        >
          Tutup
        </button>
      </div>
    </dialog>
  );
};
