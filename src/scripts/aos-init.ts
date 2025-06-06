import AOS from "aos";
import "aos/dist/aos.css";

document.addEventListener("DOMContentLoaded", () => {
  const brideGroomSection = document.getElementById("bride-groom");


  AOS.init({
    once: false,   // <-- important: animate every time
    mirror: true,  // <-- animate on scroll up
    duration: 800, // optional: smooth timing
  });

  // Optional: monitor for dynamic visibility
  // const observer = new MutationObserver(() => {
  //   AOS.refresh();
  // });

  // observer.observe(document.body, {
  //   childList: true,
  //   subtree: true,
  //   attributes: true,
  //   attributeFilter: ['class', 'style']
  // });

  if (brideGroomSection?.classList.contains("hidden")) {
  //   brideGroomSection.classList.remove("hidden");
    AOS.refresh();
  }
});
