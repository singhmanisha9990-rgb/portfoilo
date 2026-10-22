// Site content. Edit projects, experience, skills and tools here.
// Images live in public/img as <slug>_full.jpg (wide mockup) and <slug>_sq.jpg (square).

export const EMAIL = "singh.manisha9990@gmail.com";
export const BEHANCE = "https://www.behance.net/manishasingh99";
export const LINKEDIN = "https://www.linkedin.com/in/maniisha-singh";

/* Professional, launched websites */
export const FEATURED = [
 {slug:"simplified-startup",title:"Simplified Startup",kind:"Startup growth partner",type:"Marketing website",platform:"Desktop & mobile web",status:"Live",live:"https://simplifiedstartup.com/",
  summary:"A website for an operating partner that gives founders strategy, brand, web, marketing, sales and finance support through one team.",
  role:"UI/UX & responsive web design",
  background:["Founders usually end up coordinating a dozen specialists: freelancers, agencies and in-house hires. Simplified Startup replaces that patchwork with one integrated team.","The site had to make a broad, eight-service offer feel simple, explain why one partner beats several vendors, and give founders an obvious first step."],
  roleList:["Website UI/UX design","Responsive layouts for desktop and mobile","Visual design of the hub hero, service grid and calls to action"],
  ia:["Home","About","Services","Why us","Pricing","Resources","Start Project"],
  iaNote:"Services opens into eight groups (Website Development, Digital Marketing, AI Automation, Sales & Lead Generation, Branding & Growth, Business Advisory, Talent & Staffing, Bookkeeping & Accounting), each with its own sub-pages.",
  flow:["Two entry points in the hero: Book a Strategy Call or Talk to AI Advisor","A comparison of the four ways founders build a team, with Simplified Startup as the recommended option","A filterable service grid: All, Marketing, Web, Brand, Advisory, AI Automation, Accounting","Testimonials, an FAQ and a closing consultation call to action"],
  palette:[["#1F5BFF","Action blue"],["#0F172A","Ink"],["#DCE8F8","Glass blue"],["#F59E0B","Logo amber"]],
  typeNote:"Bold sans-serif headlines under a light uppercase kicker, with glass-like cards and glowing connectors around a central hub.",
  responsive:"On mobile the hub illustration sits beneath the calls to action and the service nodes become a simple row of icons."},
 {slug:"jfam",title:"JFAM Design & Build",kind:"Interiors & architecture studio, Delhi NCR",type:"Studio website",platform:"Desktop & mobile web",status:"Live",live:"https://www.jfam.co.in/",
  summary:"A website for a Delhi NCR design-build studio offering turnkey interiors, architecture, tech construction and home automation.",
  role:"UI/UX & responsive web design",
  background:["JFAM takes clients from first design to final handover, across residential and commercial projects.","The site needed to communicate that full-service promise in seconds and feel as considered as the spaces the studio delivers."],
  roleList:["Website UI/UX design","Responsive layouts for desktop and mobile","Visual direction: type, palette and image-led hero"],
  ia:["Home","About","Services","Portfolio","Case Study","Contact Us"],
  iaNote:"A short, flat navigation that puts the studio’s work (Portfolio and Case Study) on the same level as its services.",
  flow:["“Design. Build. Deliver.” hero that states the promise in three words","A floating Interiors card layered over architectural photography","Four trust pillars: residential & commercial, end-to-end project management, premium quality & craftsmanship, client-centric approach","Featured projects directly after the pillars"],
  palette:[["#F3F1EC","Linen"],["#7D5F52","Walnut"],["#2B2B2B","Charcoal"],["#9FB0C2","Dusk blue"]],
  typeNote:"Thin, high-contrast uppercase display type paired with a light sans-serif for body copy, for an editorial, architectural feel.",
  responsive:"On mobile the hero stacks, the Interiors card sits beneath the headline and the four pillars fold into a two-by-two grid."},
 {slug:"aronix",title:"Aronix Webtech",kind:"Technology solutions company, Delhi",type:"Company website",platform:"Desktop & mobile web",status:"Live",live:"https://aronixwebtech.com/",
  summary:"A website for a technology company offering web and app development, AI and ML, IoT, cloud and automation to growing businesses.",
  role:"UI/UX & responsive web design",
  background:["Aronix covers a wide technical range, from websites and apps to AI chatbots and automation.","The site needed to turn that range into one clear promise for Indian businesses and route visitors either to services or to a conversation with an expert."],
  roleList:["Website UI/UX design","Responsive layouts for desktop and mobile","Visual design of the hero, proof strip and client section"],
  ia:["Home","About us","Aronix AI","Services","Products","Industries","Portfolio","Contact us"],
  iaNote:"A dedicated Aronix AI item and an Industries page let visitors find relevant work by technology or by sector.",
  flow:["A headline that names who Aronix serves and what it builds","Two clear paths: Explore Our Services and Consult Our Experts","A proof strip with the AI-powered promise, capabilities and a 4.9 rating","Client logos beside the “Not just another agency” statement"],
  palette:[["#0B5BE3","Electric blue"],["#0D1B3E","Navy"],["#EAF2FF","Ice"],["#FFFFFF","White"]],
  typeNote:"Bold geometric sans-serif headlines with an italic serif accent, set on soft blue gradients beside an AI-themed hero visual.",
  responsive:"On mobile the calls to action become stacked buttons and the AI visual moves beneath the hero copy."}
];

