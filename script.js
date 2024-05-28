document.addEventListener("DOMContentLoaded", function() {
    history.pushState({}, "", "/scientific-publication-library-test");
    updateResultsCount();
});

let filters = {
    tagSearch: '',
    journalNameSearch: '',
    subSpecialty: '',
    productDropdown: '',
    authorDropdown: ''
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
        const tdTag = tr[i].getElementsByTagName("td")[2];
        const tdJournalName = tr[i].getElementsByTagName("td")[0];
        const tdSubSpecialty = tr[i].getElementsByTagName("td")[3];
        const tdProduct = tr[i].getElementsByTagName("td")[4];
        const tdAuthor = tr[i].getElementsByTagName("td")[5];

        const tagMatch = !filters.tagSearch || (tdTag && normalizeText(tdTag.textContent).includes(normalizeText(filters.tagSearch)));
        const journalNameMatch = !filters.journalNameSearch || (tdJournalName && normalizeText(tdJournalName.textContent).includes(normalizeText(filters.journalNameSearch)));
        const subSpecialtyMatch = !filters.subSpecialty || (tdSubSpecialty && normalizeText(tdSubSpecialty.textContent).includes(normalizeText(filters.subSpecialty)));
        const productMatch = !filters.productDropdown || (tdProduct && normalizeText(tdProduct.textContent).includes(normalizeText(filters.productDropdown)));
        const authorMatch = !filters.authorDropdown || (tdAuthor && normalizeText(tdAuthor.textContent).includes(normalizeText(filters.authorDropdown)));

        if (tagMatch && journalNameMatch && subSpecialtyMatch && productMatch && authorMatch) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }

    updateResultsCount();
}

function searchByField(fieldId) {
    const input = document.getElementById(fieldId);
    filters[fieldId] = input.value.toLowerCase();
    applyFilters();
}

function filterByDropdown(fieldId) {
    const dropdown = document.getElementById(fieldId);
    filters[fieldId] = dropdown.value.toLowerCase();
    applyFilters();
}

function clearFilters() {
    // Reset all filters
    document.getElementById('tagSearch').value = '';
    document.getElementById('journalNameSearch').value = '';
    document.getElementById('subSpecialty').selectedIndex = 0;
    document.getElementById('productDropdown').selectedIndex = 0;
    document.getElementById('authorDropdown').selectedIndex = 0;

    // Clear filter values
    filters = {
        tagSearch: '',
        journalNameSearch: '',
        subSpecialty: '',
        productDropdown: '',
        authorDropdown: ''
    };

    applyFilters();
}

// Add event listeners to trigger filtering
document.getElementById('tagSearch').addEventListener('input', () => searchByField('tagSearch'));
document.getElementById('journalNameSearch').addEventListener('input', () => searchByField('journalNameSearch'));
document.getElementById('subSpecialty').addEventListener('change', () => filterByDropdown('subSpecialty'));
document.getElementById('productDropdown').addEventListener('change', () => filterByDropdown('productDropdown'));
document.getElementById('authorDropdown').addEventListener('change', () => filterByDropdown('authorDropdown'));
