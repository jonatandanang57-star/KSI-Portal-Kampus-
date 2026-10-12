import { useState } from 'react'
import './App.css'

const demoAccounts = [
  { role: 'student', label: 'Mahasiswa', name: 'Alya Pratama', email: 'alya.pratama@kampus.test', password: 'Mahasiswa123', initials: 'AP' },
  { role: 'lecturer', label: 'Dosen', name: 'Dr. Nadia Putri', email: 'nadia.putri@kampus.test', password: 'Dosen123', initials: 'NP' },
  { role: 'admin', label: 'Admin', name: 'Raka Mahendra', email: 'admin@kampus.test', password: 'Admin123', initials: 'RM' },
]

const initialAccounts = [
  ...demoAccounts,
  { role: 'student', label: 'Mahasiswa', name: 'Bima Saputra', email: 'bima.saputra@kampus.test', password: 'Mahasiswa123', initials: 'BS' },
  { role: 'lecturer', label: 'Dosen', name: 'Prof. Arif Wibowo', email: 'arif.wibowo@kampus.test', password: 'Dosen123', initials: 'AW' },
]

const assignments = [
  { id: 1, title: 'Wireframe aplikasi layanan kampus', course: 'Interaksi Manusia dan Komputer', due: 'Hari ini, 23.59', status: 'Perlu dikumpulkan', tone: 'coral' },
  { id: 2, title: 'Analisis kebutuhan pengguna', course: 'Rekayasa Perangkat Lunak', due: 'Besok, 17.00', status: 'Sedang dikerjakan', tone: 'gold' },
  { id: 3, title: 'Ringkasan materi basis data', course: 'Sistem Basis Data', due: '20 Okt 2026', status: 'Terkumpul', tone: 'mint' },
]

const menuByRole = {
  student: [
    { id: 'dashboard', label: 'Ringkasan', icon: 'grid' },
    { id: 'assignments', label: 'Tugas', icon: 'file' },
    { id: 'grades', label: 'Nilai', icon: 'chart' },
    { id: 'discussion', label: 'Diskusi kelas', icon: 'message' },
  ],
  lecturer: [
    { id: 'dashboard', label: 'Ringkasan', icon: 'grid' },
    { id: 'assignments', label: 'Penilaian tugas', icon: 'check' },
    { id: 'classes', label: 'Kelas saya', icon: 'book' },
    { id: 'discussion', label: 'Diskusi kelas', icon: 'message' },
  ],
  admin: [
    { id: 'dashboard', label: 'Ringkasan', icon: 'grid' },
    { id: 'accounts', label: 'Kelola akun', icon: 'users' },
    { id: 'reports', label: 'Aktivitas', icon: 'chart' },
  ],
}

const pageTitles = {
  dashboard: 'Ringkasan',
  assignments: 'Tugas & penilaian',
  grades: 'Rekap nilai',
  discussion: 'Diskusi kelas',
  classes: 'Kelas saya',
  accounts: 'Kelola akun',
  reports: 'Aktivitas portal',
}

function Icon({ name, size = 19 }) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const shapes = {
    grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
    file: <><path d="M13 3.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V10z" /><path d="M13 3.5V10h6.5M8 14h8M8 17.5h6" /></>,
    chart: <><path d="M4 20V11M10 20V4M16 20v-7M22 20H2" /></>,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-2 2v-6a7.5 7.5 0 1 1 17-3.5Z" /><path d="M8 11h8M8 14.5h5" /></>,
    check: <><path d="m5 12 4.2 4.2L19 6.5" /><circle cx="12" cy="12" r="9" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20M8 7h8" /></>,
    users: <><path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" /><circle cx="9.5" cy="7" r="3.5" /><path d="M17 11a3.5 3.5 0 0 0 0-7M21 20v-1.5a4 4 0 0 0-3-3.87" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    upload: <><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" /><path d="M5 14v5h14v-5" /></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...shared}>{shapes[name] || shapes.grid}</svg>
}

