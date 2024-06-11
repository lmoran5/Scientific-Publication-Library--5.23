document.addEventListener("DOMContentLoaded", function() {
    history.pushState({}, "", "/scientific-publication-library-test");
    updateResultsCount();
});

let filters = {
    journalNameSearch: '',
    articleTitleSearch: '',
    authorSearch: '',
    subSpecialty: '',
    productDropdown: ''
};

function normalizeText(text) {
    return text.toLowerCase().replace(/'/g, "").replace(/-/g, "");
}

function updateResultsCount() {
    const table = document.getElementById("referencesTable");
    const tr = table.getElementsByTagName("tr");
    let visibleCount = 0;

    for (let i = 1; i < tr.length; i++) {
        if (tr[i].style.display !== "none") {
            visibleCount++;
        }
    }
    document.getElementById("resultsCount").textContent = `Results Found: ${visibleCount}`;
}

function applyFilters() {
    const table = document.getElementById("referencesTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const tdJournalName = tr[i].getElementsByTagName("td")[0];
        const tdArticleTitle = tr[i].getElementsByTagName("td")[1];
        const tdSubSpecialty = tr[i].getElementsByTagName("td")[4];
        const tdProduct = tr[i].getElementsByTagName("td")[5];
        const tdAuthor = tr[i].getElementsByTagName("td")[6];

        const journalNameMatch = !filters.journalNameSearch || (tdJournalName && normalizeText(tdJournalName.textContent).includes(normalizeText(filters.journalNameSearch)));
        const articleTitleMatch = !filters.articleTitleSearch || (tdArticleTitle && normalizeText(tdArticleTitle.textContent).includes(normalizeText(filters.articleTitleSearch)));
        const subSpecialtyMatch = !filters.subSpecialty || (tdSubSpecialty && normalizeText(tdSubSpecialty.textContent).includes(normalizeText(filters.subSpecialty)));
        const productMatch = !filters.productDropdown || (tdProduct && normalizeText(tdProduct.textContent).includes(normalizeText(filters.productDropdown)));
        const authorMatch = !filters.authorSearch || (tdAuthor && normalizeText(tdAuthor.textContent).includes(normalizeText(filters.authorSearch)));

        if (journalNameMatch && articleTitleMatch && subSpecialtyMatch && productMatch && authorMatch) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }

    updateResultsCount();
}

function searchByField(fieldId, columnIndex) {
    const input = document.getElementById(fieldId);
    filters[fieldId] = input.value.toLowerCase();
    applyFilters();
}

function filterByDropdown(fieldId, columnIndex) {
    const dropdown = document.getElementById(fieldId);
    filters[fieldId] = dropdown.value.toLowerCase();
    applyFilters();
}

function clearFilters() {
    // Reset all filters
    document.getElementById('journalNameSearch').value = '';
    document.getElementById('articleTitleSearch').value = '';
    document.getElementById('authorSearch').value = '';
    document.getElementById('subSpecialty').selectedIndex = 0;
    document.getElementById('productDropdown').selectedIndex = 0;

    // Clear filter values
    filters = {
        journalNameSearch: '',
        articleTitleSearch: '',
        authorSearch: '',
        subSpecialty: '',
        productDropdown: ''
    };

    applyFilters();
}

// Add event listeners to trigger filtering
document.getElementById('journalNameSearch').addEventListener('input', () => searchByField('journalNameSearch', 0));
document.getElementById('articleTitleSearch').addEventListener('input', () => searchByField('articleTitleSearch', 1));
document.getElementById('authorSearch').addEventListener('input', () => searchByField('authorSearch', 6));
document.getElementById('subSpecialty').addEventListener('change', () => filterByDropdown('subSpecialty', 4));
document.getElementById('productDropdown').addEventListener('change', () => filterByDropdown('productDropdown', 5));
