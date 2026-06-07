import React from "react";

export const PromoBanner = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[60] h-8 bg-foreground text-background flex items-center justify-center px-4">
      <p className="text-[10px] md:text-xs font-sans font-medium tracking-[0.2em] uppercase">
        Use code SCENT20 for 20% off your first artisan allocation
      </p>
    </div>
  );
};