function Login({ onLogin }) {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState(demoAccounts[0].email)
  const [password, setPassword] = useState(demoAccounts[0].password)
  const [error, setError] = useState('')

  function selectAccount(account) {
    setRole(account.role)
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }

  function submit(event) {
    event.preventDefault()
    const account = demoAccounts.find((item) => item.role === role && item.email === email && item.password === password)
    if (!account) {
      setError('Akun tidak cocok. Pilih salah satu akun demo untuk masuk.')
      return
    }
    onLogin(account)
  }

  return (
    <main className="login-page">
      <section className="login-art" aria-label="Portal Kampus fiktif">
        <a className="brand brand-light" href="#masuk"><span className="brand-mark">r.</span><span>ruang<span className="brand-light-word">kampus</span></span></a>
        <div className="art-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> PORTAL AKADEMIK DIGITAL</div>
          <h1>Semua urusan<br />kampus, <em>satu ruang.</em></h1>
          <p>Belajar, berdiskusi, dan bertumbuh bersama komunitas kampusmu.</p>
        </div>
        <div className="art-footer"><span>LATIHAN PORTAL KAMPUS</span><span>DATA FIKTIF · 2026</span></div>
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
      </section>

      <section className="login-panel" id="masuk">
        <div className="login-inner">
          <div className="mobile-brand"><span className="brand-mark">r.</span> ruangkampus</div>
          <div className="login-heading"><span className="section-kicker">SELAMAT DATANG</span><h2>Masuk ke portal</h2><p>Gunakan akun demo untuk menjelajahi portal.</p></div>
          <form onSubmit={submit}>
            <label className="field-label">Masuk sebagai</label>
            <div className="role-switch" role="tablist" aria-label="Pilih jenis akun">
              {demoAccounts.map((account) => <button key={account.role} type="button" role="tab" aria-selected={role === account.role} className={role === account.role ? 'role-option selected' : 'role-option'} onClick={() => selectAccount(account)}>{account.label}</button>)}
            </div>
            <label className="field-label" htmlFor="email">Email kampus</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required />
            <label className="field-label password-label" htmlFor="password">Kata sandi</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button login-submit" type="submit">Masuk ke portal <Icon name="arrow" size={18} /></button>
          </form>
          <div className="demo-box"><span className="demo-caption">AKUN DEMO TERSEDIA</span><div className="demo-accounts">{demoAccounts.map((account) => <button className="demo-account" type="button" key={account.role} onClick={() => selectAccount(account)}><span className={`mini-avatar ${account.role}`}>{account.initials}</span><span><strong>{account.label}</strong><small>{account.email}</small></span><Icon name="arrow" size={15} /></button>)}</div></div>
          <p className="privacy-note">Seluruh akun dan data di portal ini bersifat sintetis.</p>
        </div>
      </section>
    </main>
  )
}

