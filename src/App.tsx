import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 引入所有页面
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Capsule from './pages/Capsule';

// --- 内部组件：Splash Screen (开屏动画) ---
const SplashScreen = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // 触发进场动画
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7] transition-opacity duration-700">
      
      {/* 1. 背景氛围光 */}
      <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-gradient-to-br from-amber-100/20 via-transparent to-transparent animate-pulse-slow pointer-events-none" />
      
      {/* 2. Logo 容器 */}
      <div className={`relative transition-all duration-1000 transform ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'}`}>
          
          {/* Logo 背后的光晕 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />

          {/* Molten V Logo (大尺寸版) */}
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl relative z-10">
            <defs>
              <linearGradient id="splashGold" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
            </defs>
            <path 
              d="M 32 32 L 50 72 L 68 38" 
              stroke="url(#splashGold)" 
              strokeWidth="16" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-[draw_2s_ease-out_forwards]" // 可选：如果你想要描边动画，可以在 CSS 加 keyframes
            />
            <circle cx="78" cy="30" r="7" fill="url(#splashGold)" className="animate-bounce delay-75" />
            <circle cx="88" cy="18" r="4" fill="url(#splashGold)" opacity="0.9" className="animate-bounce delay-150" />
          </svg>
      </div>

      {/* 3. 品牌文字 */}
      <div className={`mt-8 text-center transition-all duration-1000 delay-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="font-serif text-3xl font-bold text-[#3D2E22] tracking-tight mb-1">vlinks</h1>
          <p className="text-[10px] text-[#8C7B68] uppercase tracking-[0.3em] font-medium">Beyond the Tombstone</p>
      </div>

    </div>
  );
};

// --- 主程序 ---
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2.5秒后关闭开屏页
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // 如果正在加载，只显示 Splash Screen
  if (loading) {
    return <SplashScreen />;
  }

  // 加载完成后，显示路由
  return (
    <Router>
      <Routes>
        {/* 1. 公开区域 */}
        <Route path="/" element={<Landing />} />
        
        {/* 2. 认证区域 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 3. 核心功能区 */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* 4. 胶囊详情页 */}
        <Route path="/capsule" element={<Capsule />} />
        <Route path="/capsule/:id" element={<Capsule />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;