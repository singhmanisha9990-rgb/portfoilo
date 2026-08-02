import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

// As of GSAP 3.13 the former Club-only plugins ship in the public package, so
// ScrollSmoother and SplitText import from "gsap/*" — not "gsap-trial/*".
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export { gsap, ScrollTrigger, ScrollSmoother, SplitText };