function App() {
  const [account, setAccount] = useState(null)
  const [page, setPage] = useState('dashboard')
  const [allAccounts, setAllAccounts] = useState(initialAccounts)
  const [graded, setGraded] = useState([])
  const [uploadedFile, setUploadedFile] = useState('')
  const [posts, setPosts] = useState([
    { author: 'Nadia Putri', initials: 'NP', time: '12 menit lalu', text: 'Ingat, unggah wireframe dalam format PDF atau tautan Figma. Semangat untuk presentasi minggu depan!' },
    { author: 'Alya Pratama', initials: 'AP', time: '34 menit lalu', text: 'Apakah alur onboarding perlu dibuat sampai halaman verifikasi email juga, Bu?' },
  ])
  const [draftPost, setDraftPost] = useState('')
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [newAccountName, setNewAccountName] = useState('')
  const [newAccountEmail, setNewAccountEmail] = useState('')
  const [newAccountRole, setNewAccountRole] = useState('student')
  const [accountNotice, setAccountNotice] = useState('')

  if (!account) return <Login onLogin={setAccount} />

  const isStudent = account.role === 'student'
  const roleLabel = account.label
  const menu = menuByRole[account.role]

  function addPost(event) {
    event.preventDefault()
    if (!draftPost.trim()) return
    setPosts([{ author: account.name, initials: account.initials, time: 'Baru saja', text: draftPost.trim() }, ...posts])
    setDraftPost('')
  }

  function createAccount(event) {
    event.preventDefault()
    const label = newAccountRole === 'student' ? 'Mahasiswa' : newAccountRole === 'lecturer' ? 'Dosen' : 'Admin'
    const initials = newAccountName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    setAllAccounts([{ name: newAccountName, email: newAccountEmail, role: newAccountRole, label, initials, password: 'AkunBaru123' }, ...allAccounts])
    setAccountNotice(`Akun ${newAccountName} berhasil dibuat. Kata sandi awal: AkunBaru123`)
    setNewAccountName('')
    setNewAccountEmail('')
    setShowAccountForm(false)
  }

  return (
    <main className="portal-shell">
      <aside className="sidebar">
        <a className="brand sidebar-brand" href="#ringkasan"><span className="brand-mark">r.</span><span>ruang<span>kampus</span></span></a>
        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace-switch"><span className="campus-seal">K</span><span><strong>Kampus Kita</strong><small>Semester Ganjil 2026</small></span><span className="chevron">⌄</span></div>
        <div className="nav-label">MENU UTAMA</div>
        <nav className="side-nav" aria-label="Navigasi utama">{menu.map((item) => <button key={item.id} aria-label={item.label} aria-current={page === item.id ? 'page' : undefined} className={page === item.id ? 'nav-item active' : 'nav-item'} onClick={() => { setPage(item.id); setAccountNotice('') }}><Icon name={item.icon} /><span>{item.label}</span>{item.id === 'assignments' && isStudent && <span className="nav-count">2</span>}</button>)}</nav>
        <div className="sidebar-bottom"><div className="semester-card"><span className="semester-icon"><Icon name="book" size={17} /></span><span><strong>Semester 5</strong><small>2026 / 2027</small></span><Icon name="arrow" size={16} /></div><button className="nav-item signout" onClick={() => { setAccount(null); setPage('dashboard') }}><Icon name="logout" /><span>Keluar</span></button><div className="sidebar-user"><span className={`avatar ${account.role}`}>{account.initials}</span><span className="user-meta"><strong>{account.name}</strong><small>{roleLabel}</small></span><span className="online-dot" /></div></div>
      </aside>

      <section className="main-area">
        <header className="topbar"><div className="breadcrumb">Portal <span>/</span> <strong>{pageTitles[page]}</strong></div><div className="topbar-right"><span className="date-label">Senin, 12 Oktober 2026</span><button className="icon-button notification-button" aria-label="Notifikasi"><Icon name="bell" /><i /></button><span className={`avatar top-avatar ${account.role}`}>{account.initials}</span></div></header>
        <div className="page-content">
          {page === 'dashboard' && <Dashboard account={account} accountsCount={allAccounts.length} gradedCount={graded.length} onNavigate={setPage} />}
          {page === 'assignments' && <Assignments isStudent={isStudent} graded={graded} onGrade={(id) => setGraded([...graded, id])} uploadedFile={uploadedFile} onUpload={setUploadedFile} />}
          {page === 'grades' && <Grades />}
          {page === 'discussion' && <Discussion posts={posts} draft={draftPost} setDraft={setDraftPost} onSubmit={addPost} account={account} />}
          {page === 'classes' && <Classes />}
          {page === 'accounts' && <Accounts accounts={allAccounts} notice={accountNotice} showForm={showAccountForm} setShowForm={setShowAccountForm} name={newAccountName} setName={setNewAccountName} email={newAccountEmail} setEmail={setNewAccountEmail} role={newAccountRole} setRole={setNewAccountRole} onSubmit={createAccount} />}
          {page === 'reports' && <Reports accountCount={allAccounts.length} gradedCount={graded.length} />}
        </div>
      </section>
    </main>
  )
}

