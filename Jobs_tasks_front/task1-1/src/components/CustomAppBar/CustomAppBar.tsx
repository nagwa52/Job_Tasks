import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {AppBar} from "../styled/header_styled_components";
import React from "react";
import useSidebarContext from "../../hooks/useSidebarContext";
import {Avatar, Button} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import defaultImage from '../../assets/images/default_avatar.jpg';
import Box from "@mui/material/Box";
import GuestMenu from "./GuestMenu";
import {useNavigate} from "react-router-dom";
import {APP_NAME} from "../../config/helpers/constants";
const CustomAppBar = () => {
  const navigate = useNavigate();
  const {isOpen, handleToggle} = useSidebarContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateToHome = () => {

    navigate("/");
  };
  return (
    <AppBar position="fixed" open={isOpen}>
      <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              handleToggle(!isOpen)
            }}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isOpen && {display: 'none'}),
            }}
          >
            <MenuIcon/>
          </IconButton>
        <Box display={"flex"} alignItems={"center"} flexGrow={1} justifyContent={"space-between"}>
          <Typography variant="h4" noWrap component="div">
            <Button color={"inherit"} onClick={navigateToHome}>
            </Button>
          </Typography>
          <div>
            <Button
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon/>}
            >
              <Avatar alt="Profile Picture" src={defaultImage}/>
            </Button>
            
              {/* <AuthMenu anchorEl={anchorEl} handleClose={handleClose}/> */}
              <GuestMenu anchorEl={anchorEl} handleClose={handleClose}/>
          
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default CustomAppBar;
