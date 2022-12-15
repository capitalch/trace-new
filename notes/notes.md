pip install uvicorn[all] fastapi[uvicorn] ariadne

## Chakra UI breakpoints
const breakpoints = {
  sm: '30em', // 16px * 30em // 480px
  md: '48em', // 16px * 48em // 768px
  lg: '62em', // 16px * 62em // 992px
  xl: '80em', // 16px * 80em // 1280px
  '2xl': '96em', // 16px * 96em // 1536px
}

My Observations: Chakra considers 16Px as font size. 1 em = 1 fontsize. so 30em = 30 * 16 px = 480px
sm: 480px, 
md: '48em', (15)
lg: '62em',
xl: '80em',
'2xl': '96em',

## Small display is 1366px and wide display is 1920px. So switchover at 2xl will make side menu appear for wide displays.