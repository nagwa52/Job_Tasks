import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Loader from '../../components/Loader'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { useNavigate } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useParams } from 'react-router-dom'
import api from '../../config/api'
import { IUniversityInterface } from '../../config/interfaces/IUniversity.interface'
const DeleteUniversity = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			const response: IResponseInterface<IUniversityInterface> =
				await api<IUniversityInterface>({
                    url: `/api/universities/${id}`,
					method: 'DELETE',
				})

			if (response.success) {
				navigate(`/all/universities`)
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
				<Card sx={{ maxWidth: 700 }} style={{ minHeight: '25vh' }}>
					<form onSubmit={sendData}>
						<CardContent>
							<div>
								<h2> Are you sure to delete this university?</h2>
							</div>
							<br />
						</CardContent>
						<CardActions>
							<Button variant="contained" type="submit"  sx={{ mx: "auto" }}>
								Delete
							</Button>
						</CardActions>
					</form>
				</Card>
			</div>
		</div>
	)
}
export default DeleteUniversity
