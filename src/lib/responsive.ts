import React from 'react';

// Responsive design utilities and breakpoints

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const deviceTypes = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
  largeDesktop: 'largeDesktop',
} as const;

// Responsive hook for detecting screen size
export const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [deviceType, setDeviceType] = React.useState<keyof typeof deviceTypes>('mobile');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      // Determine device type
      if (width >= 1536) {
        setDeviceType('largeDesktop');
      } else if (width >= 1024) {
        setDeviceType('desktop');
      } else if (width >= 768) {
        setDeviceType('tablet');
      } else {
        setDeviceType('mobile');
      }
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return {
    screenSize,
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    isLargeDesktop: deviceType === 'largeDesktop',
    isMobileOrTablet: deviceType === 'mobile' || deviceType === 'tablet',
    isDesktopOrLarger: deviceType === 'desktop' || deviceType === 'largeDesktop',
  };
};

// Responsive spacing utilities
export const responsiveSpacing = {
  xs: {
    padding: '1rem',
    margin: '1rem',
    gap: '0.5rem',
  },
  sm: {
    padding: '1.5rem',
    margin: '1.5rem',
    gap: '1rem',
  },
  md: {
    padding: '2rem',
    margin: '2rem',
    gap: '1.5rem',
  },
  lg: {
    padding: '3rem',
    margin: '3rem',
    gap: '2rem',
  },
  xl: {
    padding: '4rem',
    margin: '4rem',
    gap: '2.5rem',
  },
};

// Responsive typography scale
export const responsiveTypography = {
  xs: {
    h1: 'text-2xl',
    h2: 'text-xl',
    h3: 'text-lg',
    body: 'text-sm',
    small: 'text-xs',
  },
  sm: {
    h1: 'text-3xl',
    h2: 'text-2xl',
    h3: 'text-xl',
    body: 'text-base',
    small: 'text-sm',
  },
  md: {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    body: 'text-lg',
    small: 'text-base',
  },
  lg: {
    h1: 'text-5xl',
    h2: 'text-4xl',
    h3: 'text-3xl',
    body: 'text-xl',
    small: 'text-lg',
  },
  xl: {
    h1: 'text-6xl',
    h2: 'text-5xl',
    h3: 'text-4xl',
    body: 'text-2xl',
    small: 'text-xl',
  },
};

// Responsive grid utilities
export const responsiveGrid = {
  xs: {
    cols: 1,
    gap: '1rem',
  },
  sm: {
    cols: 2,
    gap: '1.5rem',
  },
  md: {
    cols: 3,
    gap: '2rem',
  },
  lg: {
    cols: 4,
    gap: '2.5rem',
  },
  xl: {
    cols: 5,
    gap: '3rem',
  },
};

// Responsive container utilities
export const responsiveContainer = {
  xs: 'max-w-full px-4',
  sm: 'max-w-2xl mx-auto px-6',
  md: 'max-w-4xl mx-auto px-8',
  lg: 'max-w-6xl mx-auto px-12',
  xl: 'max-w-7xl mx-auto px-16',
  '2xl': 'max-w-8xl mx-auto px-20',
};

// Responsive navigation utilities
export const responsiveNavigation = {
  mobile: {
    menuType: 'drawer',
    logoSize: 'text-xl',
    spacing: 'p-4',
  },
  tablet: {
    menuType: 'dropdown',
    logoSize: 'text-2xl',
    spacing: 'p-6',
  },
  desktop: {
    menuType: 'horizontal',
    logoSize: 'text-3xl',
    spacing: 'p-8',
  },
  largeDesktop: {
    menuType: 'horizontal',
    logoSize: 'text-4xl',
    spacing: 'p-10',
  },
};

// Responsive form utilities
export const responsiveForm = {
  mobile: {
    layout: 'stacked',
    inputSize: 'h-12',
    buttonSize: 'h-12',
    spacing: 'space-y-4',
  },
  tablet: {
    layout: 'grid',
    inputSize: 'h-10',
    buttonSize: 'h-10',
    spacing: 'space-y-6',
  },
  desktop: {
    layout: 'grid',
    inputSize: 'h-10',
    buttonSize: 'h-10',
    spacing: 'space-y-6',
  },
  largeDesktop: {
    layout: 'grid',
    inputSize: 'h-10',
    buttonSize: 'h-10',
    spacing: 'space-y-6',
  },
};

// Responsive card utilities
export const responsiveCard = {
  mobile: {
    padding: 'p-4',
    margin: 'm-2',
    borderRadius: 'rounded-lg',
  },
  tablet: {
    padding: 'p-6',
    margin: 'm-4',
    borderRadius: 'rounded-xl',
  },
  desktop: {
    padding: 'p-8',
    margin: 'm-6',
    borderRadius: 'rounded-2xl',
  },
};

