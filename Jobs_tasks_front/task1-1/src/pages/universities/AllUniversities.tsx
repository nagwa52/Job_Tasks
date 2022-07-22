import { useEffect, useState } from 'react'
import api from '../../config/api'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUniversityInterface } from '../../config/interfaces/IUniversity.interface'
import { ICountryInterface2 } from '../../config/interfaces/ICountry2.interface'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useNavigate } from 'react-router-dom'
import { NavLink, Link } from 'react-router-dom'
import { FormHelperText, Chip } from '@material-ui/core'
import { MultiSelect } from 'react-multi-select-component'
import { ICountryInterface3 } from '../../config/interfaces/country3'
import { log } from 'console'

const ListAllUniversities = () => {
	const [universities, setUniversities] = useState<IUniversityInterface[]>()

	const navigate = useNavigate()

	const getAllUniversities = async () => {
		try {
			const response: IResponseInterface<IUniversityInterface[]> = await api<
				IUniversityInterface[]
			>({
				url: '/api/universities/all/universities',
			})

			if (response.success) {
				if (response.data) {
					setUniversities(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getAllUniversities()
	}, [])
	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell> domains</TableCell>
							<TableCell> web_pages</TableCell>
							<TableCell> name</TableCell>
							<TableCell> country</TableCell>
							<TableCell> alpha_two_code</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{universities?.map((row,index) => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.domains}
								</TableCell>
								<TableCell>{row.web_pages}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.country}</TableCell>
								<TableCell>{row.alpha_two_code}</TableCell>
								<TableCell style={{ width: '600px', padding: '2px' }}>
									<NavLink to={`/university/add`}>
										<Button
											style={{ maxWidth: '30px' }}
											variant="contained"
											color="primary"
										>
											Add
										</Button>
									</NavLink>
									<Button
										sx={{ width: 60 }}
										variant="contained"
										color="success"
									>
										Edit
									</Button>
									<NavLink to={`/university/delete/${index}`}>
									<Button sx={{ width: 60 }} variant="contained" color="error">
										Delete
									</Button>
									</NavLink>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}
export default ListAllUniversities