function Dashboard({ account, accountsCount, gradedCount, onNavigate }) {
  const student = account.role === 'student'
  const lecturer = account.role === 'lecturer'
  const greeting = student ? 'Selamat pagi' : lecturer ? 'Selamat datang kembali' : 'Ringkasan portal'
  return <>
    <div className="welcome-row"><div><div className="section-kicker">SENIN, 12 OKTOBER 2026</div><h1>{greeting}, <span>{account.name.split(' ')[0]}.</span></h1><p>{student ? 'Ada hal baru di kelasmu. Yuk, lihat yang perlu diselesaikan.' : lecturer ? 'Siap melanjutkan aktivitas mengajar hari ini?' : 'Pantau aktivitas dan pengguna portal kampus.'}</p></div><button className="outline-button" onClick={() => onNavigate(student ? 'assignments' : lecturer ? 'assignments' : 'accounts')}><Icon name={student ? 'file' : lecturer ? 'check' : 'users'} size={17} />{student ? 'Lihat tugas' : lecturer ? 'Mulai menilai' : 'Kelola akun'}</button></div>
    <div className="metric-grid">
      {student ? <><Metric label="IPK sementara" value="3,72" note="↑ 0,12 dari semester lalu" tone="green" icon="chart" /><Metric label="Tugas aktif" value="02" note="1 tenggat hari ini" tone="coral" icon="file" /><Metric label="Kelas berjalan" value="06" note="Semester 5 · 18 SKS" tone="blue" icon="book" /></> : lecturer ? <><Metric label="Kelas diampu" value="04" note="Semester Ganjil 2026" tone="blue" icon="book" /><Metric label="Perlu dinilai" value={String(Math.max(12 - gradedCount, 0)).padStart(2, '0')} note="Dari 3 kelas aktif" tone="coral" icon="file" /><Metric label="Diskusi baru" value="08" note="2 belum dibaca" tone="gold" icon="message" /></> : <><Metric label="Total akun" value={String(accountsCount).padStart(2, '0')} note="Semua akun aktif" tone="blue" icon="users" /><Metric label="Aktivitas hari ini" value="128" note="↑ 14% dari kemarin" tone="green" icon="chart" /><Metric label="Laporan masuk" value="03" note="Perlu ditinjau" tone="gold" icon="file" /></>}
    </div>
    <div className="dashboard-grid"><section className="content-panel course-panel"><div className="panel-heading"><div><span className="section-kicker">{student ? 'KELAS UNGGULAN' : lecturer ? 'JADWAL HARI INI' : 'AKTIVITAS TERKINI'}</span><h2>{student ? 'Interaksi Manusia dan Komputer' : lecturer ? 'Agenda mengajar' : 'Portal berjalan baik'}</h2></div><button className="text-button" onClick={() => onNavigate(student ? 'classes' : lecturer ? 'classes' : 'reports')}>Lihat semua <Icon name="arrow" size={15} /></button></div>
      {student ? <><div className="course-banner"><div className="course-art"><div className="course-art-circle" /><div className="course-art-card">UX<br /><span>01</span></div><div className="course-art-line" /></div><div className="course-details"><span className="course-tag">IF-502 · 3 SKS</span><strong>Desain untuk manusia,<br />bukan hanya layar.</strong><span className="lecturer-line"><span className="mini-avatar lecturer">NP</span> Dr. Nadia Putri <span className="dot-separator">·</span> Rabu, 09.30</span></div></div><div className="progress-header"><span>Progres mata kuliah</span><strong>68%</strong></div><div className="progress-track"><span style={{ width: '68%' }} /></div></> : lecturer ? <div className="agenda-list"><Agenda time="09.30" title="Interaksi Manusia dan Komputer" detail="Ruang C-204 · 32 mahasiswa" tag="Berlangsung" /><Agenda time="13.00" title="Rekayasa Perangkat Lunak" detail="Ruang Lab 2 · 28 mahasiswa" tag="Berikutnya" /><Agenda time="15.30" title="Konsultasi proyek akhir" detail="Ruang dosen · 4 mahasiswa" tag="Agenda" /></div> : <div className="system-status"><span className="status-check"><Icon name="check" size={21} /></span><div><strong>Semua layanan aktif</strong><p>Pembaruan terakhir hari ini, pukul 08.42 WIB.</p></div><span className="status-pill">Normal</span></div>}
      </section>
      <section className="content-panel task-panel"><div className="panel-heading"><div><span className="section-kicker">{student ? 'JANGAN TERLEWAT' : lecturer ? 'PERLU PERHATIAN' : 'PENGGUNA'}</span><h2>{student ? 'Tugas mendatang' : lecturer ? 'Kiriman terbaru' : 'Komposisi akun'}</h2></div>{student && <button className="round-arrow" aria-label="Lihat semua tugas" onClick={() => onNavigate('assignments')}><Icon name="arrow" size={16} /></button>}</div>
      {student ? <div className="mini-task-list">{assignments.slice(0, 2).map((task) => <button className="mini-task" key={task.id} onClick={() => onNavigate('assignments')}><span className={`task-date ${task.tone}`}><strong>{task.id === 1 ? '12' : '13'}</strong><small>OKT</small></span><span className="task-copy"><strong>{task.title}</strong><small>{task.course}</small></span><span className="task-arrow"><Icon name="arrow" size={16} /></span></button>)}</div> : lecturer ? <div className="mini-task-list">{['Alya Pratama', 'Rizky Ramadhan', 'Siti Maharani'].map((name, index) => <button className="mini-task" key={name} onClick={() => onNavigate('assignments')}><span className={`mini-avatar ${['student', 'lecturer', 'admin'][index]}`}>{name.split(' ').map((part) => part[0]).join('')}</span><span className="task-copy"><strong>{name}</strong><small>{['Wireframe aplikasi · 10.14', 'Wireframe aplikasi · 09.52', 'Analisis kebutuhan · 09.20'][index]}</small></span><span className="review-dot" /></button>)}</div> : <div className="account-breakdown"><Breakdown label="Mahasiswa" value="62%" width="62%" tone="blue" /><Breakdown label="Dosen" value="28%" width="28%" tone="green" /><Breakdown label="Admin" value="10%" width="10%" tone="coral" /></div>}
      </section></div>
    <div className="bottom-note"><span className="note-mark">i</span><span>{student ? 'Jangan lupa, tugas wireframe dikumpulkan hari ini sebelum pukul 23.59.' : lecturer ? 'Ada 12 kiriman tugas yang menunggu penilaian dari kelas yang kamu ampu.' : 'Portal ini menggunakan data fiktif untuk keperluan latihan.'}</span><button onClick={() => onNavigate(student ? 'assignments' : lecturer ? 'assignments' : 'reports')}>Lihat detail <Icon name="arrow" size={14} /></button></div>
  </>
}

