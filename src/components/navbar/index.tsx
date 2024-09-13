import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link'; // Import Link from next/link
import Navigation from '../navigation'; // Adjust the path as needed
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthProvider';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#405D72', // Change AppBar background color here
  ...(theme.breakpoints.up('sm') && {
    ...(theme.mixins.toolbar && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      color: '#405D72', // Change Drawer text color here
      ...closedMixin(theme),
    },
    ...(theme.breakpoints.up('sm') && {
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
  }),
);

const NavBar = ({ children }: any) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
const router=useRouter()
const[authUser,setAuthUser]=useAuth()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    window.sessionStorage.removeItem('user');
    setAnchorEl(null);
    router.push('/login')
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
   
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const navigationItems = Navigation(); // Ensure this function returns an array of navigation items

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome to KHariid-o-faroKHt
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography>Menu</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigationItems?.map((item: any, index: any) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <Link href={item.path} passHref>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    ...(open ? { justifyContent: 'initial' } : { justifyContent: 'center' }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      ...(open ? { mr: 3 } : { mr: 'auto' }),
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ ...(open ? { opacity: 1 } : { opacity: 0 }) }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default NavBar;
