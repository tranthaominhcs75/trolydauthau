import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types/procurement';
import { 
  X, 
  User, 
  Lock, 
  Calendar, 
  LogIn, 
  UserPlus, 
  CheckCircle2, 
  LogOut,
  Sparkles,
  AlertCircle,
  Save
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onUpdateUserExamDate?: (newDate: string) => void;
}

const DEFAULT_ACCOUNTS: UserProfile[] = [
  {
    id: 'user-demo-1',
    name: 'HocVienBunny',
    password: '123',
    targetExamDate: '2026-05-20',
    createdAt: Date.now() - 86400000 * 5,
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  onUpdateUserExamDate,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  // Default target date: 30 days from today
  const defaultDateStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  };
  const [regTargetDate, setRegTargetDate] = useState(defaultDateStr());
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // Profile edit target date state
  const [editTargetDate, setEditTargetDate] = useState('');
  const [dateUpdatedSuccess, setDateUpdatedSuccess] = useState(false);

  useEffect(() => {
    if (currentUser?.targetExamDate) {
      setEditTargetDate(currentUser.targetExamDate);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const getAccounts = (): UserProfile[] => {
    try {
      const saved = localStorage.getItem('bunny_registered_accounts');
      if (saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem('bunny_registered_accounts', JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const trimmedName = loginName.trim();
    if (!trimmedName) {
      setLoginError('Vui lòng nhập tên tài khoản.');
      return;
    }

    const accounts = getAccounts();
    const found = accounts.find(
      (acc) => acc.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (!found) {
      setLoginError('Tài khoản không tồn tại. Vui lòng đăng ký mới!');
      return;
    }

    if (found.password && found.password !== loginPassword) {
      setLoginError('Mật khẩu không chính xác.');
      return;
    }

    // Login successful
    onLogin(found);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    const trimmedName = regName.trim();
    if (!trimmedName) {
      setRegError('Vui lòng nhập tên tài khoản.');
      return;
    }

    const accounts = getAccounts();
    const isExisted = accounts.some(
      (acc) => acc.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isExisted) {
      setRegError('Tên này đã tồn tại, vui lòng chọn tên khác.');
      return;
    }

    const newAccount: UserProfile = {
      id: `user-${Date.now()}`,
      name: trimmedName,
      password: regPassword,
      targetExamDate: regTargetDate || defaultDateStr(),
      createdAt: Date.now(),
    };

    const updated = [...accounts, newAccount];
    try {
      localStorage.setItem('bunny_registered_accounts', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setRegSuccess('Tạo tài khoản thành công!');
    setTimeout(() => {
      onLogin(newAccount);
      onClose();
    }, 400);
  };

  const handleSaveDate = () => {
    if (!editTargetDate) return;
    if (onUpdateUserExamDate) {
      onUpdateUserExamDate(editTargetDate);
    }
    setDateUpdatedSuccess(true);
    setTimeout(() => setDateUpdatedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200/90 overflow-hidden relative">
        {/* iOS Grabber */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold border border-blue-100">
              🐰
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {currentUser ? 'Hồ sơ học viên' : 'Tài khoản ôn thi Bunny'}
              </h3>
              <p className="text-xs text-slate-500">
                Lưu tiến độ & đồng bộ lộ trình 395 câu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentUser ? (
            /* Logged-in Profile View */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-xs flex items-center justify-center text-xl font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Đang đăng nhập
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base truncate mt-1">
                    {currentUser.name}
                  </h4>
                </div>
              </div>

              {/* Target Exam Date setting */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/90 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Mục tiêu ngày thi dự kiến
                  </span>
                  {dateUpdatedSuccess && (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã cập nhật
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="date"
                    value={editTargetDate}
                    onChange={(e) => setEditTargetDate(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSaveDate}
                    type="button"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Lưu
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Bunny sẽ dùng ngày thi này để tính số ngày đếm ngược và chia trung bình số câu cần học mỗi ngày.
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={onLogout}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  Tiếp tục học tập
                </button>
              </div>
            </div>
          ) : (
            /* Auth Tabs: Only Login & Register */
            <div className="space-y-4">
              {/* Segmented Control */}
              <div className="flex p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setLoginError('');
                  }}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    tab === 'login' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('register');
                    setRegError('');
                  }}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    tab === 'register' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Đăng ký
                </button>
              </div>

              {tab === 'login' ? (
                /* LOGIN FORM */
                <form onSubmit={handleLoginSubmit} className="space-y-3.5 pt-1">
                  {loginError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tên tài khoản
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={loginName}
                        onChange={(e) => setLoginName(e.target.value)}
                        placeholder="Nhập tên tài khoản"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4" />
                    Đăng nhập ngay
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setTab('register');
                        setRegError('');
                      }}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Chưa có tài khoản? Đăng ký ngay 👉
                    </button>
                  </div>
                </form>
              ) : (
                /* REGISTER FORM */
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5 pt-1">
                  {regError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{regError}</span>
                    </div>
                  )}

                  {regSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>{regSuccess}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tên tài khoản
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Chọn tên tài khoản bất kỳ"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Không giới hạn quy tắc, chỉ cần chưa có người đặt tên này.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Nhập mật khẩu bất kỳ"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Không giới hạn độ dài hoặc ký tự đặc biệt.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mục tiêu ngày thi dự kiến
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="date"
                        required
                        value={regTargetDate}
                        onChange={(e) => setRegTargetDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Dùng để đếm ngược số ngày và tính trung bình số câu cần học mỗi ngày.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    Tạo tài khoản & Bắt đầu học
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setTab('login');
                        setLoginError('');
                      }}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Đã có tài khoản? Đăng nhập ngay 👉
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