/* Concepts, personal projects and demos */
export const CONCEPTS = [
 {slug:"insta-arena",title:"InstaArena",label:"UI/UX case study",kind:"Sports streaming app",link:"https://www.behance.net/gallery/245356397/InstaArena-UIUX-Case-Study",linkText:"Read the case study on Behance",
  summary:"A sports streaming app concept that brings live matches, highlights and short-form reels together.",
  points:["Five-tab structure: Home, Reels, Search, News and Schedule","Full-screen reels with follow, like and share in the frame","Highlights hero with a single Watch Now action","‘Continue watching’ and ‘Upcoming matches’ rows on Home","Search that surfaces popular live sports, shorts and highlights"]},
 {slug:"health",title:"Hospital Patient Management System",label:"UX case study",kind:"Healthcare dashboard · 2024",link:"https://www.behance.net/gallery/240247877/Hospital-Patient-Management-System-UX-CASE-STUDY",linkText:"Read the case study on Behance",
  summary:"A hospital management dashboard for patient scheduling, analytics and real-time updates, designed in Figma.",
  points:["Modules for doctors, nurses and admin staff, shaped with healthcare stakeholders","KPI cards for patient visits, active patients, active cases and doctors","Patient list with clear status tags, doctor directory and earnings view","Interactive Figma prototypes tested with medical professionals","Accessibility improved by 25%"]},
 {slug:"apex",title:"Apex Total Home",label:"Deployed demo",kind:"Home services booking concept",link:"https://apex-chi-one.vercel.app/",linkText:"Open the demo site",
  summary:"A demo website for a home-services brand where one booking covers cleaning, lawn care, smart home, security, painting, pool and handyman work.",
  points:["Eleven services, each with an instant-pricing configuration","Three-step ‘How it works’: choose, price and schedule, service at your door","Service area section with towns and response times","Recurring plans from weekly to one-time","Deployed as a demo; not a launched business"]},
 {slug:"pizzen",title:"Pizzen 3D Carousel",label:"Interaction concept",kind:"Food ordering landing page",link:"https://www.behance.net/gallery/228929997/3D-CAROUSEL",linkText:"View it on Behance",
  summary:"A pizza ordering landing page built around a rotating 3D carousel.",
  points:["3D rotating pizza carousel as the hero’s centrepiece","Floating ingredients that add depth and movement","One headline, one line of support and a single View Our Menu action","Minimal header with menu, contact and cart"]}
];
export const ALL = [...FEATURED, ...CONCEPTS];
export const MORE_BEHANCE = [["Airbnb Case Study","https://www.behance.net/gallery/237562375/Airbnb-Case-Study"],["Laundry App UI/UX","https://www.behance.net/gallery/236301153/Laundry-App-Clean-Fresh-UIUX-Design"],["AI SEO Website Redesign","https://www.behance.net/gallery/236297839/AI-SEO-Website-UIUX-Redesign"],["Timeless Cars Redesign","https://www.behance.net/gallery/236296623/Timeless-Cars-Website-Redesign"],["Smart ATM Interaction Design","https://www.behance.net/gallery/233936837/Smart-ATM-Interaction-Design"],["YouTube Music Heuristic Evaluation","https://www.behance.net/gallery/234877845/YouTube-Music-Heuristic-Evaluation"],["Emailer Design","https://www.behance.net/gallery/229527907/Emailer-design"]];

