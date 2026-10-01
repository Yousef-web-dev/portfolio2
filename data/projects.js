const p = (id, title, category, link, description, tags, imageName) => ({
  id,
  title,
  category,
  link,
  img: `/images/${imageName}`,
  description,
  tags
});

export const projects = [
  p("youflix", "YouFlix 🎬", "Entertainment / Streaming", "https://youflix-self.vercel.app/", "A dynamic movie and TV show streaming web application featuring interactive cards, trailers, search functionality, and a personal watch list.", ["React", "Next.js", "Tailwind CSS", "TMDB API", "Framer Motion", "JavaScript"], "youflix.webp"),
  
  p("chronos", "Chronos Luxury ⌚", "Luxury E-Commerce", "https://turkish-luxury-watches.vercel.app/", "An exclusive luxury watch e-commerce experience featuring real-time timezones, interactive watch illustrations, and a premium interface.", ["Next.js", "React", "Tailwind CSS", "JavaScript", "SVG Animation", "Vercel"], "watch.webp"),
  
  p("gusteaux", "Gusteaux Bistro 🍷", "Restaurant", "https://gusteaux-bistro.vercel.app/", "An elegant restaurant web application inspired by French cuisine, featuring an interactive menu, signature dishes, and reservation functionality.", ["Next.js", "Context API", "Tailwind CSS", "React Hooks", "Framer Motion", "JavaScript"], "restaurant.webp"),
  
  p("cineticket", "CineTicket 🎫", "Booking / Entertainment", "https://cineverse-lac-nine.vercel.app/", "A modern movie browsing and ticket booking application featuring interactive showtimes and seat selection.", ["React", "Tailwind CSS", "JavaScript", "Framer Motion", "API Integration"], "cinemaTicket.webp"),
  
  p("freshcart", "FreshCart 🛒", "E-Commerce", "https://yousef-web-dev.github.io/grocery-website/", "A modern e-commerce application featuring shopping cart functionality, wishlist management, and state management using Context API.", ["React", "Context API", "Tailwind CSS", "React Hooks", "Framer Motion", "JavaScript"], "grocery.webp"),
  
  p("grilli", "Grilli Restaurant 🍽️", "Restaurant", "https://yousef-web-dev.github.io/grilli-restaurant/", "A professional restaurant website featuring an interactive menu and reservation experience.", ["HTML", "CSS", "JavaScript"], "ratatouille.webp"),
  
  p("brew", "Brew & Co. ☕", "Cafe", "https://yousef-web-dev.github.io/coffee-shop-website/", "An elegant café website with a digital menu and warm visual identity.", ["HTML", "CSS", "JavaScript"], "cafe.webp"),
  
  p("calcmaster", "CalcMaster 🧮", "Tool", "https://yousef-web-dev.github.io/clean-calculator-app/", "A sleek calculator application with advanced operations and a modern user interface.", ["HTML", "CSS", "JavaScript"], "calc.webp"),
  
  p("taskify", "Taskify ✅", "Productivity", "https://yousef-web-dev.github.io/smart-todo-list/", "An interactive task management application with add, delete, filter functionality and LocalStorage persistence.", ["HTML", "CSS", "JavaScript", "LocalStorage"], "todo.webp"),
];