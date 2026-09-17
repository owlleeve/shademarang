import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FlashAlert } from '../components/FlashAlert';
import { INITIAL_WILAYAH } from '../data/mockData';
import { WilayahData, UserRole } from '../types';
import {
  Users,
  MapPin,
  TrendingUp,
  FileSpreadsheet,
  Plus,
  CheckCircle,
  Clock,
  Shield,
  Search,
  Filter,
  Flame,
  X,
  UserPlus
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, usersList, updateUserStatus, updateUserRole, addNewUser } = useAuth();
  const [wilayahList, setWilayahList] = useState<WilayahData[]>(INITIAL_WILAYAH);
  const [wilayahFilter, setWilayahFilter] = useState<'Semua' | 'Hotspot' | 'Hangat' | 'Neutral'>('Semua');
  const [wilayahSearch, setWilayahSearch] = useState('');

  // Modals
  const [showAddWilayahModal, setShowAddWilayahModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // New Wilayah Form
  const [newWilayahName, setNewWilayahName] = useState('');
  const [newWilayahCat, setNewWilayahCat] = useState('Hotspot inti');
  const [newWilayahLst, setNewWilayahLst] = useState('');
  const [newWilayahNdvi, setNewWilayahNdvi] = useState('');
  const [newWilayahStatus, setNewWilayahStatus] = useState<'Hotspot' | 'Hangat' | 'Neutral'>('Hotspot');

  // New User Form
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'staff'>('staff');
  const [newUserDept, setNewUserDept] = useState('Dinas Lingkungan Hidup');

  const filteredWilayah = wilayahList.filter((w) => {
    const matchStatus = wilayahFilter === 'Semua' || w.status === wilayahFilter;
    const matchSearch =
      w.wilayah.toLowerCase().includes(wilayahSearch.toLowerCase()) ||
      w.kategori.toLowerCase().includes(wilayahSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleAddWilayah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWilayahName || !newWilayahLst) return;

    const created: WilayahData = {
      id: `w-${Date.now()}`,
      wilayah: newWilayahName,
      kategori: newWilayahCat,
      lst: parseFloat(newWilayahLst) || 35.0,
      ndvi: parseFloat(newWilayahNdvi) || 0.2,
      status: newWilayahStatus,
      vegetationCoverPct: 15,
      priorityRTH: 4,
      zoneType: 'Inti Perkotaan',
    };

    setWilayahList([created, ...wilayahList]);
    setShowAddWilayahModal(false);
    setNewWilayahName('');
    setNewWilayahLst('');
    setNewWilayahNdvi('');
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    addNewUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Aktif',
      department: newUserDept,
      initial: newUserName.charAt(0).toUpperCase() || 'U',
    });

    setShowInviteModal(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Hotspot':
        return <span className="badge badge--hotspot">Hotspot</span>;
      case 'Hangat':
        return <span className="badge badge--hangat">Hangat</span>;
      case 'Neutral':
        return <span className="badge badge--neutral">Neutral</span>;
      default:
        return <span className="badge badge--neutral">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <FlashAlert />

      {/* Header */}
      <header className="mb-8">
        <p className="eyebrow">Dashboard Admin</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#272023]">
          Halo, <span>{user ? user.name : 'Administrator'}</span>
        </h1>
        <p className="text-base text-[#595155] mt-1.5">
          Halaman ini hanya dapat diakses oleh pengguna dengan peran admin.
        </p>
      </header>

      {/* Stat Chips Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="stat-chip">
            <b>38.4°</b>
            <span>LST puncak</span>
          </div>
        </div>
        <div className="card">
          <div className="stat-chip">
            <b>5</b>
            <span>hotspot aktif</span>
          </div>
        </div>
        <div className="card">
          <div className="stat-chip">
            <b>12</b>
            <span>prioritas RTH</span>
          </div>
        </div>
        <div className="card">
          <div className="stat-chip">
            <b>96</b>
            <span>artikel knowledge</span>
          </div>
        </div>
      </section>

      {/* Interactive Semarang Hotspot Heat Overview Banner */}
      <section className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#ECE4E8] shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="badge badge--hotspot mb-1">Peta Klaster Panas</span>
            <h3 className="text-xl font-bold font-display text-[#272023]">
              Matriks Distribusi Termal Kecamatan Kota Semarang
            </h3>
            <p className="text-xs text-[#595155]">
              Konsentrasi pulau panas perkotaan terkonsentrasi di kawasan pesisir dan pusat perekonomian.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 font-semibold text-[#5A2C40]">
              <span className="w-3 h-3 rounded-full bg-[#5A2C40]"></span> &gt;37°C Hotspot
            </span>
            <span className="flex items-center gap-1 font-semibold text-[#8A7E84] ml-2">
              <span className="w-3 h-3 rounded-full bg-[#EEDDE4]"></span> 33-37°C Hangat
            </span>
            <span className="flex items-center gap-1 font-semibold text-[#595155] ml-2">
              <span className="w-3 h-3 rounded-full bg-[#ECE4E8]"></span> &lt;33°C Neutral
            </span>
          </div>
        </div>

        {/* Heat intensity blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {wilayahList.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border text-center transition-all ${
                item.status === 'Hotspot'
                  ? 'bg-[#EEDDE4] border-[#ECE4E8]'
                  : item.status === 'Hangat'
                  ? 'bg-[#FEF3C7] border-[#FDE68A]'
                  : 'bg-[#F5F5F4] border-[#ECE4E8]'
              }`}
            >
              <span className="text-[11px] font-bold text-[#595155] truncate block">
                {item.wilayah}
              </span>
              <strong className="text-xl font-bold font-display text-[#272023] my-0.5 block">
                {item.lst}°C
              </strong>
              <span className="text-[10px] text-[#595155]">
                NDVI {item.ndvi}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Table 1: Wilayah LST & NDVI */}
      <section className="panel p-0 overflow-hidden mb-8 border border-[#ECE4E8]">
        <div className="p-5 sm:p-6 bg-white border-b border-[#ECE4E8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-display text-[#272023]">
              Pemantauan LST &amp; NDVI Wilayah
            </h3>
            <p className="text-xs text-[#595155] mt-0.5">
              Data spasial penginderaan jauh termal termutakhir Kota Semarang.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-[#FAF7F5] border border-[#ECE4E8] p-1 rounded-xl text-xs font-semibold">
              {(['Semua', 'Hotspot', 'Hangat', 'Neutral'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setWilayahFilter(st)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    wilayahFilter === st
                      ? 'bg-[#EEDDE4] text-[#5A2C40] font-bold shadow-xs'
                      : 'text-[#595155] hover:text-[#272023]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddWilayahModal(true)}
              className="btn btn--primary btn--small"
            >
              <Plus className="w-3.5 h-3.5" />
              Catat Pengamatan
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Wilayah</th>
                <th>Kategori</th>
                <th>LST</th>
                <th>NDVI</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredWilayah.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.wilayah}</strong>
                  </td>
                  <td>{item.kategori}</td>
                  <td>
                    <span className="font-bold text-[#272023] font-display">{item.lst}°C</span>
                  </td>
                  <td>{item.ndvi}</td>
                  <td>{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Table 2: Manajemen Pengguna & Tim KMS */}
      <section className="panel p-0 overflow-hidden border border-[#ECE4E8]">
        <div className="p-5 sm:p-6 bg-white border-b border-[#ECE4E8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-display text-[#272023]">
              Manajemen Pengguna &amp; Hak Akses
            </h3>
            <p className="text-xs text-[#595155] mt-0.5">
              Kelola peran admin dan staf dinas teknis Bappeda, DLH, PUPR, dan Perkim.
            </p>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="btn btn--outline btn--small cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Tambah Anggota
          </button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pengguna</th>
                <th>Email</th>
                <th>Peran</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-[#EEDDE4] text-[#5A2C40] flex items-center justify-center font-bold text-xs">
                        {u.initial}
                      </span>
                      <div>
                        <strong>{u.name}</strong>
                        <span className="text-[11px] text-[#8A7E84] block">{u.department}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-xs font-mono text-[#8A7E84]">{u.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.role === 'admin' ? 'badge--admin' : 'badge--neutral'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    {u.status === 'Aktif' ? (
                      <span className="badge pill--ok">Aktif</span>
                    ) : u.status === 'Menunggu' ? (
                      <span className="badge badge--menunggu">Menunggu</span>
                    ) : (
                      <span className="badge badge--neutral">Nonaktif</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateUserRole(u.id, u.role === 'admin' ? 'staff' : 'admin')
                        }
                        className="text-xs font-semibold text-[#6E3E53] hover:underline"
                        title="Ubah peran"
                      >
                        Jadikan {u.role === 'admin' ? 'Staff' : 'Admin'}
                      </button>
                      <span className="text-[#ECE4E8]">·</span>
                      <button
                        onClick={() =>
                          updateUserStatus(
                            u.id,
                            u.status === 'Aktif' ? 'Menunggu' : 'Aktif'
                          )
                        }
                        className="text-xs text-[#595155] hover:underline"
                      >
                        {u.status === 'Aktif' ? 'Tunda' : 'Aktifkan'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal: Tambah Pengamatan Wilayah */}
      {showAddWilayahModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#ECE4E8] relative animate-in fade-in">
            <button
              onClick={() => setShowAddWilayahModal(false)}
              className="absolute top-6 right-6 text-[#595155] hover:text-[#272023]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold font-display text-[#272023] mb-1">
              Catat Pengamatan Spasial
            </h3>
            <p className="text-xs text-[#595155] mb-5">
              Tambahkan data hasil citra satelit atau pengukuran stasiun cuaca.
            </p>

            <form onSubmit={handleAddWilayah} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#8A7E84] mb-1">
                  Nama Wilayah / Kecamatan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Pedurungan"
                  value={newWilayahName}
                  onChange={(e) => setNewWilayahName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#8A7E84] mb-1">
                  Kategori
                </label>
                <input
                  type="text"
                  placeholder="Misal: Hotspot inti / Pemantauan"
                  value={newWilayahCat}
                  onChange={(e) => setNewWilayahCat(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#8A7E84] mb-1">
                    LST (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="36.5"
                    value={newWilayahLst}
                    onChange={(e) => setNewWilayahLst(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#8A7E84] mb-1">
                    NDVI
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.15"
                    value={newWilayahNdvi}
                    onChange={(e) => setNewWilayahNdvi(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#8A7E84] mb-1">
                  Status
                </label>
                <select
                  value={newWilayahStatus}
                  onChange={(e) => setNewWilayahStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                >
                  <option value="Hotspot">Hotspot</option>
                  <option value="Hangat">Hangat</option>
                  <option value="Neutral">Neutral</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddWilayahModal(false)}
                  className="btn btn--ghost btn--small"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn--primary btn--small"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Undang Anggota Tim */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#ECE4E8] relative animate-in fade-in">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-6 right-6 text-[#595155] hover:text-[#272023]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold font-display text-[#272023] mb-1">
              Tambah Anggota Tim
            </h3>
            <p className="text-xs text-[#595155] mb-5">
              Berikan akses kolaborasi KMS kepada staf dinas terkait.
            </p>

            <form onSubmit={handleInviteUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#8A7E84] mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Joko DLH"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#8A7E84] mb-1">
                  Email Dinas
                </label>
                <input
                  type="email"
                  required
                  placeholder="nama@semarang.go.id"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#8A7E84] mb-1">
                  Instansi / Dinas
                </label>
                <input
                  type="text"
                  value={newUserDept}
                  onChange={(e) => setNewUserDept(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#8A7E84] mb-1">
                  Peran Akses
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full px-3 py-2 border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                >
                  <option value="staff">Staff (Akses Knowledge & Beranda)</option>
                  <option value="admin">Admin (Akses Penuh termasuk Dashboard)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="btn btn--ghost btn--small"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn--primary btn--small"
                >
                  Tambahkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
