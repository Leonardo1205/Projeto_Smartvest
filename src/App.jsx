import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Contents from './pages/Contents'
import ContentDetail from './pages/ContentDetail'
import Header from './components/Header'
import RequireAuth from './routes/RequireAuth'
import OAuthCallback from './pages/OAuthCallback'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/contents" element={<Contents />} />
          <Route path="/contents/:slug" element={<ContentDetail />} />
        </Route>
        <Route path="/oauth/callback" element={<OAuthCallback />} />
      </Routes>
    </>
  )
}
