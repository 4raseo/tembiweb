// app/venue/page.tsx
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Utensils,
  Music,
  Camera,
  Gift,
  Calendar,
} from 'lucide-react';

/* ---------------------------------- */
/* Komponen Utama Halaman             */
/* ---------------------------------- */
const VenuePage: NextPage = () => {
  return (
    // Latar belakang krem untuk seluruh halaman
    <div className="bg-amber-50 text-stone-800">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Heritage Venue Categories (Not Clickable) */}
      <HeritageVenueCategories />

      {/* 3. Our Heritage Spaces (Clickable) */}
      <OurHeritageSpaces />

      {/* 4. Cultural Experiences (Not Clickable) */}
      <CulturalExperiences />

      {/* 5. Venue Packages */}
      <VenuePackages />

      {/* 6. Simple Booking Process */}
      <SimpleBookingProcess />

      {/* 7. Visit Our Heritage House */}
      <VisitSection />

      {/* 8. Footer */}
      <Footer />
    </div>
  );
};

/* ---------------------------------- */
/* 1. Hero Section                    */
/* ---------------------------------- */
const HeroSection = () => (
  <div className="relative h-[60vh] w-full text-white">
    <Image
      src="/venue-hero.jpg" // GANTI GAMBAR INI
      alt="Gould Historical House"
      layout="fill"
      objectFit="cover"
      className="brightness-50"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold md:text-7xl">Gould Historical House</h1>
      <p className="mt-4 text-lg">Your heritage destination</p>
    </div>
  </div>
);

/* ---------------------------------- */
/* 2. Heritage Venue Categories       */
/* ---------------------------------- */
const categories = [
  {
    title: 'Weddings',
    imgSrc: '/category-wedding.jpg', // GANTI GAMBAR INI
  },
  {
    title: 'Corporate',
    imgSrc: '/category-corporate.jpg', // GANTI GAMBAR INI
  },
  {
    title: 'Private Dining',
    imgSrc: '/category-dining.jpg', // GANTI GAMBAR INI
  },
  {
    title: 'Galas & Events',
    imgSrc: '/category-gala.jpg', // GANTI GAMBAR INI
  },
];

