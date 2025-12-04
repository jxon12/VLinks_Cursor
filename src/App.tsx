import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 引入所有页面
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Capsule from './pages/Capsule';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. 公开区域 */}
        <Route path="/" element={<Landing />} />
        
        {/* 2. 认证区域 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 3. 核心功能区 (逻辑上需要登录才能看) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* 4. 胶囊详情页 (带参数，比如 /capsule/lim-ah-kow) */}
        {/* 目前为了演示方便，我们先用 /capsule 指向 Demo */}
        <Route path="/capsule" element={<Capsule />} />
        <Route path="/capsule/:id" element={<Capsule />} />

        {/* 404 - 如果乱输网址，跳回首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;