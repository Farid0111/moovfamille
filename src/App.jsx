import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Acheteur from './pages/Acheteur'
import Vendeur from './pages/Vendeur'
import Offres from './pages/Offres'
import Demande from './pages/Demande'
import DeposerOffre from './pages/DeposerOffre'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acheteur" element={<Acheteur />} />
        <Route path="/vendeur" element={<Vendeur />} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/demande" element={<Demande />} />
        <Route path="/demande/:offreId" element={<Demande />} />
        <Route path="/deposer-offre" element={<DeposerOffre />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
