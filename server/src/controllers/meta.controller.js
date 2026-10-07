import { successResponse } from "../utils/apiResponse.js";

export async function getPopularCities(req, res, next) {
  try {
    const cities = [
      { id: "rome", name: "Rome", country: "Italy", countryCode: "italy", propertiesCount: "120+", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80" },
      { id: "london", name: "London", country: "United Kingdom", countryCode: "united-kingdom", propertiesCount: "120+", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80" },
      { id: "mumbai", name: "Mumbai", country: "India", countryCode: "india", propertiesCount: "120+", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80" },
      { id: "birmingham", name: "Birmingham", country: "United Kingdom", countryCode: "united-kingdom", propertiesCount: "85+", image: "https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&w=800&q=80" },
      { id: "new-york", name: "New York", country: "USA", countryCode: "usa", propertiesCount: "210+", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80" },
      { id: "amsterdam", name: "Amsterdam", country: "Netherlands", countryCode: "netherlands", propertiesCount: "95+", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80" },
      { id: "tokyo", name: "Tokyo", country: "Japan", countryCode: "japan", propertiesCount: "140+", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80" },
      { id: "paris", name: "Paris", country: "France", countryCode: "france", propertiesCount: "160+", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" },
      { id: "berlin", name: "Berlin", country: "Germany", countryCode: "germany", propertiesCount: "115+", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80" },
    ];
    return successResponse(res, cities, "Popular cities retrieved");
  } catch (error) {
    next(error);
  }
}

export async function getUniversities(req, res, next) {
  try {
    const universities = [
      { id: "uob", name: "University of Birmingham", city: "Birmingham", country: "United Kingdom", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80" },
      { id: "aston", name: "Aston University", city: "Birmingham", country: "United Kingdom", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80" },
      { id: "bcu", name: "Birmingham City University", city: "Birmingham", country: "United Kingdom", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" },
      { id: "cardiff", name: "Cardiff University", city: "Cardiff", country: "United Kingdom", image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&q=80" },
      { id: "coventry", name: "Coventry University", city: "Coventry", country: "United Kingdom", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80" },
      { id: "demontfort", name: "De Montfort University", city: "Leicester", country: "United Kingdom", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80" },
      { id: "manchester", name: "University of Manchester", city: "Manchester", country: "United Kingdom", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80" },
      { id: "mmu", name: "Manchester Metropolitan University", city: "Manchester", country: "United Kingdom", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" },
      { id: "nottingham", name: "Nottingham Trent University", city: "Nottingham", country: "United Kingdom", image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&q=80" },
      { id: "glasgow", name: "University of Glasgow", city: "Glasgow", country: "United Kingdom", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80" },
      { id: "strathclyde", name: "University of Strathclyde", city: "Glasgow", country: "United Kingdom", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80" },
    ];
    return successResponse(res, universities, "Universities retrieved");
  } catch (error) {
    next(error);
  }
}

export async function subscribeNewsletter(req, res, next) {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return errorResponse(res, "Please provide a valid email address", 400);
    }
    return successResponse(res, { email, subscribedAt: new Date() }, "Successfully subscribed to the BetterAcco newsletter!");
  } catch (error) {
    next(error);
  }
}

