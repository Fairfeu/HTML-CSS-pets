const components = [
  {
    id: 1,
    name: "Animated Hero Section",
    description: "Headline with entrance animation",
    price: 500,
    tags: ["animation", "hero"],
    selected: true,
  },
  {
    id: 2,
    name: "Features with Icons",
    description: "3-6 features with custom icons",
    price: 400,
    tags: ["icons", "grid"],
    selected: true,
  },
  {
    id: 3,
    name: "Portfolio Gallery",
    description: "Work showcase with lightbox",
    price: 700,
    tags: ["gallery", "lightbox"],
    selected: false,
  },
  {
    id: 4,
    name: "Pricing Table",
    description: "Package comparison table",
    price: 600,
    tags: ["table", "pricing"],
    selected: false,
  },
  {
    id: 5,
    name: "Custom Contact Form",
    description: "Tailored contact form with validation",
    price: 450,
    tags: ["form", "validation"],
    selected: true,
  },
  {
    id: 6,
    name: "Testimonials with Rating",
    description: "Customer reviews with star ratings",
    price: 350,
    tags: ["testimonials", "rating"],
    selected: false,
  },
  {
    id: 7,
    name: "Chat Bot Integration",
    description: "Telegram/WhatsApp chat integration",
    price: 800,
    tags: ["integration", "chat"],
    selected: false,
  },
  {
    id: 8,
    name: "Multilingual Support",
    description: "RTL and 3+ languages",
    price: 1000,
    tags: ["localization", "RTL"],
    selected: false,
  },
];

let selectedComponents = components.filter((c) => c.selected);
let currentTheme = "blue";
let currentLayout = "standard";
let abTestingEnabled = false;

document.addEventListener("DOMContentLoaded", function () {
  renderComponents();
  updatePrices();
  setupEventListeners();
  updatePreview();
});

function renderComponents() {
  const grid = document.getElementById("componentsGrid");
  grid.innerHTML = "";

  components.forEach((component) => {
    const card = document.createElement("div");
    card.className = `component-card ${component.selected ? "selected" : ""}`;
    card.innerHTML = `
            <div class="price">$${component.price}</div>
            <h3>${component.name}</h3>
            <p>${component.description}</p>
            <div class="tags">
                ${component.tags
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")}
            </div>
        `;

    card.addEventListener("click", () => {
      component.selected = !component.selected;
      selectedComponents = components.filter((c) => c.selected);
      renderComponents();
      updatePrices();
      updatePreview();
    });

    grid.appendChild(card);
  });
}

function updatePrices() {
  const componentsPrice = selectedComponents.reduce(
    (sum, comp) => sum + comp.price,
    0
  );
  const basePrice = 1500;
  const urgencyCheckbox = document.getElementById("urgencyToggle");
  const urgencyPrice = urgencyCheckbox?.checked ? basePrice * 0.3 : 0;
  const totalPrice = basePrice + componentsPrice + urgencyPrice;

  document.getElementById("componentsPrice").textContent = componentsPrice;
  document.getElementById("totalPrice").textContent = totalPrice;

  if (urgencyCheckbox) {
    document.getElementById("urgencyPrice").textContent = urgencyPrice;
  }
}

function updatePreview() {
  const preview = document.getElementById("previewLayout");

  let previewHTML = `
        <div class="preview-block header">Header</div>
        <div class="preview-block hero">Hero Section</div>
    `;

  if (selectedComponents.some((c) => c.tags.includes("grid"))) {
    previewHTML +=
      '<div class="preview-block features"><i class="fas fa-th-large"></i> Features Grid</div>';
  }

  if (selectedComponents.some((c) => c.tags.includes("gallery"))) {
    previewHTML +=
      '<div class="preview-block"><i class="fas fa-images"></i> Portfolio Gallery</div>';
  }

  if (selectedComponents.some((c) => c.tags.includes("table"))) {
    previewHTML +=
      '<div class="preview-block"><i class="fas fa-table"></i> Pricing Table</div>';
  }

  if (selectedComponents.some((c) => c.tags.includes("testimonials"))) {
    previewHTML +=
      '<div class="preview-block"><i class="fas fa-comment"></i> Testimonials</div>';
  }

  previewHTML += `
        <div class="preview-block cta">Call to Action</div>
        <div class="preview-block">Contact Form</div>
        <div class="preview-block">Footer</div>
    `;

  preview.innerHTML = previewHTML;

  applyLayout(currentLayout);
}

function applyLayout(layout) {
  const preview = document.getElementById("previewLayout");

  switch (layout) {
    case "minimal":
      preview.style.gap = "5px";
      preview.style.padding = "10px";
      break;
    case "creative":
      preview.style.gap = "20px";
      preview.style.gridTemplateColumns =
        "repeat(auto-fit, minmax(150px, 1fr))";
      break;
    default:
      preview.style.gap = "10px";
      preview.style.gridTemplateColumns = "1fr";
  }
}

function setupEventListeners() {
  document.querySelectorAll("[data-theme]").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll("[data-theme]")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      currentTheme = this.dataset.theme;
      document.body.className = "";
      document.body.classList.add(`theme-${currentTheme}`);
    });
  });

  document
    .getElementById("layoutSelect")
    .addEventListener("change", function () {
      currentLayout = this.value;
      applyLayout(currentLayout);
    });

  document.querySelectorAll("[data-test]").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll("[data-test]")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      abTestingEnabled = this.dataset.test === "on";
      document.getElementById("abTestingSection").style.display =
        abTestingEnabled ? "block" : "none";
    });
  });

  document.querySelectorAll(".ab-variant").forEach((variant) => {
    variant.addEventListener("click", function () {
      document
        .querySelectorAll(".ab-variant")
        .forEach((v) => v.classList.remove("active"));
      this.classList.add("active");

      const ctaBlock = document.querySelector(".preview-block.cta");
      const variantType = this.dataset.variant;

      switch (variantType) {
        case "b":
          ctaBlock.innerHTML =
            '<i class="fas fa-comment"></i> Get Free Consultation';
          break;
        case "c":
          ctaBlock.innerHTML = '<i class="fas fa-rocket"></i> Start Now';
          break;
        default:
          ctaBlock.innerHTML = "Call to Action";
      }
    });
  });

  document.querySelector(".export-btn").addEventListener("click", function () {
    const projectData = {
      theme: currentTheme,
      layout: currentLayout,
      components: selectedComponents,
      total: parseInt(document.getElementById("totalPrice").textContent),
    };

    alert(
      `Project exported!\nTheme: ${projectData.theme}\nLayout: ${projectData.layout}\nTotal: $${projectData.total}`
    );
  });

  setTimeout(() => {
    const totalSection = document.querySelector(".total-section");
    const urgencyRow = document.createElement("div");
    urgencyRow.className = "total-row";
    urgencyRow.innerHTML = `
            <div>
                <input type="checkbox" id="urgencyToggle" style="margin-right: 10px;">
                <label for="urgencyToggle">Urgent order (+30%)</label>
            </div>
            <span id="urgencyPrice">0</span>
        `;

    totalSection.insertBefore(urgencyRow, totalSection.children[2]);

    document
      .getElementById("urgencyToggle")
      .addEventListener("change", function () {
        updatePrices();
      });
  }, 100);
}
