import { useState } from 'react';
import { Send, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    audienceSize: '',
    eventLocation: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.status === 429) {
        // Rate limit exceeded
        toast({
          title: " Too Many Requests",
          description: `${data.error} ${data.contactInfo?.alternativeMessage || 'Please try again later.'}`,
          variant: "destructive",
        });
        return;
      }
  
      if (response.ok && data.success) {
        toast({
          title: " Inquiry Submitted!",
          description: data.message,
          className: "bg-green-50 border-green-200 text-green-900",
        });
        
        // Show additional info
        setTimeout(() => {
          toast({
            title: " Confirmation Email",
            description: data.note,
            className: "bg-blue-50 border-blue-200 text-blue-900",
          });
        }, 1000);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          audienceSize: '',
          eventLocation: '',
          message: '',
        });
        
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
      
    } catch (error: any) {
      console.error('Form submission error:', error);
      
      let errorTitle = " Something Went Wrong";
      let errorDescription = error.message || "Failed to send message. Please try again later.";
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorTitle = "🔌 Connection Error";
        errorDescription = "Cannot connect to server. Please ensure: 1) Backend is running on port 5000, 2) You have internet connection, or 3) Contact me directly at +234 9133 769 535";
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold font-medium tracking-widest uppercase text-sm">Get in Touch</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Book Me for Your <span className="text-gradient">Event</span>
          </h2>
          <p className="text-muted-foreground">
            Ready to make your next event unforgettable? Let's discuss how I can 
            bring energy, professionalism, and excellence to your special occasion.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-display text-2xl font-semibold">Contact Me</h3>
            <div className="space-y-3">
              <a href="tel:+2349133769535" className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors">
                <Phone className="w-5 h-5 text-gold" />
                <span>+234 9133 769 535</span>
              </a>
              <a href="mailto:charlesugwuja9@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors">
                <Mail className="w-5 h-5 text-gold" />
                <span>charlesugwuja9@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-gold" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="+234..."
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium mb-2">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Conference">Conference</option>
                    <option value="Charity/Fundraiser">Charity/Fundraiser</option>
                    <option value="Awards">Awards Ceremony</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="audienceSize" className="block text-sm font-medium mb-2">
                    Audience Size
                  </label>
                  <select
                    id="audienceSize"
                    name="audienceSize"
                    value={formData.audienceSize}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select size</option>
                    <option value="< 50">Less than 50</option>
                    <option value="100+">50 - 100</option>
                    <option value="250+">200 - 900</option>
                    <option value="1000+">1000 - 5000</option>
                    <option value="5000+">5000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="eventLocation" className="block text-sm font-medium mb-2">
                    Event Location
                  </label>
                  <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    placeholder="City or venue"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Tell Me About Your Event *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Share details about your event - venue, expected guests, special requirements..."
                />
              </div>

              <Button 
                type="submit" 
                variant="gold" 
                size="xl" 
                className="w-full relative"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending your inquiry...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Booking Inquiry
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                * Required fields. I'll respond within 24 hours.
                <br />
                {/* <span className="text-amber-600">Note: Backend server must be running on port 5000</span> */}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;