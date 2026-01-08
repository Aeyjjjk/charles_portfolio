import { Calendar, MapPin } from 'lucide-react';
import { eventsConfig } from '@/config/images';

const events = eventsConfig.map((event, index) => ({
  id: index + 1,
  title: event.title,
  category: event.description.includes('wedding') ? 'Wedding' : 
            event.description.includes('charity') ? 'Charity' : 
            event.description.includes('festival') || event.description.includes('concert') ? 'Entertainment' : 'Corporate',
  date: event.date,
  location: event.venue,
  // Ensure image is treated as an array even if it's a single string
  images: Array.isArray(event.image) ? event.image : [event.image],
  description: event.description,
}));

const Events = () => {
  return (
    <section id="events" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Notable <span className="text-gradient">Events</span>
          </h2>
          <p className="text-muted-foreground">
            A showcase of memorable events I've had the privilege to host, 
            each one a testament to excellence and unforgettable moments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group rounded-2xl overflow-hidden bg-background border border-border hover:border-gold/50 transition-all duration-500 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className={`relative h-56 overflow-hidden grid ${event.images.length > 1 ? 'grid-cols-2 gap-1' : 'grid-cols-1'}`}>
                {event.images.slice(0, 2).map((img, imgIdx) => (
                  <img
                    key={imgIdx}
                    src={img}
                    alt={`${event.title} - ${imgIdx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ))}
                
                {/* Overlay & Category Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-gold text-primary-foreground text-xs font-semibold shadow-lg">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-gold transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-gold" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-gold" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;