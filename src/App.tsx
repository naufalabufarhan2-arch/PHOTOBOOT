import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import { Camera, Download, RefreshCcw, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { templates, FrameTemplate } from './frames';

type AppState = 'select' | 'capture' | 'result';

export default function App() {
  const [appState, setAppState] = useState<AppState>('select');
  const [selectedTemplate, setSelectedTemplate] = useState<FrameTemplate | null>(null);
  const [photos, setPhotos] = useState<(string | null)[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  
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

  const handleStartPhoto = useCallback(() => {
    if (isCapturing || countdown !== null) return;
    setCountdown(3);
  }, [isCapturing, countdown]);

  // Handle Countdown
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Take photo
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
    }
  }, [countdown, currentPhotoIndex, selectedTemplate]);


  const handleDownload = async () => {
    if (resultRef.current) {
      try {
        const canvas = await html2canvas(resultRef.current, {
           scale: 2, // High quality
           useCORS: true,
           backgroundColor: null
        });
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `photobooth-${Date.now()}.png`;
        link.href = url;
        link.click();
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
        <h1 className="text-[24px] sm:text-[28px] font-black tracking-tighter text-[#4f46e5] uppercase flex items-center gap-2">
          PHOTOBOOTH TRE-PAGI A
        </h1>
        <div className="hidden sm:block font-semibold">Photobooth Web</div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:p-12">
        {/* State: SELECT */}
        {appState === 'select' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
          </div>
        )}

        {/* State: CAPTURE */}
        {appState === 'capture' && selectedTemplate && (
          <div className="animate-in fade-in duration-300 max-w-5xl mx-auto flex flex-col">
            <button 
              onClick={() => setAppState('select')}
              className="self-start mb-6 text-[#1e293b]/60 hover:text-[#4f46e5] flex items-center gap-2 transition-colors font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Frames
            </button>

            <div className="flex flex-col md:flex-row gap-5 items-start">
               {/* Left: Camera */}
               <div className="w-full md:w-8/12 flex flex-col items-center">
                  <div className="relative w-full rounded-[20px] overflow-hidden bg-black aspect-video shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: "user" }}
                      onUserMedia={() => setIsCameraReady(true)}
                      className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                    />

                    {/* Capturing Flash Overlay */}
                    {isCapturing && (
                      <div className="absolute inset-0 bg-white animate-in fade-in duration-100 z-50 mix-blend-overlay"></div>
                    )}

                    {/* Countdown Overlay */}
                    {countdown !== null && countdown > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/40 backdrop-blur-sm">
                          <span className="text-8xl font-bold text-white drop-shadow-2xl animate-bounce">
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

                  <div className="mt-8 flex flex-col items-center gap-4">
                     {countdown === null && isCameraReady && (
                       <button
                         onClick={handleStartPhoto}
                         className="flex items-center gap-3 bg-white border-[6px] border-[#4f46e5] text-[#1e293b] px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_0_4px_rgba(79,70,229,0.1)] transition-all active:scale-95"
                       >
                         <Camera className="w-6 h-6 text-[#4f46e5]" /> Take Photo {currentPhotoIndex + 1} of {selectedTemplate.photoCount}
                       </button>
                     )}
                     <p className="text-[#1e293b]/60 text-sm font-semibold">Make sure you are in a well-lit area.</p>
                  </div>
               </div>

               {/* Right: Live Frame Preview */}
               <div className="w-full md:w-1/3 flex flex-col items-center order-first md:order-last mb-8 md:mb-0">
                 <h3 className="text-[12px] uppercase font-bold tracking-[1px] mb-2 opacity-60 text-[#1e293b]">Live Preview</h3>
                 <div className="origin-top transform scale-75 md:scale-[0.6] lg:scale-75 pointer-events-none glass-panel overflow-hidden flex items-center justify-center p-4">
                    {selectedTemplate.render(photos, false)}
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* State: RESULT */}
        {appState === 'result' && selectedTemplate && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center">
            
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
            <div className="relative">
              <div ref={resultRef} className="origin-top shadow-2xl inline-block bg-white">
                 {/* Provide false to isPreview so it renders full size */}
                {selectedTemplate.render(photos, false)}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

