import React from 'react';
import { cn } from './lib/utils';
import { Barcode, Camera as CameraIcon } from 'lucide-react';

export type FrameTemplate = {
  id: string;
  name: string;
  photoCount: number;
  render: (photos: (string | null)[], isPreview?: boolean) => React.ReactNode;
};

export const templates: FrameTemplate[] = [
  {
    id: 'una-grid',
    name: 'Una Maroon (2x4)',
    photoCount: 8,
    render: (photos, isPreview = false) => (
      <div className={cn("relative bg-[#491b1a] flex flex-col justify-between font-sans shadow-2xl",
        isPreview ? "w-full p-2 gap-2" : "w-[600px] p-6 gap-6"
      )}>
        <div className={cn("grid grid-cols-2 flex-grow z-10", isPreview ? "gap-2" : "gap-6")}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={cn("bg-white overflow-hidden flex items-center justify-center relative", isPreview ? "rounded-sm" : "rounded-2xl")} style={{ aspectRatio: '4/3' }}>
              {photos[i] ? (
                <img src={photos[i]!} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-300">Photo {i+1}</div>
              )}
            </div>
          ))}
        </div>

        <div className={cn("flex justify-around items-end text-white text-center italic", isPreview ? "mt-1 pb-1" : "mt-2 pb-2")}>
          <div className="flex flex-col items-center">
            <span className={cn("font-serif", isPreview ? "text-[6px]" : "text-xl")}>self photo</span>
            <span className={cn("font-black font-sans not-italic leading-none", isPreview ? "text-[10px]" : "text-3xl")}>UNA</span>
          </div>
          <div className="flex flex-col items-center">
            <span className={cn("font-serif", isPreview ? "text-[6px]" : "text-xl")}>self photo</span>
            <span className={cn("font-black font-sans not-italic leading-none", isPreview ? "text-[10px]" : "text-3xl")}>UNA</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'kicau-mania',
    name: 'Kicau Mania News',
    photoCount: 2,
    render: (photos, isPreview = false) => (
      <div className={cn("relative bg-[#ececec] flex flex-col font-serif outline outline-1 outline-offset-4 outline-[#222]",
        isPreview ? "w-full text-[8px] p-2 border border-gray-300" : "w-[600px] text-base p-8 border-4 border-gray-300 border-double shadow-2xl"
      )} style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(235, 235, 235, 0.95)' }}>
        
        {/* Header Decor */}
        <div className="text-center w-full uppercase">
           <div className={cn("font-black tracking-[0.2em] border border-black inline-block", isPreview ? "text-[4px] px-1" : "text-[10px] px-2 py-1")}>JEPRETO</div>
           <div className={cn("w-full border-t border-b border-black mt-2", isPreview ? "border-t-[1px] border-b-[1px] py-1" : "border-t-[3px] border-b-[3px] py-4 mt-6")}>
              <h2 className={cn("font-bold tracking-widest text-[#222] flex items-center justify-center gap-2", isPreview ? "text-xs" : "text-2xl")}>
                <span className={cn("bg-black", isPreview ? "w-4 h-[2px]" : "w-12 h-2")}></span>
                FENOMENA
                <span className={cn("bg-black", isPreview ? "w-4 h-[2px]" : "w-12 h-2")}></span>
              </h2>
              <h1 className={cn("font-black tracking-tighter text-[#111] leading-none mt-1", isPreview ? "text-2xl" : "text-7xl")} style={{ transform: 'scaleY(1.1)' }}>
                KICAU MANIA
              </h1>
           </div>
           
           <div className={cn("flex justify-between items-center font-bold text-[#333] mt-2 italic", isPreview ? "text-[5px]" : "text-sm mt-4")}>
              <span className={cn("border border-black", isPreview ? "px-1" : "px-3 py-1")}>DAILY REPORT</span>
              <span className={cn(isPreview ? "text-xs" : "text-2xl")}>"Kicau, kicau, kicau maniaaaa"</span>
              <span className={cn("border border-black", isPreview ? "px-1" : "px-3 py-1")}>26 MAY 2025</span>
           </div>
        </div>
        
        {/* Main large photo */}
        <div className={cn("bg-white border-2 border-[#222] w-full overflow-hidden grayscale mt-4 rotate-[1deg]", isPreview ? "mt-2 p-[2px]" : "p-2 mt-8")}>
           <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
             {photos[0] ? (
                <img src={photos[0]!} alt="Main Photo" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 bg-gray-200 w-full h-full flex items-center justify-center">Main Cover Photo</div>
              )}
           </div>
        </div>

        {/* Text and small photo */}
        <div className={cn("flex items-start mt-4", isPreview ? "gap-2 mt-2" : "gap-8 mt-8")}>
           <div className="w-1/2 flex flex-col">
              <p className={cn("text-[#333] font-medium leading-tight text-justify drop-shadow-sm", isPreview ? "text-[4px]" : "text-sm")}>
                 Di sebuah bilik foto kawasan Blok M sore ini, sekelompok remaja tertangkap basah mengalami brain freeze massal. Berdasarkan rekaman CCTV, awalnya mereka berniat melakukan pose garang dan edgy ala "Info Kicau Mania". Namun secara tiba-tiba, khodam burung joget mengambil alih kesadaran mereka.
                 <br/><br/>
                 Bukannya memancarkan aura jomok yang estetik, isi kepala mereka diduga kuat nge-lag dan hanya memutar lagu "Chipi chipi chapa chapa".
              </p>
           </div>
           
           <div className="w-1/2 flex flex-col items-center justify-center">
              <div className={cn("bg-white border-2 border-[#222] shadow-[4px_4px_0_0_rgba(0,0,0,1)] w-full overflow-hidden rotate-[-2deg]", isPreview ? "p-[2px]" : "p-2")}>
                 <div className="relative w-full grayscale" style={{ aspectRatio: '4/3' }}>
                   {photos[1] ? (
                      <img src={photos[1]!} alt="Photo 2" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400 bg-gray-200 w-full h-full flex items-center justify-center">Photo 2</div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'lizard-grid',
    name: 'Tom Lizard (2x3)',
    photoCount: 6,
    render: (photos, isPreview = false) => (
      <div className={cn("relative bg-[#3b5d3a] flex flex-col font-sans",
        isPreview ? "w-full p-2 h-[450px]" : "w-[600px] p-6 h-[850px]"
      )}>
        {/* Header Decor */}
        <div className={cn("flex justify-between items-start", isPreview ? "mb-1" : "mb-4")}>
           <h1 className={cn("text-[#fbd245] font-bold tracking-tighter", isPreview ? "text-3xl" : "text-7xl")} style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
             hello
           </h1>
           <span className="text-[#a5b95a] font-bold" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>arr_crop</span>
        </div>
        
        {/* Photo Grid */}
        <div className={cn("grid grid-cols-2 flex-grow z-10", isPreview ? "gap-2" : "gap-4")}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white overflow-hidden flex items-center justify-center relative shadow-sm" style={{ aspectRatio: '4/3' }}>
              {photos[i] ? (
                <img src={photos[i]!} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-300 font-bold uppercase tracking-widest text-xs">Photo {i+1}</div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Decor */}
        <div className={cn("flex justify-between items-end", isPreview ? "mt-2 mb-2" : "mt-6 mb-4")}>
           <div className={cn("text-[#fbd245] font-bold leading-none transform -rotate-6", isPreview ? "text-lg" : "text-5xl")} style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
              Tom<br/>
              <span className={cn("ml-4", isPreview ? "ml-2" : "")}>Lizard</span>
           </div>
           <div className={cn("text-[#fbd245] font-bold transform -rotate-12", isPreview ? "text-[8px]" : "text-2xl")} style={{ fontFamily: 'Impact, sans-serif' }}>
              HALWELWELWE<br/>WLEWLELWELW
           </div>
        </div>
      </div>
    ),
  },
  {
    id: 'the-1975-newspaper',
    name: 'The 1975 News',
    photoCount: 2,
    render: (photos, isPreview = false) => (
      <div className={cn("relative bg-[#f4f4f4] flex flex-col font-serif border-[1px] border-[#222]",
        isPreview ? "w-full text-[8px] p-2" : "w-[600px] text-base p-6"
      )} style={{ backgroundImage: 'radial-gradient(circle, #bbb 1px, transparent 1px)', backgroundSize: '8px 8px', backgroundBlendMode: 'multiply', backgroundColor: 'rgba(244, 244, 244, 0.98)' }}>
        
        {/* Header Details */}
        <div className={cn("w-full flex justify-between uppercase font-bold text-[#111]", isPreview ? "text-[4px] mb-2" : "text-[10px] mb-6")}>
          <div className={cn("border border-[#222] text-center", isPreview ? "p-[2px]" : "p-2")}>
            "VOICES OF THE<br/>MODERN WORLD"
          </div>
          <h1 className={cn("font-serif tracking-tighter text-[#111]", isPreview ? "text-3xl" : "text-7xl")} style={{fontFamily: '"Times New Roman", Times, serif', textShadow: isPreview ? 'none' : '2px 2px 0px rgba(0,0,0,0.1)'}}>
            The 1975
          </h1>
          <div className={cn("border border-[#222]", isPreview ? "text-[3px] w-12 p-[2px]" : "w-32 p-1 text-[8px]")}>
            <b>EDITOR'S EDITION</b><br/>
            This newspaper contains information about the song "About You" by The 1975.
          </div>
        </div>

        {/* Sub Header */}
        <div className={cn("flex justify-between items-center text-[#222] font-black border-y-2 border-[#222]", isPreview ? "text-[4.5px] py-[2px] mt-2 mb-2" : "text-xs py-2 mt-2 mb-6")}>
           <span>VOL. 1... NO. 5</span>
           <span>*</span>
           <span>GAYAPOTRETPADANG.ID</span>
           <span>*</span>
           <span>01 JAN 2026</span>
        </div>

        {/* Big Title */}
        <div className="text-center w-full">
           <h1 className={cn("font-black tracking-tighter text-[#111] leading-none", isPreview ? "text-4xl" : "text-[110px]")} style={{ transform: 'scaleY(1.3)', fontFamily: 'Impact, sans-serif' }}>
             ABOUT YOU
           </h1>
           <h2 className={cn("font-serif font-bold italic text-[#222] uppercase tracking-widest", isPreview ? "text-[5px] mt-2" : "text-lg mt-8")}>
             Lagu About You Menceritakan Tentang Nostalgia Dan<br/>Kerinduan Seseorang Terhadap Mantan Kekasihnya.
           </h2>
        </div>
        
        {/* Main large photo */}
        <div className={cn("bg-white border-[3px] border-[#222] w-full overflow-hidden", isPreview ? "mt-2" : "mt-6")}>
           <div className="relative w-full" style={{ aspectRatio: '21/9' }}>
             {photos[0] ? (
                <img src={photos[0]!} alt="Main Photo" className="w-full h-full object-cover grayscale brightness-90 contrast-125" />
              ) : (
                <div className="text-gray-400 bg-gray-200 w-full h-full flex items-center justify-center font-bold">Main Photo (Ultra Wide)</div>
              )}
           </div>
        </div>

        {/* Quote */}
        <div className={cn("text-center font-serif text-[#222] font-bold border-t border-b border-[#222]", isPreview ? "text-[8px] py-1 mt-2 mb-2" : "text-2xl py-3 mt-6 mb-6")}>
           "DO YOU THINK I HAVE FORGOTTEN ABOUT YOU?"
        </div>

        {/* Bottom Columns */}
        <div className={cn("flex items-start", isPreview ? "gap-2" : "gap-6")}>
           <div className="w-1/3 flex flex-col text-justify font-serif text-[#333]">
              <p className={cn("leading-tight", isPreview ? "text-[4px]" : "text-xs")}>
                 I know a place. It's somewhere I go when I need to remember your face. We get married in our heads. Something to do whilst we try to recall how we met. Do you think I have forgotten? Do you think I have forgotten? Do you think I have forgotten about you? You and I. Were alive. With nothing to do I could lay and just look in your eyes. Wait and pretend. Hold on and hope that we'll find our way back in the end.
              </p>
           </div>
           
           <div className="w-1/3 flex flex-col text-justify font-serif text-[#333]">
              <p className={cn("leading-tight", isPreview ? "text-[4px]" : "text-xs")}>
                 Do you think I have forgotten? Do you think I have forgotten? Do you think I have forgotten about you? Do you think I have forgotten? Do you think I have forgotten? Do you think I have forgotten about you? There was something about you that now I can't remember. It's the same damn thing that made my heart surrender. And I'll miss you on a train. I'll miss you in the morning. I never know what to think about, so think about you.
              </p>
           </div>

           <div className="w-1/3 flex flex-col items-center">
              <div className={cn("bg-white border-2 border-[#222] w-full p-2 text-center", isPreview ? "p-[2px]" : "p-2")}>
                 <div className="relative w-full border border-[#222]" style={{ aspectRatio: '3/4' }}>
                   {photos[1] ? (
                      <img src={photos[1]!} alt="Photo 2" className="w-full h-full object-cover grayscale brightness-90 contrast-125" />
                    ) : (
                      <div className="text-gray-400 bg-gray-200 w-full h-full flex items-center justify-center font-bold text-[8px]">Photo 2</div>
                    )}
                 </div>
                 <div className={cn("font-serif mt-1", isPreview ? "text-[4px]" : "text-xs")}>The 1975<br/>About You</div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'zootopia-strip',
    name: 'Blue Sky Strip',
    photoCount: 3,
    render: (photos, isPreview = false) => (
      <div className={cn("relative flex flex-col items-center overflow-hidden", 
        isPreview ? "w-full p-2 h-[450px]" : "w-[350px] p-8 h-[950px]"
      )}
      style={{
        background: 'linear-gradient(to bottom, #113651, #3672a9, #7cbbe1)',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E"), linear-gradient(to bottom, #113651, #3672a9, #7cbbe1)',
      }}
      >
        {/* Clouds Base */}
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 right-0 w-[200%] h-48 bg-white opacity-40 blur-3xl rounded-full translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute top-1/3 left-0 w-64 h-32 bg-white opacity-20 blur-2xl rounded-full -translate-x-1/4"></div>
        </div>

        {/* Fake Character Placeholders since we don't have images */}
        <div className="absolute top-0 right-0 z-20 text-6xl drop-shadow-2xl translate-y-[-20%] translate-x-[20%]">🦊</div>
        <div className="absolute top-0 left-0 z-20 text-6xl drop-shadow-2xl translate-y-[-10%] translate-x-[-10%]">🐰</div>

        {/* Photo Strip */}
        <div className={cn("w-full z-10 flex flex-col h-full justify-between items-center", isPreview ? "gap-2" : "gap-4")}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={cn("bg-white overflow-hidden flex items-center justify-center relative shadow-xl w-full", isPreview ? "rounded-lg" : "rounded-3xl")} style={{ aspectRatio: '4/3' }}>
               {photos[i] ? (
                <img src={photos[i]!} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="text-blue-300 font-bold tracking-wider">Photo {i+1}</div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom decorations */}
        <div className="absolute bottom-4 left-4 z-20 text-8xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform -rotate-12">🦊</div>
        <div className="absolute bottom-0 right-10 z-30 text-8xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform rotate-12">🐰</div>

      </div>
    )
  },
  {
    id: 'polaroid-strip',
    name: 'Polaroid Camera',
    photoCount: 3,
    render: (photos, isPreview = false) => (
      <div className={cn("relative flex flex-col items-center bg-[#f4ebd9]", 
        isPreview ? "w-full p-2 h-[450px]" : "w-[350px] pt-4 pb-12 px-0 h-[1000px]"
      )}>
        {/* Fake Polaroid Camera Top */}
        <div className={cn("bg-[#f0f0f0] w-[95%] rounded-t-xl rounded-b px-4 flex flex-col relative shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-20", isPreview ? "py-2" : "py-6 mt-4")}>
           <div className="flex justify-between items-start w-full">
              {/* Flash */}
              <div className={cn("bg-white flex flex-col gap-1 border-2 border-gray-300 p-1 shadow-inner", isPreview ? "w-6 h-8 rounded" : "w-16 h-20 rounded-md")}>
                 <div className="bg-gradient-to-b from-gray-200 to-gray-400 w-full h-full rounded-sm opacity-80"></div>
              </div>
              {/* Lens */}
              <div className={cn("rounded-full bg-[#111] shadow-[0_0_0_8px_#333,0_0_0_12px_#eee,0_8px_10px_12px_rgba(0,0,0,0.5)] flex items-center justify-center", isPreview ? "w-10 h-10 mt-1" : "w-28 h-28 mt-2")}>
                 <div className="rounded-full bg-gradient-to-br from-green-900 via-green-700 to-black w-2/3 h-2/3 border-2 border-[#222]">
                   <div className="rounded-full bg-white opacity-30 w-1/4 h-1/4 ml-[10%] mt-[10%] blur-[1px]"></div>
                 </div>
              </div>
              {/* Small viewfinder */}
              <div className={cn("bg-black rounded-sm border-2 border-[#333] shadow-inner", isPreview ? "w-6 h-6" : "w-12 h-12")}></div>
           </div>
           
           <div className={cn("flex justify-between items-end w-full", isPreview ? "mt-4" : "mt-8")}>
              <div className={cn("bg-red-600 rounded-full shadow-[0_2px_0_#990000]", isPreview ? "w-4 h-4" : "w-10 h-10")}></div>
              <div className={cn("font-bold text-[#555] tracking-tighter leading-none flex items-center gap-1", isPreview ? "text-[8px]" : "text-xl")}>
                 OneStep<span className="text-yellow-500 font-black">2</span>
              </div>
           </div>
        </div>

        {/* Slot for film output */}
        <div className={cn("bg-[#222] w-full flex flex-col items-center justify-end z-10 rounded-t", isPreview ? "h-6 -mt-2 pb-1" : "h-16 -mt-6 pb-2")}>
           <div className="w-[80%] h-1 bg-black rounded-full shadow-inner opacity-50"></div>
        </div>
        <div className={cn("bg-[#444] w-full flex justify-between items-center px-4", isPreview ? "h-4" : "h-8")}>
            <div className="flex gap-1">
               <div className={cn("bg-blue-500", isPreview ? "w-2 h-1" : "w-6 h-2")}></div>
               <div className={cn("bg-green-500", isPreview ? "w-2 h-1" : "w-6 h-2")}></div>
               <div className={cn("bg-yellow-500", isPreview ? "w-2 h-1" : "w-6 h-2")}></div>
               <div className={cn("bg-red-500", isPreview ? "w-2 h-1" : "w-6 h-2")}></div>
            </div>
            <div className={cn("text-white font-sans font-bold tracking-widest", isPreview ? "text-[8px]" : "text-lg")}>Polaroid</div>
            <div className={cn("text-gray-400 font-sans tracking-[0.2em] font-bold", isPreview ? "text-[4px]" : "text-[8px]")}>I-TYPE CAMERA</div>
        </div>

        {/* Black film strip */}
        <div className="w-[90%] bg-[#222] relative flex flex-col shadow-2xl z-0" style={{ 
            backgroundImage: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.02) 5%, rgba(255,255,255,0.02) 95%, transparent 95%)' 
        }}>
           
           {/* Sprocket holes - Left and Right using absolute positioning */}
           <div className="absolute left-[2%] top-0 bottom-0 w-[4%] flex flex-col justify-evenly py-4 opacity-80">
              {Array.from({length: 15}).map((_, i) => <div key={`L${i}`} className="bg-[#f4ebd9] w-full h-[3%] rounded-sm"></div>)}
           </div>
           <div className="absolute right-[2%] top-0 bottom-0 w-[4%] flex flex-col justify-evenly py-4 opacity-80">
              {Array.from({length: 15}).map((_, i) => <div key={`R${i}`} className="bg-[#f4ebd9] w-full h-[3%] rounded-sm"></div>)}
           </div>

           <div className={cn("flex flex-col w-full h-full items-center justify-evenly", isPreview ? "p-4 gap-2" : "p-8 gap-6")}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-700 w-[85%] overflow-hidden flex items-center justify-center relative shadow-inner border border-[#333]" style={{ aspectRatio: '4/3' }}>
                   {photos[i] ? (
                    <img src={photos[i]!} alt={`Photo ${i+1}`} className="w-full h-full object-cover grayscale brightness-75 contrast-125" />
                  ) : (
                    <div className="text-gray-500 font-bold tracking-wider text-xs">Photo {i+1}</div>
                  )}
                </div>
              ))}
           </div>
           
           <div className={cn("absolute bottom-2 left-0 right-0 flex justify-center", isPreview ? "text-[6px]" : "text-xs")}>
             <div className="border border-white text-white font-black tracking-widest px-2 py-1 bg-black">
                 [CATCH IT! BOX]
             </div>
           </div>
        </div>

      </div>
    )
  },
  {
    id: 'boothmans-pink',
    name: 'Pink Boothmans',
    photoCount: 3,
    render: (photos, isPreview = false) => (
      <div className={cn("relative flex flex-col overflow-hidden items-center justify-center font-sans shadow-xl", 
        isPreview ? "w-full p-2 gap-2 h-[450px]" : "w-[380px] p-8 gap-8 h-[950px]"
      )}
      style={{
        backgroundColor: '#facfd4',
        backgroundImage: 'linear-gradient(45deg, #fcd8dc 25%, transparent 25%, transparent 75%, #fbbdc4 75%, #fbbdc4), linear-gradient(45deg, #fbbdc4 25%, transparent 25%, transparent 75%, #fcd8dc 75%, #fcd8dc)',
        backgroundSize: isPreview ? '30px 30px' : '80px 80px',
        backgroundPosition: '0 0, 40px 40px'
      }}
      >
        {/* Header Decor */}
        <div className={cn("bg-white/80 backdrop-blur-md rounded-full shadow-md text-[#663b41] font-bold flex items-center justify-center", isPreview ? "p-1" : "p-3")}>
          <CameraIcon className={cn("text-[#663b41]", isPreview ? "w-4 h-4" : "w-8 h-8")}/>
        </div>

        {/* Photo Strip */}
        <div className="w-full z-10 flex flex-col h-full justify-between items-center gap-[inherit]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={cn("bg-white overflow-hidden flex items-center justify-center relative shadow-sm border-[3px] border-[#fbabb5]", isPreview ? "w-[90%] border-2" : "w-[95%]")} style={{ aspectRatio: '4/3' }}>
               {photos[i] ? (
                <img src={photos[i]!} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="text-[#fbabb5] font-bold">Photo {i+1}</div>
              )}
            </div>
          ))}
        </div>

        {/* Hearts and Bears Decorations */}
        <div className={cn("absolute bottom-4 left-4 text-pink-400 rotate-12 drop-shadow-md", isPreview ? "text-2xl" : "text-6xl")}>🩷</div>
        <div className={cn("absolute bottom-12 left-12 text-pink-300 -rotate-12 drop-shadow-md", isPreview ? "text-xl" : "text-4xl")}>🩷</div>
        <div className={cn("absolute top-10 left-2 text-pink-500 drop-shadow-md", isPreview ? "text-3xl" : "text-7xl")}>ʕ•ᴥ•ʔ</div>
        <div className={cn("absolute bottom-0 right-0 text-pink-500 drop-shadow-xl translate-x-1/4 translate-y-1/4", isPreview ? "text-6xl" : "text-[150px]")}>ʕ•ᴥ•ʔ</div>
      </div>
    )
  },
  {
    id: 'cerita-hari-ini',
    name: 'Cerita Hari Ini',
    photoCount: 4,
    render: (photos, isPreview = false) => {
      const Strip = () => (
        <div className={cn("bg-[#fdfcf9] border-[1.5px] border-[#cbbcae] flex flex-col items-center", 
          isPreview ? "w-full p-2" : "w-[300px] p-6"
        )}>
           <div className={cn("text-center mb-4 flex flex-col items-center", isPreview ? "mb-2" : "")}>
              <div className={cn("text-[#8c7f70] tracking-[0.2em] uppercase", isPreview ? "text-[5px] mb-1" : "text-[10px] mb-2")}>
                — KALA BOOTH —
              </div>
              <div className={cn("font-serif text-[#333] flex items-center justify-center gap-2", isPreview ? "text-[8px] mb-1" : "text-[18px] mb-3")}>
                <span className="text-[#a0a0a0] font-sans scale-150 rotate-45 transform origin-center text-xs">✂</span>
                Foto Series
                <span className="text-[#a0a0a0] font-sans scale-150 rotate-45 transform origin-center text-xs">✂</span>
              </div>
              <div className="w-full border-b-[2px] border-[#333] mb-[2px]"></div>
              <div className="w-full border-b-[1px] border-[#333] mb-2"></div>
              <h2 className={cn("font-serif font-bold text-[#333] uppercase tracking-tighter leading-none mt-1", isPreview ? "text-xl" : "text-4xl")} style={{ transform: 'scaleY(1.3)' }}>
                 Cerita Hari Ini
              </h2>
              <div className={cn("text-[#666] font-serif", isPreview ? "text-[5px] mt-2" : "text-xs mt-4")}>
                 Hari spesial bersama orang spesial
              </div>
           </div>

           <div className={cn("w-full flex-grow flex flex-col gap-3 z-10", isPreview ? "gap-1" : "")}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border-[3px] border-[#c8b7a6] w-full overflow-hidden flex items-center justify-center relative shadow-sm" style={{ aspectRatio: '4/3' }}>
                 {photos[i] ? (
                  <img src={photos[i]!} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-xs">Photo {i+1}</div>
                )}
              </div>
            ))}
          </div>

          <div className={cn("mt-6 flex items-center gap-3 w-full", isPreview ? "mt-2 gap-1 px-1" : "px-2")}>
             <div className={cn("bg-[#333] text-white font-serif italic font-bold flex shrink-0 items-center justify-center rounded-sm", isPreview ? "text-[6px] w-4 h-4" : "text-lg w-10 h-10")}>
               K
             </div>
             <p className={cn("text-[#555] font-serif border-l border-r border-[#333] leading-snug", isPreview ? "text-[3.5px] px-1" : "text-[10px] px-3")}>
                <b>Kebersamaan</b> tumbuh<br/>
                dari hal-hal kecil yang<br/>
                dijalani bersama.
             </p>
          </div>
        </div>
      );

      return (
        <div className={cn("flex gap-1 bg-[#fdfcf9] border border-gray-200 shadow-xl", isPreview ? "" : "p-1")}>
           <Strip />
           <Strip />
        </div>
      );
    }
  },
  {
    id: 'minions-strip',
    name: 'Minions Theme',
    photoCount: 4,
    render: (photos, isPreview = false) => {
      const DenimPattern = () => (
         <div className="w-full bg-[#527bbd] relative overflow-hidden flex items-center justify-center border-b-2 border-dashed border-white/50" style={{ height: isPreview ? '25px' : '70px', backgroundImage: 'linear-gradient(45deg, #466aa6 25%, transparent 25%, transparent 75%, #466aa6 75%, #466aa6), linear-gradient(45deg, #466aa6 25%, transparent 25%, transparent 75%, #466aa6 75%, #466aa6)', backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px' }}>
            <div className={cn("text-[#fcd200] font-black tracking-widest uppercase drop-shadow-md", isPreview ? "text-[12px]" : "text-[40px] drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]")} style={{ textShadow: isPreview ? '1px 1px 0 #000' : '3px 3px 0 #222' }}>
               MINIONS
            </div>
         </div>
      );
      
      const DenimBottom = () => (
         <div className="w-full bg-[#527bbd] relative overflow-hidden flex items-center justify-center border-t-2 border-dashed border-white/50" style={{ height: isPreview ? '30px' : '90px', backgroundImage: 'linear-gradient(45deg, #466aa6 25%, transparent 25%, transparent 75%, #466aa6 75%, #466aa6), linear-gradient(45deg, #466aa6 25%, transparent 25%, transparent 75%, #466aa6 75%, #466aa6)', backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px' }}>
            <div className={cn("flex gap-4", isPreview ? "gap-1 text-[12px]" : "text-4xl")}>
              <span role="img" aria-label="goggles" className="drop-shadow-lg">🥽</span>
              <span role="img" aria-label="minion" className="drop-shadow-lg">🍌</span>
              <span role="img" aria-label="goggles" className="drop-shadow-lg">🥽</span>
            </div>
         </div>
      );

      const Minion1 = ({ className }: { className?: string }) => (
         <div className={cn("absolute z-20 pointer-events-none drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]", className, isPreview ? "w-10 h-10" : "w-32 h-32")}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="25" y="10" width="50" height="90" rx="25" fill="#fcd200" />
              <rect x="20" y="35" width="60" height="12" fill="#333" />
              <circle cx="50" cy="41" r="20" fill="#e0e0e0" stroke="#999" strokeWidth="4" />
              <circle cx="50" cy="41" r="14" fill="white" />
              <circle cx="50" cy="41" r="4" fill="#663300" />
              <path d="M 40 65 Q 50 75 60 65" fill="none" stroke="#666" strokeWidth="3" strokeLinecap="round" />
            </svg>
         </div>
      );

      const Minion2 = ({ className }: { className?: string }) => (
         <div className={cn("absolute z-20 pointer-events-none drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]", className, isPreview ? "w-14 h-14" : "w-40 h-40")}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="15" y="20" width="70" height="80" rx="35" fill="#fcd200" />
              <rect x="10" y="45" width="80" height="12" fill="#333" />
              <circle cx="33" cy="51" r="18" fill="#e0e0e0" stroke="#999" strokeWidth="3" />
              <circle cx="67" cy="51" r="18" fill="#e0e0e0" stroke="#999" strokeWidth="3" />
              <circle cx="33" cy="51" r="12" fill="white" />
              <circle cx="67" cy="51" r="12" fill="white" />
              <circle cx="33" cy="51" r="4" fill="#663300" />
              <circle cx="67" cy="51" r="4" fill="#663300" />
              <path d="M 40 75 Q 50 80 60 75" fill="none" stroke="#666" strokeWidth="3" strokeLinecap="round" />
            </svg>
         </div>
      );

      const Strip = () => (
        <div className={cn("bg-[#fcd200] flex flex-col overflow-hidden relative", 
          isPreview ? "w-full" : "w-[320px]"
        )}>
           <DenimPattern />
           <div className={cn("w-full flex-grow flex flex-col gap-[6px] p-2 relative", isPreview ? "p-1 gap-1" : "")}>
            
            {/* Minion Characters */}
            <Minion1 className={cn("left-[-15%] top-[15%] -rotate-[15deg]")} />
            <Minion2 className={cn("right-[-25%] bottom-[15%] rotate-[20deg]")} />

            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-200 border-[3px] border-white w-full overflow-hidden flex items-center justify-center relative shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded-[2px] z-10" style={{ aspectRatio: '4/3' }}>
                 {photos[i] ? (
                  <img src={photos[i]!} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-[#527bbd] font-bold text-xs">Photo {i+1}</div>
                )}
              </div>
            ))}
          </div>
          <DenimBottom />
        </div>
      );

      return (
        <div className={cn("flex gap-1 bg-white shadow-xl", isPreview ? "" : "p-1")} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
           <Strip />
           <Strip />
        </div>
      );
    }
  },
  {
    id: 'vintage-magazine',
    name: 'Vintage Magazine',
    photoCount: 3,
    render: (photos, isPreview = false) => (
      <div className={cn("relative bg-[#1c5d41] flex flex-col items-center justify-center overflow-hidden",
        isPreview ? "w-full p-1" : "w-[500px] p-6"
      )}>
        <div className="w-full bg-[#fbf8f1] relative flex flex-col overflow-hidden shadow-2xl" style={{ minHeight: isPreview ? '250px' : '650px', padding: isPreview ? '10px' : '20px' }}>
          
          {/* Retro sunburst background */}
          <div className="absolute inset-4 overflow-hidden" style={{ background: 'repeating-conic-gradient(from 0deg, #d32f2f 0deg 20deg, #fbc02d 20deg 40deg, #fbf8f1 40deg 60deg, #0288d1 60deg 80deg, #fbf8f1 80deg 100deg)' }}>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center">
             
             {/* Decor elements */}
             <div className={cn("absolute top-2 left-2 bg-[#d32f2f] text-white rounded-full flex items-center justify-center shadow-lg font-black border-2 border-white", isPreview ? "w-8 h-8 text-[8px]" : "w-16 h-16 text-xl")}>
               90s
             </div>

             <div className={cn("absolute top-6 right-6 bg-[#0288d1] text-white font-bold transform rotate-[-12deg] shadow-md", isPreview ? "px-1 py-[2px] text-[6px]" : "px-3 py-1 text-sm")}>
               @POTOPLID
             </div>
             
             {/* Main Photo */}
             <div className={cn("w-[85%] bg-white p-1 shadow-[4px_4px_0_0_rgba(0,0,0,0.8)] transform -rotate-2 mt-8", isPreview ? "mt-4" : "mt-16")} style={{ border: '3px solid #1c5d41' }}>
                 <div className="bg-[#4CAF50] w-full overflow-hidden flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                   {photos[0] ? (
                      <img src={photos[0]!} alt="Photo 1" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-white font-bold">Photo 1</div>
                    )}
                 </div>
             </div>

             {/* Two bottom photos */}
             <div className={cn("flex w-full justify-center mt-6 px-2 gap-4", isPreview ? "mt-2 gap-2" : "")}>
                <div className={cn("w-[45%] bg-white p-1 shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] transform rotate-3", isPreview ? "" : "")} style={{ border: '2px solid #d32f2f' }}>
                   <div className="bg-[#4CAF50] w-full overflow-hidden flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                     {photos[1] ? (
                        <img src={photos[1]!} alt="Photo 2" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-white font-bold text-xs">Photo 2</div>
                      )}
                   </div>
                </div>
                <div className={cn("w-[45%] bg-white p-1 shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] transform -rotate-6", isPreview ? "mt-2" : "mt-8")} style={{ border: '2px solid #fbc02d' }}>
                   <div className="bg-[#4CAF50] w-full overflow-hidden flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                     {photos[2] ? (
                        <img src={photos[2]!} alt="Photo 3" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-white font-bold text-xs">Photo 3</div>
                      )}
                   </div>
                </div>
             </div>

             {/* Title */}
             <div className={cn("mt-auto mb-2 bg-white rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,0.8)] border-4 border-[#1c5d41]", isPreview ? "px-2 py-1 mt-4 text-[8px]" : "px-6 py-2 mt-auto text-3xl")}>
                <h2 className="font-black text-[#fbc02d] tracking-widest drop-shadow-md" style={{ textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}>
                   VINTAGE MOMENT
                </h2>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'kota-metro',
    name: 'Kota Metro Hari Ini',
    photoCount: 3,
    render: (photos, isPreview = false) => (
      <div className={cn("bg-[#fdfdfc] p-6 flex flex-col font-serif shadow-2xl relative",
        isPreview ? "w-full text-[6px] p-2" : "w-[600px] text-base"
      )}>
        {/* Header Decor */}
        <div className={cn("text-center border-b-[4px] border-double border-[#222] pb-2 mb-3", isPreview ? "pb-1 mb-1 border-b-2" : "")}>
           <h1 className={cn("font-black tracking-tighter text-[#111] uppercase leading-none", isPreview ? "text-xl" : "text-5xl")} style={{ transform: 'scaleY(1.3)' }}>
             Kota Metro Hari Ini
           </h1>
           <div className={cn("flex justify-between font-semibold text-[#333] border-t-2 border-[#222] pt-1 mt-3 uppercase", isPreview ? "mt-2 pt-[2px] text-[5px]" : "text-sm")}>
              <span>April 2026</span>
              <span>Edisi Terbatas</span>
           </div>
        </div>
        
        {/* Main large photo */}
        <div className={cn("bg-white border-[3px] border-[#e5e5e5] shadow-sm w-full overflow-hidden mb-4", isPreview ? "border mb-2" : "")}>
           <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
             {photos[0] ? (
                <img src={photos[0]!} alt="Main Photo" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 bg-gray-100 w-full h-full flex items-center justify-center">Highlight Photo (16:9)</div>
              )}
           </div>
        </div>

        {/* Two columns below */}
        <div className={cn("flex gap-4 items-stretch", isPreview ? "gap-2" : "")}>
           {/* Left col */}
           <div className="w-1/2 flex flex-col">
              <p className={cn("text-[#333] font-medium leading-relaxed", isPreview ? "text-[4.5px]" : "text-sm")}>
                 Metro bukan hanya sekadar kota,<br/>
                 Ia adalah cerita dalam tiap langkah kita.<br/>
                 Di tiap sudutnya, rindu berbisik pelan,<br/>
                 Seolah hati selalu ingin pulang.
              </p>
              <div className={cn("bg-white border-[3px] border-[#e5e5e5] shadow-sm w-full overflow-hidden mt-4", isPreview ? "border mt-2" : "")}>
                 <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                   {photos[1] ? (
                      <img src={photos[1]!} alt="Photo 2" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400 bg-gray-100 w-full h-full flex items-center justify-center">Photo 2</div>
                    )}
                 </div>
              </div>
           </div>
           
           {/* Right col */}
           <div className="w-1/2 flex flex-col">
              <div className={cn("bg-white border-[3px] border-[#e5e5e5] shadow-sm w-full overflow-hidden mb-4", isPreview ? "border mb-2" : "")}>
                 <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                   {photos[2] ? (
                      <img src={photos[2]!} alt="Photo 3" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400 bg-gray-100 w-full h-full flex items-center justify-center">Photo 3</div>
                    )}
                 </div>
              </div>
              <p className={cn("text-[#333] font-medium leading-relaxed bg-[#f4f4f4] p-2", isPreview ? "text-[4.5px] p-1" : "text-sm")}>
                 Senyum ramah menyapa tanpa alasan,<br/>
                 Hangat terasa di setiap pertemuan.<br/>
                 Di sini waktu berjalan perlahan,<br/>
                 Membiarkan cinta tumbuh berkesan.
              </p>
           </div>
        </div>
        
        {/* Footer */}
        <div className={cn("bg-black text-white text-center rounded text-white font-sans mt-6 font-bold", isPreview ? "px-2 py-[1px] text-[4px] mt-2" : "px-6 py-2 text-xs mt-6 mx-8")}>
           @kalabooth
        </div>
      </div>
    ),
  },
  {
    id: 'suka-cita-retro',
    name: 'Suka Cita Retro TV',
    photoCount: 3,
    render: (photos, isPreview = false) => (
      <div className={cn("relative flex items-center justify-center bg-white font-sans mx-auto",
          isPreview ? "w-full p-2" : "w-[600px] p-6"
      )}>
        <div className={cn("relative w-full h-full flex flex-col items-center justify-start overflow-hidden border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.1)]",
          isPreview ? "py-4 min-h-[350px]" : "py-12 min-h-[750px]"
        )}
        style={{
           background: 'repeating-conic-gradient(from 0deg at 50% 50%, #156d53 0deg 15deg, #f4e9cd 15deg 30deg)'
        }}>

          {/* Smiley and Text */}
          <div className={cn("relative flex flex-col items-center z-10", isPreview ? "mt-2" : "mt-4")}>
             {/* Smiley SVG */}
             <div className="relative flex items-center justify-center drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                 <svg width={isPreview ? '80' : '160'} height={isPreview ? '80' : '160'} viewBox="0 0 100 100">
                    {/* Headphones band */}
                    <path d="M 15 50 A 35 35 0 0 1 85 50" fill="none" stroke="#d32f2f" strokeWidth="8" strokeLinecap="round" />
                    {/* Earpieces */}
                    <rect x="5" y="40" width="16" height="28" rx="8" fill="#d32f2f" stroke="black" strokeWidth="3" />
                    <rect x="79" y="40" width="16" height="28" rx="8" fill="#d32f2f" stroke="black" strokeWidth="3" />
                    
                    {/* Headset arc black outline (behind) */}
                    <path d="M 15 50 A 35 35 0 0 1 85 50" fill="none" stroke="black" strokeWidth="12" strokeLinecap="round" style={{mixBlendMode: 'destination-over'}} />

                    {/* Smiley Base */}
                    <circle cx="50" cy="50" r="28" fill="#ffca28" stroke="black" strokeWidth="3" />
                    
                    {/* Eyes */}
                    <ellipse cx="40" cy="42" rx="4" ry="6" fill="black" />
                    <ellipse cx="60" cy="42" rx="4" ry="6" fill="black" />
                    
                    {/* Smile */}
                    <path d="M 32 58 Q 50 75 68 58" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
                 </svg>
             </div>
             
             {/* Curved Text SVG */}
             <div className={cn(isPreview ? "-mt-8" : "-mt-16", "relative z-20 drop-shadow-[3px_3px_0_rgba(0,0,0,1)]")}>
                 <svg width={isPreview ? '220' : '440'} height={isPreview ? '120' : '240'} viewBox="0 0 440 240">
                   <path id="curve-suka-cita" d="M 80 120 Q 220 50 360 120" fill="none" />
                   <path id="curve-lalui" d="M 30 170 Q 220 120 410 170" fill="none" />
                   
                   {/* SUKA CITA - Outline */}
                   <text fontSize="45" fontWeight="900" fontFamily="Impact, sans-serif" stroke="black" strokeWidth="12" strokeLinejoin="round" style={{textTransform: 'uppercase'}}>
                      <textPath href="#curve-suka-cita" startOffset="50%" textAnchor="middle">SUKA, CITA</textPath>
                   </text>
                   {/* SUKA CITA - Fill */}
                   <text fontSize="45" fontWeight="900" fontFamily="Impact, sans-serif" fill="#fff" letterSpacing="2" style={{textTransform: 'uppercase'}}>
                      <textPath href="#curve-suka-cita" startOffset="50%" textAnchor="middle">SUKA, CITA</textPath>
                   </text>

                   {/* LALUI BERSAMA - Outline */}
                   <text fontSize="60" fontWeight="900" fontFamily="Impact, sans-serif" stroke="black" strokeWidth="16" strokeLinejoin="round" style={{textTransform: 'uppercase'}}>
                      <textPath href="#curve-lalui" startOffset="50%" textAnchor="middle">LALUI BERSAMA</textPath>
                   </text>
                   {/* LALUI BERSAMA - Fill */}
                   <text fontSize="60" fontWeight="900" fontFamily="Impact, sans-serif" fill="#69b596" letterSpacing="3" style={{textTransform: 'uppercase', textShadow: '2px 2px 0px rgba(255,255,255,1)'}}>
                      <textPath href="#curve-lalui" startOffset="50%" textAnchor="middle">LALUI BERSAMA</textPath>
                   </text>
                 </svg>
             </div>
          </div>

          {/* Main TV */}
          <div className={cn("relative z-10 flex shadow-[0_20px_20px_rgba(0,0,0,0.5)] rounded-lg", isPreview ? "-mt-4" : "-mt-8")}>
             <div className={cn("bg-[#dbbc98] border-[4px] border-[#222] rounded-xl flex items-center relative overflow-hidden", isPreview ? "w-[240px] p-2" : "w-[480px] p-4")}>
                 {/* Internal bevel */}
                 <div className="absolute inset-0 border-[3px] border-white/40 pointer-events-none rounded-lg"></div>
                 <div className="absolute inset-0 border-[2px] border-white/20 pointer-events-none rounded-lg m-1"></div>

                 {/* Screen Container */}
                 <div className={cn("bg-[#1a1a1a] rounded-[10%] border-[2px] border-[#333] shadow-[inset_0_5px_15px_rgba(0,0,0,1)] relative overflow-hidden flex-grow flex items-center justify-center z-10", isPreview ? "mr-2 p-[6%]" : "mr-4 p-[6%]")} style={{ width: '70%', aspectRatio: '4/3' }}>
                     <div className="absolute inset-2 border-[4px] border-black rounded-[8%] bg-green-500 overflow-hidden shadow-inner">
                        {photos[0] ? (
                          <img src={photos[0]!} alt="Photo 1" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50 font-bold" style={{fontSize: isPreview ? '8px' : '16px'}}>Photo 1</div>
                        )}
                     </div>
                     {/* Glass Glare */}
                     <div className="absolute top-[-25%] left-[-25%] right-[-10%] bottom-1/2 bg-gradient-to-br from-white/20 to-transparent transform rotate-[15deg] pointer-events-none rounded-[30%]"></div>
                 </div>

                 {/* Control Panel Container */}
                 <div className={cn("flex flex-col items-center justify-between border-[2px] border-[#333] bg-[#c39169] rounded shadow-[inset_2px_2px_0_rgba(255,255,255,0.3)] z-10", isPreview ? "w-[22%] p-1 h-[90%]" : "w-[22%] p-2 h-[90%]")}>
                    
                    {/* Main Dial */}
                    <div className="w-full flex justify-center bg-[#b07f57] rounded border border-[#666] border-b-[#999] shadow-inner p-1 mb-1">
                       <div className={cn("rounded-full bg-[#222] border-[3px] border-[#444] shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative", isPreview ? "w-6 h-6" : "w-14 h-14")}>
                           <div className="absolute top-1/2 left-0 right-1/2 h-[2px] bg-white transform -translate-y-1/2"></div>
                       </div>
                    </div>
                    
                    {/* Small Buttons */}
                    <div className={cn("w-full flex flex-col justify-between items-center bg-[#b07f57] rounded border border-[#666] border-b-[#999] shadow-inner flex-grow", isPreview ? "p-1 my-1" : "p-2 my-2")}>
                        <div className={cn("bg-[#111] rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.4)]", isPreview ? "w-2 h-2" : "w-5 h-5")}></div>
                        <div className={cn("bg-[#111] rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.4)]", isPreview ? "w-2 h-2" : "w-5 h-5")}></div>
                        <div className={cn("bg-[#111] rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.4)]", isPreview ? "w-2 h-2" : "w-5 h-5")}></div>
                    </div>

                    {/* Speaker Grill */}
                    <div className={cn("w-full bg-[#111] grid grid-cols-4 gap-[2px] border border-[#444] shadow-inner rounded-sm p-[2px]", isPreview ? "h-[30%]" : "h-[30%]")}>
                        {Array.from({ length: 16 }).map((_, i) => (
                           <div key={i} className="bg-[#222] w-full h-[90%] rounded-[1px]"></div>
                        ))}
                    </div>
                 </div>
             </div>
          </div>

          {/* Small TVs */}
          <div className={cn("relative z-20 flex justify-between w-full font-sans", isPreview ? "mt-[-10px] px-2" : "mt-[-30px] px-14")}>
             
             {/* Small TV 1 */}
             <div className={cn("bg-[#dbbc98] border-[3px] border-[#222] rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.6)] transform -rotate-[6deg] flex items-center relative overflow-hidden", isPreview ? "w-[120px] p-1" : "w-[220px] p-2")}>
                 <div className="absolute inset-0 border-[2px] border-white/30 pointer-events-none rounded-lg"></div>
                 {/* Screen Container */}
                 <div className={cn("bg-[#1a1a1a] rounded-[10%] border-[2px] border-[#333] shadow-inner relative flex-grow flex items-center justify-center z-10", isPreview ? "mr-1 p-[5%]" : "mr-2 p-[5%]")} style={{ width: '75%', aspectRatio: '4/3' }}>
                     <div className="absolute inset-1 border-[2px] border-black rounded-[5%] bg-green-500 overflow-hidden">
                        {photos[1] ? (
                          <img src={photos[1]!} alt="Photo 2" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50 font-bold" style={{fontSize: isPreview ? '6px' : '12px'}}>Photo 2</div>
                        )}
                     </div>
                     <div className="absolute top-[-20%] left-[-20%] right-0 bottom-1/2 bg-gradient-to-br from-white/20 to-transparent transform rotate-12 pointer-events-none rounded-full"></div>
                 </div>
                 {/* Control Panel */}
                 <div className={cn("flex flex-col items-center border border-[#333] bg-[#c39169] rounded shadow-inner z-10", isPreview ? "w-[20%] p-[2px] h-[95%]" : "w-[20%] p-1 h-[95%]")}>
                    <div className={cn("rounded-full bg-[#222] border-[2px] border-[#444] shadow", isPreview ? "w-3 h-3 mb-1" : "w-6 h-6 mb-2")}></div>
                    <div className={cn("bg-[#111] rounded-full", isPreview ? "w-1 h-1 mb-1" : "w-2 h-2 mb-2")}></div>
                    <div className={cn("w-full bg-[#111] grid grid-cols-2 gap-[1px] border border-[#444] shadow-inner rounded-sm flex-grow", isPreview ? "p-[1px]" : "p-1")}>
                        {Array.from({ length: 6 }).map((_, i) => (
                           <div key={i} className="bg-[#2a2a2a] w-full h-[90%] rounded-[1px]"></div>
                        ))}
                    </div>
                 </div>
             </div>

             {/* Small TV 2 */}
             <div className={cn("bg-[#dbbc98] border-[3px] border-[#222] rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.6)] transform rotate-[5deg] flex items-center relative overflow-hidden", isPreview ? "w-[120px] p-1 mt-2" : "w-[220px] p-2 mt-4")}>
                 <div className="absolute inset-0 border-[2px] border-white/30 pointer-events-none rounded-lg"></div>
                 {/* Screen Container */}
                 <div className={cn("bg-[#1a1a1a] rounded-[10%] border-[2px] border-[#333] shadow-inner relative flex-grow flex items-center justify-center z-10", isPreview ? "mr-1 p-[5%]" : "mr-2 p-[5%]")} style={{ width: '75%', aspectRatio: '4/3' }}>
                     <div className="absolute inset-1 border-[2px] border-black rounded-[5%] bg-green-500 overflow-hidden">
                        {photos[2] ? (
                          <img src={photos[2]!} alt="Photo 3" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50 font-bold" style={{fontSize: isPreview ? '6px' : '12px'}}>Photo 3</div>
                        )}
                     </div>
                     <div className="absolute top-[-20%] left-[-20%] right-0 bottom-1/2 bg-gradient-to-br from-white/20 to-transparent transform rotate-12 pointer-events-none rounded-full"></div>
                 </div>
                 {/* Control Panel */}
                 <div className={cn("flex flex-col items-center border border-[#333] bg-[#c39169] rounded shadow-inner z-10", isPreview ? "w-[20%] p-[2px] h-[95%]" : "w-[20%] p-1 h-[95%]")}>
                    <div className={cn("rounded-full bg-[#222] border-[2px] border-[#444] shadow", isPreview ? "w-3 h-3 mb-1" : "w-6 h-6 mb-2")}></div>
                    <div className={cn("bg-[#111] rounded-full", isPreview ? "w-1 h-1 mb-1" : "w-2 h-2 mb-2")}></div>
                    <div className={cn("w-full bg-[#111] grid grid-cols-2 gap-[1px] border border-[#444] shadow-inner rounded-sm flex-grow", isPreview ? "p-[1px]" : "p-1")}>
                        {Array.from({ length: 6 }).map((_, i) => (
                           <div key={i} className="bg-[#2a2a2a] w-full h-[90%] rounded-[1px]"></div>
                        ))}
                    </div>
                 </div>
             </div>
             
          </div>

          <div className={cn("font-bold text-black opacity-80 mt-auto", isPreview ? "text-[6px]" : "text-sm mt-8")}>
             potopi.id
          </div>

        </div>
      </div>
    )
  }
];
