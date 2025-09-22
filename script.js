/**
 * @file script.js
 * @description Main JavaScript file for the Attico Garda website.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. ELEMENT SELECTORS
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;
    const langMenuButton = document.getElementById('language-menu-button');
    const langMenu = document.getElementById('language-menu');
    const mainMenuButton = document.getElementById('main-menu-button');
    const mainMenu = document.getElementById('main-menu');
    const menuToggleBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const langLinks = document.querySelectorAll('#lang-it, #lang-en, #lang-de');
    const currentLangText = document.getElementById('current-lang-text');
    const floorplanContainer = document.getElementById('floorplan-container');
    const floorplanModal = document.getElementById('floorplan-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const floorplanImage = document.getElementById('floorplan-image');

    // Selectors for Price Slider
    const priceTables = document.querySelectorAll('.price-table');
    const priceTableTitle = document.getElementById('price-table-title');
    const prevPriceBtn = document.getElementById('prev-price-btn');
    const nextPriceBtn = document.getElementById('next-price-btn');

    // 2. THEME SWITCHER LOGIC (invariato)
    function applyTheme(isDark) { body.classList.toggle('dark', isDark); sunIcon.classList.toggle('hidden', isDark); moonIcon.classList.toggle('hidden', !isDark); }
    themeToggleBtn.addEventListener('click', () => { const isCurrentlyDark = body.classList.contains('dark'); const newTheme = isCurrentlyDark ? 'light' : 'dark'; localStorage.setItem('theme', newTheme); applyTheme(!isCurrentlyDark); });
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) { applyTheme(true); } else { applyTheme(false); }

    // 3. DESKTOP DROPDOWN MENU LOGIC (invariato)
    function toggleDropdown(menu) { menu.classList.toggle('hidden'); }
    langMenuButton.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(langMenu); mainMenu.classList.add('hidden'); });
    mainMenuButton.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(mainMenu); langMenu.classList.add('hidden'); });
    document.addEventListener('click', () => { langMenu.classList.add('hidden'); mainMenu.classList.add('hidden'); });

    // 4. MOBILE MENU LOGIC (invariato)
    menuToggleBtn.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); mobileMenu.classList.toggle('open'); });

    // 5. LANGUAGE TEXT UPDATE LOGIC (invariato)
    langLinks.forEach(link => { link.addEventListener('click', (e) => { const lang = e.target.id.split('-')[1]; currentLangText.textContent = lang.toUpperCase(); }); });

    // 6. FLOORPLAN MODAL LOGIC (invariato)
    if (floorplanContainer && floorplanModal) { const openModal = () => { modalImage.src = floorplanImage.src; floorplanModal.classList.remove('hidden'); }; const closeModal = () => { floorplanModal.classList.add('hidden'); }; floorplanContainer.addEventListener('click', openModal); closeModalBtn.addEventListener('click', closeModal); floorplanModal.addEventListener('click', (e) => { if (e.target === floorplanModal) closeModal(); }); document.addEventListener('keydown', (e) => { if (e.key === "Escape" && !floorplanModal.classList.contains('hidden')) closeModal(); }); }

    // 7. ACCORDION LOGIC (invariato)
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => { const header = item.querySelector('.accordion-header'); const content = item.querySelector('.accordion-content'); const icon = item.querySelector('.accordion-icon'); header.addEventListener('click', () => { const isOpen = content.style.maxHeight; accordionItems.forEach(otherItem => { if (otherItem !== item) { otherItem.querySelector('.accordion-content').style.maxHeight = null; otherItem.querySelector('.accordion-icon').textContent = '+'; } }); if (isOpen) { content.style.maxHeight = null; icon.textContent = '+'; } else { content.style.maxHeight = content.scrollHeight + "px"; icon.textContent = '-'; } }); });

    // 8. MAP/STREET VIEW SWITCHER LOGIC (invariato)
    const googleMap = document.getElementById('google-map'); const streetView = document.getElementById('street-view'); const showStreetViewBtn = document.getElementById('show-streetview-btn'); const showMapBtn = document.getElementById('show-map-btn');
    if (googleMap && streetView && showStreetViewBtn && showMapBtn) { showStreetViewBtn.addEventListener('click', () => { googleMap.classList.add('hidden'); streetView.classList.remove('hidden'); showStreetViewBtn.classList.add('hidden'); showMapBtn.classList.remove('hidden'); }); showMapBtn.addEventListener('click', () => { streetView.classList.add('hidden'); googleMap.classList.remove('hidden'); showMapBtn.classList.add('hidden'); showStreetViewBtn.classList.remove('hidden'); }); }

    // 9. PRICE TABLE SLIDER LOGIC (NUOVO)
    if (priceTables.length > 0) {
        const priceTitles = ["Stagione Invernale", "Media Stagione", "Alta Stagione e Festività"];
        let currentPriceIndex = 0;

        function showPriceTable(index) {
            priceTables.forEach((table, i) => {
                table.classList.toggle('hidden', i !== index);
            });
            priceTableTitle.textContent = priceTitles[index];
        }

        nextPriceBtn.addEventListener('click', () => {
            currentPriceIndex++;
            if (currentPriceIndex >= priceTables.length) {
                currentPriceIndex = 0; // Loop to the first
            }
            showPriceTable(currentPriceIndex);
        });

        prevPriceBtn.addEventListener('click', () => {
            currentPriceIndex--;
            if (currentPriceIndex < 0) {
                currentPriceIndex = priceTables.length - 1; // Loop to the last
            }
            showPriceTable(currentPriceIndex);
        });

        // Initialize first table
        showPriceTable(currentPriceIndex);
    }
});