// Responsive image utilities
export const responsiveImage = {
  mobile: {
    width: 'w-full',
    height: 'h-48',
    objectFit: 'object-cover',
  },
  tablet: {
    width: 'w-full',
    height: 'h-64',
    objectFit: 'object-cover',
  },
  desktop: {
    width: 'w-full',
    height: 'h-80',
    objectFit: 'object-cover',
  },
};

// Responsive button utilities
export const responsiveButton = {
  mobile: {
    size: 'h-12 px-6',
    textSize: 'text-base',
    iconSize: 'w-5 h-5',
  },
  tablet: {
    size: 'h-10 px-5',
    textSize: 'text-sm',
    iconSize: 'w-4 h-4',
  },
  desktop: {
    size: 'h-10 px-5',
    textSize: 'text-sm',
    iconSize: 'w-4 h-4',
  },
};

// Responsive modal utilities
export const responsiveModal = {
  mobile: {
    width: 'w-full',
    height: 'h-full',
    padding: 'p-4',
    margin: 'm-0',
  },
  tablet: {
    width: 'w-11/12 max-w-2xl',
    height: 'h-auto max-h-[90vh]',
    padding: 'p-6',
    margin: 'm-4',
  },
  desktop: {
    width: 'w-3/4 max-w-4xl',
    height: 'h-auto max-h-[80vh]',
    padding: 'p-8',
    margin: 'm-8',
  },
};

// Responsive sidebar utilities
export const responsiveSidebar = {
  mobile: {
    position: 'fixed inset-y-0 left-0 z-50',
    width: 'w-80',
    transform: 'transform -translate-x-full',
    transition: 'transition-transform duration-300 ease-in-out',
  },
  tablet: {
    position: 'fixed inset-y-0 left-0 z-40',
    width: 'w-64',
    transform: 'transform -translate-x-full',
    transition: 'transition-transform duration-300 ease-in-out',
  },
  desktop: {
    position: 'relative',
    width: 'w-64',
    transform: 'transform translate-x-0',
    transition: 'none',
  },
};

// Responsive table utilities
export const responsiveTable = {
  mobile: {
    layout: 'stacked',
    fontSize: 'text-sm',
    padding: 'p-2',
  },
  tablet: {
    layout: 'horizontal',
    fontSize: 'text-sm',
    padding: 'p-3',
  },
  desktop: {
    layout: 'horizontal',
    fontSize: 'text-base',
    padding: 'p-4',
  },
};

// Responsive carousel utilities
export const responsiveCarousel = {
  mobile: {
    slidesToShow: 1,
    spacing: 'gap-4',
    padding: 'px-4',
  },
  tablet: {
    slidesToShow: 2,
    spacing: 'gap-6',
    padding: 'px-6',
  },
  desktop: {
    slidesToShow: 3,
    spacing: 'gap-8',
    padding: 'px-8',
  },
  largeDesktop: {
    slidesToShow: 4,
    spacing: 'gap-10',
    padding: 'px-10',
  },
};

// Utility function to get responsive class based on breakpoint
export const getResponsiveClass = (
  baseClass: string,
  breakpoint: keyof typeof breakpoints,
  modifier: string
): string => {
  const breakpointPrefix = breakpoint === 'xs' ? '' : `${breakpoint}:`;
  return `${baseClass} ${breakpointPrefix}${modifier}`;
};

// Utility function to get responsive spacing
export const getResponsiveSpacing = (
  property: keyof typeof responsiveSpacing.xs,
  breakpoint: keyof typeof breakpoints
): string => {
  return responsiveSpacing[breakpoint][property];
};

// Utility function to get responsive typography
export const getResponsiveTypography = (
  element: keyof typeof responsiveTypography.xs,
  breakpoint: keyof typeof breakpoints
): string => {
  return responsiveTypography[breakpoint][element];
};

// Utility function to check if element is in viewport
export const useInViewport = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
  const [isInViewport, setIsInViewport] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isInViewport;
};

// Utility function to handle touch gestures
export const useTouchGestures = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void
) => {
  const [touchStart, setTouchStart] = React.useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<{ x: number; y: number } | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          onSwipeLeft?.();
        } else {
          onSwipeRight?.();
        }
      }
    } else {
      if (Math.abs(distanceY) > minSwipeDistance) {
        if (distanceY > 0) {
          onSwipeUp?.();
        } else {
          onSwipeDown?.();
        }
      }
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

// Utility function to handle responsive images
export const useResponsiveImage = (src: string, sizes: Record<string, string>) => {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const { deviceType } = useResponsive();

  React.useEffect(() => {
    const newSrc = sizes[deviceType] || src;
    setCurrentSrc(newSrc);
  }, [deviceType, sizes, src]);

  return currentSrc;
};

// Utility function to handle responsive loading
export const useResponsiveLoading = (dependencies: any[]) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { deviceType } = useResponsive();

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, deviceType === 'mobile' ? 100 : 50);

    return () => clearTimeout(timer);
  }, [...dependencies, deviceType]);

  return isLoading;
};
