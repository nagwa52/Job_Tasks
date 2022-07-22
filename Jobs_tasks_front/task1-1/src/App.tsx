import React from 'react'
import './styles/program.css'
import './styles/landing-page.css'
import { BrowserRouter} from 'react-router-dom'
import AppContextProvider from "./providers/AppContextProvider";

import SidebarContextProvider from "./providers/SidebarContextProvider";
import HomeLayout from "./layout/home.layout";
import Navigation from "./navigation";
function App() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				
					<SidebarContextProvider>
						<HomeLayout>
							<Navigation />
						</HomeLayout>
					</SidebarContextProvider>
			</AppContextProvider>
		</BrowserRouter>
	)
}

export default App
