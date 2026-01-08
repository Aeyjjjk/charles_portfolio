/**
 * ========================================
 * IMAGE CONFIGURATION FILE
 * ========================================
 * 
 * This file centralizes all image paths used throughout the site.
 * To update images, simply replace the file paths below with your own images.
 * 
 * INSTRUCTIONS:
 * 1. Add your images to the src/assets folder
 * 2. Update the import paths below to point to your new images
 * 3. The changes will automatically reflect across the entire site
 * 
 * SUPPORTED FORMATS: jpg, jpeg, png, webp, gif, svg
 */

// Hero Section Background
import heroBg from '@/assets/hero-bg.jpg';

// Event/Gallery Images
import event1 from '@/assets/event-1.jpg';
import event2 from '@/assets/event-2.jpg';
import event3 from '@/assets/event-3.jpg';
import event4 from '@/assets/event-4.jpg';
import event5 from '@/assets/event-5.jpg';
import event6 from '@/assets/event-6.jpg';
import event7 from '@/assets/event-7.jpg';
import event8 from '@/assets/event-8.jpg';
import event9 from '@/assets/event-9.jpg';
import event10 from '@/assets/event-10.jpg';
import event11 from '@/assets/event-11.jpg';
import event12 from '@/assets/event-12.jpg';
import event13 from '@/assets/event-13.jpg';
import event14 from '@/assets/event-14.jpg';
import event15 from '@/assets/event-15.jpg';
import event16 from '@/assets/event-16.jpg';
import event17 from '@/assets/event-17.jpg';
import event18 from '@/assets/event-18.jpg';
import event19 from '@/assets/event-19.jpg';
import event20 from '@/assets/event-20.jpg';
import event21 from '@/assets/event-21.jpg';

// ========================================
// EXPORTED IMAGE CONFIGURATIONS
// ========================================

export const heroImages = {
  background: heroBg,
};

export const eventImages = {
  event1,
  event2,
  event3,
  event4,
  event5,
  event6,
  event7,
  event8,
  event9,
  event10,
  event11,
  event12,
  event13,
  event14,
  event15,
  event16,
  event17,
  event18,
  event19,
  event20,
  event21,
};

// Gallery images with metadata - update titles and categories as needed
export const galleryConfig = [
  {
    id: 1,
    src: event3,
    title: 'MEDRHUS Leadership Summit 2023',
    category: 'Corporate',
  },
  {
    id: 2,
    src: event5,
    title: 'UNMSA Health week 2024',
    category: 'Corporate',
  },
  {
    id: 3,
    src: event17,
    title: 'FanIce Campus Tour 2024',
    category: 'Entertainment',
  },
  {
    id: 4,
    src: event9,
    title: 'St Mulumba Chapliency Choir,2024 Concert',
    category: 'Entertainment',
  },
  {
    id: 5,
    src: event18,
    title: 'Commentator for a Charity football match in  CIC,Enugu',
    category: 'Charity',
  },
  {
    id: 6,
    src: event15,
    title: 'MEDRHUS Leadership Summit 2024',
    category: 'Corporate',
  },
  {
    id: 7,
    src: event11,
    title: 'SUG Leadership Summit 2024',
    category: 'Corporate',
  },
  {
    id: 8,
    src: event19,
    title: 'Birthday Parties',
    category: 'Entertainment',
  },
  {
    id: 9,
    src: event16,
    title: 'AlavanJoy24',
    category: 'Weddings',
  },
  {
    id: 10,
    src: event20,
    title: 'Childrens Day Celebration for Niger Foundation Hospital,Enugu',
    category: 'Entertainment',
  },
  

];

// Events section images with metadata
export const eventsConfig = [
  {
    image: event3,
    title: 'MEDRHUS Leadership Summit 2023',
    date: 'November 4th, 2023',
    venue: 'CBN Auditorium,UNEC',
    description: 'Hosted the prestigious annual MEDRHUS Leadership Summit.',
  },
  {
    image: event7,
    title: 'Okeke Wedding Celebration',
    date: 'February 28, 2024',
    venue: 'Junnels Arena Maryland,Enugu State',
    description: 'A beautiful sunset Wedding with 500+ guests.',
  },
  {
    image: event6,
    title: 'MEDRHUS Leadership Summit 2024[25th Anniversary]',
    date: 'November 2nd, 2024',
    venue: 'Chapel of Redemption Center,Enugu',
    description: 'Nothing beats a well delivered performance for MEDRHUS for their 25th anniversity.',
  },
  {
    image: event14,
    title: 'Techy Jaunt Innovation Summit',
    date: 'Febuary 24th, 2024',
    venue: 'White House Auditorium,UNEC',
    description: 'Moderated panels with industry leaders and innovators in the tech space.',
  },
  {
    image: event9,
    title: 'St Mulumba Choir Concert [De Angelis 1.0]',
    date: 'November 17, 2024',
    venue: 'CBN Auditorum,UNEC',
    description: 'Hosted a choir concert while helping them raise some money for their activities',
  },
  {
    image: event5,
    title: 'Annual UNMSA Health week',
    date: 'March 5th, 2024',
    venue: 'Chapel of Redemption Centre,UNEC',
    description: 'Hosted the annual UNMSA health week with notable dignitres in the building.',
  },
  {
    image: event21,
    title: 'World Children Diabetic Day',
    date: 'November 5th, 2024',
    venue: 'University of Nigeria,Teaching Hospital Enugu',
    description: 'Enaging Children is something I love doing.',
  },
]