import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-photo-view/dist/react-photo-view.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Exam from './pages/Exam.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import Results from '@/pages/Results.tsx'
import { PhotoProvider } from 'react-photo-view';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
	{
		path:"/",
		element: <App />
	},
	{
		path:"/test",
		element:<Exam/>
	},
	{
		path:"/results",
		element:<Results/>
	},
	{
		path:"*",
		element: <div>404</div>
	}
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Toaster/>
		<TooltipProvider>
		<PhotoProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</PhotoProvider>
		</TooltipProvider>
	</StrictMode>,
)
