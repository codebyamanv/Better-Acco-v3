import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Clean existing records
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.shortlist.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.roomVariant.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.property.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const passwordHash = await bcrypt.hash("password123", 10);

  const studentUser = await prisma.user.create({
    data: {
      email: "john.doe@gmail.com",
      passwordHash,
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      phone: "+44 7911 123456",
      university: "University of Birmingham",
      country: "United Kingdom",
      city: "Birmingham",
      role: "STUDENT",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    },
  });

  const partnerUser = await prisma.user.create({
    data: {
      email: "partner@betteracco.com",
      passwordHash,
      firstName: "Sarah",
      lastName: "Jenkins",
      username: "sarahpartner",
      phone: "+44 7922 987654",
      country: "United Kingdom",
      city: "London",
      role: "PARTNER",
    },
  });

  // 3. Create Standard Amenities
  const amenityNames = [
    "Contents Insurance",
    "Ensuite studio apartments",
    "Laundry facilities",
    "Free super-fast Wi-Fi",
    "Study Area",
    "Communal Courtyard",
    "24hr front desk",
    "Air-conditioned",
    "Fitness / Gym",
    "Swimming Pool",
    "Free breakfast",
    "Free parking",
    "Free cancellation",
    "Barbeque",
    "Microwave",
    "Refrigerator",
    "TV Cable",
    "Washer",
    "Dryer",
    "Lawn",
    "Outdoor Shower",
    "Sauna",
    "Window Coverings",
  ];

  const amenityMap = {};
  for (const name of amenityNames) {
    const a = await prisma.amenity.create({
      data: { name, category: "general" },
    });
    amenityMap[name] = a.id;
  }

  // 4. Create Properties
  // Property 1: Compass, Birmingham
  const compass = await prisma.property.create({
    data: {
      slug: "compass-birmingham",
      title: "Compass, Birmingham",
      address: "Vauxhall Rd, Birmingham, B7, United Kingdom",
      city: "Birmingham",
      country: "United Kingdom",
      postalCode: "B7 4AA",
      distanceFromCenter: "0.8 mi from City Center",
      rating: 4.3,
      reviewsCount: 371,
      ratingText: "Very Good",
      propertyType: "Student Accommodation",
      badge: "Popular",
      offersCount: 2,
      pricePerWeek: 197.0,
      currencySymbol: "£",
      beds: 1,
      baths: 1,
      roomType: "Ensuite",
      leaseType: "Full Year Stay 36-44 Weeks",
      description:
        "Located on Vauxhall Rd, B7 lies one of the best student accommodations in Birmingham, Compass Birmingham! This chic Birmingham student accommodation offers a wide range of various studio rooms that are equipped with some of the best amenities. Located close to the city centre, you are also close to various universities, like Aston University (a 5-minute walk) and the University of Birmingham (a 16-minute drive).",
      tags: ["Laundry Facility", "Bills Included", "Gym", "Dual Occupancy"],
      cancellationPolicies: [
        { title: "Cooling Off Period", desc: "You have a 7-day cooling off period after signing the agreement to cancel with a full refund." },
        { title: "No Visa No Pay", desc: "If your student visa is officially rejected, provide documentation within 72 hours for a 100% refund." },
        { title: "No Place No Pay", desc: "If you do not get accepted into your chosen university, provide proof of rejection to cancel without penalty." },
        { title: "Extenuating Circumstances", desc: "Emergency cancellations are evaluated individually with minimal administrative charges." },
      ],
      paymentPolicies: [
        { title: "Booking Deposit", desc: "A holding deposit of £100–£250 is required to secure the room, which is credited toward your first installment." },
        { title: "Payment Instalment Plan", desc: "Pay in 1, 3, or 4 convenient term installments aligned with your student loan dates." },
        { title: "Mode Of Payment", desc: "Credit/Debit Card, Direct Bank Transfer, or International Student Transfer via Flywire." },
        { title: "Guarantor Requirement", desc: "UK-based guarantor required for installment plans, or use HousingHand / pay in full upfront." },
      ],
      partnerId: partnerUser.id,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", sortOrder: 0 },
          { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
          { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", sortOrder: 2 },
          { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", sortOrder: 3 },
        ],
      },
      offers: {
        create: [
          { title: "Exclusive Cashback Of GBP 50 For Referring A Friend On BetterAcco!", code: "REFER50" },
          { title: "Early Bird Offer! Save Up To £200 On Your Moving Charges!", code: "EARLYBIRD" },
        ],
      },
      roomTypes: {
        create: [
          {
            name: "Bronze Studio",
            priceRange: "£197 - £227/week",
            availableFrom: "14 Sep, 2024",
            specs: ["Studio", "Entire Place", "Private Bathroom", "Private Kitchen", "1 Bedroom"],
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
            variants: {
              create: [
                { duration: "51 week", moveInDate: "14 Sep, 2024", floorNote: "Mid Floor", price: 217.0, status: "AVAILABLE" },
                { duration: "51 week", moveInDate: "14 Sep, 2024", floorNote: "High Floor", price: 227.0, status: "AVAILABLE" },
                { duration: "51 week", moveInDate: "14 Sep, 2024", floorNote: "Low Floor", price: 197.0, status: "SOLD_OUT" },
              ],
            },
          },
          {
            name: "Silver Studio",
            priceRange: "£207 - £237/week",
            availableFrom: "14 Sep, 2024",
            specs: ["Studio", "Entire Place", "Private Bathroom", "Private Kitchen", "1 Bedroom"],
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
            variants: {
              create: [
                { duration: "51 week", moveInDate: "14 Sep, 2024", floorNote: "Mid Floor", price: 227.0, status: "AVAILABLE" },
                { duration: "51 week", moveInDate: "14 Sep, 2024", floorNote: "High Floor", price: 237.0, status: "AVAILABLE" },
                { duration: "51 week", moveInDate: "14 Sep, 2024", floorNote: "Low Floor", price: 207.0, status: "AVAILABLE" },
              ],
            },
          },
          {
            name: "Gold Studio",
            priceRange: "£237 - £247/week",
            availableFrom: "14 Sep, 2024",
            specs: ["Studio", "Entire Place", "Private Bathroom", "Private Kitchen", "1 Bedroom"],
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
            variants: {
              create: [
                { duration: "51 week", moveInDate: "14 Sep, 2024", floorNote: "High Floor", price: 247.0, status: "AVAILABLE" },
                { duration: "51 week", moveInDate: "14 Sep, 2024", floorNote: "Mid Floor", price: 237.0, status: "AVAILABLE" },
              ],
            },
          },
        ],
      },
      reviews: {
        create: [
          {
            userId: studentUser.id,
            rating: 4.3,
            comment: "Compass is a modern student accommodation near Birmingham city centre. My university was just on the opposite side.",
          },
        ],
      },
    },
  });

  // Link Amenities to Compass
  const compassAmenities = [
    "Contents Insurance",
    "Ensuite studio apartments",
    "Laundry facilities",
    "Free super-fast Wi-Fi",
    "Study Area",
    "Communal Courtyard",
    "24hr front desk",
    "Air-conditioned",
    "Fitness / Gym",
    "Swimming Pool",
  ];
  for (const aName of compassAmenities) {
    if (amenityMap[aName]) {
      await prisma.propertyAmenity.create({
        data: { propertyId: compass.id, amenityId: amenityMap[aName] },
      });
    }
  }

  // Property 2: Lemon Tree Premier Pune
  const lemonTree = await prisma.property.create({
    data: {
      slug: "lemon-tree-pune",
      title: "Lemon Tree Premier Pune",
      address: "City Center, 15 & 15A, Connaught Rd, Modi Colony, Pune, Maharashtra 411001",
      city: "Pune",
      country: "India",
      distanceFromCenter: "0.2 mi from City Center",
      rating: 4.2,
      reviewsCount: 371,
      ratingText: "Very Good",
      propertyType: "5 Star Hotel / Residence",
      badge: "Popular",
      pricePerWeek: 2349.0,
      currencySymbol: "₹",
      beds: 1,
      baths: 1,
      roomType: "Ensuite",
      leaseType: "Semester Stay 12-24 weeks",
      description: "Lemon Tree Premier Pune provides students and professionals high-end residences in the heart of the city with housekeeping, gym, and dining.",
      tags: ["Free Wifi", "Swimming Pool", "Fitness", "24hr front desk"],
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", sortOrder: 0 },
          { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
        ],
      },
    },
  });

  for (const aName of ["24hr front desk", "Air-conditioned", "Fitness / Gym", "Swimming Pool", "Free breakfast", "Free parking"]) {
    if (amenityMap[aName]) {
      await prisma.propertyAmenity.create({
        data: { propertyId: lemonTree.id, amenityId: amenityMap[aName] },
      });
    }
  }

  // Property 3: Tranquil Haven in the Woods
  const tranquilHaven = await prisma.property.create({
    data: {
      slug: "tranquil-haven-woods",
      title: "Tranquil Haven in the Woods",
      address: "103 Wright Court, Burien, WA 98168",
      city: "Burien",
      country: "USA",
      distanceFromCenter: "1.2 mi from City Center",
      rating: 4.8,
      reviewsCount: 142,
      ratingText: "Excellent",
      propertyType: "Apartment",
      badge: "Popular",
      pricePerWeek: 5970.0,
      currencySymbol: "$",
      beds: 4,
      baths: 3,
      roomType: "Studio",
      leaseType: "Full Year Stay 36-44 Weeks",
      description: "Nestled in pristine greenery, Tranquil Haven features spacious rooms, modern finishes, pool, and BBQ area.",
      tags: ["1 Room Available", "4 Beds", "3 Bath", "Pool"],
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", sortOrder: 0 },
          { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", sortOrder: 1 },
        ],
      },
    },
  });

  // Property 4: Serene Retreat by the Lake
  const sereneRetreat = await prisma.property.create({
    data: {
      slug: "serene-retreat-lake",
      title: "Serene Retreat by the Lake",
      address: "1964 Jehovah Drive, VA 22408",
      city: "Fredericksburg",
      country: "USA",
      distanceFromCenter: "2.1 mi from City Center",
      rating: 4.5,
      reviewsCount: 98,
      ratingText: "Very Good",
      propertyType: "Apartment",
      badge: "New Listing",
      pricePerWeek: 1970.0,
      currencySymbol: "$",
      beds: 3,
      baths: 2,
      roomType: "Twin-Ensuite",
      leaseType: "Summer/Short Stay 8-12 weeks",
      description: "Enjoy peaceful lake views with contemporary student living spaces, quiet study nooks, and fitness zones.",
      tags: ["1 Room Available", "3 Beds", "2 Bath"],
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", sortOrder: 0 },
        ],
      },
    },
  });

  // 5. Create Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        slug: "golden-sands-florida-california",
        title: "The Golden Sands Of Florida And California",
        summary: "Discover top coastal student spots, rental trends, and budgeting tips for studying in sunny US destinations.",
        category: "Solo Travel",
        author: "Adam Smith",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      },
      {
        slug: "van-life-weekend-roadtrips",
        title: "Van Life & Weekend Roadtrips For International Students",
        summary: "How to explore scenic national parks on a student budget during your semester breaks.",
        category: "Solo Travel",
        author: "Adam Smith",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      },
      {
        slug: "hiking-trails-uk-universities",
        title: "Hiking Trails Near Top UK Universities",
        summary: "From the Peak District to the Scottish Highlands, discover the best weekend escapes for students.",
        category: "Solo Travel",
        author: "Adam Smith",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      },
    ],
  });

  // 6. Create sample Lead
  await prisma.lead.create({
    data: {
      name: "John Smith",
      email: "johnsmith@gmail.com",
      countryCode: "UK +44",
      phone: "12345 67890",
      university: "Oxford University",
      sourcePage: "CountryListing",
      status: "NEW",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
