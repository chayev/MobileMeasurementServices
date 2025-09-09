// Configuration - easily changeable brand settings __
const CONFIG = {
  BRAND_NAME: "SignalFlow Advisory",
  TAGLINE: "Onboard faster. Attribute smarter.",
  CONTACT_EMAIL: "hello@example.com",
  LEAD_WEBHOOK_URL: "https://example.com/webhook",
  PRIMARY_COLOR: "#1e2a78",
  ACCENT_COLOR: "#4f46e5",
  LOGO_TEXT: "SF",
}

// Analytics stub - logs to dataLayer for GTM integration
window.dataLayer = window.dataLayer || []
function track(event, payload = {}) {
  console.log("Analytics Event:", event, payload)
  window.dataLayer.push({
    event: event,
    ...payload,
  })
}

// DOM elements
const leadModal = document.getElementById("lead-modal")
const exitModal = document.getElementById("exit-modal")
const leadForm = document.getElementById("lead-form")
const exitForm = document.getElementById("exit-form")
const navLinks = document.querySelectorAll(".nav-link")

// State management
let currentStep = 1
let exitIntentShown = false
let emailCaptured = localStorage.getItem("emailCaptured") === "true"

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeModals()
  initializeForms()
  initializeAccordion()
  initializeExitIntent()

  // Apply brand configuration
  applyBrandConfig()

  track("page_view", { page: "home" })
})

// Apply brand configuration to DOM
function applyBrandConfig() {
  // Update CSS variables
  document.documentElement.style.setProperty("--color-primary", CONFIG.PRIMARY_COLOR)
  document.documentElement.style.setProperty("--color-accent", CONFIG.ACCENT_COLOR)

  // Update brand elements
  document.querySelectorAll(".brand-name").forEach((el) => {
    el.textContent = CONFIG.BRAND_NAME
  })

  document.querySelectorAll(".logo").forEach((el) => {
    el.textContent = CONFIG.LOGO_TEXT
  })

  // Update contact email
  document.querySelectorAll('a[href^="mailto:"]').forEach((el) => {
    el.href = `mailto:${CONFIG.CONTACT_EMAIL}`
    if (el.textContent.includes("@")) {
      el.textContent = CONFIG.CONTACT_EMAIL
    }
  })
}

