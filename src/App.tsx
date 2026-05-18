import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { toPng } from 'html-to-image';
import { Camera, Download, RefreshCcw, ArrowLeft, Image as ImageIcon, FlipHorizontal } from 'lucide-react';
import { templates, FrameTemplate } from './frames';
import { motion, AnimatePresence } from 'motion/react';

type AppState = 'home' | 'select' | 'capture' | 'result';

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<FrameTemplate | null>(null);
  const [photos, setPhotos] = useState<(string | null)[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [useTimer, setUseTimer] = useState(true);
  const [isMirrored, setIsMirrored] = useState(false);
  
  const webcamRef = useRef<Webcam>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Helper to init capture sequence
  const startCaptureSequence = () => {
    if (!selectedTemplate) return;
    setAppState('capture');
    setPhotos(Array(selectedTemplate.photoCount).fill(null));
    setCurrentPhotoIndex(0);
    setIsCapturing(false);
    setCountdown(null);
    setIsCameraReady(false);
  };

  const capturePhoto = useCallback(() => {
    setIsCapturing(true);
    const imageSrc = webcamRef.current?.getScreenshot();
    
    if (imageSrc) {
      setPhotos(prev => {
        const newPhotos = [...prev];
        newPhotos[currentPhotoIndex] = imageSrc;
        return newPhotos;
      });

      setTimeout(() => {
        setIsCapturing(false);
        setCountdown(null);
        
        if (currentPhotoIndex < (selectedTemplate?.photoCount || 0) - 1) {
          setCurrentPhotoIndex(prev => prev + 1);
        } else {
          // Done capturing
          setAppState('result');
        }
      }, 500); // UI flash feedback duration
    }
  }, [currentPhotoIndex, selectedTemplate]);

  const handleStartPhoto = useCallback(() => {
    if (isCapturing || countdown !== null) return;
    if (useTimer) {
      setCountdown(3);
    } else {
      capturePhoto();
    }
  }, [isCapturing, countdown, useTimer, capturePhoto]);

  // Handle Countdown
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Take photo
      capturePhoto();
    }
  }, [countdown, capturePhoto]);


  const handleDownload = async () => {
    if (resultRef.current) {
      try {
        const url = await toPng(resultRef.current, {
           pixelRatio: 2, // High quality
           backgroundColor: 'transparent'
        });
        
        try {
          const link = document.createElement('a');
          link.download = `photobooth-${Date.now()}.png`;
          link.href = url;
          document.body.appendChild(link); // Required for some browsers
          link.click();
          document.body.removeChild(link);
        } catch (e) {
          console.error("Error triggering download natively:", e);
          // Fallback: open in new tab
          window.open(url, '_blank');
        }
      } catch (error) {
        console.error("Error downloading image", error);
        alert("Failed to save image. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen text-[#1e293b] selection:bg-[#4f46e5]/20 pb-12" style={{ background: 'radial-gradient(circle at 0% 0%, #fbc2eb 0%, #a6c1ee 100%)' }}>
      {/* Header */}
      <header className="h-[80px] flex items-center justify-between px-8 mb-6 glass-panel mx-4 lg:mx-8 mt-6 sticky top-6 z-50">
        <h1 
          onClick={() => setAppState('home')}
          className="text-[24px] sm:text-[28px] font-black tracking-tighter text-[#4f46e5] uppercase flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          PHOTOBOOTH TRE-PAGIA
        </h1>
        <div className="hidden sm:block font-semibold">Photobooth Web</div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
        <AnimatePresence mode="wait">
        {/* State: HOME */}
        {appState === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
             <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg mb-8 animate-bounce">
                <Camera className="w-16 h-16 text-[#4f46e5]" />
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-[#1e293b] mb-4 tracking-tighter shadow-sm text-balance uppercase">
                ABADIKAN MOMEN MU
             </h2>
             <p className="text-xl md:text-2xl text-[#1e293b]/80 mb-12 font-medium text-balance max-w-2xl uppercase">
                BERSAMA PHOTOBOOTH TRE-PAGIA
             </p>
             <button
               onClick={() => setAppState('select')}
               className="group relative inline-flex items-center justify-center gap-3 bg-[#4f46e5] text-white px-10 py-5 rounded-full font-bold text-2xl hover:bg-[#4338ca] hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all active:scale-95 overflow-hidden"
             >
               <span className="relative z-10 flex items-center gap-2">Get Started <ArrowLeft className="w-6 h-6 rotate-180 group-hover:translate-x-1 transition-transform" /></span>
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
             </button>
          </motion.div>
        )}

        {/* State: SELECT */}
        {appState === 'select' && (
          <motion.div 
            key="select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3 text-[#1e293b]">Choose a Frame Design</h2>
              <p className="text-[#1e293b]/70 font-medium">Select a layout to begin your photoshoot.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template);
                    startCaptureSequence();
                  }}
                  className="group flex flex-col items-center glass-panel overflow-hidden hover:border-[#4f46e5] hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all text-left w-full focus:outline-none focus:border-[#4f46e5]"
                >
                  <div className="w-full bg-white/20 p-4 min-h-[250px] flex items-center justify-center relative overflow-hidden rounded-t-[23px]">
                    <div className="scale-75 origin-center transition-transform group-hover:scale-95 duration-500">
                       {template.render(Array(template.photoCount).fill(null), true)}
                    </div>
                  </div>
                  <div className="p-4 w-full border-t border-white/40 flex items-center justify-between">
                     <span className="font-semibold text-lg text-[#1e293b]">{template.name}</span>
                     <span className="text-[#1e293b]/60 font-semibold text-sm flex items-center gap-1">
                        <ImageIcon className="w-4 h-4"/> {template.photoCount}
                     </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* State: CAPTURE */}
        {appState === 'capture' && selectedTemplate && (
          <motion.div 
            key="capture"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full mx-auto flex flex-col"
          >
            <button 
              onClick={() => setAppState('select')}
              className="self-start mb-6 text-[#1e293b]/60 hover:text-[#4f46e5] flex items-center gap-2 transition-colors font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Frames
            </button>

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
               {/* Left: Camera */}
               <div className="w-full lg:w-[60%] flex flex-col items-center">
                  <div className="relative w-full rounded-[24px] border-[6px] border-white overflow-hidden bg-black aspect-[4/3] max-w-2xl mx-auto shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: "user", aspectRatio: 4/3 }}
                      onUserMedia={() => setIsCameraReady(true)}
                      mirrored={isMirrored}
                      className="w-full h-full object-cover"
                    />

                    {/* Capturing Flash Overlay */}
                    {isCapturing && (
                      <div className="absolute inset-0 bg-white animate-flash z-50 mix-blend-overlay"></div>
                    )}

                    {/* Countdown Overlay */}
                    {countdown !== null && countdown > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/40 backdrop-blur-sm transition-all duration-300">
                          <span key={countdown} className="text-[120px] md:text-[180px] font-black text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-countdown">
                            {countdown}
                          </span>
                      </div>
                    )}
                    
                    {/* Loading State */}
                    {!isCameraReady && (
                       <div className="absolute inset-0 bg-[#e2e8f0] flex items-center justify-center z-30">
                          <span className="text-[#1e293b]/50 animate-pulse font-bold">Starting camera...</span>
                       </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-col items-center gap-4 bg-white/50 p-6 rounded-3xl shadow-sm backdrop-blur-md w-full">
                     {countdown === null && isCameraReady && (
                       <div className="flex flex-col items-center gap-6">
                         <button
                           onClick={handleStartPhoto}
                           className="flex items-center gap-3 bg-white border-[6px] border-[#4f46e5] text-[#1e293b] px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_0_4px_rgba(79,70,229,0.1)] hover:scale-105 transition-all active:scale-95 duration-200"
                         >
                           <Camera className="w-6 h-6 text-[#4f46e5]" /> Take Photo {currentPhotoIndex + 1} of {selectedTemplate.photoCount}
                         </button>
                         <div className="flex flex-wrap items-center justify-center gap-6 text-[#1e293b]/70 font-semibold">
                           <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setUseTimer(!useTimer)}>
                              <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${useTimer ? 'bg-[#4f46e5]' : 'bg-gray-300'}`}>
                                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${useTimer ? 'translate-x-4' : 'translate-x-0'}`}></div>
                              </div>
                              <span>3s Timer</span>
                           </div>
                           <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setIsMirrored(!isMirrored)}>
                              <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${isMirrored ? 'bg-[#4f46e5]' : 'bg-gray-300'}`}>
                                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isMirrored ? 'translate-x-4' : 'translate-x-0'}`}></div>
                              </div>
                              <span className="flex items-center gap-1"><FlipHorizontal className="w-4 h-4" /> Mirror</span>
                           </div>
                         </div>
                       </div>
                     )}
                     <p className="text-[#1e293b]/60 text-sm font-semibold">Make sure you are in a well-lit area.</p>
                  </div>
               </div>

               {/* Right: Live Frame Preview */}
               <div className="w-full lg:w-[40%] flex flex-col items-center order-first lg:order-last mb-8 lg:mb-0 z-10">
                 <h3 className="text-[12px] uppercase font-bold tracking-[2px] mb-4 opacity-70 text-[#1e293b] bg-white/60 px-6 py-2 rounded-full shadow-sm">Live Preview</h3>
                 <div className="w-full relative aspect-[3/4] max-w-[420px] rounded-2xl glass-panel shadow-sm flex items-center justify-center overflow-hidden">
                     <div className="transform scale-[0.4] sm:scale-[0.5] md:scale-[0.55] lg:scale-[0.45] xl:scale-[0.55] pointer-events-none origin-center">
                       <div className="shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden shrink-0">
                           {selectedTemplate.render(photos, false)}
                       </div>
                     </div>
                 </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* State: RESULT */}
        {appState === 'result' && selectedTemplate && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            
            <div className="mb-8 flex gap-4">
               <button
                onClick={() => setAppState('select')}
                className="flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-white/40 transition-colors font-bold text-[#1e293b]"
              >
                <RefreshCcw className="w-5 h-5" /> Retake Photos
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#4f46e5] text-white hover:bg-[#4338ca] transition-colors font-bold shadow-[0_8px_32px_rgba(79,70,229,0.3)]"
              >
                <Download className="w-5 h-5" /> Download Image
              </button>
            </div>

            {/* The Final Rendered Output */}
            <div className="w-full max-w-4xl mx-auto flex justify-center pb-24 overflow-visible">
              <div className="transform scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.9] origin-top pointer-events-none">
                <div ref={resultRef} className="shadow-[0_20px_50px_rgba(0,0,0,0.3)] inline-block bg-white rounded-lg overflow-hidden font-sans">
                   {/* Provide false to isPreview so it renders full size */}
                  {selectedTemplate.render(photos, false)}
                </div>
              </div>
            </div>

          </motion.div>
        )}
        </AnimatePresence>
      </main>
    </div>
  );
}

