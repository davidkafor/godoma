import { getTestimonials, type TestimonialView } from '@/lib/content'
import { TestimonialsCarousel } from './testimonials-carousel'

// Sample stories shown only if the database cannot be reached.
const defaultTestimonials: TestimonialView[] = [
  {
    quote:
      'The electrical workshops gave me real practice, not just theory. By the time I completed my TVET CDACC assessment, I had already wired installations on my own.',
    name: 'Alumnus',
    role: 'TVET CDACC Electrical & Electronics — Level 6',
  },
  {
    quote:
      'The ICT lab and campus Wi-Fi meant I could practice any time. The trainers are patient and always ready to help with projects.',
    name: 'Trainee',
    role: 'TVET CDACC Information & Communication Technology — Level 6',
  },
  {
    quote:
      'Through the HELB TVET loan I was able to focus on my studies. Godoma TTI prepared me for work in the coastal hospitality industry.',
    name: 'Alumna',
    role: 'TVET CDACC Food & Beverage Production — Level 4',
  },
  {
    quote:
      'As a student leader I saw how the Dean of Students office supports trainees — from motivational talks to mentorship and welfare.',
    name: 'Student Leader',
    role: 'TVET CDACC Business Management — Level 6',
  },
]

export async function TestimonialsSection() {
  const stored = await getTestimonials()
  const testimonials = stored ?? defaultTestimonials
  if (testimonials.length === 0) return null
  return <TestimonialsCarousel testimonials={testimonials} />
}
