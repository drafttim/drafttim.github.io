import pic from '../src/assets/pic.jpg';

export const ProfilePhoto = () => {
  return (
    <div className="w-28 h-28 mb-6 relative group cursor-pointer">
        {/* Offset Border Decoration */}
        <div className="absolute inset-0 border-2 border-retro-dark/20 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-500"></div>

        {/* Image Container */}
        <div className="relative h-full w-full overflow-hidden border border-retro-border bg-retro-surface">

             {/* 1. Base Image (Normal - Always Visible) */}
             <img
                src={pic}
                alt="Xiaochi Liu"
                className="w-full h-full object-cover relative z-10"
             />

             {/* 2. Glitch Layer 1 (Red/Cyan Shift + Slice) */}
             <div className="glitch-layer-1 absolute inset-0 opacity-0 z-20 mix-blend-hard-light">
                 <img src={pic} className="w-full h-full object-cover filter contrast-150 brightness-125 sepia-[.5] hue-rotate-[-50deg]" alt="" />
             </div>

             {/* 3. Glitch Layer 2 (Blue/Magenta Shift + Slice) */}
             <div className="glitch-layer-2 absolute inset-0 opacity-0 z-20 mix-blend-hard-light">
                 <img src={pic} className="w-full h-full object-cover filter contrast-150 brightness-125 sepia-[.5] hue-rotate-[180deg]" alt="" />
             </div>

             {/* 4. White Flash Overlay */}
             <div className="glitch-flash absolute inset-0 bg-white pointer-events-none z-30 opacity-0 mix-blend-overlay"></div>

             {/* 5. Scanlines (Now animated for 1s) */}
             {/* 修改点：去掉了 group-hover:opacity-100，加了类名 scanline-layer */}
             <div
                className="scanline-layer absolute inset-0 opacity-0 z-40 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.4) 50%)', backgroundSize: '100% 3px' }}
             ></div>
        </div>

        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-retro-accent"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-retro-accent"></div>
    </div>
  );
};
