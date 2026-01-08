const About = () => {
  return (
    <section id="about" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Decorative Element */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-gold/20 to-transparent">
              <div className="absolute inset-4 rounded-xl border border-gold/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="font-display text-8xl font-bold text-gradient mb-4">5+</div>
                  <p className="text-muted-foreground text-lg">Years of Excellence</p>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-gold/30 rounded-xl -z-10" />
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-gold/10 rounded-full -z-10" />
          </div>

          {/* Content */}
          <div>
            <span className="text-gold font-medium tracking-widest uppercase text-sm">About Me</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Crafting Unforgettable
              <br />
              <span className="text-gradient">Experiences</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>  Charles is a dynmaic and versatile Mc who knows how to turn any event into an unforgettable 
                experince. 
                He brings authenticity,professionalism and an undeniable spark to every stage he grace.

                With years of experience commanding stages across Nigeria and beyond, 
                I bring an unmatched energy and professionalism to every event I host. From 
                intimate corporate gatherings to grand weddings and high-profile award ceremonies, 
                I transform ordinary moments into extraordinary memories.
              </p>
              <p>
               More than just a host,Charles is a tranied medical practitioner with experience in corporate events, My approach combines meticulous preparation with spontaneous charisma, ensuring 
                every event flows seamlessly while keeping audiences engaged and entertained. 
                I believe that a great MC doesn't just announce – they elevate the entire experience,infusing every event with soulful depth and meaningful connection.
              </p>
              <p>
                
              
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="text-center p-4 rounded-xl bg-secondary">
                <div className="font-display text-3xl font-bold text-gold">50+</div>
                <p className="text-sm text-muted-foreground mt-1">Events Hosted</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary">
                <div className="font-display text-3xl font-bold text-gold">5+</div>
                <p className="text-sm text-muted-foreground mt-1">Corporate Clients</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary">
                <div className="font-display text-3xl font-bold text-gold">2+</div>
                <p className="text-sm text-muted-foreground mt-1">Awards Won</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
