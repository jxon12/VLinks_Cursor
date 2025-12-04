import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 引入所有页面
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Capsule from './pages/Capsule';

// --- 内部组件：Splash Screen (电影级开屏动画) ---
const SplashScreen = () => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    // 稍微延迟 100ms 启动动画，确保 DOM 已挂载，避免动画丢失
    const timer = setTimeout(() => setStart(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden">
      
      {/* 1. 背景光效 (Cinematic Glow) */}
      <div className={`absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#FFF8F0] to-[#FDFBF7] transition-opacity duration-1000 ${start ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* 中心光源 - 模拟日出或希望 */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[100px] transition-all duration-[2000ms] ease-out ${start ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />

      {/* 2. Logo 核心动画容器 */}
      <div className="relative z-10 flex flex-col items-center">
          
          <div className="relative w-32 h-32 mb-8">
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                <defs>
                  {/* 高级奢华金渐变 */}
                  <linearGradient id="splashGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" /> {/* Amber 500 */}
                    <stop offset="50%" stopColor="#D97706" /> {/* Amber 600 */}
                    <stop offset="100%" stopColor="#92400E" /> {/* Amber 800 */}
                  </linearGradient>
                  {/* 柔光滤镜 */}
                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                </defs>
                
                {/* 左翼 (书写动画) */}
                <path 
                  d="M 60 50 C 60 50, 70 120, 100 170" 
                  stroke="url(#splashGold)" 
                  strokeWidth="14" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#softGlow)"
                  // 这里的 style 控制书写进度
                  style={{
                      strokeDasharray: 200,
                      strokeDashoffset: start ? 0 : 200,
                      transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                />
                
                {/* 右翼 (稍晚一点书写) */}
                <path 
                  d="M 140 50 C 140 50, 130 120, 100 170" 
                  stroke="url(#splashGold)" 
                  strokeWidth="14" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#softGlow)"
                  style={{
                      strokeDasharray: 200,
                      strokeDashoffset: start ? 0 : 200,
                      transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s' // 延迟 0.3s
                  }}
                />

                {/* 记忆粒子 (升腾动画) */}
                {/* 粒子 1 */}
                <circle cx="100" cy="170" r="0" fill="url(#splashGold)" 
                    style={{
                        r: start ? 8 : 0,
                        opacity: start ? 1 : 0,
                        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1s' // 弹性弹出
                    }}
                />
                {/* 粒子 2 (更小，飘得更高) */}
                <circle cx="100" cy="135" r="0" fill="url(#splashGold)" 
                    style={{
                        r: start ? 5 : 0,
                        opacity: start ? 0.8 : 0,
                        transform: start ? 'translateY(-5px)' : 'translateY(0)',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s'
                    }}
                />
                {/* 粒子 3 (最小，飘得最高) */}
                <circle cx="100" cy="110" r="0" fill="url(#splashGold)" 
                    style={{
                        r: start ? 3 : 0,
                        opacity: start ? 0.6 : 0,
                        transform: start ? 'translateY(-10px)' : 'translateY(0)',
                        transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s'
                    }}
                />
            </svg>
          </div>

          {/* 3. 品牌文字 (错落进场) */}
          <div className="text-center">
              <h1 
                className="font-serif text-4xl font-bold text-[#3D2E22] tracking-tight mb-3 overflow-hidden"
                style={{
                    opacity: start ? 1 : 0,
                    transform: start ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 1s ease-out 0.8s'
                }}
              >
                vlinks
              </h1>
              
              {/* Slogan with Lines */}
              <div 
                className="flex items-center justify-center gap-3"
                style={{
                    opacity: start ? 1 : 0,
                    transform: start ? 'scaleX(1)' : 'scaleX(0.8)',
                    transition: 'all 1s ease-out 1.2s'
                }}
              >
                  <div className="h-px w-6 bg-gradient-to-r from-transparent to-amber-300" />
                  <p className="text-[10px] text-[#8C7B68] uppercase tracking-[0.3em] font-medium whitespace-nowrap">
                    Beyond the Tombstone
                  </p>
                  <div className="h-px w-6 bg-gradient-to-l from-transparent to-amber-300" />
              </div>
          </div>
      </div>
    </div>
  );
};

// --- 主程序 ---
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3.5秒的展示时间，让用户有足够时间欣赏这个美丽的进场
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

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