import { useEffect, useState } from 'react'
import api from '../../config/api'
import { ICountryInterface2 } from '../../config/interfaces/ICountry2.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ListCountries= () => {
	const [countries, setCountries2] = useState<ICountryInterface2[]>()
	const getCountries = async () => {
		try {
			const response: IResponseInterface<ICountryInterface2[]> =
				await api<ICountryInterface2[]>({
					url: '/api/countries/',
				})

			if (response.success) {
				if (response.data) {
					setCountries2(response.data)
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
		// <div>
		// 	{countries? <ListCountriesComponent country={countries}  />: <div></div>}
		// </div>
		<div>


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Country name</TableCell>
            <TableCell align="right">Country code</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
			
          {countries?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.code}</TableCell>
            </TableRow>
          ))}
		
        </TableBody>
      </Table>
    </TableContainer>
		</div>
	)
}
export default ListCountries
