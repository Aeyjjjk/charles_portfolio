import { Mic2, Users, Clock, Globe, Heart, Award, ChevronDown, Cross } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const skills = [
  {
    icon: Mic2,
    title: 'Master of Ceremonies',
    description: 'Expert hosting for weddings, galas, conferences, and award ceremonies with impeccable timing.',
  },
  {
    icon: Users,
    title: 'Crowd Engagement',
    description: 'Natural ability to read and energize audiences of any size, from intimate gatherings to thousands.',
  },
  {
    icon: Clock,
    title: 'Event Flow Management',
    description: 'Seamless coordination with vendors and event planners to ensure your event runs on schedule.',
  },
  {
    icon: Globe,
    title: 'Multilingual Hosting',
    description: 'Fluent in English, Igbo, and Pidgin, connecting with diverse audiences across cultures.',
  },
  {
    icon: Heart,
    title: 'Wedding Specialist',
    description: 'Creating magical moments for couples with personalized scripts and heartfelt ceremonies.',
  },
  {
    icon: Award,
    title: 'Corporate Events',
    description: 'Professional presence for product launches, conferences, and executive functions.',
  },
  {
    icon: Mic2,
    title: 'Live Entertainment',
    description: 'Dynamic stage presence for concerts, festivals, and live entertainment shows.',
  },
  {
    icon: Users,
    title: 'Virtual Event Hosting',
    description: 'Professional hosting for webinars, virtual conferences, and hybrid events.',
  },
  
  {
    icon: Heart,
    title: 'Charity Galas',
    description: 'Passionate hosting for fundraisers and charity events that inspire giving.',
  },
  { 
    icon: Cross,
    title: 'Added',
    description: 'Emotional intelligence and intellect.Ability to keep calm under pressure or in stressful situations',
  },
  {
    icon: Award,
    title: 'Known for',
    description: 'Good and proper dress etiquette',
  },
   
];

const Skills = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-center max-w-2xl mx-auto mb-8 cursor-pointer group"
        >
          <span className="text-gold font-medium tracking-widest uppercase text-sm">Expertise</span>
          <div className="flex items-center justify-center gap-4 mt-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Skills & <span className="text-gradient">Services</span>
            </h2>
            <ChevronDown 
              className={cn(
                "w-8 h-8 text-gold transition-transform duration-300",
                isOpen && "rotate-180"
              )} 
            />
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium animate-pulse hover:bg-gold/20 transition-colors cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              Tap to {isOpen ? 'collapse' : 'expand'}
            </span>
          </div>
          <p className="text-muted-foreground mt-3 text-sm group-hover:text-foreground transition-colors">
            {isOpen ? 'Click anywhere above to hide' : 'Discover my comprehensive skill set refined over years of experience'}
          </p>
        </button>

        <div
          className={cn(
            "grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden transition-all duration-500 ease-out",
            isOpen ? "max-h-[2800px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-gold/50 transition-all duration-500 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <skill.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{skill.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
