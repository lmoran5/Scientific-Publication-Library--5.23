document.addEventListener("DOMContentLoaded", function() {
    history.pushState({}, "", "/scientific-publication-library-test");
    updateResultsCount();

    document.getElementById("sortOrder").addEventListener("change", sortTableByYear);
});

function sortTableByYear() {
    const table = document.getElementById("referencesTable");
    const tbody = table.getElementsByTagName("tbody")[0];
    const rows = Array.from(tbody.rows);
    const sortOrder = document.getElementById("sortOrder").value;
    const index = 8; // Assuming the year column is the 9th column (0-based index)

    rows.sort((rowA, rowB) => {
        const cellA = parseInt(rowA.cells[index].textContent) || 0;
        const cellB = parseInt(rowB.cells[index].textContent) || 0;
        return sortOrder === "asc" ? cellA - cellB : cellB - cellA;
    });

    // Re-attach sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

let filters = {
    journalNameSearch: '',
    articleTitleSearch: '',
    tagSearch: '',
    subSpecialty: '',
    productDropdown: '',
    authorSearch: ''
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
        const tdTag = tr[i].getElementsByTagName("td")[3];
        const tdSubSpecialty = tr[i].getElementsByTagName("td")[4];
        const tdProduct = tr[i].getElementsByTagName("td")[5];
        const tdAuthor = tr[i].getElementsByTagName("td")[6];
        const tdYear = tr[i].getElementsByTagName("td")[8]; // New column for Year

        const journalNameMatch = !filters.journalNameSearch || (tdJournalName && normalizeText(tdJournalName.textContent).includes(normalizeText(filters.journalNameSearch)));
        const articleTitleMatch = !filters.articleTitleSearch || (tdArticleTitle && normalizeText(tdArticleTitle.textContent).includes(normalizeText(filters.articleTitleSearch)));
        const tagMatch = !filters.tagSearch || (tdTag && normalizeText(tdTag.textContent).includes(normalizeText(filters.tagSearch)));
        const subSpecialtyMatch = !filters.subSpecialty || (tdSubSpecialty && normalizeText(tdSubSpecialty.textContent).includes(normalizeText(filters.subSpecialty)));
        const productMatch = !filters.productDropdown || (tdProduct && normalizeText(tdProduct.textContent).includes(normalizeText(filters.productDropdown)));
        const authorMatch = !filters.authorSearch || (tdAuthor && normalizeText(tdAuthor.textContent).includes(normalizeText(filters.authorSearch)));
        const yearMatch = !filters.yearSearch || (tdYear && normalizeText(tdYear.textContent).includes(normalizeText(filters.yearSearch))); // Added year match

        if (journalNameMatch && articleTitleMatch && tagMatch && subSpecialtyMatch && productMatch && authorMatch && yearMatch) {
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
    document.getElementById('tagSearch').value = '';
    document.getElementById('subSpecialty').selectedIndex = 0;
    document.getElementById('productDropdown').selectedIndex = 0;
    document.getElementById('authorSearch').value = '';
    document.getElementById('sortOrder').selectedIndex = 0;

    // Clear filter values
    filters = {
        journalNameSearch: '',
        articleTitleSearch: '',
        tagSearch: '',
        subSpecialty: '',
        productDropdown: '',
        authorSearch: ''
    };

    applyFilters();
}

// Add event listeners to trigger filtering
document.getElementById('journalNameSearch').addEventListener('input', () => searchByField('journalNameSearch', 0));
document.getElementById('articleTitleSearch').addEventListener('input', () => searchByField('articleTitleSearch', 1));
document.getElementById('tagSearch').addEventListener('input', () => searchByField('tagSearch', 3));
document.getElementById('subSpecialty').addEventListener('change', () => filterByDropdown('subSpecialty', 4));
document.getElementById('productDropdown').addEventListener('change', () => filterByDropdown('productDropdown', 5));
document.getElementById('authorSearch').addEventListener('input', () => searchByField('authorSearch', 6));



