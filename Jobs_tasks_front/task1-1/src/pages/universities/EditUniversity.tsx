import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField/TextField'
import Button from '@mui/material/Button'
import { NavLink, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import api from '../../config/api'
import { IUniversityInterface } from '../../config/interfaces/IUniversity.interface'

const EditUniversity = () => {
	const [university, setUniversity] = useState<IUniversityInterface>()
	const [domains, setDomains] = useState<string>('')
	const [web_pages, setWeb_pages] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [alpha_two_code, setAlpha_two_code] = useState<string>('')
	const [country, setCountry]  =useState<string>('')
	const { id } = useParams()
	const navigate = useNavigate()
	const getPostDetails = async () => {
		try {
			const response: IResponseInterface<IUniversityInterface> =
				await api<IUniversityInterface>({
					url: `/api/universities/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setDomains(response.data.domains)
					setAlpha_two_code(response.data.alpha_two_code)
					setCountry(response.data.country)
					setName(response.data.name)
					setWeb_pages(response.data.web_pages)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getPostDetails()
	}, [])
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const requestBody = {
			domains,
			web_pages,
			name,
			country,
			alpha_two_code,
		}
		try {
			const response: IResponseInterface<IUniversityInterface> =
				await api<IUniversityInterface>({
					url: `/api/universities/${id}`,
					method: 'PUT',
					body: JSON.stringify(requestBody),
				})

			if (response.success) {
				// navigate('/group/show/' + post?.groupId)
			}
		} catch (error: any) {
			console.log(error)
		}
	}
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
										id="domain"
										label="domain"
										value={domains}
										size="small"
										onChange={(e) => {
											setDomains(JSON.parse(e.target.value))
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
										id="country"
										label="country"
										value={country}
										size="small"
										onChange={(e) => {
											setCountry(e.target.value)
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
					Post
				</Button>
			</CardActions>
		</form>
	</Card>
</div>
		</div>
	)
}
export default EditUniversity
