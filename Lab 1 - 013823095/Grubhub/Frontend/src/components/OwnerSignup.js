import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from 'react-bootstrap';
import { Dropdown } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
     
      <div className={classes.toolbar} align="center">GRUBHUB</div>
      <Divider />
      <List>
          <div align="center">
            <Button >Account Info</Button>
          </div>
          <div align="center">
            <Button>Pricing</Button>
          </div>
          <div align="center">
            <Button>Tax Info</Button>
          </div>
          <div align="center">
            <Button>Accept Terms</Button>
          </div>
          <div align="center">
            <Button>Need help?</Button>
          </div>
          <div align="center">
            <Button>Email: </Button>
          </div>
          <div align="center">
            <Button>Phone: </Button>
          </div>
        
      </List>
      <Divider />
      
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>

        <Toolbar>
            <div>
                Account Information
            </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
          >
              
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <form>
           <div>
               how many locations are you signing up?
           </div>
        <Typography paragraph>
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
               1
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="">1</Dropdown.Item>
                <Dropdown.Item href="">2</Dropdown.Item>
                <Dropdown.Item href="">3</Dropdown.Item>
                <Dropdown.Item href="">4</Dropdown.Item>
                <Dropdown.Item href="">5</Dropdown.Item>
                <Dropdown.Item href="">6</Dropdown.Item>
                <Dropdown.Item href="">7</Dropdown.Item>
                <Dropdown.Item href="">8</Dropdown.Item>
                <Dropdown.Item href="">9</Dropdown.Item>
                <Dropdown.Item href="">10</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br/>
          Restaurant Information
          <br/>
          <p>
             Restaurant Name
          </p>
          <TextField variant="outlined">
          </TextField>
          <br/>
          <br/>
          <div>
              Restaurant Address:
          </div>
          <TextField style={{width:"600px"}} variant="outlined">
          </TextField>
          <br/>
          <br/>
          <div>
              Restaurant Phone Number:
          </div>
          <TextField style={{width:"200px"}} variant="outlined">
          </TextField>
        </Typography>
        <Button>
            Submit
        </Button>
        </form>
      </main>
      
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;