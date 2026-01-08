import { Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroImages } from '@/config/images';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImages.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-4 animate-fade-up opacity-0 delay-100">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm text-gold font-medium">Available for Bookings</span>
          </div>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-up opacity-0 delay-200">
            <span className="text-foreground">CHARLES</span>
            <br />
            <span className="text-gradient">UGWUJA</span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide mb-6 animate-fade-up opacity-0 delay-300">
            Professional Event Host & Master of Ceremonies
          </p>

          {/* Location & Contact */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground mb-10 animate-fade-up opacity-0 delay-400">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-gold" />
              <span> Nigeria</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-gold" />
              <span>+234 913 376 9535 </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-up opacity-0 delay-500">
            <Button 
              variant="gold" 
              size="xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book for Your Event
            </Button>
            {/* <Button 
              variant="gold-outline" 
              size="xl"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Portfolio
            </Button> */}
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 animate-fade-up opacity-0 delay-500">
            <a
              href="https://www.instagram.com/charlesmic_?igsh=NjVueXo2cDN2dXps&utm_source=qr"
              className="w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://x.com/ugwuja_charles?s=21&t=iZ7JveYof2fgLjthoUfW6Q"
              className="w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/charles-ugwuja-5b5707306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              className="w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.facebook.com/share/1C81Ceomv2/?mibextid=wwXIfr"
              className="w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-gold/50 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-gold animate-pulse" />
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
