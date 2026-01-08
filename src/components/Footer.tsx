import { Instagram, Linkedin, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="font-display text-3xl font-bold text-gold">
              Charles Ugwuja
            </a>
            <p className="text-muted-foreground mt-4 max-w-md">
              Professional Event Host & Master of Ceremonies, bringing energy, 
              elegance, and excellence to every occasion since 2023.
            </p>
          
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

          {/* Quick Links */}
          {/* <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-gold transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#events" className="text-muted-foreground hover:text-gold transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-gold transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-gold transition-colors">
                  Book Now
                </a>
              </li>
            </ul>
          </div> */}

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Wedding MC</li>
              <li className="text-muted-foreground">Corporate Events</li>
              <li className="text-muted-foreground">Conferences and Summit</li>
              <li className="text-muted-foreground">Award Ceremonies</li>
              <li className="text-muted-foreground">Dinner Nights</li>
              <li className="text-muted-foreground">Red Carpet Host</li>
              <li className="text-muted-foreground">Panel Moderator</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Charles N. Ugwuja. All rights reserved.
          </p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
