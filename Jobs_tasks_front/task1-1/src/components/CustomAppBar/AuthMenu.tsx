import MenuItem from '@mui/material/MenuItem'
import UserIcon from '@mui/icons-material/Person'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import LogoutIcon from '@mui/icons-material/Logout'
import { StyledMenu } from '../styled/header_styled_components'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IMenuProps } from '../../config/interfaces/IMenuProps'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
const AuthMenu = ({ anchorEl, handleClose }: IMenuProps) => {
	const navigate = useNavigate()
	const open = Boolean(anchorEl)
	const navigateTo = (to: string) => {
		handleClose()
		navigate(to)
	}
	const handleLogout = () => {
		handleClose()
		navigateTo('/login')
	}

	return (
		<StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={() => navigate(`#`)}>
					<UserIcon />
					My Profile
				</MenuItem>
			
			
			

			<MenuItem onClick={() => navigateTo(`#`)}>
				<EditIcon />
				Edit Profile
			</MenuItem>
			<Divider sx={{ my: 0.5 }} />
			<MenuItem onClick={handleLogout}>
				<LogoutIcon />
				Logout
			</MenuItem>
		</StyledMenu>
	)
}
export default AuthMenu
