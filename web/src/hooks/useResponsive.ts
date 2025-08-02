import { useState, useEffect } from "react";

interface ScreenSize {
  width: number;
  height: number;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge: boolean;
}

export const useResponsive = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 1920,
    height: 1080,
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isXLarge: true,
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        width,
        height,
        isSmall: width < 800,
        isMedium: width >= 800 && width < 1200,
        isLarge: width >= 1200 && width < 1920,
        isXLarge: width >= 1920,
      });
    };

    // Set initial size
    updateScreenSize();

    // Add event listener
    window.addEventListener("resize", updateScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return screenSize;
};
