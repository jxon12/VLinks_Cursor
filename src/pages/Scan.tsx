import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ScanLine, Search, Loader2, Zap, AlertCircle } from 'lucide-react';
// @ts-ignore
import QrScanner from 'react-qr-scanner'; // 引入真实扫描库

export default function Scan() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cameraPermission, setCameraPermission] = useState(true);

  // 处理扫描结果
  const handleScan = (data: any) => {
    if (data && data.text) {
      const scannedText = data.text;
      console.log("Scanned:", scannedText);
      
      // 1. 简单的防抖：如果正在跳转中，忽略
      if (loading) return;

      // 2. 解析逻辑
      // 情况 A: 扫到了完整链接 "https://vlinks.app/capsule/lim-ah-kow"
      // 情况 B: 扫到了纯 ID "lim-ah-kow"
      let capsuleId = scannedText;
      
      if (scannedText.includes('/capsule/')) {
          const parts = scannedText.split('/capsule/');
          if (parts.length > 1) {
              capsuleId = parts[1].replace(/\/$/, ""); // 去掉末尾斜杠
          }
      }

      // 3. 执行跳转
      setLoading(true);
      // 模拟一点延迟让用户看到"识别成功"的反馈
      setTimeout(() => {
          navigate(`/capsule/${capsuleId}`);
          setLoading(false);
      }, 500);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    // 简单的错误处理，可能是权限被拒绝
    if (err?.name === 'NotAllowedError') {
        setCameraPermission(false);
        setError("Camera access denied. Please enable permissions.");
    }
  };

  // 手动输入搜索
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code) return;
    navigate(`/capsule/${code}`);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden flex flex-col">
      
      {/* 1. 真实摄像头背景 */}
      <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
          {cameraPermission ? (
              <div className="w-full h-full relative">
                  <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    constraints={{
                        video: { facingMode: 'environment' } // 优先使用后置摄像头
                    }}
                  />
                  {/* 扫描时的覆盖层，增加科技感 */}
                  <div className="absolute inset-0 bg-black/10" />
              </div>
          ) : (
              <div className="text-center p-6 text-white/50">
                  <AlertCircle className="mx-auto mb-2" />
                  <p className="text-sm">Camera unavailable</p>
              </div>
          )}
          
          {/* 扫描线动画 (叠加在视频之上) */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-[scan_3s_linear_infinite]" />
          </div>
      </div>

      {/* 2. 顶部导航 */}
      <header className="relative z-20 px-6 pt-8 pb-4 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-white/80 drop-shadow-md">Memory Lens</span>
        <div className="w-10" /> 
      </header>

      {/* 3. 扫描取景框 (UI Overlay) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pointer-events-none">
          <div className="relative w-64 h-64 border-2 border-white/30 rounded-[32px] flex items-center justify-center overflow-hidden">
              {/* 四角装饰 */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-amber-500 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-amber-500 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-amber-500 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-amber-500 rounded-br-xl" />
              
              {loading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                      <Loader2 className="animate-spin text-amber-500" size={48} />
                  </div>
              )}
          </div>
          <p className="mt-4 text-xs text-white/80 font-medium drop-shadow-md bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              Point at a vlinks QR Code
          </p>
      </div>

      {/* 4. 手动输入区域 */}
      <div className="relative z-20 bg-[#FDFBF7] rounded-t-[32px] p-8 pb-12 shadow-2xl animate-slide-up">
          <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-6" />
          
          <h2 className="font-serif text-2xl text-[#3D2E22] mb-2 text-center">Find a Memory</h2>
          <form onSubmit={handleSearch} className="relative mt-4">
              <input 
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. lim-ah-kow" 
                  className="w-full pl-5 pr-14 py-4 rounded-2xl bg-white border border-[#EBE5DA] text-[#3D2E22] text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100/50 shadow-inner transition-all"
              />
              <button 
                  type="submit"
                  disabled={!code || loading}
                  className="absolute right-2 top-2 w-10 h-10 bg-[#3D2E22] rounded-xl flex items-center justify-center text-white shadow-md disabled:opacity-50 transition-transform active:scale-95"
              >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              </button>
          </form>
          
          <div className="mt-4 flex justify-center">
             <button onClick={() => { setCode('lim-ah-kow'); }} className="text-[10px] font-bold text-amber-600 flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors">
                <Zap size={12} /> Test Code: "lim-ah-kow"
             </button>
          </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
```

### 2. 确认 QR Code 生成逻辑 (`Dashboard.tsx` 和 `Capsule.tsx`)

**注意：** 之前的代码中，QR Code 生成的 URL 是：
`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://vlinks.app/capsule/lim-ah-kow...`

这个逻辑是**完全正确**的。
当你在 `Scan.tsx` 用摄像头扫这个码时，`react-qr-scanner` 会读取到 `https://vlinks.app/capsule/lim-ah-kow` 这串文字。
我的 `Scan.tsx` 代码里已经加了逻辑：
```typescript
if (scannedText.includes('/capsule/')) {
    // 自动提取 lim-ah-kow 并跳转
}