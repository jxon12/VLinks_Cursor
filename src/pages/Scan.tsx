import { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ScanLine, Search, Loader2, Zap, AlertCircle, Camera } from 'lucide-react';

// --- 关键修改：安全动态引入 ---
// 这样即使没有安装库，App 也不会直接白屏崩溃，而是显示 Fallback
// @ts-ignore
const QrScanner = lazy(() => import('react-qr-scanner').catch(() => {
    return { default: () => <div className="flex h-full items-center justify-center bg-black/80 text-white/50 text-xs">Scanner Library Not Found</div> };
}));

export default function Scan() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cameraPermission, setCameraPermission] = useState(true);
  const [isScannerLoaded, setIsScannerLoaded] = useState(false);

  // 检查库是否加载成功
  useEffect(() => {
    import('react-qr-scanner')
        .then(() => setIsScannerLoaded(true))
        .catch(() => {
            console.warn("React QR Scanner not installed. Run: npm install react-qr-scanner");
            setIsScannerLoaded(false);
        });
  }, []);

  const handleScan = (data: any) => {
    if (data && data.text) {
      const scannedText = data.text;
      // 防抖
      if (loading) return;

      // 解析逻辑: 提取 ID
      let capsuleId = scannedText;
      if (scannedText.includes('/capsule/')) {
          const parts = scannedText.split('/capsule/');
          if (parts.length > 1) {
              capsuleId = parts[1].replace(/\/$/, ""); 
          }
      }

      // 只有当看起来像有效 ID 时才跳转 (简单的长度检查)
      if (capsuleId && capsuleId.length > 2) {
          setLoading(true);
          // 震动反馈 (如果设备支持)
          if (navigator.vibrate) navigator.vibrate(200);
          
          setTimeout(() => {
              navigate(`/capsule/${capsuleId}`);
              setLoading(false);
          }, 500);
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    if (err?.name === 'NotAllowedError') {
        setCameraPermission(false);
        setError("Camera access denied.");
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code) return;
    navigate(`/capsule/${code}`);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden flex flex-col">
      
      {/* 1. 摄像头区域 */}
      <div className="absolute inset-0 z-0 bg-stone-900 flex items-center justify-center">
          {cameraPermission ? (
              <div className="w-full h-full relative">
                  {/* 使用 Suspense 包裹，防止白屏 */}
                  <Suspense fallback={
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
                          <Camera size={48} className="mb-2 animate-pulse" />
                          <p className="text-xs">Initializing Camera...</p>
                      </div>
                  }>
                      {isScannerLoaded ? (
                          <QrScanner
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            constraints={{
                                video: { facingMode: 'environment' } // 后置摄像头
                            }}
                          />
                      ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-800 text-white/50 px-6 text-center">
                              <AlertCircle size={32} className="mb-2 text-amber-500" />
                              <p className="text-sm font-bold text-white mb-1">Scanner Module Missing</p>
                              <p className="text-xs opacity-60">Please run <code>npm install react-qr-scanner</code> in terminal.</p>
                          </div>
                      )}
                  </Suspense>
                  
                  {/* 扫描时的深色遮罩 */}
                  <div className="absolute inset-0 bg-black/20" />
              </div>
          ) : (
              <div className="text-center p-6 text-white/50">
                  <AlertCircle className="mx-auto mb-2" />
                  <p className="text-sm">Camera access denied</p>
                  <button onClick={() => window.location.reload()} className="mt-4 text-xs bg-white/10 px-4 py-2 rounded-full">Retry Permission</button>
              </div>
          )}
          
          {/* 扫描线动画 (视觉装饰) */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-[scan_3s_linear_infinite]" />
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

      {/* 3. 扫描取景框 (覆盖层) */}
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
          <p className="mt-6 text-xs text-white/90 font-medium drop-shadow-md bg-black/30 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              Align QR Code within frame
          </p>
      </div>

      {/* 4. 手动输入区域 (Fallback) */}
      <div className="relative z-20 bg-[#FDFBF7] rounded-t-[32px] p-8 pb-12 shadow-2xl animate-slide-up">
          <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-6" />
          
          <h2 className="font-serif text-2xl text-[#3D2E22] mb-2 text-center">Find a Memory</h2>
          <form onSubmit={handleSearch} className="relative mt-4">
              <input 
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Or enter ID (e.g. lim-ah-kow)" 
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