// Navigation functionality
function initializeNavigation() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        track("nav_click", { target: this.getAttribute("href") })
      }
    })
  })

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNav)
}

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const top = section.offsetTop
    const bottom = top + section.offsetHeight
    const id = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`)

    if (scrollPos >= top && scrollPos <= bottom) {
      navLinks.forEach((link) => link.classList.remove("active"))
      if (navLink) navLink.classList.add("active")
    }
  })
}

// Modal functionality
function initializeModals() {
  // Event delegation for modal actions
  document.addEventListener("click", (e) => {
    const action = e.target.getAttribute("data-action")

    switch (action) {
      case "open-form":
        openModal(leadModal)
        track("cta_click", { type: "open_form" })
        break
      case "close-modal":
        closeModal(leadModal)
        break
      case "close-exit-modal":
        closeModal(exitModal)
        break
      case "download-template":
        handleTemplateDownload()
        track("download_click", { type: "template" })
        break
      case "scroll-to-contact":
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
        track("cta_click", { type: "scroll_to_contact" })
        break
    }
  })

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(leadModal)
      closeModal(exitModal)
    }
  })
}

function openModal(modal) {
  modal.classList.add("active")
  modal.setAttribute("aria-hidden", "false")
  document.body.style.overflow = "hidden"

  // Focus trap
  const focusableElements = modal.querySelectorAll("button, input, select, textarea, a[href]")
  if (focusableElements.length > 0) {
    focusableElements[0].focus()
  }
}

function closeModal(modal) {
  modal.classList.remove("active")
  modal.setAttribute("aria-hidden", "true")
  document.body.style.overflow = ""
}

// Form functionality
function initializeForms() {
  // Lead form submission
  leadForm.addEventListener("submit", handleLeadFormSubmit)

  // Exit form submission
  exitForm.addEventListener("submit", handleExitFormSubmit)

  // Form navigation
  document.addEventListener("click", (e) => {
    const action = e.target.getAttribute("data-action")

    if (action === "next-step") {
      nextStep()
    } else if (action === "prev-step") {
      prevStep()
    }
  })

  // Real-time validation
  leadForm.addEventListener("input", validateField)
  exitForm.addEventListener("input", validateField)
}

function nextStep() {
  if (validateCurrentStep()) {
    currentStep++
    updateFormStep()
    track("form_step_view", { step: currentStep })
  }
}

function prevStep() {
  currentStep--
  updateFormStep()
  track("form_step_view", { step: currentStep })
}

function updateFormStep() {
  // Update step indicators
  document.querySelectorAll(".step").forEach((step, index) => {
    step.classList.remove("active", "completed")
    if (index + 1 < currentStep) {
      step.classList.add("completed")
    } else if (index + 1 === currentStep) {
      step.classList.add("active")
    }
  })

  // Update form steps
  document.querySelectorAll(".form-step").forEach((step, index) => {
    step.classList.remove("active")
    if (index + 1 === currentStep || (currentStep === 4 && step.classList.contains("success-view"))) {
      step.classList.add("active")
    }
  })
}

function validateCurrentStep() {
  const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
  const requiredFields = currentStepElement.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!validateField({ target: field })) {
      isValid = false
    }
  })

  // Special validation for step 2 checkboxes
  if (currentStep === 2) {
    const platformCheckboxes = currentStepElement.querySelectorAll('input[name="platforms"]:checked')
    if (platformCheckboxes.length === 0) {
      showFieldError(currentStepElement.querySelector(".checkbox-group"), "Please select at least one platform")
      isValid = false
    }
  }

  return isValid
}

function validateField(e) {
  const field = e.target
  const value = field.value.trim()
  let isValid = true
  let errorMessage = ""

  // Clear previous errors
  clearFieldError(field)

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    errorMessage = "This field is required"
    isValid = false
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const businessEmailRegex = /@(gmail|yahoo|hotmail|outlook|aol)\./i

    if (!emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address"
      isValid = false
    } else if (businessEmailRegex.test(value)) {
      errorMessage = "Please use your business email address"
      isValid = false
    }
  }

  if (!isValid) {
    showFieldError(field, errorMessage)
  }

  return isValid
}

function showFieldError(field, message) {
  const formGroup = field.closest(".form-group") || field.parentElement
  const errorElement = formGroup.querySelector(".error-message")

  formGroup.classList.add("error")
  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.add("active")
  }
}

function clearFieldError(field) {
  const formGroup = field.closest(".form-group") || field.parentElement
  const errorElement = formGroup.querySelector(".error-message")

  formGroup.classList.remove("error")
  if (errorElement) {
    errorElement.classList.remove("active")
  }
}

async function handleLeadFormSubmit(e) {
  e.preventDefault()

  if (!validateCurrentStep()) {
    return
  }

  const formData = new FormData(leadForm)
  const data = Object.fromEntries(formData.entries())

  // Handle multi-select fields
  data.platforms = formData.getAll("platforms")
  data.markets = formData.getAll("markets")

  try {
    const response = await fetch(CONFIG.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      // Mark email as captured
      localStorage.setItem("emailCaptured", "true")
      emailCaptured = true

      // Show success step
      currentStep = 4
      updateFormStep()

      track("form_submit_success", {
        email: data.email,
        company: data.company,
        urgency: data.urgency,
      })
    } else {
      throw new Error("Submission failed")
    }
  } catch (error) {
    console.error("Form submission error:", error)
    alert("There was an error submitting your request. Please try again or contact us directly.")
    track("form_submit_error", { error: error.message })
  }
}

async function handleExitFormSubmit(e) {
  e.preventDefault()

  const email = document.getElementById("exit-email").value.trim()

  if (!email || !validateField({ target: document.getElementById("exit-email") })) {
    return
  }

  // Mark email as captured
  localStorage.setItem("emailCaptured", "true")
  emailCaptured = true

  // Close modal and trigger download
  closeModal(exitModal)
  handleTemplateDownload()

  track("exit_intent_conversion", { email })
}

function handleTemplateDownload() {
  if (!emailCaptured) {
    // Show exit modal for email capture
    openModal(exitModal)
    return
  }

  // Create and trigger download
  const csvContent = generateTrackingPlanCSV()
  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "tracking-plan-template.csv"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)

  track("template_download", { gated: !emailCaptured })
}

function generateTrackingPlanCSV() {
  const csvData = [
    ["event_name", "platform", "param_1", "param_2", "revenue_param", "priority", "notes", "skan_mapping"],
    ["app_open", "both", "source", "medium", "", "high", "Track app launches and attribution", "install"],
    ["purchase", "both", "product_id", "category", "revenue", "critical", "In-app purchase events", "purchase"],
    [
      "subscription_start",
      "both",
      "plan_type",
      "billing_cycle",
      "subscription_value",
      "critical",
      "New subscription events",
      "subscribe",
    ],
    ["level_complete", "both", "level_id", "score", "", "medium", "Game progression tracking", "level_achieved"],
    ["add_to_cart", "both", "product_id", "quantity", "value", "medium", "E-commerce funnel tracking", "add_to_cart"],
    ["registration", "both", "method", "user_type", "", "high", "User account creation", "complete_registration"],
    [
      "tutorial_complete",
      "both",
      "tutorial_id",
      "completion_time",
      "",
      "medium",
      "Onboarding completion",
      "tutorial_completion",
    ],
    ["share_content", "both", "content_type", "method", "", "low", "Social sharing events", "share"],
    ["search", "both", "query", "results_count", "", "low", "In-app search behavior", "search"],
    ["video_view", "both", "video_id", "duration", "", "medium", "Video engagement tracking", "content_view"],
  ]

  return csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")
}

// Accordion functionality
function initializeAccordion() {
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", function () {
      const item = this.parentElement
      const isActive = item.classList.contains("active")

      // Close all accordion items
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active")
        item.querySelector(".accordion-header").setAttribute("aria-expanded", "false")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
        this.setAttribute("aria-expanded", "true")
      }

      track("glossary_click", { term: this.textContent.trim() })
    })
  })
}

// Exit intent functionality (desktop only)
function initializeExitIntent() {
  if (window.innerWidth < 768) return // Mobile skip

  let mouseLeaveTimer

  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 0 && !exitIntentShown && !emailCaptured) {
      mouseLeaveTimer = setTimeout(() => {
        openModal(exitModal)
        exitIntentShown = true
        track("exit_intent_shown")
      }, 100)
    }
  })

  document.addEventListener("mouseenter", () => {
    if (mouseLeaveTimer) {
      clearTimeout(mouseLeaveTimer)
    }
  })
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance optimization
window.addEventListener("scroll", debounce(updateActiveNav, 100))

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  track("js_error", {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
  })
})

// Expose CONFIG for easy customization
window.SIGNALFLOW_CONFIG = CONFIG
