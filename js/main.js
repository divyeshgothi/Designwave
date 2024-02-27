/*Mobile Menu Show Hide Start*/
function navigation() {
  document.querySelector("html").classList.toggle("menu-open");
}
document.querySelector(".mobile-toggle").addEventListener("click", navigation);
/*Mobile Menu Show Hide End*/
/*Dropdown Menu Start*/
let navitems = document.querySelectorAll(".menu ul li");
navitems.forEach(function (t) {
  t.addEventListener("click", function (e) {
    navitems.forEach(function (e) {
      e !== t || e.classList.contains("subnav-open")
        ? e.classList.remove("subnav-open")
        : e.classList.add("subnav-open");
    });
  });
});
/*Dropdown Menu End*/

// Function to start counting animation
function startCountingAnimation(element, targetCount) {
  let count = 0;
  const duration = 2000; // Animation duration in milliseconds
  const step = targetCount / (duration / 16); // 16ms is close to the typical frame duration

  function updateCount() {
    count += step;
    if (count < targetCount) {
      element.textContent = Math.round(count);
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = targetCount;
    }
  }

  updateCount();
}

// Intersection Observer callback function
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counterElement = entry.target.querySelector("h2");
      const targetCount = parseInt(
        counterElement.parentElement.getAttribute("data-count"),
        10
      );
      startCountingAnimation(counterElement, targetCount);
      observer.unobserve(entry.target);
    }
  });
}

// Create an Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5,
});

// Observe each counter element
const counterElements = document.querySelectorAll(".counter");
counterElements.forEach((counterElement) => {
  observer.observe(counterElement);
});

