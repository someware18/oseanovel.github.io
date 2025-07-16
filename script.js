// Carousel functionality
let currentSlide = 0
const slides = document.querySelectorAll(".carousel-slide")
const indicators = document.querySelectorAll(".indicator")
const track = document.querySelector(".carousel-track")

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 33.333}%)`

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide)
  })

  // Update slide active state
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide)
  })
}

function changeSlide(direction) {
  currentSlide += direction

  if (currentSlide >= slides.length) {
    currentSlide = 0
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1
  }

  updateCarousel()
}

function currentSlideSet(index) {
  currentSlide = index - 1
  updateCarousel()
}

// Auto-play carousel
setInterval(() => {
  changeSlide(1)
}, 5000)

// Touch/swipe support for mobile
let startX = 0
let endX = 0

document.querySelector(".highlight-carousel").addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX
})

document.querySelector(".highlight-carousel").addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX
  handleSwipe()
})

function handleSwipe() {
  const threshold = 50
  const diff = startX - endX

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      changeSlide(1) // Swipe left - next slide
    } else {
      changeSlide(-1) // Swipe right - previous slide
    }
  }
}

// Filter tabs functionality
document.querySelectorAll(".filter-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    document.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"))
    // Add active class to clicked tab
    tab.classList.add("active")

    // Here you would typically filter the content
    // For demo purposes, we'll just log the filter
    console.log("Filter:", tab.textContent)
  })
})

// Load more functionality
document.querySelector(".load-more-btn").addEventListener("click", () => {
  // Simulate loading more content
  const button = document.querySelector(".load-more-btn")
  const originalText = button.textContent

  button.textContent = "Memuat..."
  button.disabled = true

  setTimeout(() => {
    button.textContent = originalText
    button.disabled = false
    // Here you would load more novels
    console.log("Loading more novels...")
  }, 1000)
})

// Search functionality
document.querySelector(".search-input").addEventListener("input", (e) => {
  const query = e.target.value
  if (query.length > 2) {
    // Simulate search
    console.log("Searching for:", query)
  }
})

// Mobile menu toggle (if needed)
document.querySelector(".mobile-menu-btn").addEventListener("click", () => {
  // Toggle mobile menu
  console.log("Mobile menu toggled")
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 15, 15, 0.98)"
  } else {
    navbar.style.background = "rgba(15, 15, 15, 0.95)"
  }
})

// Novel card hover effects
document.querySelectorAll(".novel-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Bottom navigation active state
document.querySelectorAll(".bottom-nav-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault()

    // Remove active class from all items
    document.querySelectorAll(".bottom-nav-item").forEach((i) => i.classList.remove("active"))

    // Add active class to clicked item
    item.classList.add("active")

    // Here you would handle navigation
    console.log("Navigate to:", item.querySelector("span").textContent)
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".novel-card, .announcement-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})