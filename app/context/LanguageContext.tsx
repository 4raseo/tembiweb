// app/context/LanguageContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Definisikan Tipe Data
type Language = 'en' | 'id';

// 2. Kamus Kata (Dictionary)
const translations = {
  en: {
    nav: {
      home: 'Tembi',
      house: 'House',
      foods: 'Foods',
      venue: 'Venue',
      history: 'History',
      collections: 'Collections',
      book: 'Book Now',
    },
    homepage:{
      hero: {
        title: 
        [
          'Where Historical',
          'Culture Is Divine'
        ],
        explore: 'Explore Our House',
        gallery: 'View Gallery',
      },
      intro: {
        title: 'Experience Javanese Historical Culture',
        p1: 'A place that brings calm and comfort so your mind feels lighter. The sound of nature welcomes you as soon as you step in. Fresh air helps your body relax. A well arranged space protects your rest so nothing interrupts your peace.',
        p2: 'Morning comes with a warm breakfast so the day feels kinder. Sitting on the terrace or taking a slow walk in the garden is enough to ease your heart. Energy returns slowly. A quiet peace appears on its own. Rest here is more than sleep, You have space to recover.',
        stats: { founded: 'Founded', artifacts: 'Artifacts', house: 'House' }
      },
      accommodation: {
        label: 'Accommodation',
        title: 'Historical Home',
        desc: 'Each house is a sanctuary of cultural heritage, thoughtfully designed to immerse you in the timeless elegance of Javanese architecture.',
        btn: 'Book Now',
        rec: 'Recommendation',
        facilities: { bed: 'King Bed', view: 'Rice Field View' }
      },
      houses: [
        {
          name: 'Ngadirojo',
          desc: 'Ngadirojo House is a traditional Javanese limasan built in 1946 and relocated from Bawak Village, Cawas, Klaten. Combining Javanese architecture with natural tranquility.',
          image: '/images/rooms/ngadirojo/ngadirojo.png',
        },
        {
          name: 'Polaman',
          desc: 'Polaman House is a traditional Javanese limasan built in 1948. It combines the warmth of Javanese architecture with natural landscapes.',
          image: '/images/rooms/polaman/polaman.png',
        },
        {
          name: 'Adikarto',
          desc: 'Adikarto House is a traditional Javanese limasan house that brings coolness and comfort in a natural atmosphere. Built in 1960.',
          image: '/images/rooms/adikarto/adikarto.png',
        },
      ],
      pavillion: {
          title: ['All Pavilions', 'Include'],
          icon: ["/images/icons/wifi-green.svg", "/images/icons/cup-green.svg", "/images/icons/music-green.svg"],
          desc: ['Wi-Fi', 'Special Welcome Drink', 'Traditional Course' ],
          button: 'View All House'
      },
      living:{
        head: ['Living', 'Experience'],
        title: {item1: 'Historical Culture', item2: 'Natural Harmony', item3: 'Meaningful Moments'},
        desc: {item1: 'Authentic Javanese architecture and traditions', item2: 'Surrounded by lush tropical gardens and rice fields', item3: 'Rest that feels valuable and memorable'},
      },
      food:{
        head: ['Food &', 'Drink'],
        desc: "Enjoy a culinary experience that highlights the richness of Indonesian flavors. Traditional recipes are preserved and refined with modern techniques so each dish feels familiar yet exciting. The calm atmosphere adds comfort to every meal. Culture becomes part of the dining moment through flavors that feel warm and full of character.",
        item: {item1: 'Fresh ingredients from local organic farms', item2: 'Traditional recipes with modern presentation', item3: 'Friendly service that makes you feel at home'},
        button: 'View Packages'
      },
      venue:{
        head: 'EVENT & CELEBRATION',
        title: 'Sacred Spaces for Special Moments',
        desc: 'Create unforgettable memories in our culturally rich venues, where traditional Javanese architecture provides the perfect backdrop for weddings, corporate retreats, and cultural celebrations.',
        firstCard: 
        {
          title: 'Wedding Ceremony',
          desc: 'Celebrate your special moment in our quiet pendopo, surrounded by fresh greenery and a peaceful atmosphere. Our team will help take care of the details so your ceremony feels personal and meaningful.',
          item1: 'Capacity: Up to 150 guests',
          item2: 'Garden ceremony options',
          item3: 'Traditional gamelan accompaniment',
          button: 'Plan Your Wedding'
        },
        secondCard:
        {
          title: 'Corporate Retreat',
          desc: 'Spark new ideas and strengthen teamwork in a calm and inspiring setting.Our meeting spaces combine traditional charm with modern facilities, creating a comfortable place for focused work and meaningful collaboration.',
          item1: 'Multiple room configurations',
          item2: 'High-speed internet & AV equipment',
          item3: 'Traditional refreshment service',
          button: 'Book Corporate Event'
        },
      },
      collection:{
        title: 'Historical Collection',
        desc: 'Discover our carefully curated collection of Javanese cultural artifacts that tell the story of Indonesias rich heritage and artistic traditions',
        cardTitle: {item1: 'Cundrik Collection', item2: 'Cundrik Collection', item3: 'Keris Collection', item4: 'Keris Collection'},
        cardDesc: 
        {
          item1: 'A small cundrik once carried as a personal weapon.', 
          item2: 'A longer cundrik forged with sanak patterns. ', 
          item3: 'A keris from the Surakarta tradition with a straight blade.', 
          item4: 'A keris with five curves and a strong pamor pattern along the blade. '
        },
        button: 'Explore Full Collection'
      },
      location:{
        title: 'Location & Access',
        subtitle: 'Easy to reach from Yogyakarta city center and airport',
        cardTitle: {item1: 'Address', item2: 'From Airport', item3: 'From City Center'},
        cardDesc:{
          item1: 'Jl. Parangtritis KM 8.4, Timbulharjo, Sewon, Bantul, Yogyakarta 55186, Indonesia',
          item2: '25 minutes drive from Yogyakarta International Airport',
          item3: '15 minutes drive from Malioboro Street and city center'
        },
        transport: 
        {
          title: "Transportation Options",
          item1: "Taxi and ride-sharing services available",
          item2: "Public bus route 1A stops nearby",
          item3: "Free on-site parking for 50+ vehicles"
        }
      }
    },
    history:{
      hero:{
        title: ['Our Story:', 'Tembi History Home'],
        subtitle: 'A place where heritage lives and traditions continue — preserving Javanese culture with heart and harmony.',
      },
      intro:{
        head: 'HERITAGE & CULTURE',
        title: [
          'Where Javanese Soul', 
          'Meets Modern', 
          'Comfort',
        ],
        subtitle: [
          'Founded on May 20, 2000, Tembi Historical Home was originally known as Tembi Rumah Budaya, a sanctuary dedicated to preserving the richness of Javanese philosophy, art, and traditions. It began as a humble cultural space designed for education, expression, and documentation of Javanese culture, becoming a living archive where heritage meets daily life.',
          'Over time, Tembi evolved beyond a cultural institution into a boutique heritage hospitality destination. Since 2008, it has offered accommodations, dining experiences, and event venues, from intimate gatherings to grand weddings, while maintaining its essence as a center for cultural preservation.'
        ],
        item: [
          'Years of Heritage',
          'Cultural Programs',
          'Visitor Welcomed'
        ]
      },
      founder:{
        head: 'Our Founder',
        title: [
          'The Visionary Behind',
          'Our Cultural Mission'
        ],
        desc1: [
          'Tembi Historical Home was founded by the late',
          'Pollycarpus Swantoro,', 
          'an esteemed cultural figure and journalist in Indonesia. Inspired by his childhood memories and love for his hometown, Yogyakarta, he envisioned a place where people could reconnect with their cultural roots amidst the waves of modernization.',
        ],
        desc2:[
          'His legacy is now carried forward by his eldest son,',
          'Norbertus Nuranto.',
          'who continues to nurture Tembi as a space of inclusive and inspiring culture, where everyone, from local communities to international visitors, can experience the timeless beauty of Javanese heritage.'
        ],
      },
      living:{
        head: 'LIVING CULTURE',
        title: 'A Home of Living Culture',
        subtitle: 'Tembi is more than a place to stay. It is an experience of Javanese life through its traditions, arts, and philosophy. From classical Javanese dance classes to batik-making and macapat sessions, we continue to nurture cultural expression and learning.',
        title2: 'Cultural Philosophy',
        desc: [
          'Our cultural programs are built on the Javanese philosophy of Hamemayu Hayuning Bawana - to beautify and preserve the world.',
          'We believe culture is not a collection piece but a living, breathing entity that grows through sharing and practice.'
        ],
        item: [
          'Cultural Activities',
          'Monthly Participants'
        ]
      },
      contact:{
        title: [
          'Where Historical',
          'Culture Is Divine'
        ],
        subtitle: 'Join us in preserving and experiencing Javanese historical culture, where every visit becomes a way to connect with tradition',
        itemTitle: [
          'Direct Booking',
          'Cultural Inquiries',
          'Visit Us'
        ],
        itemDesc:[
          'Call us directly for personalized cultural experiences and special packages.',
          'Learn more about our workshops, events, and heritage programs.',
          'Located in the heart of Yogyakartas cultural district.'
        ]
      }
    },
    foods:{
      hero:{
        label: 'Authentic Javanese Cuisine',
        title: ['Food & Drink', 'Packages'],
        subtitle: 'Authentic Javanese taste for every occasion',
        desc: 'Enjoy the warmth of Javanese hospitality through our food. From classic buffet spreads to snack and meal boxes, every dish is prepared with cultural care and local flavor, bringing you the authentic taste of Central Javas culinary heritage.'
      },
      intro:{
        label: 'Cultural Heritage',
        title: ['Preserving Tradition Through', 'Authentic Flavors'],
        desc: 'At Tembi Historical Home, we believe that food is the heart of cultural preservation. Our catering services bring together generations of Javanese culinary wisdom, using traditional recipes passed down through families and prepared with locally-sourced ingredients.',
        itemTitle:[
          'Traditional Recipes',
          'Local Ingredients',
          'Cultural Presentation'
        ],
        itemDesc: [
          'Authentic Javanese dishes prepared using time-honored methods',
          'Fresh, locally-sourced ingredients from Yogyakarta region',
          'Served on traditional banana leaves and wooden plates'
        ],
      },
      packages:{
        label: 'Catering Packages',
        title: ['Choose Your Perfect', 'Package'],
        subtitle: 'Each package is carefully curated to deliver an authentic Javanese dining experience, perfect for various occasions and group sizes.',
        card1:{
          badge: '≥35 pax',
          title: 'Buffet Package',
          subtitle: 'Perfect for Large Gatherings',
          desc: 'Ideal for gatherings, meetings, and cultural events. A complete spread featuring rice, soup, main dishes.',
          features: [
            'Complete meal spread',
            'Traditional serving style',
            'Multiple dish options',
            'Dessert & beverages included'
          ],
          linkUrl: '/catering/buffet',
          buttonText: 'View Buffet Menu'
        },
        card2:{
          badge: '≥35 pax',
          title: 'Snack Box Package',
          subtitle: 'Delightful Traditional Treats',
          desc: 'A delightful assortment of traditional snacks and sweets perfect for light events, meetings, or afternoon tea.',
          features: [
            'Traditional snacks variety',
            'Individual packaging',
            'Sweet & savory options',
            'Traditional tea included'
          ],
          linkUrl: '/catering/snack-box',
          buttonText: 'View Snack Box Menu'
        },
        card3:{
          badge: '≥35 pax',
          title: 'Rice Box Package',
          subtitle: 'Complete Individual Meals',
          desc: 'A complete individual meal packed with authentic Javanese dishes. Perfect for business meetings or seminars.',
          features: [
          'Complete balanced meal',
            'Individual box packaging',
            'Traditional main dishes',
            'Authentic sambal included'
          ],
          linkUrl: '/catering/rice-box',
          buttonText: 'View Rice Box Menu'
        },
        footerTitle: [
          'Minimum 35 Guests',
          '24-Hour Notice'
        ],
        footerDesc: [
          'All packages available for groups of 35 people or more',
          'Please place orders at least 24 hours in advance'
        ]
      },
      menus:{
        label: 'Sample Menus',
        title: ['Taste the', 'Authentic Flavors'],
        desc: 'Experience the rich culinary heritage of Java through our carefully selected traditional dishes, each prepared with love and authentic recipes.',
        buffet: {
          title: 'Buffet Package Highlight',
          desc: 'A complete spread of traditional Javanese dishes',
          item:[
            { image: '/images/foods/nasi-liwet.png', title: 'Nasi Liwet', desc: 'Aromatic coconut rice cooked in banana leaves with traditional spices' },
            { image: '/images/foods/ayam-kremes.png', title: 'Ayam Goreng Kremes', desc: 'Crispy fried chicken with traditional peanut coating' },
            { image: '/images/foods/sayur-asem.png', title: 'Sayur Asem', desc: 'Traditional tamarind soup with mixed vegetables' },
            { image: '/images/foods/sambal.png', title: 'Sambal Bajak', desc: 'Spicy traditional chili paste with peanuts and spices' },
            { image: '/images/foods/es-dawet.png', title: 'Es Dawet', desc: 'Refreshing coconut milk drink with rice flour jelly' },
          ],
        },
        snack: {
          title: 'Snack Box Delights',
          desc: 'Traditional sweets and savory treats',
          item:[
            { image: '/images/foods/klepon.png', title: 'Klepon', desc: 'Green rice balls filled with palm sugar and rolled in coconut' },
            { image: '/images/foods/kue-lumpur.png', title: 'Kue Lumpur', desc: 'Soft traditional cake with coconut milk and raisins' },
            { image: '/images/foods/pastel.png', title: 'Pastel', desc: 'Crispy fried pastry with seasoned vegetable and meat filling' },
            { image: '/images/foods/teh.png', title: 'Teh Hangat', desc: 'Warm traditional herbal tea with aromatic spices' },
          ],
        },
        rice: {
          title: 'Rice Box Complete Meal',
          desc: 'Balanced individual portions of authentic dishes',
          item: [
            { image: '/images/foods/nasi-putih.png', title: 'Nasi Putih', desc: 'Perfectly steamed jasmine rice as the foundation' },
            { image: '/images/foods/ayam-kalasan.png', title: 'Ayam Kalasan', desc: 'Traditional grilled chicken with sweet soy sauce marinade' },
            { image: '/images/foods/tempe.png', title: 'Tempe Bacem', desc: 'Braised tempeh with palm sugar and traditional spices' },
            { image: '/images/foods/urap.png', title: 'Urap', desc: 'Mixed vegetable salad with seasoned grated coconut' },
            { image: '/images/foods/sambal-fresh.png', title: 'Sambal', desc: 'Fresh homemade chili paste with authentic spice blend' },
          ]
        }
      },
      gen: {
        card: {
          title: '3 Generations',
          subtitle: 'Of culinary tradition',
          desc: 'Every dish tells a story of our ancestors and their love for authentic flavors.'
        },
        label: 'Our Heritage',
        title: [
          'Three Generations of',
          'Culinary Excellence'
        ],
        desc: 'Our recipes have been carefully preserved and passed down through three generations of the Tembi family. Each dish represents not just a meal, but a piece of Javanese cultural heritage that were proud to share with every guest.',
        itemTitle: [
          'Traditional Recipes',
          'Farm-to-Table Philosophy',
          'Handcrafted with Love'
        ],
        itemDesc: [
          'Authentic recipes dating back to the early 1900s, carefully documented and preserved by our family matriarchs.',
          'We source ingredients from local farmers and our own heritage garden, ensuring freshness and supporting the community.',
          'Every dish is prepared by hand using traditional methods, ensuring authentic taste and cultural integrity.'
        ]
      },
      celebrate: {
        label: 'Perfect Occasions',
        title: ['Celebrate Every', 'Moment'],
        desc: 'From intimate gatherings to grand celebrations, our catering packages are designed to make every occasion memorable with authentic Javanese hospitality.',
        card1: {
          title: 'Corporate Events',
          subtitle: 'Professional meetings with cultural flair',
          features: [
            'Business meetings & seminars',
            'Corporate retreats',
            'Team building events'
          ]
        },
        card2: {
          title: 'Cultural Celebrations',
          subtitle: 'Weddings and traditional ceremonies',
          features: [
            'Traditional weddings',
            'Cultural festivals',
            'Religious ceremonies'
          ]
        },
        card3: {
          title: 'Family Gatherings',
          subtitle: 'Intimate celebrations with loved ones',
          features: [
            'Birthday celebrations',
            'Family reunions',
            'Holiday gatherings'
          ]
        },
        stat1: {
          number: '100+',
          label: 'Events Catered'
        },
        stat2: {
          number: '1,000+',
          label: 'Guests Served'
        },
        stat3: {
          number: '98%',
          label: 'Satisfaction Rate'
        },
        stat4: {
          number: '15+',
          label: 'Years Experience'
        },
      },
      contact: {
        title: 'Need Help or Have Questions?',
        subtitle: 'Our team is here to help you plan the perfect catering experience for your special event.',
        card1: {
          title: 'Call Us',
          subtitle: 'Speak directly with our catering specialists',
          phone: '+62 274 368 000',
          desc: 'Daily 8:00 AM - 8:00 PM'
        },
        card2: {
          title: 'WhatsApp',
          subtitle: 'Quick response for urgent inquiries',
          phone: '+62 822 2514 2729',
          desc: 'Chat Now'
        },
        card3: {
          title: 'Email Us',
          subtitle: 'Detailed inquiries and custom requests',
          phone: 'catering@tembihistoricalhome.com',
          desc: 'Response within 24 hours'
        },
        footer: {
          title: 'Special Requests & Custom Packages',
          desc: 'Planning a unique event or need a custom menu? Our culinary team can create bespoke catering solutions tailored to your specific requirements, dietary needs, and cultural preferences.',
          button: 'Request Custom Quote'
        }
      }
    },
    catering:{
      hero: {
        label: 'Premium Catering Service',
        title: 'Buffet Catering Packages',
        desc: 'Authentic Javanese dishes for gatherings and celebrations, carefully crafted with traditional recipes passed down through generations.',
        pax: 'Minimum 35 Pax',
        hour: '4-6 Hours Service',
        buttonText: 'View Packages'
      },
      intro: {
        label: 'Our Heritage',
        title: 'A Culinary Journey Through Javanese Tradition',
        desc: 'For over three decades, Tembi Historical Home has been preserving the authentic flavors of Javanese cuisine. Our buffet catering service brings the warmth of traditional hospitality to your special occasions.',
        stats1: {
          num: '25+',
          desc: 'Years of Experience'
        },
        stats2: {
          num: '100+',
          desc: 'Events Catered'
        },
      },
      buffetMenu: {
        label: 'Our Menu',
        title: 'Authentic Javanese Flavors',
        desc: 'Each buffet package is carefully crafted with a perfect balance of Javanese flavors — from savory mains that warm the soul to refreshing drinks and sweet desserts that complete the experience.',
        menuCard1: {
          icon: "/images/icons/circle-white.svg",
          title: "Soup",
          subtitle: "Pilih Kuah & Sayur",
          items: [
            'Sup Sayur Bening', 'Sup Bakso Sosis', 'Sup Rolade',
            'Sup Ayam Jagung', 'Sup Timlo', 'Jangan Lodeh',
            'Jangan Asem', 'Jangan Bobor Gandol', 'Oblok Godhong Telo',
            'Gulai Nangka Muda'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.svg",
          title: "Main Course",
          subtitle: "Tumis & Lauk",
          items: [
            'Tumis Tempe Kacang Panjang', 'Tumis Tahu Tomat Ijo', 
            'Oseng Tempe Lombok Ijo', 'Oseng Janggel Sosis', 
            'Oseng Terong Balado', 'Oseng Labu Siam', "Ca' Buncis Tahu", 
            "Ca' Kembang Kol Bakso", "Ca' Brokoli Jamur Kuping", 'Sapo Tahu'
          ]
        },
        menuCard3: {
          icon: "/images/icons/ice-cream-white.svg",
          title: "Desserts",
          subtitle: "Traditional Sweets",
          items: [
            'Es Dawet Tradisional', 'Klepon Gula Jawa', 
            'Onde-onde Wijen', 'Lupis Ketan'
          ]
        },
        menuCard4: {
          icon: "/images/icons/drink-white.svg",
          title: "Beverages",
          subtitle: "Refreshing Drinks",
          items: [
            'Es Degan', 'Es Teh Manis', 'Es Jeruk', 'Es Setup',
            'Es Dawet', 'Es Serut Melon', 'Es Buah', 'Es Cincau',
            'Es Cocktail', 'Es Infuse Water'
          ]
        },
        menuCard5: {
          icon: "/images/icons/circle-white.svg",
          title: "Chicken",
          subtitle: "Pilihan Ayam",
          items: [
            'Ayam Goreng Kalasan', 'Ayam Goreng Kremes', 'Ayam Lada Hitam',
            'Ayam Daun Temuru', 'Ayam Fillet Goreng', 'Ayam Saus Mentega',
            'Ayam Semur', "Ayam Ca' Jamur", 'Ayam Cabe Ijo', 'Chicken Katsu'
          ]
        },
        menuCard6: {
          icon: "/images/icons/chicken-white.svg",
          title: "Egg",
          subtitle: "Pilihan Telur",
          items: [
            'Telur Semur', 'Telur Balado', 'Telur Dadar Padang',
            'Telur Asin', 'Telur Rebus', 'Telur Crispy',
            'Telur Ceplok Bumbu Bali', 'Telur Goreng Cabe Ijo',
            'Gulai Telur', 'Fuyung Hai'
          ]
        },
        menuCard7: {
          icon: "/images/icons/circle-white.svg",
          title: "Fish",
          subtitle: "Pilihan Ikan",
          items: [
            'Lele Goreng Kremes', 'Mangut Lele', 'Nila Sambal Matah',
            'Nila Goreng/Bakar', 'Kembung Cabe Ijo', 'Kembung Balado',
            'Ikan Fillet Asam Manis', 'Ikan Fillet Sambal Matah',
            'Ikan Fillet Dabu-Dabu', 'Ikan Katsu'
          ]
        },
        menuCard8: {
          icon: "/images/icons/chicken-white.svg",
          title: "Side Dish",
          subtitle: "Pilihan Menu Pendamping",
          items: [
            'Mendoan', 'Tahu/Tempe Goreng', 'Tahu/Tempe Bacem',
            'Perkedel Tahu', 'Tahu Susu', 'Tahu Crispy',
            'Bakwan Sayur', 'Bakwan Jagung', 'Perkedel Kentang',
            'Jamur Crispy'
          ]
        }
      },
      snackMenu: {
        label: 'Our Menu',
        title: 'Authentic Javanese Snack',
        desc: 'Each box is thoughtfully curated to combine sweet, savory, and crunchy textures offering a true taste of Indonesian tradition.',
        menuCard1: {
          icon: "/images/icons/circle-white.svg", // Icon tanda seru (!)
          title: "Sweet Snacks",
          subtitle: "", // Dikosongkan karena tidak ada subtitle di gambar
          items: [
            'Klepon',
            'Kue Lapis',
            'Dadar Gulung',
            'Lemper',
            'Putu Ayu',
            'Bolu Kukus',
            'Risoles Coklat'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.svg", // Icon ayam
          title: "Savory Snacks",
          subtitle: "",
          items: [
            'Pastel',
            'Lumpia',
            'Risoles Mayo',
            'Arem-Arem Ayam',
            'Martabak Mini',
            'Sosis Solo',
            'Kroket Kentang'
          ]
        },
        menuCard3: {
        icon: "/images/icons/ice-cream-white.svg", // Icon es krim
        title: "Crunchy Snacks",
        subtitle: "",
        items: [
          'Emping Jagung',
          'Keripik Singkong',
          'Kacang Bawang',
          'Keripik Tempe'
          ]
        }
      },
      riceMenu: {
        label: 'Our Menu',
        title: 'Authentic Javanese Flavors',
        desc: 'Each Nasi Box offers a complete meal designed to nourish and satisfy.',
        menuCard1: {
          icon: "/images/icons/circle-white.svg", // Icon tanda seru lingkaran
          title: "Main Dishes",
          subtitle: "", // Kosong karena tidak ada subtitle di gambar
          items: [
            'Steamed rice',
            'Kalasan fried chicken',
            'Crispy chicken',
            'Spicy egg',
            'Braised chicken'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.svg", // Icon paha ayam
          title: "Side Dishes",
          subtitle: "",
          items: [
            'Stir-fried tempeh with long beans',
            'Eggplant balado',
            'Mixed vegetables with grated coconut',
            'Tofu sauté',
            'Sambal Terasi'
          ]
        },
        menuCard3: {
          icon: "/images/icons/ice-cream-white.svg", // Icon es krim
          title: "Add-Ons",
          subtitle: "",
          items: [
            'Tofu',
            'Tempe',
            'Potato Fritters',
            'Fried Fish'
          ]
        },
        menuCard4: {
          icon: "/images/icons/drink-white.svg", // Icon gelas
          title: "Extras",
          subtitle: "",
          items: [
            'Fresh fruit',
            'Crackers',
            'Bottled water'
          ]
        }
      },
      buffet: {
        label: 'Choose Your Package',
        title: 'Buffet Package Options',
        subtitle: 'Select the perfect package for your event, each designed to provide an authentic Javanese dining experience with varying levels of service and menu options.',
        badge: 'MOST POPULAR',
        footer: 'Need a custom package? Contact us directly.',
        buttonText: 'Request Custom Quote',
        card1: {
          name: "Buffet Standard",
          minPax: "35 Pax",
          description: "Perfect for corporate events",
          theme: "standard",
          iconSrc: "/images/icons/food-white.svg", 
          items: [
            "1 Traditional Soup (Sup Ayam Jagung or Lodeh)",
            "2 Main Dishes (Ayam Goreng Kalasan + Telur Balado)",
            "2 Side Dishes (Tumis Tempe + Oseng Terong)",
            "1 Traditional Dessert (Es Dawet)",
            "2 Beverages (Es Teh + Es Jeruk)",
            "Basic table setup & serving equipment"
          ]
        },
        card2: {
          name: "Buffet Premium",
          minPax: "50 Pax", // Sesuai gambar English version
          description: "Ideal for weddings & celebrations",
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.svg", 
          items: [
            "2 Traditional Soups (Choice of 3 options)",
            "3 Premium Main Dishes including Ayam Lada Hitam",
            "3 Side Dishes with Kembung Cabe Ijo",
            "2 Traditional Desserts + Fruit platter",
            "3 Beverages including Wedang Jahe",
            "Enhanced table setup with traditional decorations",
            "Professional serving staff included"
          ]
        },
        card3: {
          name: "Buffet Exclusive",
          minPax: "100 Pax", // Sesuai gambar English version
          description: "Ultimate traditional experience",
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.svg", 
          items: [
            "Full traditional buffet setup with banana leaves",
            "3 Traditional Soups in clay serving pots",
            "5 Premium Main Dishes + Gulai Telur special",
            "4 Traditional Side Dishes",
            "Complete dessert station with 4 varieties",
            "Traditional beverage station with live preparation",
            "Full decorative service with gamelan music",
            "Dedicated event coordinator & serving team"
          ]
        },
      },
      snack: {
        label: 'Choose Your Package', //
        title: 'Snack Box Options', //
        subtitle: 'Select the perfect package for your event, each designed to provide an authentic Javanese dining experience with varying levels of service and menu options.', //
        badge: 'MOST POPULAR', //
        footer: 'Need a custom package? We can create a personalized buffet experience for your special event.', //
        buttonText: 'Request Custom Quote', //
        card1: {
          name: "Snack Box A", //
          minPax: "35 Pax", //
          description: "Ideal for short meetings or small gatherings.", //
          theme: "standard",
          iconSrc: "/images/icons/food-white.svg", 
          items: [
            "2 snacks", //
            "1 crunchy item (kletikan)", //
            "1 cup of mineral water" //
          ]
        },
        card2: {
          name: "Snack Box B", //
          minPax: "35 Pax", //
          description: "Balanced variety for seminars or workshops.", //
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.svg", 
          items: [
            "3 snacks", //
            "1 crunchy item (kletikan)", //
            "1 cup of mineral water" //
          ]
        },
        card3: {
          name: "Snack Box C", //
          minPax: "35 Pax", //
          description: "Premium assortment for formal or special occasions.", //
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.svg", 
          items: [
            "3 snacks", //
            "1 crunchy item (kletikan)", //
            "1 cup of mineral water" //
          ]
        },
      },
      rice: {
        label: 'Choose Your Package', //
        title: 'Rice Box Options', //
        subtitle: 'Select the perfect package for your event, each designed to provide an authentic Javanese dining experience with varying levels of service and menu options.', //
        badge: 'MOST POPULAR', //
        footer: 'Need a custom package? We can create a personalized buffet experience for your special event.', //
        buttonText: 'Request Custom Quote', //
        card1: {
          name: "Rice Box A", //
          minPax: "35 Pax", //
          description: "Perfect for small meetings or casual events.", //
          theme: "standard",
          iconSrc: "/images/icons/food-white.svg", 
          items: [
            "Steamed rice", //
            "One stir-fried dish", //
            "Chicken or egg", //
            "Fresh fruit", //
            "Sambal and crackers" //
          ]
        },
        card2: {
          name: "Rice Box B", //
          minPax: "35 Pax", //
          description: "Ideal for office gatherings or group meals.", //
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.svg", 
          items: [
            "Steamed rice", //
            "One stir-fried dish", //
            "Chicken or egg", //
            "Side Dish", //
            "Fresh fruit", //
            "Sambal and crackers" //
          ]
        },
        card3: {
          name: "Rice Box C", //
          minPax: "35 Pax", //
          description: "A complete and premium choice for formal or large-scale events.", //
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.svg", 
          items: [
            "Steamed rice", //
            "One stir-fried dish", //
            "Chicken or egg", //
            "Side Dish", //
            "One additional snack", //
            "Fresh fruit", //
            "Sambal and crackers" //
          ]
        }
      },
      service: {
        label: 'Why Choose Us',
        title: 'Complete Catering Service',
        subtitle: 'From menu planning to cleanup, we handle every detail so you can focus on enjoying your event with your guests.',
        features:[
          {
            title: "Free Delivery & Setup",
            desc: "Complete delivery, setup, and breakdown service included with every package. Our team arrives 2 hours before your event.",
            iconSrc: "/images/icons/truck-white.svg" // Ganti dengan path icon lokal Anda
          },
          {
            title: "Professional Staff",
            desc: "Experienced serving staff in traditional attire to maintain the authentic atmosphere throughout your event.",
            iconSrc: "/images/icons/group-white.svg"
          },
          {
            title: "Fresh Ingredients",
            desc: "All dishes prepared fresh on the day of your event using locally sourced, organic ingredients from our trusted suppliers.",
            iconSrc: "/images/icons/leaf-white.svg"
          },
          {
            title: "Flexible Timing",
            desc: "Available for breakfast, lunch, or dinner events. Extended service hours available for special occasions.",
            iconSrc: "/images/icons/clock-white.svg"
          },
          {
            title: "Quality Guaranteed",
            desc: "100% satisfaction guarantee. If you're not completely satisfied, we'll work to make it right or provide a full refund.",
            iconSrc: "/images/icons/curly-white.svg"
          },
          {
            title: "Complete Equipment",
            desc: "All serving equipment, plates, utensils, and traditional serving ware included. Eco-friendly options available.",
            iconSrc: "/images/icons/food-white.svg"
          }
        ]
      },
      booking: {
        label: 'How It Works',
        title: 'Simple Booking Process',
        steps: [
          {
            num: "1",
            title: "Choose Package",
            desc: "Select your preferred buffet package or request a custom quote for your specific needs."
          },
          {
            num: "2",
            title: "Book & Confirm",
            desc: "Contact us with your event details. We'll confirm availability and finalize your booking."
          },
          {
            num: "3",
            title: "Menu Planning",
            desc: "Our team will work with you to customize the menu and discuss any special requirements."
          },
          {
            num: "4",
            title: "Enjoy Your Event",
            desc: "Sit back and enjoy your event while we handle all the food service and cleanup."
          }
        ]
      },
      contact:{
        title: 'Book Your Event Today',
        desc: 'Ready to bring authentic Javanese flavors to your next event? Our booking calendar fills up quickly, especially during peak seasons. Contact us today to secure your preferred date.',
        item: [
          { title: 'Call us directly', desc: '+62 274 368 000' },
          { title: 'WhatsApp', desc: '+62 822 2514 2729' },
          { title: 'Email Us', desc: 'catering@tembihistoricalhome.com' }
        ],
        whatsapp: 'WhatsApp Now',
        call: 'Call Now'
      }
    }
  },
  id: {
    nav: {
      home: 'Tembi',
      house: 'Rumah',
      foods: 'Makanan',
      venue: 'Venue',
      history: 'Sejarah',
      collections: 'Koleksi',
      book: 'Pesan Sekarang',
    },
    homepage:{
      hero: {
        title:
        [
          'Tempat Budaya Sejarah',
          'Menjadi Sakral'
        ],
        subtitle: 'Warisan budaya yang hadir dengan kenyamanan modern',
        explore: 'Lihat Pilihan Kamar',
        gallery: 'Lihat Galeri',
      },
      intro: {
        title: 'Rasakan budaya sejarah Jawa',
        p1: 'Sebuah tempat yang memberikan ketenangan dan kenyamanan sehingga dapat membuat pikiran menjadi lebih ringan. Suara alam menenangkan sejak melangkah masuk lalu udara segar ikut membantu tubuh lebih rileks. Ruang yang tertata rapi membuat waktu istirahat terasa utuh karena tidak ada yang mengganggu.',
        p2: 'Pagi datang dengan sarapan hangat sehingga hari terasa lebih bersahabat. Setelah itu duduk sebentar di teras atau berjalan pelan di taman sudah cukup untuk membuat hati lebih tenang. Perlahan energi kembali dan rasa damai muncul tanpa perlu dicari. Di sini istirahat bukan hanya tidur. Ada ruang untuk merasa pulih.',
        stats: { founded: 'Didirikan', artifacts: 'Artefak', house: 'Rumah' }
      },
      accommodation: {
        label: 'Akomodasi',
        title: 'Rumah Yang Menyimpan Sejarah',
        desc: 'Setiap rumah menjadi tempat nyaman yang menjaga cerita budaya tetap terasa. Desainnya mengalir natural sehingga keanggunan masa lalu dan kenyamanan hari ini saling melengkapi. Ruang hangat dan detail terjaga membuat waktu menginap terasa tenang dan berarti.',
        btn: 'Pesan',
        rec: 'Rekomendasi',
        facilities: { bed: 'King Bed', view: 'Pemandangan Sawah' }
      },
      houses: [
        {
            name: 'Ngadirojo',
            desc: 'Rumah Ngadirojo adalah limasan tradisional Jawa yang dibangun tahun 1946 dan dipindahkan dari Desa Bawak, Klaten. Menggabungkan arsitektur Jawa dengan ketenangan alam.',
            image: '/images/rooms/ngadirojo/ngadirojo.png',
        },
        {
            name: 'Polaman',
            desc: 'Rumah Polaman adalah limasan tradisional Jawa yang dibangun tahun 1948. Menggabungkan kehangatan arsitektur Jawa dengan pemandangan alam.',
            image: '/images/rooms/polaman/polaman.png',
        },
        {
            name: 'Adikarto',
            desc: 'Rumah Adikarto adalah rumah limasan tradisional Jawa yang membawa kesejukan dan kenyamanan dalam suasana alami. Dibangun pada tahun 1960.',
            image: '/images/rooms/adikarto/adikarto.png',
        },
      ],
      pavillion: {
        title: ['Fasilitas Di Setiap', 'Rumah'],
        icon: ["/images/icons/wifi-green.svg", "/images/icons/cup-green.svg", "/images/icons/music-green.svg"],
        desc: ['Wi-Fi', 'Minuman Sambutan Khusus', 'Hidangan Tradisional'],
        button: 'Lihat Semua Rumah'
      },
      living:{
        head: ['Pengalaman Tinggal', 'Bernuansa Budaya'],
        title: {item1: 'Warisan Budaya', item2: 'Harmoni Alam', item3: 'Momen Bermakna'},
        desc: {item1: 'Arsitektur dan tradisi yang tetap hidup', item2: 'Dikelilingi taman tropis dan hamparan sawah', item3: 'Waktu beristirahat yang terasa lebih berharga'},
      },
      food:{
        head: ['Makanan &', 'Minuman'],
        desc: "Nikmati perjalanan rasa yang menonjolkan kekayaan masakan Indonesia. Resep turun temurun tetap dipertahankan lalu diolah dengan cara yang lebih segar sehingga hidangan terasa akrab dan tetap menarik. Suasana yang tenang membuat waktu makan terasa nyaman. Setiap sajian memberi kesempatan untuk merasakan budaya dari cita rasa yang hangat dan penuh karakter.",
        item: {item1: 'Bahan segar dari pertanian organik lokal', item2: 'Resep tradisional dengan tampilan modern', item3: 'Pelayanan ramah yang terasa seperti di rumah'},
        button: 'Lihat Paket'
      },
      venue:{
        head: 'ACARA & PERAYAAN',
        title: 'Tempat Sakral Untuk Momen Spesial',
        desc: 'Buat kenangan berharga di ruang penuh budaya. Arsitektur Jawa yang khas memberi latar sempurna untuk pernikahan, acara perusahaan, dan perayaan budaya.',
        firstCard: 
        {
          title: 'Upacara Pernikahan',
          desc: 'Rayakan momen spesial Anda di pendopo yang tenang, dikelilingi taman yang hijau dan suasana yang damai. Tim kami akan membantu mengatur setiap detail agar acara terasa pribadi dan penuh makna.',
          item1: 'Kapasitas hingga 150 tamu',
          item2: 'Pilihan upacara di taman',
          item3: 'Pilihan iringan gamelan',
          button: 'Rencanakan Pernikahan Anda'
        },
        secondCard:
        {
          title: 'Acara Perusahaan',
          desc: 'Tingkatkan kreativitas dan kebersamaan tim di lingkungan yang tenang dan menyegarkan.Ruang pertemuan kami memadukan desain tradisional dan fasilitas modern, menjadi tempat yang nyaman untuk sesi yang produktif dan hubungan yang lebih solid.',
          item1: 'Beragam pilihan tata ruang',
          item2: 'Internet cepat dan peralatan presentasi',
          item3: 'Pilihan hidangan tradisional',
          button: 'Pesan Acara Perusahaan'
        },
      },
      collection:{
        title: 'Koleksi Bersejarah',
        desc: 'Jelajahi koleksi artefak budaya yang dipilih dengan hati-hati, menampilkan kisah, karya, dan warisan seni dari masa ke masa. Setiap benda mengajak Anda untuk berhenti sejenak, melihat lebih dekat, dan merasakan hubungan dengan sejarah.',
        cardTitle: {item1: 'Koleksi Cundrik', item2: 'Koleksi Cundrik', item3: 'Koleksi Keris', item4: 'Koleksi Keris'},
        cardDesc: 
        {
          item1: 'Sebuah cundrik kecil yang dahulu dibawa sebagai Senjata pribadi.', 
          item2: 'Cundrik berukuran panjang dengan pola sanak.', 
          item3: 'Keris tradisi Surakarta dengan bilah lurus', 
          item4: 'Keris berluk lima dengan pola pamor tegas di sepanjang bilah'
        },
        button: 'Lihat Koleksi Lengkap'
      },
      location:{
        title: 'Akses & Lokasi',
        subtitle: 'Dekat dari pusat Kota Yogyakarta dan bandara',
        cardTitle: {item1: 'Alamat', item2: 'Jarak Dari Bandara', item3: 'Dekat Dari Pusat Kota'},
        cardDesc:{
          item1: 'Jl. Parangtritis No.Km 8.4, Tembi, Timbulharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55186',
          item2: '25 menit dari Bandara Internasional Yogyakarta.',
          item3: '15 menit dari Malioboro dan pusat kota.'
        },
        transport: 
        {
          title: "Pilihan Transportasi",
          item1: "Layanan taksi dan berbagi tumpangan tersedia.",
          item2: "Bus umum jalur 1A berhenti di dekat sini.",
          item3: "Parkir gratis di lokasi untuk 50+ kendaraan."
        }
      }
    },
    history:{
      hero:{
        title: ['Cerita Kami:', 'Tembi Rumah Budaya'],
        subtitle: 'Tempat di mana warisan budaya tetap hidup dan tradisi terus berlanjut. Tembi Historical Home menjaga kebudayaan Jawa dengan ketulusan dan keharmonisan sehingga setiap tamu bisa merasakannya secara nyata.',
      },
      intro:{
        head: 'Warisan & Budaya',
        title: [
          'Tempat di mana Jiwa',
          'Budaya Jawa Bertemu',
          'Kenyamanan Masa Kini'
        ],
        subtitle: [
          'Tembi Historical Home berdiri pada 20 Mei 2000 dengan nama Tembi Rumah Budaya. Tujuannya menjaga filosofi, seni, dan tradisi Jawa tetap hidup. Tempat ini menjadi ruang edukasi dan ekspresi. Warisan budaya terdokumentasi dengan baik agar bisa terus dinikmati oleh generasi berikutnya.',
          'Perjalanan Tembi berkembang dari institusi budaya menjadi destinasi hospitality berbasis warisan Jawa. Sejak 2008, Tembi menghadirkan pengalaman menginap, bersantap, dan venue untuk berbagai acara. Dari pertemuan kecil hingga perayaan besar. Semua tetap berpegang pada misi pelestarian budaya.'
        ],
        item: [
          'Tahun menjaga warisan',
          'Program budaya',
          'Tamu yang datang'
        ]
      },
      founder:{
        head: 'Pendiri Kami',
        title: [
          'Sosok di Balik Misi',
          'Pelestarian Budaya'
        ],
        desc1: [
          'Tembi Historical Home didirikan oleh almarhum',
          'Pollycarpus Swantoro,', 
          'seorang tokoh budaya dan jurnalis terkemuka di Indonesia. Ia terinspirasi oleh kenangan masa kecil dan kecintaannya pada Yogyakarta. Ia membayangkan sebuah tempat yang memungkinkan setiap orang kembali merasakan akar budaya di tengah perkembangan zaman.',
        ],
        desc2:[
          'Warisan gagasannya kini diteruskan oleh putra sulungnya,',
          'Norbertus Nuranto.',
          'Ia menjaga Tembi tetap menjadi ruang budaya yang inklusif dan menginspirasi. Semua orang dapat merasakan keindahan warisan Jawa yang terus hidup, baik dari komunitas lokal maupun pengunjung mancanegara.'
        ],
      },
      living:{
        head: 'Budaya yang Hidup',
        title: 'Rumah dengan Budaya yang Hidup',
        subtitle: 'Tembi bukan hanya tempat menginap. Kamu merasakan kehidupan Jawa lewat tradisi, seni, dan filosofi. Kamu bisa ikut kelas tari Jawa klasik, membatik, dan macapat. Kami menjaga ruang belajar dan ekspresi budaya agar terus tumbuh.',
        title2: 'Filosofi Budaya',
        desc: [
          'Program budaya kami berlandaskan filosofi Jawa Hamemayu Hayuning Bawana. Artinya menjaga dan memperindah dunia. Setiap aktivitas. Setiap pelajaran. Setiap momen yang dibagikan berkontribusi pada tujuan ini.',
          'Kami percaya budaya itu hidup. Budaya berkembang melalui praktik dan berbagi. Kamu tidak hanya melihat budaya Jawa. Kamu ikut menjadi bagian dari kelanjutannya.'
        ],
        item: [
          'Kegiatan Budaya',
          'Peserta Setiap Bulan'
        ]
      },
      contact:{
        title: [
          'Where Historical',
          'Culture Is Divine'
        ],
        subtitle: 'Bergabunglah menjaga dan menikmati warisan Jawa. Setiap kunjungan membantu tradisi tetap terus ada untuk generasi berikutnya.',
        itemTitle: [
          'Pemesanan Langsung',
          'Informasi Budaya',
          'Kunjungi Kami'
        ],
        itemDesc:[
          'Hubungi langsung untuk pengalaman budaya yang dipersonalisasi dan pilihan paket khusus.',
          'Cari informasi tentang workshop, acara, dan program pelestarian budaya.',
          'Kami berada di pusat kawasan budaya Yogyakarta. Datang dan rasakan sendiri kehangatan Tembi.'
        ]
      }
    },
    foods:{
      hero:{
        label: 'Hidangan tradisional Jawa',
        title: ['Paket Makanan', '& Minuman'],
        subtitle: 'Rasa Jawa yang autentik untuk setiap acara.',
        desc: 'Rasakan keramahan Jawa lewat setiap hidangan. Mulai dari buffet klasik hingga snack dan nasi box. Setiap sajian dibuat penuh perhatian dan cita rasa lokal yang kaya. Kelezatan kuliner Jawa Tengah hadir untuk melengkapi setiap momen.'
      },
      intro:{
        label: 'Warisan Budaya',
        title: ['Menjaga Tradisi', 'Lewat Rasa Asli'],
        desc: 'Di Tembi Historical Home, makanan menjadi bagian penting dari pelestarian budaya. Layanan katering menggabungkan pengalaman kuliner Jawa dari generasi ke generasi. Resep tradisional tetap digunakan. Bahan segar didapat dari wilayah Yogyakarta. Setiap sajian menghadirkan cita rasa yang bermakna.',
        itemTitle:[
          'Resep Tradisional',
          'Bahan Lokal',
          'Penyajian Budaya'
        ],
        itemDesc: [
          'Hidangan Jawa disiapkan dengan cara yang diwariskan turun temurun.',
          'Sayuran dan bahan segar dari lingkungan sekitar.',
          'Disajikan dengan daun pisang atau peralatan kayu yang menghadirkan nuansa Jawa.'
        ],
      },
      packages:{
        label: 'Paket Catering',
        title: ['Pilih Paket Sesuai', 'Kebutuhan'],
        subtitle: 'Setiap paket dirancang dengan cermat. Pengalaman bersantap rasa Jawa yang hangat untuk berbagai acara dan jumlah tamu.',
        card1:{
          badge: '≥35 pax',
          title: 'Paket Buffet',
          subtitle: 'Pilihan untuk Acara Besar',
          desc: 'Cocok untuk pertemuan, acara budaya, dan makan bersama dalam jumlah banyak. Sajian lengkap berisi nasi, sup, lauk utama, pendamping, dan minuman tradisional.',
          features: [
            'Hidangan lengkap',
            'Gaya penyajian tradisional',
            'Pilihan menu beragam',
            'Dessert dan minuman sudah termasuk'
          ],
          linkUrl: '/catering/buffet',
          buttonText: 'Lihat Menu Buffet'
        },
        card2:{
          badge: '≥35 pax',
          title: 'Paket Snack Box ',
          subtitle: 'Pilihan untuk Acara Santai',
          desc: 'Camilan dan kudapan tradisional yang pas untuk pertemuan ringan atau acara sore hari dengan cita rasa Jawa yang khas.',
          features: [
            'Varian camilan tradisional',
            'Kemasan per kotak',
            'Pilihan manis dan gurih',
            'Teh tradisional sudah termasuk'
          ],
          linkUrl: '/catering/snack-box',
          buttonText: 'Lihat Menu Snack Box'
        },
        card3:{
          badge: '≥35 pax',
          title: 'Paket Nasi Box',
          subtitle: 'Menu Lengkap Per Orang',
          desc: 'Makanan lengkap dalam satu kotak berisi hidangan Jawa autentik. Cocok untuk rapat bisnis, seminar, atau acara yang membutuhkan penyajian individual.',
          features: [
          'Menu lengkap seimbang',
          'Kemasan per kotak',
          'Lauk utama tradisional',
          'Sambal khas sudah termasuk'
          ],
          linkUrl: '/catering/rice-box',
          buttonText: 'Lihat Menu Nasi Box'
        },
        footerTitle: [
          'Minimal 35 Orang',
          'Pemberitahuan 24 Jam'
        ],
        footerDesc: [
          'Paket tersedia untuk pemesanan minimal 35 orang',
          'Pemesanan dilakukan minimal 24 jam sebelum acara'
        ]
      },
      menus:{
        label: 'Menu Sampel',
        title: ['Rasakan Cita', 'Rasa Autentik'],
        desc: 'Warisan kuliner Jawa hadir melalui hidangan yang dipilih dengan cermat. Semua disiapkan dengan resep turun temurun dan penuh rasa.',
        buffet: {
          title: 'Sorotan Menu Buffet',
          desc: 'Menu lengkap hidangan tradisional Jawa',
          item:[
            { image: '/images/foods/nasi-liwet.png', title: 'Nasi Liwet', desc: 'Nasi gurih harum dimasak dalam daun pisang dengan bumbu rempah' },
            { image: '/images/foods/ayam-kremes.png', title: 'Ayam Goreng Kremes', desc: 'Ayam goreng renyah dengan balutan kacang tradisional' },
            { image: '/images/foods/sayur-asem.png', title: 'Sayur Asem', desc: 'Sayur asem segar berisi berbagai sayuran' },
            { image: '/images/foods/sambal.png', title: 'Sambal Bajak', desc: 'Sambal kacang pedas bercita rasa khas' },
            { image: '/images/foods/es-dawet.png', title: 'Es Dawet', desc: 'Minuman segar santan dengan isian cendol' },
          ],
        },
        snack: {
          title: 'Sorotan Snack Box',
          desc: 'Kudapan manis dan gurih tradisional',
          item:[
            { image: '/images/foods/klepon.png', title: 'Klepon', desc: 'Ketan hijau berisi gula aren dan taburan kelapa' },
            { image: '/images/foods/kue-lumpur.png', title: 'Kue Lumpur', desc: 'Kue lembut dengan santan dan kismis' },
            { image: '/images/foods/pastel.png', title: 'Pastel', desc: 'Gorengan renyah berisi sayuran dan daging berbumbu' },
            { image: '/images/foods/teh.png', title: 'Teh Hangat', desc: 'Teh herbal hangat dengan rempah aromatik' },
          ],
        },
        rice: {
          title: 'Sorotan Rice Box',
          desc: 'Menu lengkap per porsi bergaya tradisional',
          item: [
            { image: '/images/foods/nasi-putih.png', title: 'Nasi Putih', desc: 'Nasi putih pulen sebagai dasar hidangan' },
            { image: '/images/foods/ayam-kalasan.png', title: 'Ayam Kalasan', desc: 'Ayam bakar manis gurih dengan bumbu kecap' },
            { image: '/images/foods/tempe.png', title: 'Tempe Bacem', desc: 'Tempe bacem dengan gula jawa dan rempah' },
            { image: '/images/foods/urap.png', title: 'Urap', desc: 'Urap sayur dengan kelapa berbumbu' },
            { image: '/images/foods/sambal-fresh.png', title: 'Sambal', desc: 'Sambal buatan rumahan dengan racikan rempah yang hidup' },
          ]
        }
      },
      gen: {
        card: {
          title: '3 Generasi',
          subtitle: 'Warisan tradisi kuliner',
          desc: '"Setiap sajian membawa cerita keluarga dan kecintaan pada rasa yang asli."'
        },
        label: 'Warisan Kami',
        title: [
          'Tiga Generasi Dalam ',
          'Satu Rasa'
        ],
        desc: 'Resep keluarga diwariskan dari generasi ke generasi. Setiap hidanganmembawa nilai budaya Jawa yang tetap hidup sampai hari ini.',
        itemTitle: [
          'Resep Tradisional',
          'Dari Kebun ke Meja',
          'Dibuat dengan Hati'
        ],
        itemDesc: [
          'Racikan autentik sejak awal 1900an. Dijaga oleh para ibu dalam keluarga.',
          'Bahan segar dari petani lokal dan kebun warisan. Mendukung komunitas sekitar.',
          'Semua hidangan disiapkan dengan cara tradisional. Rasa terjaga. Makna tetap ada.'
        ]
      },
      celebrate: {
        label: 'Kesempatan yang Tepat',
        title: ['Rayakan Setiap', 'Momen'],
        desc: 'Untuk acara kecil sampai perayaan besar, layanan katering kami hadir agar setiap momen terasa berkesan dengan keramahan Jawa yang autentik.',
        card1: {
          title: 'Acara Perusahaan',
          subtitle: 'Pertemuan bisnis dengan sentuhan budaya',
          features: [
            'Meeting dan seminar',
            'Retreat perusahaan',
            'Acara pengembangan tim'
          ]
        },
        card2: {
          title: 'Perayaan Budaya',
          subtitle: 'Upacara tradisional dan momen bermakna',
          features: [
            'Pernikahan adat',
            'Festival budaya',
            'Acara keagamaan'
          ]
        },
        card3: {
          title: 'Pertemuan Keluarga',
          subtitle: 'Selebrasi hangat bersama orang terdekat',
          features: [
            'Ulang tahun',
            'Reuni keluarga',
            'Acara liburan'
          ]
        },
        stat1: {
          number: '100+',
          label: 'Acara Telah Ditangani'
        },
        stat2: {
          number: '1,000+',
          label: 'Tamu Telah Dilayani'
        },
        stat3: {
          number: '98%',
          label: 'Tingkat Kepuasan'
        },
        stat4: {
          number: '15+',
          label: 'Tahun Pengalaman'
        },
      },
      contact: {
        title: 'Butuh Bantuan?',
        subtitle: 'Tim kami siap membantu merencanakan katering yang sesuai untuk acara spesial Anda.',
        card1: {
          title: 'Hubungi Kami',
          subtitle: 'Konsultasi langsung dengan tim katering',
          phone: '+62 274 368 000',
          desc: 'Setiap Hari 8:00 AM - 8:00 PM'
        },
        card2: {
          title: 'WhatsApp',
          subtitle: 'Respons cepat untuk kebutuhan mendesak',
          phone: '+62 822 2514 2729',
          desc: 'Chat Now'
        },
        card3: {
          title: 'Email Kami',
          subtitle: 'Permintaan detail dan penyesuaian paket',
          phone: 'catering@tembihistoricalhome.com',
          desc: 'Balasan maksimal 24 jam'
        },
        footer: {
          title: 'Permintaan Khusus & Paket Kustom',
          desc: 'Jika Anda merencanakan acara dengan konsep tertentu atau membutuhkan menu khusus, tim dapur kami dapat menyesuaikan hidangan sesuai kebutuhan dan preferensi budaya maupun diet Anda.',
          button: 'Ajukan Penawaran Kustom'
        }
      }
    },
    catering:{
      hero: {
        label: 'Layanan Katering Premium',
        title: 'Paket Catering Buffet',
        desc: 'Hidangan Jawa autentik untuk acara kumpul dan perayaan. Semua menu disiapkan dengan resep turun-temurun yang menjaga rasa tradisi tetap hidup.',
        pax: 'Minimum 35 Pax',
        hour: '4-6 Jam Servis',
        buttonText: 'Lihat Paket'
      },
      intro: {
        label: 'Warisan Kami',
        title: 'Perjalanan Rasa dalam Tradisi Jawa',
        desc: 'Selama lebih dari tiga dekade, Tembi Rumah Budaya menjaga keaslian cita rasa Jawa. Buffet kami membawa kehangatan keramahan tradisional ke setiap acara penting Anda.',
        stats1: {
          num: '25+',
          desc: 'Tahun Pengalaman'
        },
        stats2: {
          num: '100+',
          desc: 'Acara Telah Ditangani'
        },
      },
      buffetMenu: {
        label: 'Menu Kami',
        title: 'Rasa Jawa yang Autentik',
        desc: 'Setiap paket buffet menghadirkan keseimbangan rasa. Hidangan utama yang menghangatkan. Minuman segar dan dessert yang melengkapi momen.',
        menuCard1: {
          icon: "/images/icons/circle-white.svg",
          title: "Soup",
          subtitle: "Pilih Kuah & Sayur",
          items: [
            'Sup Sayur Bening', 'Sup Bakso Sosis', 'Sup Rolade',
            'Sup Ayam Jagung', 'Sup Timlo', 'Jangan Lodeh',
            'Jangan Asem', 'Jangan Bobor Gandol', 'Oblok Godhong Telo',
            'Gulai Nangka Muda'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.svg",
          title: "Main Course",
          subtitle: "Tumis & Lauk",
          items: [
            'Tumis Tempe Kacang Panjang', 'Tumis Tahu Tomat Ijo', 
            'Oseng Tempe Lombok Ijo', 'Oseng Janggel Sosis', 
            'Oseng Terong Balado', 'Oseng Labu Siam', "Ca' Buncis Tahu", 
            "Ca' Kembang Kol Bakso", "Ca' Brokoli Jamur Kuping", 'Sapo Tahu'
          ]
        },
        menuCard3: {
          icon: "/images/icons/ice-cream-white.svg",
          title: "Desserts",
          subtitle: "Traditional Sweets",
          items: [
            'Es Dawet Tradisional', 'Klepon Gula Jawa', 
            'Onde-onde Wijen', 'Lupis Ketan'
          ]
        },
        menuCard4: {
          icon: "/images/icons/drink-white.svg",
          title: "Beverages",
          subtitle: "Refreshing Drinks",
          items: [
            'Es Degan', 'Es Teh Manis', 'Es Jeruk', 'Es Setup',
            'Es Dawet', 'Es Serut Melon', 'Es Buah', 'Es Cincau',
            'Es Cocktail', 'Es Infuse Water'
          ]
        },
        menuCard5: {
          icon: "/images/icons/circle-white.svg",
          title: "Chicken",
          subtitle: "Pilihan Ayam",
          items: [
            'Ayam Goreng Kalasan', 'Ayam Goreng Kremes', 'Ayam Lada Hitam',
            'Ayam Daun Temuru', 'Ayam Fillet Goreng', 'Ayam Saus Mentega',
            'Ayam Semur', "Ayam Ca' Jamur", 'Ayam Cabe Ijo', 'Chicken Katsu'
          ]
        },
        menuCard6: {
          icon: "/images/icons/chicken-white.svg",
          title: "Egg",
          subtitle: "Pilihan Telur",
          items: [
            'Telur Semur', 'Telur Balado', 'Telur Dadar Padang',
            'Telur Asin', 'Telur Rebus', 'Telur Crispy',
            'Telur Ceplok Bumbu Bali', 'Telur Goreng Cabe Ijo',
            'Gulai Telur', 'Fuyung Hai'
          ]
        },
        menuCard7: {
          icon: "/images/icons/circle-white.svg",
          title: "Fish",
          subtitle: "Pilihan Ikan",
          items: [
            'Lele Goreng Kremes', 'Mangut Lele', 'Nila Sambal Matah',
            'Nila Goreng/Bakar', 'Kembung Cabe Ijo', 'Kembung Balado',
            'Ikan Fillet Asam Manis', 'Ikan Fillet Sambal Matah',
            'Ikan Fillet Dabu-Dabu', 'Ikan Katsu'
          ]
        },
        menuCard8: {
          icon: "/images/icons/chicken-white.svg",
          title: "Side Dish",
          subtitle: "Pilihan Menu Pendamping",
          items: [
            'Mendoan', 'Tahu/Tempe Goreng', 'Tahu/Tempe Bacem',
            'Perkedel Tahu', 'Tahu Susu', 'Tahu Crispy',
            'Bakwan Sayur', 'Bakwan Jagung', 'Perkedel Kentang',
            'Jamur Crispy'
          ]
        }
      },
      snackMenu: {
        label: 'Menu Kami', //
        title: 'Rasa Jawa yang Autentik', //
        desc: 'Setiap paket snack bos menghadirkan keseimbangan rasa. Hidangan utama yang menghangatkan. Minuman segar dan dessert yang melengkapi momen.', //
        menuCard1: {
          icon: "/images/icons/circle-white.svg", // Icon tanda seru (!)
          title: "Sweet Snacks",
          subtitle: "", // Dikosongkan karena tidak ada subtitle di gambar
          items: [
            'Klepon',
            'Kue Lapis',
            'Dadar Gulung',
            'Lemper',
            'Putu Ayu',
            'Bolu Kukus',
            'Risoles Coklat'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.svg", // Icon ayam
          title: "Savory Snacks",
          subtitle: "",
          items: [
            'Pastel',
            'Lumpia',
            'Risoles Mayo',
            'Arem-Arem Ayam',
            'Martabak Mini',
            'Sosis Solo',
            'Kroket Kentang'
          ]
        },
        menuCard3: {
        icon: "/images/icons/ice-cream-white.svg", // Icon es krim
        title: "Crunchy Snacks",
        subtitle: "",
        items: [
          'Emping Jagung',
          'Keripik Singkong',
          'Kacang Bawang',
          'Keripik Tempe'
          ]
        }
      },
      riceMenu: {
        label: 'Menu Kami', //
        title: 'Rasa Jawa yang Autentik', //
        desc: 'Setiap paket Nasi Box menghadirkan keseimbangan rasa. Hidangan utama yang menghangatkan. Minuman segar dan dessert yang melengkapi momen.', //
        menuCard1: {
          icon: "/images/icons/circle-white.svg", // Icon tanda seru lingkaran
          title: "Main Dishes",
          subtitle: "", // Kosong karena tidak ada subtitle di gambar
          items: [
            'Steamed rice',
            'Kalasan fried chicken',
            'Crispy chicken',
            'Spicy egg',
            'Braised chicken'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.svg", // Icon paha ayam
          title: "Side Dishes",
          subtitle: "",
          items: [
            'Stir-fried tempeh with long beans',
            'Eggplant balado',
            'Mixed vegetables with grated coconut',
            'Tofu sauté',
            'Sambal Terasi'
          ]
        },
        menuCard3: {
          icon: "/images/icons/ice-cream-white.svg", // Icon es krim
          title: "Add-Ons",
          subtitle: "",
          items: [
            'Tofu',
            'Tempe',
            'Potato Fritters',
            'Fried Fish'
          ]
        },
        menuCard4: {
          icon: "/images/icons/drink-white.svg", // Icon gelas
          title: "Extras",
          subtitle: "",
          items: [
            'Fresh fruit',
            'Crackers',
            'Bottled water'
          ]
        }
      },
      buffet: {
        label: 'Pilih Paket Anda',
        title: 'Pilihan Paket Buffet',
        subtitle: 'Pilih paket terbaik untuk acara Anda. Semua paket menghadirkan pengalaman makan khas Jawa dengan pilihan menu dan layanan yang sesuai kebutuhan Anda.',
        badge: 'MOST POPULAR',
        footer: 'Butuh paket khusus? Kami dapat menyesuaikan menu sesuai acara Anda.',
        buttonText: 'Ajukan Penawaran Kustom',
        card1: {
          name: "Buffet Standard",
          minPax: "35 Pax",
          description: "Sesuai untuk acara perusahaan",
          theme: "standard",
          iconSrc: "/images/icons/food-white.svg", 
          items: [
            "Nasi Putih",
            "1 Pilihan Kuah",
            "1 Pilihan Tumisan",
            "1 Pilihan Ayam Atau Telur",
            "Buah Potong",
            "Sambal",
            "Kerupuk",
            "Air Putih"
          ]
        },
        card2: {
          name: "Buffet Premium",
          minPax: "50 Pax", // Sesuai gambar English version
          description: "Ideal untuk pernikahan dan perayaan",
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.svg", 
          items: [
            "Nasi Putih",
            "1 Pilihan Kuah",
            "1 Pilihan Tumisan",
            "1 Pilihan Ayam Atau Telur",
            "1 Pilihan Ikan",
            "1 Pilihan Lauk Pendamping",
            "Buah Potong",
            "Sambal",
            "Kerupuk",
            "Air Putih"
          ]
        },
        card3: {
          name: "Buffet Exclusive",
          minPax: "100 Pax", // Sesuai gambar English version
          description: "Ultimate traditional experience",
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.svg", 
          items: [
            "Nasi Putih",
            "1 Pilihan Kuah",
            "1 Pilihan Tumisan",
            "1 Pilihan Ayam Atau Telur",
            "1 Pilihan Ikan",
            "1 Pilihan Lauk Pendamping",
            "1 Pilihan Es",
            "Buah Potong",
            "Sambal",
            "Kerupuk",
            "Air Putih"
          ]
        }
      },
      snack: {
        label: 'Pilih Paket Anda', //
        title: 'Pilihan Paket Snack Box', //
        subtitle: 'Pilih paket terbaik untuk acara Anda. Semua paket menghadirkan pengalaman makan khas Jawa dengan pilihan menu dan layanan yang sesuai kebutuhan Anda.', //
        badge: 'MOST POPULAR', //
        footer: 'Butuh paket khusus? Kami dapat menyesuaikan menu sesuai acara Anda.', //
        buttonText: 'Ajukan Penawaran Kustom', //
        card1: {
          name: "Snack Box A", //
          minPax: "35 Pax", //
          description: "Ideal untuk rapat singkat atau kumpul kecil.", //
          theme: "standard",
          iconSrc: "/images/icons/food-white.svg",
          items: [
            "2 Snacks", //
            "1 Camilan Kering (kletikan)", //
            "1 Cup Air Mineral" //
          ]
        },
        card2: {
          name: "Snack Box B", //
          minPax: "35 Pax", //
          description: "Pilihan seimbang untuk seminar atau workshop.", //
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.svg",
          items: [
            "3 snacks", //
            "1 Camilan Kering (kletikan)", //
            "1 Cup Air Mineral" //
          ]
        },
        card3: {
          name: "Snack Box C", //
          minPax: "35 Pax", //
          description: "Pilihan premium untuk acara formal atau acara spesial.", //
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.svg",
          items: [
            "3 snacks", //
            "1 Camilan Kering (kletikan)", //
            "1 Cup Air Mineral" //
          ]
        }
      },
      rice: {
        label: 'Pilih Paket Anda', //
        title: 'Pilihan Paket Nasi Box', //
        subtitle: 'Pilih paket terbaik untuk acara Anda. Semua paket menghadirkan pengalaman makan khas Jawa dengan pilihan menu dan layanan yang sesuai kebutuhan Anda.', //
        badge: 'MOST POPULAR', //
        footer: 'Butuh paket khusus? Kami dapat menyesuaikan menu sesuai acara Anda.', //
        buttonText: 'Ajukan Penawaran Kustom', //
        card1: {
          name: "Nasi Box A", //
          minPax: "35 Pax", //
          description: "Cocok untuk rapat kecil atau acara santai.", //
          theme: "standard",
          iconSrc: "/images/icons/food-white.svg",
          items: [
            "Nasi Putih", //
            "Pilihan Tumisan", //
            "Pilihan Ayam/Telur", //
            "Buah Potong", //
            "Sambal Dan Kerupuk" //
          ]
        },
        card2: {
          name: "Nasi Box B", //
          minPax: "35 Pax", //
          description: "Pas untuk kumpul kantor atau makan bersama tim.", //
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.svg",
          items: [
            "Nasi Putih", //
            "Pilihan Tumisan", //
            "Pilihan Ayam/Telur", //
            "Pilihan Lauk Pendamping", //
            "Buah Potong", //
            "Sambal Dan Kerupuk" //
          ]
        },
        card3: {
          name: "Nasi Box C", //
          minPax: "35 Pax", //
          description: "Pilihan lengkap dan premium untuk acara formal atau skala besar.", //
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.svg",
          items: [
            "Nasi Putih", //
            "Pilihan Tumisan", //
            "Pilihan Ayam/Telur", //
            "Pilihan Lauk Pendamping", //
            "Pilihan Snack", //
            "Buah Potong", //
            "Sambal Dan Kerupuk", //
            "Air Mineral Gelas" //
          ]
        }
      },
      service: {
        label: 'Alasan Memilih Kami', //
        title: 'Layanan Katering Lengkap', //
        subtitle: 'Kami menangani semua detail. Anda cukup menikmati acara bersama tamu.', //
        features: [
          {
            title: "Gratis Antar dan Penataan", //
            desc: "Kami menyiapkan pengantaran, penataan, dan pengemasan setelah acara. Tim kami datang 2 jam sebelum acara dimulai.", //
            iconSrc: "/images/icons/truck-white.svg"
          },
          {
            title: "Staf Profesional", //
            desc: "Staf berpengalaman dengan busana tradisional yang menjaga suasana tetap autentik selama acara Anda.", //
            iconSrc: "/images/icons/group-white.svg"
          },
          {
            title: "Bahan Segar", //
            desc: "Semua hidangan dibuat segar pada hari acara dengan bahan lokal dan organik dari pemasok terpercaya.", //
            iconSrc: "/images/icons/leaf-white.svg"
          },
          {
            title: "Waktu Fleksibel", //
            desc: "Tersedia untuk acara pagi, siang, atau malam. Durasi layanan bisa diperpanjang sesuai kebutuhan acara khusus.", //
            iconSrc: "/images/icons/clock-white.svg"
          },
          {
            title: "Kualitas Terjamin", //
            desc: "Kami menjamin kepuasan Anda. Jika Anda kurang puas, kami akan memperbaikinya atau memberi pengembalian penuh.", //
            iconSrc: "/images/icons/curly-white.svg"
          },
          {
            title: "Peralatan Lengkap", //
            desc: "Peralatan saji lengkap termasuk piring, alat makan, dan perlengkapan saji tradisional. Tersedia opsi ramah lingkungan.", //
            iconSrc: "/images/icons/food-white.svg"
          }
        ]
      },
      booking: {
        label: 'Cara Pemesanan', //
        title: 'Proses Pemesanan Mudah', //
        subtitle: 'Anda bisa mulai memesan katering buffet Jawa dengan cepat. Ikuti langkah sederhana ini untuk mengamankan tanggal dan menyesuaikan menu sesuai kebutuhan Anda.', //
        steps: [
          {
            num: "1",
            title: "Pilih Paket", //
            desc: "Pilih paket yang sesuai. Kami juga bisa bantu sesuaikan menu." //
          },
          {
            num: "2",
            title: "Booking & Konfirmasi", //
            desc: "Sampaikan detail acara. Kami cek ketersediaan lalu konfirmasi pesanan." //
          },
          {
            num: "3",
            title: "Rencana Menu", //
            desc: "Diskusikan kebutuhan khusus dan menu yang Anda inginkan." //
          },
          {
            num: "4",
            title: "Nikmati Acara", //
            desc: "Semua proses makanan dan layanan kami urus. Anda fokus menikmati acara." //
          }
        ]
      },
      contact:{
        title: 'Pesan Acara Anda Hari Ini', //
        desc: 'Anda bisa hadirkan cita rasa Jawa ke acara Anda berikutnya. Jadwal pemesanan cepat penuh di musim ramai. Hubungi kami untuk mengamankan tanggal pilihan Anda.', //
        item: [
          { title: 'Respon Cepat', desc: '+62 274 368 000' }, //
          { title: 'WhatsApp', desc: '+62 822 2514 2729' }, //
          { title: 'Email us', desc: 'catering@tembihistoricalhome.com' } //
        ],
        whatsapp: 'WhatsApp Sekarang', //
        call: 'Telepon Sekarang' //
      }
    },
    collection: {
      hero: {
        badge: 'Cultural Heritage Collection',
        title: ['Tembi Historical', 'Collections',],
        

      }
    }
  },
};

// 3. Buat Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 4. Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 5. Custom Hook untuk mempermudah penggunaan
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}