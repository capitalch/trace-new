pip install uvicorn[all] fastapi[uvicorn] ariadne asyncpg "python-jose[cryptography]" "passlib[bcrypt]" python-multipart pyjwt psycopg[binary] psycopg[pool]

### React data grids
1. react-data-grid: https://www.npmjs.com/package/react-data-grid
2. frappe data table: https://frappe.io/datatable/docs/api/datatable

### Server
1. Logging
2. GraphQL
3. AsyncDB

### Client
1. Login



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
## For fastapi security visit https://www.freecodecamp.org/news/how-to-add-jwt-authentication-in-fastapi/