function Metric({ label, value, note, tone, icon }) {
  return <article className="metric-card"><div className={`metric-icon ${tone}`}><Icon name={icon} size={18} /></div><span className="metric-label">{label}</span><strong className="metric-value">{value}</strong><span className={`metric-note ${tone === 'green' ? 'positive' : ''}`}>{note}</span></article>
}

function Agenda({ time, title, detail, tag }) {
  return <div className="agenda-item"><span className="agenda-time">{time}</span><span className="agenda-rule" /><span className="agenda-copy"><strong>{title}</strong><small>{detail}</small></span><span className="agenda-tag">{tag}</span></div>
}

function Breakdown({ label, value, width, tone }) {
  return <div className="breakdown-row"><div><span>{label}</span><strong>{value}</strong></div><div className="breakdown-track"><span className={tone} style={{ width }} /></div></div>
}

function Assignments({ isStudent, graded, onGrade, uploadedFile, onUpload }) {
  const [gradeValues, setGradeValues] = useState({})
  return <div className="page-stack"><div className="welcome-row compact"><div><div className="section-kicker">{isStudent ? 'SEMESTER GANJIL 2026' : 'RUANG PENILAIAN'}</div><h1>{isStudent ? 'Tugas kuliah' : 'Kiriman mahasiswa'}</h1><p>{isStudent ? 'Pantau tenggat dan kumpulkan pekerjaanmu di sini.' : 'Periksa pekerjaan dan berikan nilai untuk setiap kiriman.'}</p></div>{!isStudent && <span className="status-pill">{Math.max(12 - graded.length, 0)} perlu dinilai</span>}</div>{assignments.map((task, index) => <article className="assignment-card" key={task.id}><div className={`assignment-symbol ${task.tone}`}><Icon name="file" size={19} /></div><div className="assignment-info"><span className="course-tag">{task.course}</span><h2>{task.title}</h2><p>{isStudent ? `Batas pengumpulan: ${task.due}` : `${[12, 10, 8][index]} kiriman mahasiswa · Tenggat ${task.due.toLowerCase()}`}</p></div>{isStudent ? task.id === 1 ? <label className="upload-button"><Icon name="upload" size={16} />{uploadedFile || 'Unggah tugas'}<input type="file" onChange={(event) => onUpload(event.target.files?.[0]?.name || '')} /></label> : <span className={`assignment-status ${task.tone}`}>{task.status}</span> : graded.includes(task.id) ? <span className="graded-badge"><Icon name="check" size={15} /> Dinilai</span> : <div className="grade-action"><input aria-label={`Nilai untuk ${task.title}`} type="number" min="0" max="100" placeholder="Nilai" value={gradeValues[task.id] || ''} onChange={(event) => setGradeValues({ ...gradeValues, [task.id]: event.target.value })} /><button className="primary-button small-button" onClick={() => onGrade(task.id)} disabled={!gradeValues[task.id]}>Simpan</button></div>}</article>)}</div>
}

