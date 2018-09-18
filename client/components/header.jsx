import React from "react";
import FilterBar from './filterBar.jsx';
import Container from './container.jsx'
import Admin from "./admin.jsx";
import Login from "./login.jsx";
// Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createMuiTheme } from '@material-ui/core/styles';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Typography, TextField, Divider } from '@material-ui/core';
import { ChevronLeft, Home, Email, Edit, Favorite } from '@material-ui/icons';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  };

  handleDrawerClose() {
    this.setState({ open: false });
  };

  render() {
      const { open } = this.state;
      const drawer = (
      <Drawer
        variant="persistent"
        open={open}
      >
        <div style={{ textAlign: 'right' }} >
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List component="nav">
          <ListItem button
          selected={this.props.view === 'Home'}
          onClick={() => {
            this.props.changeView('Home');
            this.handleDrawerClose();
          }}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button
          selected={this.props.view === 'Admin' || this.props.view === 'Login'}
          onClick={() => {
            this.props.changeView('Login');
            this.handleDrawerClose();
          }}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>

          <ListItem button onClick={() => {
            this.handleDrawerClose();
          }}>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Email" />
          </ListItem>

          <ListItem button onClick={() => {
            this.handleDrawerClose();
          }}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
        </List>
      </Drawer>
    );

    return (
      <div className="Header" style={{ display: "flex", alignItems: 'flex-end', marginBottom: 80}}>
        <AppBar style={{backgroundColor: "Teal"}}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className="AppName" noWrap>
              Kid Dash
            </Typography>
            {
              this.props.getFiles !== undefined ? (<div style={{ marginLeft: 20}}>
                  <FilterBar getFiles={this.props.getFiles}/>
                </div>) : null
            }
          </Toolbar>
        </AppBar>
        {drawer}
      </div>
    );
  }
}


export default Header;


/**
 * NOTES: 
 * Header Component
 * Material UI was used to create the persistent drawer menu using the <Drawer> component. 
 * To populate the menu with options, the Material UI <List> component was nested within the <Drawer> 
 * component. Inside of the Material UI List component, list items are added using the <ListItem> component 
 * Nested inside of the <ListItem> component  are <ListItemIcon> and <ListItemText> components. The 
 * <ListItemIcon> wraps around one of many Material UI icon components, for example we used <Home /> 
 * and <Edit /> to name a few. The <ListItemText> component is used to give each <ListItem> component text
 * via its "primary" attribute. Which ever value given to the primary attribute will display as the text for
 * a specific list item. There are other attributes that can be used to have the <ListItemText> component
 * display text for that specific list item that I have not yet explored. An example of a list with only
 * one item can be down as follows: 
 *       
 * <Drawer                                        // Drawer menu component
    variant="persistent"                          // The vairant attribute determines type of menu it is
    open={open}                                   // Determines if menu will show (true) or not (false)
  >
  <div style={{ textAlign: 'right' }} >
    <IconButton onClick={this.handleDrawerClose}> // Wraps around an Icon
      <ChevronLeft />                             // Icon that looks like < when clicked closes drawer  
    </IconButton>
  </div>

  <Divider />                                     // Makes horizontal line

  <List component="nav">                          // Makes a list
    <ListItem button                              // Makes a list item
      selected={this.props.view === 'Home'}   
      onClick={() => {
        this.props.changeView('Home');
        this.handleDrawerClose();
    }}>
    <ListItemIcon>                              // Wraps around an Icon
      <Home />
    </ListItemIcon>
    <ListItemText primary="Home" />             // Allows us to add text via the primary attribute
  </ListItem>
</Drawer>

To further compartmentalize the code, notice from lines 46 - 101 we store the whole Drawer component 
menu along with all of its option in a variable called drawer. On line 120 it is used in the return
statement. 

Menu Items that are not functional yet:
  Email lines 82-89
  Favorites lines 91-98
Also can add additional menu options.
 */