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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />

          {/* 新的艺术化 "V" Logo (更美观、更有意义) */}
          <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl relative z-10">
            <defs>
              <linearGradient id="splashGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* 主体 V 形 (左翼) */}
            <path 
              d="M 50 40 C 50 40, 60 100, 100 160" 
              stroke="url(#splashGold)" 
              strokeWidth="12" 
              strokeLinecap="round"
              filter="url(#glow)"
              className="animate-[draw_2s_ease-out_forwards]"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
            
            {/* 主体 V 形 (右翼) */}
            <path 
              d="M 150 40 C 150 40, 140 100, 100 160" 
              stroke="url(#splashGold)" 
              strokeWidth="12" 
              strokeLinecap="round"
              filter="url(#glow)"
              className="animate-[draw_2s_ease-out_forwards_0.5s]"
              strokeDasharray="200"
              strokeDashoffset="200"
            />

            {/* 上升的灵魂/光点 */}
            <circle cx="100" cy="160" r="8" fill="url(#splashGold)" className="animate-bounce-slow delay-1000" filter="url(#glow)" />
            <circle cx="100" cy="130" r="5" fill="url(#splashGold)" opacity="0.8" className="animate-pulse-slow delay-1200" filter="url(#glow)" />
            <circle cx="100" cy="105" r="3" fill="url(#splashGold)" opacity="0.6" className="animate-pulse-slow delay-1400" filter="url(#glow)" />
          </svg>
      </div>

      {/* 3. 品牌文字 */}
      <div className={`mt-8 text-center transition-all duration-1000 delay-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="font-serif text-4xl font-bold text-[#3D2E22] tracking-tight mb-2">vlinks</h1>
          <p className="text-xs text-[#8C7B68] uppercase tracking-[0.4em] font-medium">Beyond the Tombstone</p>
      </div>

    </div>
  );
};

// --- 主程序 ---
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3秒后关闭开屏页 (稍微延长以展示新动画)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

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