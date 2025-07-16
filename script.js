document.addEventListener("DOMContentLoaded", () => {
  // === Carousel ===
  let currentSlide = 0
  const slides = document.querySelectorAll(".carousel-slide")
  const indicators = document.querySelectorAll(".indicator")
  const track = document.querySelector(".carousel-track")

  function updateCarousel() {
    if (!track) return
    track.style.transform = `translateX(-${currentSlide * 33.333}%)`

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide)
    })

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide)
    })
  }

  function changeSlide(direction) {
    currentSlide += direction
    if (currentSlide >= slides.length) currentSlide = 0
    if (currentSlide < 0) currentSlide = slides.length - 1
    updateCarousel()
  }

  window.currentSlideSet = function (index) {
    currentSlide = index - 1
    updateCarousel()
  }

  setInterval(() => changeSlide(1), 5000)

  // Swipe support
  let startX = 0, endX = 0
  const carousel = document.querySelector(".highlight-carousel")

  if (carousel) {
    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
    })

    carousel.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      handleSwipe()
    })
  }

  function handleSwipe() {
    const threshold = 50
    const diff = startX - endX
    if (Math.abs(diff) > threshold) {
      changeSlide(diff > 0 ? 1 : -1)
    }
  }

  // === Filter tabs ===
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")
      console.log("Filter:", tab.textContent)
    })
  })

  // === Load more ===
  const loadMoreBtn = document.querySelector(".load-more-btn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const originalText = loadMoreBtn.textContent
      loadMoreBtn.textContent = "Memuat..."
      loadMoreBtn.disabled = true

      setTimeout(() => {
        loadMoreBtn.textContent = originalText
        loadMoreBtn.disabled = false
        console.log("Loading more novels...")
      }, 1000)
    })
  }

  // === Search ===
  const searchInput = document.querySelector(".search-input")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value
      if (query.length > 2) {
        console.log("Searching for:", query)
      }
    })
  }

  // === Mobile menu toggle ===
  const menuButton = document.querySelector(".mobile-menu-btn")
  const navMenu = document.querySelector(".nav-menu")

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("open")
    })

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !menuButton.contains(e.target)) {
        navMenu.classList.remove("open")
      }
    })
  }

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  })

  // === Navbar scroll background effect ===
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.style.background =
        window.scrollY > 100
          ? "rgba(15, 15, 15, 0.98)"
          : "rgba(15, 15, 15, 0.95)"
    })
  }

  // === Hover effects on novel cards ===
  document.querySelectorAll(".novel-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // === Bottom nav active state ===
  document.querySelectorAll(".bottom-nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()
      document.querySelectorAll(".bottom-nav-item").forEach((i) => i.classList.remove("active"))
      item.classList.add("active")
      console.log("Navigate to:", item.querySelector("span").textContent)
    })
  })

  // === Intersection Observer for animation ===
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

  document.querySelectorAll(".novel-card, .announcement-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
