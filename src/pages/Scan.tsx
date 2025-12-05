import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ScanLine, Search, Loader2, Zap, AlertCircle } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner'; // 使用新库

export default function Scan() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 处理扫描结果
  const handleScan = (result: any) => {
    if (result) {
      // 新库返回的结果通常在 result[0].rawValue 里
      const scannedText = result[0]?.rawValue;
      if (!scannedText) return;
      
      console.log("Scanned:", scannedText);
      
      if (loading) return; // 防抖

      // 解析逻辑
      let capsuleId = scannedText;
      if (scannedText.includes('/capsule/')) {
          const parts = scannedText.split('/capsule/');
          if (parts.length > 1) {
              capsuleId = parts[1].replace(/\/$/, ""); 
          }
      }

      if (capsuleId) {
          setLoading(true);
          // 震动反馈
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
    setError("Camera error. Please simplify permission.");
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
          <div className="w-full h-full relative">
              {/* 新扫描组件 */}
              <Scanner 
                  onScan={handleScan}
                  onError={handleError}
                  components={{ 
                      audio: false, // 关闭声音提示
                      finder: false // 关闭自带的取景框，我们用自己设计的
                  }}
                  styles={{
                      container: { height: '100%', width: '100%' },
                      video: { objectFit: 'cover', height: '100%', width: '100%' }
                  }}
              />
              
              {/* 深色遮罩，让画面看起来更高级 */}
              <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* 扫描线动画 */}
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
              
              {error && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
                      <AlertCircle className="text-red-400 mb-2" />
                      <p className="text-xs text-white/80">{error}</p>
                  </div>
              )}
          </div>
          <p className="mt-6 text-xs text-white/90 font-medium drop-shadow-md bg-black/30 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              Align QR Code within frame
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
```

### 第三步：重启服务器

为了确保依赖生效，建议你在终端里按 `Ctrl + C` 停止服务，然后重新运行：

```bash
npm run dev