const HeritageVenueCategories = () => (
  <section className="py-20">
    <div className="container mx-auto max-w-7xl px-4 text-center">
      <h2 className="text-4xl font-semibold text-stone-900">
        Heritage Venue Categories
      </h2>
      <p className="mt-4 text-lg text-stone-600">
        We have several categories tailored for your needs.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          // Sesuai deskripsi: Card ini tidak bisa diklik
          <div
            key={category.title}
            className="overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <div className="relative h-64 w-full">
              <Image
                src={category.imgSrc}
                alt={category.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-stone-900">
                {category.title}
              </h3>
              <p className="mt-2 flex items-center justify-center font-medium text-lime-900">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------- */
/* 3. Our Heritage Spaces             */
/* ---------------------------------- */
const heritageSpaces = [
  {
    title: 'The Grand Hall',
    description:
      'A majestic space with soaring ceilings and historical grandeur, perfect for large-scale events, weddings, and galas. Experience the blend of classic architecture and modern amenities.',
    features: [
      'Capacity: 300 guests',
      'Full audio-visual setup',
      'Private bridal suite',
    ],
    imgSrc: '/space-grand-hall.jpg', // GANTI GAMBAR INI
    linkUrl: '/venue', // Link navigasi
  },
  {
    title: 'The Heritage Gardens',
    description:
      'An exquisite outdoor setting surrounded by lush greenery and manicured lawns. Ideal for intimate ceremonies, cocktail receptions, and serene corporate retreats.',
    features: [
      'Capacity: 150 guests',
      'Outdoor marquee available',
      'Beautiful water features',
    ],
    imgSrc: '/space-gardens.jpg', // GANTI GAMBAR INI
    linkUrl: '/venue', // Link navigasi
  },
];

const OurHeritageSpaces = () => (
  <section className="py-20">
    <div className="container mx-auto max-w-7xl px-4">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-stone-900">
          Our Heritage Spaces
        </h2>
        <p className="mt-4 text-lg text-stone-600">
          Explore our collection of unique and historical spaces.
        </p>
      </div>

      <div className="mt-16 space-y-20">
        {heritageSpaces.map((space, index) => (
          <HeritageSpaceCard
            key={space.title}
            {...space}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  </section>
);

type HeritageSpaceCardProps = {
  title: string;
  description: string;
  features: string[];
  imgSrc: string;
  linkUrl: string;
  reverse: boolean;
};

const HeritageSpaceCard = ({
  title,
  description,
  features,
  imgSrc,
  linkUrl,
  reverse,
}: HeritageSpaceCardProps) => (
  <div
    className={`flex flex-col gap-12 lg:flex-row ${
      reverse ? 'lg:flex-row-reverse' : ''
    } items-center`}
  >
    {/* Kolom Gambar */}
    <div className="w-full lg:w-1/2">
      <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl">
        <Image
          src={imgSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>

    {/* Kolom Teks */}
    <div className="w-full lg:w-1/2">
      <h3 className="text-3xl font-semibold text-stone-900">{title}</h3>
      <p className="mt-4 text-stone-600">{description}</p>
      <ul className="mt-6 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center text-stone-700">
            <Check className="mr-3 h-5 w-5 text-lime-800" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {/* Sesuai deskripsi: Card ini bisa diklik via tombol */}
      <Link href={linkUrl} passHref className="mt-8 inline-flex items-center rounded-md bg-lime-800 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-lime-700">
        View Details
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </div>
);

/* ---------------------------------- */
/* 4. Cultural Experiences            */
/* ---------------------------------- */
const experiences = [
  {
    icon: <Utensils />,
    title: 'Culinary Workshops',
    description:
      'Explore heritage recipes with our master chefs in hands-on cooking classes.',
  },
  {
    icon: <Music />,
    title: 'Traditional Music',
    description:
      'Enjoy live performances of traditional music that echo through the halls.',
  },
  {
    icon: <Camera />,
    title: 'Historical Photo Tour',
    description:
      'Discover the hidden stories of the house with a guided photography tour.',
  },
  {
    icon: <Gift />,
    title: 'Local Artisan Market',
    description:
      'Browse unique, handcrafted goods from local artisans every weekend.',
  },
  {
    icon: <Users />,
    title: 'Community Gatherings',
    description: 'We host regular cultural festivals and community events.',
  },
  {
    icon: <Calendar />,
    title: 'Historical Reenactments',
    description:
      'Witness history come alive with our engaging reenactment shows.',
  },
];

const CulturalExperiences = () => (
  <section className="bg-amber-100 py-20"> {/* Latar belakang sedikit beda */}
    <div className="container mx-auto max-w-7xl px-4 text-center">
      <h2 className="text-4xl font-semibold text-stone-900">
        Cultural Experiences
      </h2>
      <p className="mt-4 text-lg text-stone-600">
        A glimpse into the vibrant culture at our heritage house.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {experiences.map((exp) => (
          // Sesuai deskripsi: Card ini tidak bisa diklik
          <div
            key={exp.title}
            className="rounded-lg bg-white p-8 text-center shadow-lg"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-800 text-white">
              {exp.icon}
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-stone-900">
              {exp.title}
            </h3>
            <p className="mt-2 text-stone-600">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------- */
/* 5. Venue Packages                  */
/* ---------------------------------- */
const packages = [
  {
    title: 'Half Day Suite',
    price: '$1,200',
    features: [
      '4-hour venue access',
      'Basic A/V setup',
      'Coffee & tea service',
      'Up to 50 guests',
    ],
    isHighlighted: false,
  },
  {
    title: 'Grand Celebration',
    price: '$4,500',
    features: [
      'Full-day venue access',
      'Premium A/V & lighting',
      '3-course catering',
      'Bridal suite access',
      'Up to 200 guests',
    ],
    isHighlighted: true,
  },
  {
    title: 'Full Heritage',
    price: '$3,000',
    features: [
      '8-hour venue access',
      'Standard A/V setup',
      'Cocktail reception',
      'Up to 100 guests',
    ],
    isHighlighted: false,
  },
];

const VenuePackages = () => (
  <section className="bg-white py-20">
    <div className="container mx-auto max-w-7xl px-4 text-center">
      <h2 className="text-4xl font-semibold text-stone-900">Venue Packages</h2>
      <p className="mt-4 text-lg text-stone-600">
        Choose the package that suits your event perfectly.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.title}
            className={`rounded-lg p-8 ${
              pkg.isHighlighted
                ? 'border-2 border-lime-800 bg-white shadow-2xl'
                : 'border border-stone-200 bg-white shadow-lg'
            }`}
          >
            <h3 className="text-2xl font-semibold text-lime-900">
              {pkg.title}
            </h3>
            <p className="my-4 text-4xl font-bold text-stone-900">
              {pkg.price}
            </p>
            <ul className="space-y-3 text-left text-stone-600">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-lime-800" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 w-full rounded-md px-6 py-3 font-semibold ${
                pkg.isHighlighted
                  ? 'bg-lime-800 text-white hover:bg-lime-700'
                  : 'bg-stone-100 text-lime-900 hover:bg-stone-200'
              }`}
            >
              Choose Package
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------- */
/* 6. Simple Booking Process          */
/* ---------------------------------- */
const bookingSteps = [
  {
    step: 1,
    title: 'Inquire & Tour',
    description: 'Contact us to check availability and schedule a tour.',
  },
  {
    step: 2,
    title: 'Choose Package',
    description: 'Select the venue space and package that fits your needs.',
  },
  {
    step: 3,
    title: 'Sign Contract',
    description: 'Review and sign the event contract and pay the deposit.',
  },
  {
    step: 4,
    title: 'Plan Your Event',
    description: 'Work with our team to finalize all the details.',
  },
];

const SimpleBookingProcess = () => (
  <section className="py-20">
    <div className="container mx-auto max-w-7xl px-4 text-center">
      <h2 className="text-4xl font-semibold text-stone-900">
        Simple Booking Process
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-4">
        {bookingSteps.map((step) => (
          <div
            key={step.step}
            className="flex flex-col items-center text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-800 text-2xl font-bold text-white">
              {step.step}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-stone-900">
              {step.title}
            </h3>
            <p className="mt-2 text-stone-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------- */
/* 7. Visit Our Heritage House        */
/* ---------------------------------- */
const VisitSection = () => (
  <section className="bg-white py-20">
    <div className="container mx-auto max-w-7xl px-4">
      <h2 className="text-center text-4xl font-semibold text-stone-900">
        Visit Our Heritage House
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Kolom Info Kontak */}
        <div className="rounded-lg bg-amber-100 p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-stone-900">
            Contact Information
          </h3>
          <ul className="mt-6 space-y-4 text-stone-700">
            <li className="flex items-start">
              <MapPin className="mr-4 h-6 w-6 flex-shrink-0 text-lime-900" />
              <span>123 Heritage Lane, Gould, Historical District, 12345</span>
            </li>
            <li className="flex items-center">
              <Phone className="mr-4 h-6 w-6 text-lime-900" />
              <span>(123) 456-7890</span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-4 h-6 w-6 text-lime-900" />
              <span>info@gouldhouse.com</span>
            </li>
          </ul>

          <h3 className="mt-10 text-2xl font-semibold text-stone-900">
            Opening Hours
          </h3>
          <ul className="mt-6 space-y-3 text-stone-700">
            <li className="flex">
              <Clock className="mr-4 h-6 w-6 text-lime-900" />
              <span>
                <strong>Tuesday - Friday:</strong> 10:00 AM - 4:00 PM
              </span>
            </li>
            <li className="flex">
              <Clock className="mr-4 h-6 w-6 text-lime-900" />
              <span>
                <strong>Saturday - Sunday:</strong> 10:00 AM - 6:00 PM
              </span>
            </li>
            <li className="flex">
              <Clock className="mr-4 h-6 w-6 text-lime-900" />
              <span>
                <strong>Monday:</strong> Closed
              </span>
            </li>
          </ul>
        </div>

        {/* Kolom Peta */}
        <div className="h-96 w-full overflow-hidden rounded-lg shadow-xl lg:h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086432197116!2d144.9537353153169!3d-37.81720974202113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0x945fdb066914867c!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1678886569111!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------------------------- */
/* 8. Footer                          */
/* ---------------------------------- */
const Footer = () => (
  <footer className="bg-stone-900 text-stone-300">
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
        <div>
          <h4 className="text-lg font-semibold text-white">Gould House</h4>
          <p className="mt-4 text-sm">
            Preserving history, celebrating the future.
          </p>
        </div>
        <div>
          <h5 className="font-semibold text-white">Explore</h5>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/venue" className="hover:text-white">
                Venues
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="hover:text-white">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white">
                Gallery
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold text-white">Legal</h5>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold text-white">Contact Us</h5>
          <ul className="mt-4 space-y-2 text-sm">
            <li>info@gouldhouse.com</li>
            <li>(123) 456-7890</li>
            <li>123 Heritage Lane, Gould</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-stone-700 pt-8 text-center text-sm">
        <p>&copy; 2025 Gould Historical House. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default VenuePage;