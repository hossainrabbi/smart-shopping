import slider_1 from '../images/slider/slider-1.jpg';
import slider_2 from '../images/slider/slider-2.jpg';
import slider_3 from '../images/slider/slider-3.jpg';
import support_1 from '../images/support/support-1.png';
import support_2 from '../images/support/support-2.png';
import support_3 from '../images/support/support-3.png';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';

export const slider = [
  {
    id: 1,
    image: slider_1,
  },
  {
    id: 2,
    image: slider_2,
  },
  {
    id: 3,
    image: slider_3,
  },
];

export const support = [
  {
    id: 1,
    title: 'Free Shipping',
    description: 'Lorem ipsum dolor sit amet consectetu adipisicing elit sed',
    image: support_1,
  },
  {
    id: 2,
    title: 'Support 24/7',
    description: 'Lorem ipsum dolor sit amet consectetu adipisicing elit sed',
    image: support_2,
  },
  {
    id: 3,
    title: 'Money Return',
    description: 'Lorem ipsum dolor sit amet consectetu adipisicing elit sed',
    image: support_3,
  },
];

export const sortProduct = [
  {
    item: 'default',
    name: 'Default',
  },
  {
    item: 'aToZ',
    name: 'A to Z',
  },
  {
    item: 'zToA',
    name: 'Z to A',
  },
  {
    item: 'lowToHeigh',
    name: 'Low to Heigh',
  },
  {
    item: 'heighToLow',
    name: 'Heigh to Low',
  },
];

// Social Media Icons
export const socialMedia = [
  {
    id: 1,
    icon: FaFacebookF,
    link: '#',
  },
  {
    id: 2,
    icon: FaTwitter,
    link: '#',
  },
  {
    id: 3,
    icon: FaLinkedinIn,
    link: '#',
  },
  {
    id: 4,
    icon: FaInstagram,
    link: '#',
  },
];
