import { HeroSection } from '@/components/home/hero-section'
import { MarqueeSection } from '@/components/home/marquee-section'
import { NewArrivalsSection } from '@/components/home/new-arrivals-section'
import { BrandValuesSection } from '@/components/home/brand-values-section'
import { StorySection } from '@/components/home/story-section'
import { StatsSection } from '@/components/home/stats-section'
import { CollectionsSection } from '@/components/home/collections-section'
import { SaleBanner } from '@/components/home/sale-banner'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { InstagramSection } from '@/components/home/instagram-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <NewArrivalsSection />
      <BrandValuesSection />
      <StorySection />
      <StatsSection />
      <CollectionsSection />
      <SaleBanner />
      <NewsletterSection />
      <InstagramSection />
    </>
  )
}
