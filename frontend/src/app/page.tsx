import Navbar    from '@/components/layout/Navbar'
import Footer    from '@/components/layout/Footer'
import Hero      from '@/components/landing/Hero'
import Stats     from '@/components/landing/Stats'
import Problems  from '@/components/landing/Problems'
import Features  from '@/components/landing/Features'
import Platforms from '@/components/landing/Platforms'
import Pricing   from '@/components/landing/Pricing'
import FAQ       from '@/components/landing/FAQ'
import CTA       from '@/components/landing/CTA'

export default function LandingPage() {
  return (
    <main className="min-h-screen font-outfit">
      <Navbar />
      <Hero />
      <Stats />
      <Problems />
      <Features />
      <Platforms />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
