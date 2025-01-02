import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import awsConfig from './config/cognito.ts'
import { Amplify } from 'aws-amplify'
import './index.css'
import App from './App.tsx'

Amplify.configure(awsConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
