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
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useNavigate } from 'react-router-dom'
import { FormHelperText, Chip } from '@material-ui/core'
import { MultiSelect } from 'react-multi-select-component'
import { ICountryInterface3 } from '../../config/interfaces/country3'


const ListUniversities = () => {
	const [universities, setUniversities] = useState<IUniversityInterface[]>()
	let [countries2, setCountries2] = useState<ICountryInterface3[]>([])
	let [selected, setSelected] = useState<ICountryInterface3[]>([])
	const navigate = useNavigate()

	// const getUniversities = async () => {
		const sendData = (e: any) => {
			e.preventDefault();
			(async () => {
				await getUniversities();
			})()
		}
		const getUniversities = async () =>{
		let requestBody = {
		 	country: selected
		}
		try {
			const response: IResponseInterface<IUniversityInterface[]> = await api<
				IUniversityInterface[]
			>({
				url: '/api/universities/',
				body: JSON.stringify(requestBody),
			})

			if (response.success) {
				console.log("2")
				if (response.data) {
					setUniversities(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	const getCountries = async () => {
		try {
			const response: IResponseInterface<ICountryInterface2[]> = await api<
				ICountryInterface2[]
			>({
				url: '/api/countries/',
			})

			if (response.success) {
				if (response.data) {
					setCountries2(
						response.data.map((country) => ({
							label: country.name,
							value: country.code,
						}))
					)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCountries()
	}, [])

	return (
		<div>
			<form onSubmit={sendData}>
			<MultiSelect
				options={countries2}
				value={selected}
				onChange={(e: any) => {
					setSelected(e)
					let value: any = []
					e.map((item: any) => {
						value.push(item.label)
					})
					console.log("value",value)
					setSelected(value);
				
				}}
				labelledBy="Select"
			/>
			<button type="submit">save</button>
			</form> 

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>University domains</TableCell>
							<TableCell>University web_pages</TableCell>
							<TableCell>University name</TableCell>
							<TableCell align="right">University country</TableCell>
							<TableCell>University alpha_two_code</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{universities?.map((row) => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.domains}
								</TableCell>
								<TableCell align="right">{row.web_pages}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}
export default ListUniversities
