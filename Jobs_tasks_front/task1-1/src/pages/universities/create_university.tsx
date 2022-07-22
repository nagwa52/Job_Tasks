import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField/TextField'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { IUniversityInterface } from '../../config/interfaces/IUniversity.interface'
import { ICountryInterface2 } from '../../config/interfaces/ICountry2.interface'
const CreateUniversity = () => {
	const [domains, setDomains] = useState<string[]>([])
	const [web_pages, setWeb_pages] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [alpha_two_code, setAlpha_two_code] = useState<string>('')
	const [country, setCountry] = useState<ICountryInterface2[]>([])
	let [selected, setSelected] = useState<string[]>([])
	const [universities, setUniversities] = useState<IUniversityInterface[]>()
	const navigate = useNavigate()
	const sendData = async function createPost(
		e: React.FormEvent<HTMLFormElement>
	) {
		e.preventDefault()
		const country = ['pid1234']
		const domains = ['f.edu.eg']

		let bodyFormData = new FormData()
		country.forEach((item) => {
			bodyFormData.append('country[]', item)
		})

		domains.forEach((item) => {
			bodyFormData.append('domains[]', item)
		})

		bodyFormData.append('web_pages', web_pages)
		bodyFormData.append('name', name)
		bodyFormData.append('alpha_two_code', alpha_two_code)

		try {
			const response: IResponseInterface<IUniversityInterface> =
				await api<IUniversityInterface>({
					url: `/api/universities/`,
					method: 'POST',
					body: JSON.stringify(bodyFormData),
				})

			if (response.success) {
				if (response.data) {
					console.log('hi response')
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
					setCountry(response.data)
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
		<div
			className="container"
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div className="left">
				<Card sx={{ maxWidth: 700 }} style={{ minHeight: '50vh' }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Edit Basic Info</h2>
							<div>
								<div>
									<TextField
										className="inputText"
										variant="outlined"
										required
										fullWidth
										id="alpha_two_code"
										label="alpha_two_code"
										value={alpha_two_code}
										size="small"
										onChange={(e) => {
											setAlpha_two_code(e.target.value)
										}}
									/>
								</div>
								<br />
								<div>
									<TextField
										className="inputText"
										variant="outlined"
										required
										fullWidth
										id="name"
										label="name"
										value={name}
										size="small"
										onChange={(e) => {
											setName(e.target.value)
										}}
									/>
								</div>
								<br />
								<div>
									<TextField
										className="inputText"
										variant="outlined"
										required
										fullWidth
										id="web_pages"
										label="web_pages"
										value={web_pages}
										size="small"
										onChange={(e) => {
											setWeb_pages(e.target.value)
										}}
									/>
								</div>
								<br />
							</div>
							<br />
						</CardContent>

						<CardActions>
							<Button variant="contained" type="submit">
								Add
							</Button>
						</CardActions>
					</form>
				</Card>
			</div>
		</div>
	)
}
export default CreateUniversity
