import { Header } from "./components/Header/Header"
import { HomePage } from "./pages/HomePage/HomePage"
import { CatalogPage } from "./pages/CatalogPage/CatalogPage"
import { Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
      </Routes>
    </>
  )
}


