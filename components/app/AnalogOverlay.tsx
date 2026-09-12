export const AnalogOverlay = () => (
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
         {/* Subtle scanlines */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_3px,3px_100%]" />
         {/* Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.05)_100%)]" />
      </div>
);
