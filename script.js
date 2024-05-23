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
        const tdTag = tr[i] .getElementsByTagName("td")[6];

        const tagMatch = !filters.tagSearch || (tdTag && tdTag.textContent.toLowerCase().includes(filters.tagSearch));
        const journalNameMatch = !filters.journalNameSearch || (tdJournalName && tdJournalName.textContent.toLowerCase().includes(filters.journalNameSearch));
        const subSpecialtyMatch = !filters.subSpecialty || (tdSubSpecialty && tdSubSpecialty.textContent.toLowerCase().includes(filters.subSpecialty));
        const productMatch = !filters.productDropdown || (tdProduct && tdProduct.textContent.toLowerCase().includes(filters.productDropdown));
        const authorMatch = !filters.authorDropdown || (tdAuthor && tdAuthor.textContent.toLowerCase().includes(filters.authorDropdown));
        if (tagMatch && journalNameMatch && subSpecialtyMatch && productMatch && authorMatch) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }

    updateResultsCount();
}

function searchByField(fieldId, columnIdx) {
    const input = document.getElementById(fieldId);
    filters[fieldId] = input.value.toLowerCase();
    applyFilters();
}

function filterByDropdown(fieldId, columnIdx) {
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