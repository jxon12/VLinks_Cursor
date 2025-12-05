import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';

// 复用 Logo 组件保持一致
const MoltenVLogo = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
    <defs>
      <linearGradient id="premiumGold" x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="40%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
    </defs>
    <path d="M 32 32 L 50 72 L 68 38" stroke="url(#premiumGold)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="78" cy="30" r="7" fill="url(#premiumGold)" />
    <circle cx="88" cy="18" r="4" fill="url(#premiumGold)" opacity="0.9" />
  </svg>
);

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // 逻辑修正：注册后直接去 Onboarding (趁热打铁)
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#FDFBF7] font-sans text-[#4A3F35]">
      <div className="w-full max-w-[430px] min-h-screen relative flex flex-col px-7 bg-[#FDFBF7] overflow-hidden">
        
        <div className="absolute top-[-150px] right-[-50px] w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-orange-100/30 rounded-full blur-[60px] pointer-events-none" />

        <header className="relative z-10 pt-8 pb-4">
          <button onClick={() => navigate('/')} className="group flex items-center gap-1 text-[#8C7B68] hover:text-[#594A3C] transition-colors">
            <div className="w-8 h-8 rounded-full border border-[#EBE5DA] flex items-center justify-center bg-white shadow-sm group-hover:bg-[#F5F2EB]">
                <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-medium ml-1">Back</span>
          </button>
        </header>

        <div className="relative z-10 flex-1 flex flex-col items-center pt-2">
          
          <div className="mb-8 flex flex-col items-center animate-fade-in">
             <div className="mb-4"><MoltenVLogo /></div>
             <h1 className="font-serif text-3xl font-bold text-[#3D2E22] tracking-tight mb-2">Create Account</h1>
             <p className="text-xs text-[#8C7B68] font-medium tracking-wide text-center max-w-[80%]">Start building a lasting memorial for your loved ones.</p>
          </div>

          <form onSubmit={handleSignup} className="w-full space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#594A3C] ml-1 uppercase tracking-wider">Full Name</label>
              <div className="relative group">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="peer w-full pl-4 pr-10 py-4 rounded-2xl bg-white border border-[#EBE5DA] text-[#3D2E22] placeholder:text-stone-300 text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100/50 transition-all shadow-sm" required />
                <div className="absolute right-4 top-4 text-[#D4C5B0] peer-focus:text-amber-500 transition-colors"><User size={18} /></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#594A3C] ml-1 uppercase tracking-wider">Email</label>
              <div className="relative group">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="peer w-full pl-4 pr-10 py-4 rounded-2xl bg-white border border-[#EBE5DA] text-[#3D2E22] placeholder:text-stone-300 text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100/50 transition-all shadow-sm" required />
                <div className="absolute right-4 top-4 text-[#D4C5B0] peer-focus:text-amber-500 transition-colors"><Mail size={18} /></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#594A3C] ml-1 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" className="peer w-full pl-4 pr-10 py-4 rounded-2xl bg-white border border-[#EBE5DA] text-[#3D2E22] placeholder:text-stone-300 text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100/50 transition-all shadow-sm" required minLength={8} />
                <div className="absolute right-4 top-4 text-[#D4C5B0] peer-focus:text-amber-500 transition-colors"><Lock size={18} /></div>
              </div>
            </div>

            <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-semibold text-sm shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 mt-6">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-[#594A3C] mt-auto mb-8 pb-4">
            Already have an account? <button onClick={() => navigate('/login')} className="text-[#D97706] hover:text-[#B45309] font-bold transition-colors">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
}