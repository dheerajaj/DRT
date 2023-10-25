  // import React from 'react';
  // import { Link } from 'react-router-dom';

  
  // function Navbar() {
  //   return (
  //     <div>
  //       <header>
  //       <nav>
  //         <ul>
  //         <li>
  //           <Link to='/login/dashboard'>Dashboard</Link>
  //         </li>
  //           <li>
  //             <Link to="/dashboard/reportsub">Report Submission</Link>
  //           </li>
  //           <li>
  //             <Link to="/dashboard/list">Report List</Link>
  //           </li>
            
            
  //           <li>
  //             <Link to="/">Logout</Link>
  //           </li>
  //         </ul>
  //       </nav>
  //     </header>
  //     </div>
  //   );
  // }
  
  // export default Navbar;
  

  import * as React from 'react';
  import Box from '@mui/material/Box';
  import Avatar from '@mui/material/Avatar';
  import Menu from '@mui/material/Menu';
  import MenuItem from '@mui/material/MenuItem';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import Divider from '@mui/material/Divider';
  import IconButton from '@mui/material/IconButton';
  import Typography from '@mui/material/Typography';
  import Tooltip from '@mui/material/Tooltip';
  // import PersonAdd from '@mui/icons-material/PersonAdd';
  // import Settings from '@mui/icons-material/Settings';
  import Logout from '@mui/icons-material/Logout';
// import { Link } from '@mui/material';
import { Link } from 'react-router-dom';
  
  export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
     <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent:'center ' }}>

          <Link to='/login/dashboard'>
          <Typography sx={{ minWidth: 100 }} >Dashboard</Typography>
          </Link>

          <Link to="/dashboard/reportsub">
          <Typography sx={{ minWidth: 100 }} >Report Submission</Typography>
          </Link>

          <Link to="/dashboard/list">
          <Typography sx={{ minWidth: 100 }} >Report List</Typography>
          </Link>
          
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          
          <MenuItem onClick={handleClose}>
            <Link to='/dashboard/userProfile'>
            <Avatar /> My account</Link> 
          </MenuItem>
          <Divider />
                  
          <MenuItem onClick={handleClose}>
          <Link to='/'>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
              Logout
              </Link>
          </MenuItem>
          
        </Menu>
        </>
    );
  }