function Grades() {
  const rows = [['Interaksi Manusia dan Komputer', 'A', '3,92'], ['Rekayasa Perangkat Lunak', 'A-', '3,72'], ['Sistem Basis Data', 'B+', '3,55'], ['Jaringan Komputer', 'A-', '3,78']]
  return <div className="page-stack"><div className="welcome-row compact"><div><div className="section-kicker">SEMESTER GANJIL 2026</div><h1>Rekap nilai</h1><p>Hasil belajarmu sejauh ini. Terus jaga ritmenya.</p></div></div><section className="grade-summary"><div><span className="section-kicker">INDEKS PRESTASI KUMULATIF</span><strong>3,72</strong><span>Dari skala 4,00</span></div><div className="grade-summary-art"><span>IPK</span><strong>↑</strong><small>+0,12</small></div></section><div className="content-panel table-panel"><div className="table-heading"><h2>Nilai mata kuliah</h2><span>4 mata kuliah</span></div><div className="table-scroll"><table><thead><tr><th>MATA KULIAH</th><th>NILAI</th><th>INDEKS</th></tr></thead><tbody>{rows.map(([course, grade, index]) => <tr key={course}><td>{course}</td><td><span className="grade-chip">{grade}</span></td><td>{index}</td></tr>)}</tbody></table></div></div></div>
}

function Discussion({ posts, draft, setDraft, onSubmit, account }) {
  return <div className="page-stack"><div className="welcome-row compact"><div><div className="section-kicker">INTERAKSI MANUSIA DAN KOMPUTER</div><h1>Diskusi kelas</h1><p>Ruang bertukar pikiran dengan dosen dan teman sekelas.</p></div><span className="member-count"><Icon name="users" size={16} /> 32 anggota</span></div><section className="content-panel discussion-panel"><form className="discussion-composer" onSubmit={onSubmit}><span className={`avatar ${account.role}`}>{account.initials}</span><div className="composer-field"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Tulis pertanyaan atau tanggapan..." rows="2" /><div><span>Bagikan dengan kelas IF-502</span><button type="submit" className="primary-button small-button" disabled={!draft.trim()}>Kirim</button></div></div></form><div className="post-list">{posts.map((post, index) => <article className="discussion-post" key={`${post.author}-${post.time}-${index}`}><span className={`avatar ${post.author === 'Nadia Putri' ? 'lecturer' : 'student'}`}>{post.initials}</span><div><div className="post-meta"><strong>{post.author}</strong>{post.author === 'Nadia Putri' && <span className="lecturer-tag">DOSEN</span>}<time>{post.time}</time></div><p>{post.text}</p><button className="reply-button" onClick={() => setDraft(`@${post.author.split(' ')[0]} `)}>Balas</button></div></article>)}</div></section></div>
}