export const TIMELINE = [
 {role:"UX/UI Designer",org:"Ecommerce Collections",time:"May 2026 - Present",cats:[["UX Design","Conducted user/market research, explored user flows, information architecture, and usability, and iterated designs based on feedback."],["UI Design","Designed responsive websites, dashboards, design systems, and interactive interfaces with animations and micro-interactions."],["Visual Design","Worked on branding, logos, 3D elements, and social media creatives."]],pts:[]},
 {role:"Freelance UI/UX Designer",org:"Language Learning App",time:"Mar 2025 — May 2025 · Remote",cats:[["UX Design","Conducted user research and usability tests to optimise the onboarding flow, improving retention."],["UI Design","Designed and prototyped a cross-platform language learning app with interactive features and gamified lessons."],["Design Systems","Developed responsive layouts and scalable components in Figma, keeping the experience consistent across devices."]],pts:["Designed and prototyped a cross-platform language learning app with interactive features and gamified lessons","Ran user research and usability tests to optimise the onboarding flow, improving retention","Built responsive layouts and scalable Figma components for consistency across devices"]},
 {role:"Project",org:"Music Website",time:"2025 · Figma, Framer",pts:["Designed an interactive music streaming platform with personalised recommendations","Built custom Framer components for smooth transitions and micro-interactions","Usability studies with students and music lovers improved discoverability and engagement by 20%"]},
 {role:"Project",org:"YouTube Music UX Redesign",time:"2025 · UX research, wireframing",pts:["Reworked navigation and search flow to improve discoverability","Mapped user journeys and wireframes to pinpoint pain points","Proposed accessibility fixes and a simpler visual hierarchy across devices"]},
 {role:"Project",org:"Email Design",time:"2025 · Figma, Canva",pts:["Designed responsive email templates for higher open and click-through rates","Applied A/B testing to subject lines, visuals and calls to action","Delivered design guidelines to keep marketing campaigns consistent"]},
 {role:"Project",org:"Hospital Dashboard",time:"2024 · Figma, prototyping",pts:["Designed patient scheduling, analytics and real-time updates, improving accessibility by 25%","Shaped modules for doctors, nurses and admin staff with healthcare stakeholders","Tested interactive prototypes with medical professionals"]}
];
export const SKILLS = ["UX Research","Product Thinking","Interaction Design","Visual & Graphic Design","Responsive Web Design","Prototyping","Motion-inspired UI","AI-assisted Design Workflows","Usability Testing","Accessibility (WCAG)","Information Architecture","Design Thinking"];
export const TOOLS = [["Figma","UI/UX · Prototyping · Design systems"],["Framer","Web design · Interactions · Live sites"],["Protopie","Advanced prototyping · Micro-interactions"],["Spline","3D elements · Interactive scenes"],["Miro","Research · Journey maps · User flows"],["Adobe XD","UI design · Wireframing · Prototyping"],["Adobe Photoshop","Image editing · Mockups · Compositing"],["Adobe Illustrator","Icons · Illustration · Brand assets"],["Notion","Documentation · Research notes"],["Canva","Social creatives · Email visuals"]];

export const bySlug = (s) => ALL.find((p) => p.slug === s);
export const isFeatured = (p) => FEATURED.includes(p);
