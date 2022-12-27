import React, {ComponentProps} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from "../components/Sidebar";
import {DrawerHeader} from "../components/styled/header_styled_components";
import CustomAppBar from "../components/CustomAppBar/CustomAppBar";


const HomeLayout = ({children}: ComponentProps<any>) => {
  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <CustomAppBar/>
       <Sidebar/> 
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <DrawerHeader/>
        {children}
      </Box>
    </Box>
  );
}
export default HomeLayout