function Classes() {
  return <div className="page-stack"><div className="welcome-row compact"><div><div className="section-kicker">SEMESTER GANJIL 2026</div><h1>Kelas saya</h1><p>Empat kelas aktif minggu ini.</p></div></div>{[['IF-502', 'Interaksi Manusia dan Komputer', 'Rabu · 09.30–12.00', '32 mahasiswa', 'blue'], ['IF-410', 'Rekayasa Perangkat Lunak', 'Senin · 13.00–15.30', '28 mahasiswa', 'green'], ['IF-320', 'Sistem Basis Data', 'Kamis · 10.00–12.30', '35 mahasiswa', 'gold']].map(([code, name, time, students, tone]) => <article className="class-card" key={code}><span className={`class-code ${tone}`}>{code}</span><div><h2>{name}</h2><p>{time} <span>·</span> {students}</p></div><span className="class-arrow"><Icon name="arrow" /></span></article>)}</div>
}

function Accounts({ accounts, notice, showForm, setShowForm, name, setName, email, setEmail, role, setRole, onSubmit }) {
  return <div className="page-stack"><div className="welcome-row compact"><div><div className="section-kicker">ADMINISTRASI</div><h1>Kelola akun</h1><p>Atur akses pengguna portal Kampus Kita.</p></div><button className="primary-button" onClick={() => setShowForm(!showForm)}><Icon name="plus" size={17} /> Tambah akun</button></div>{notice && <div className="success-banner"><Icon name="check" size={18} />{notice}</div>}{showForm && <form className="account-form" onSubmit={onSubmit}><label>Nama lengkap<input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Nama pengguna" /></label><label>Email kampus<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="nama@kampus.test" /></label><label>Peran<select value={role} onChange={(event) => setRole(event.target.value)}><option value="student">Mahasiswa</option><option value="lecturer">Dosen</option><option value="admin">Admin</option></select></label><div className="form-actions"><button type="button" className="outline-button" onClick={() => setShowForm(false)}>Batal</button><button type="submit" className="primary-button">Buat akun</button></div></form>}<div className="content-panel table-panel"><div className="table-heading"><h2>Semua pengguna</h2><span>{accounts.length} akun</span></div><div className="table-scroll"><table><thead><tr><th>PENGGUNA</th><th>EMAIL</th><th>PERAN</th><th>STATUS</th></tr></thead><tbody>{accounts.map((user) => <tr key={user.email}><td><span className="table-user"><span className={`mini-avatar ${user.role}`}>{user.initials}</span>{user.name}</span></td><td>{user.email}</td><td>{user.label}</td><td><span className="active-status"><i />Aktif</span></td></tr>)}</tbody></table></div></div><p className="synthetic-note">Akun yang dibuat di sesi ini hanya tersimpan selama halaman terbuka.</p></div>
}

function Reports({ accountCount, gradedCount }) {
  return <div className="page-stack"><div className="welcome-row compact"><div><div className="section-kicker">ADMINISTRASI</div><h1>Aktivitas portal</h1><p>Ikhtisar aktivitas untuk latihan pengelolaan kampus.</p></div></div><div className="metric-grid"><Metric label="Akun terdaftar" value={String(accountCount).padStart(2, '0')} note="Semua berstatus aktif" tone="blue" icon="users" /><Metric label="Tugas dinilai" value={String(gradedCount).padStart(2, '0')} note="Dalam sesi ini" tone="green" icon="check" /><Metric label="Aktivitas hari ini" value="128" note="Seluruh peran" tone="gold" icon="chart" /></div><section className="content-panel report-panel"><span className="section-kicker">LOG AKTIVITAS</span><h2>Aktivitas terbaru</h2>{[['08.42', 'Admin masuk ke portal', 'Admin · Raka Mahendra'], ['08.30', 'Kelas IF-502 dimulai', 'Dosen · Nadia Putri'], ['08.15', 'Tugas wireframe dibuka', 'Mahasiswa · Alya Pratama']].map(([time, title, detail]) => <div className="report-row" key={time}><time>{time}</time><span><strong>{title}</strong><small>{detail}</small></span><span className="report-indicator" /></div>)}</section><p className="synthetic-note">Semua catatan aktivitas menggunakan data fiktif.</p></div>
}

export default App