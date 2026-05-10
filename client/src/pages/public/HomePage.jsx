import { Helmet } from 'react-helmet-async'
import HeroSection from '../../components/home/HeroSection'
import SearchSection from '../../components/home/SearchSection'
import StatsSection from '../../components/home/StatsSection'
import FeaturedBikes from '../../components/home/FeaturedBikes'
import CategoriesSection from '../../components/home/CategoriesSection'
import HowItWorks from '../../components/home/HowItWorks'
import TestimonialsSection from '../../components/home/TestimonialsSection'
import FAQSection from '../../components/home/FAQSection'
import AppDownloadSection from '../../components/home/AppDownloadSection'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Vignesh Konda Bike Rentals - Hyderabad's Premium Bike Rental</title>
        <meta name="description" content="Rent premium bikes in Hyderabad. Fast, secure, and affordable bike rentals by Vignesh Konda." />
      </Helmet>
      <HeroSection />
      <SearchSection />
      <StatsSection />
      <FeaturedBikes />
      <CategoriesSection />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <AppDownloadSection />
    </>
  )
}
