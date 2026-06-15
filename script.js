function formatNumber(value) {
  return new Intl.NumberFormat("nl-BE").format(value);
}

function getPercentage(current, target) {
  if (!target || target <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((current / target) * 100));
}

function createCategoryCard(key, item) {
  const card = document.createElement("article");
  card.className = "category-card";

  card.innerHTML = `
    <div class="category-card-header">
      <div>
        <p class="category-label">${item.label}</p>
        <p class="category-count"><span data-count="${key}">0</span><span class="muted"> / </span><span data-target="${key}">0</span></p>
      </div>
    </div>
    <meter data-meter="${key}" min="0" max="1" value="0"></meter>
    <p class="percentage"><span data-percentage="${key}">0%</span></p>
  `;

  return card;
}

function renderCategories() {
  const grid = document.getElementById("category-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  for (const key in GROENE_LONG_DATA.categories) {
    grid.appendChild(createCategoryCard(key, GROENE_LONG_DATA.categories[key]));
  }
}

function updateMeters() {
  let totalCurrent = 0;
  let totalTarget = 0;

  for (const key in GROENE_LONG_DATA.categories) {
    const item = GROENE_LONG_DATA.categories[key];
    totalCurrent += item.current;
    totalTarget += item.target;

    const countElement = document.querySelector(`[data-count="${key}"]`);
    const targetElement = document.querySelector(`[data-target="${key}"]`);
    const percentageElement = document.querySelector(`[data-percentage="${key}"]`);
    const meterElement = document.querySelector(`[data-meter="${key}"]`);

    if (countElement) {
      countElement.textContent = formatNumber(item.current);
    }

    if (targetElement) {
      targetElement.textContent = formatNumber(item.target);
    }

    if (percentageElement) {
      percentageElement.textContent = `${getPercentage(item.current, item.target)}%`;
    }

    if (meterElement) {
      meterElement.min = 0;
      meterElement.max = item.target;
      meterElement.value = item.current;
    }
  }

  const totalCurrentElement = document.getElementById("total-current");
  const totalTargetElement = document.getElementById("total-target");
  const totalPercentageElement = document.getElementById("total-percentage");
  const totalMeterElement = document.getElementById("total-meter");

  if (totalCurrentElement) {
    totalCurrentElement.textContent = formatNumber(totalCurrent);
  }

  if (totalTargetElement) {
    totalTargetElement.textContent = formatNumber(totalTarget);
  }

  if (totalPercentageElement) {
    totalPercentageElement.textContent = `${getPercentage(totalCurrent, totalTarget)}%`;
  }

  if (totalMeterElement) {
    totalMeterElement.min = 0;
    totalMeterElement.max = totalTarget;
    totalMeterElement.value = totalCurrent;
  }
}

renderCategories();
updateMeters();
