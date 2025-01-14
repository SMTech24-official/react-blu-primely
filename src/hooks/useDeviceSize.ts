import { useState, useEffect } from "react";

type DeviceSize = 1 | 2 | 3 | 4; // 1: sm, 2: md, 3: lg, 4: xl

interface DeviceInfo {
  deviceSize: DeviceSize;
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
}

function useDeviceSize(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(getDeviceInfo());

  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceInfo;
}

function getDeviceInfo(): DeviceInfo {
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const height = typeof window !== "undefined" ? window.innerHeight : 0;
  const isPortrait = height > width;

  let deviceSize: DeviceSize = 1; // Default to 'sm' (small)

  if (width >= 1200) {
    deviceSize = 4; // xl
  } else if (width >= 992) {
    deviceSize = 3; // lg
  } else if (width >= 768) {
    deviceSize = 2; // md
  } else if (width >= 426) {
    deviceSize = 2; // md
  }

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 992;
  const isDesktop = width >= 992;

  return {
    deviceSize,
    width,
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
  };
}

export default useDeviceSize;
