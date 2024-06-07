export const screens = {
  sm: '375px',
  // => @media (min-width: 375px) { ... }
  md: '600px',
  // => @media (min-width: 768px) { ... }
  lg: '1024px',
  // => @media (min-width: 1024px) { ... }
  xl: '1366px',
  // => @media (min-width: 1366px) { ... }
  '2xl': '1536px',
  // => @media (min-width: 1536px) { ... }
  smallScreen: { max: '769px' },
  // mobile x - tablet
  bigScreen: { min: '770px' }
  // laptop - laptop l
};
