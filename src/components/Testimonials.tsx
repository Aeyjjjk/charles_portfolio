import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Adaeze Okonkwo',
    role: 'Event Planner, Luxe Events',
    content: 'Charles transformed our corporate gala into an unforgettable experience. His ability to read the room and keep everyone engaged was remarkable. Our clients were thoroughly impressed!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Chinedu & Amara Okeke',
    role: 'Newlyweds',
    content: 'We couldn\'t have asked for a better MC for our wedding. Charles made our special day even more magical with his warmth, humor, and impeccable coordination. Our guests still talk about how amazing he was!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Prof (Mrs)Chikeani',
    role: 'Consultant Endocrinology unit, Pedratrics Deptarment.UNTH',
    content: 'Professional, charismatic, and incredibly talented. Charles hosted our diabetics campaign flawlessly. His energy elevated the entire event and helped us make a lasting impression on our audience.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Dr. Ijeoma Ohuche',
    role: 'Consultant Pediatrics,Niger Foundation Hospital,Enugu State.',
    content: "Charles has hosted our children's day for two consecutive years. His genuine passion for our cause and ability to connect with children is quiet remarkable.",
     rating:4,
  },
{
    id: 5,
    name: 'Fanice',
    role: 'Ice cream campus tour for schools in Enugu',
    content: 'Charles is unbelievably amazing host.He hosted our campus tour for 4 different schools in the state,so amazing. I will recommend if you want excellence and professionalism.',
  rating:5,
},
{
  id: 6,
  name: 'Dr Amara Ejike',
  role: 'Social media manager',
  content: 'Charles is unbelievably amazing host,working with him has been an amazing experience.',
}

]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold font-medium tracking-widest uppercase text-sm">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Client <span className="text-gradient">Feedback</span>
          </h2>
          <p className="text-muted-foreground">
            Hear from the amazing clients I've had the pleasure of working with.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-3xl p-8 md:p-12 border border-border">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12">
              <Quote className="w-12 h-12 text-gold/20" />
            </div>

            {/* Content */}
            <div className="text-center pt-8">
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-light italic">
                "{currentTestimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Author */}
              <div>
                <h4 className="font-display text-xl font-semibold text-foreground">
                  {currentTestimonial.name}
                </h4>
                <p className="text-muted-foreground text-sm mt-1">{currentTestimonial.role}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 bg-gold' : 'bg-muted-foreground/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
