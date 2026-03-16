Här är den engelska versionen av din **`script.js`**. Jag har uppdaterat koden så att den matchar de nya engelska nycklarna i din `pigments.json` (till exempel `pigmentCode` istället för `pigmentKod`) och översatt alla meddelanden och kommentarer till engelska.

```javascript
// script.js
let pigmentsData = [];

// Load pigment data from the JSON file
async function loadPigments() {
    try {
        const response = await fetch('pigments.json');
        const data = await response.json();
        // Matching the "pigments" key from our English JSON
        pigmentsData = data.pigments; 
        console.log('Pigments loaded:', pigmentsData.length);
        console.log('First pigment:', pigmentsData); // Test
    } catch (error) {
        console.error('Could not load pigments:', error);
        document.getElementById('results').innerHTML = 
            '<p class="hint">❌ Could not load the pigment database. Please try again later.</p>';
    }
}

// Search function
function searchPigments() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        document.getElementById('results').innerHTML = 
            '<p class="hint">⬆️ Type a search term above ⬆️</p>';
        return;
    }
    
    const results = pigmentsData.filter(pigment => 
        pigment.pigmentCode.toLowerCase().includes(searchTerm) ||
        pigment.commonName.toLowerCase().includes(searchTerm)
    );
    
    displayResults(results);
}

// Apply filters
function applyFilters() {
    const colorFamily = document.getElementById('colorFamilyFilter').value;
    const lightfastness = document.getElementById('lightfastnessFilter').value;
    
    let filtered = pigmentsData;
    
    if (colorFamily !== 'all') {
        filtered = filtered.filter(p => p.colorFamily === colorFamily);
    }
    
    if (lightfastness !== 'all') {
        filtered = filtered.filter(p => p.lightfastness === lightfastness);
    }
    
    displayResults(filtered);
}

// Display results
function displayResults(pigments) {
    const resultsContainer = document.getElementById('results');
    
    if (pigments.length === 0) {
        resultsContainer.innerHTML = '<p class="hint">🔍 No pigments found. Try another search.</p>';
        return;
    }
    
    let html = '';
    pigments.forEach(p => {
        html += `
            <div class="pigment-card">
                <div class="pigment-color-bar" style="background-color: ${p.hexColor}"></div>
                <div class="pigment-content">
                    <div class="pigment-header">
                        <span class="pigment-kod">${p.pigmentCode}</span>
                        <span class="pigment-namn">${p.commonName}</span>
                    </div>
                    
                    <div class="pigment-details">
                        <div class="detail-item">
                            <span class="detail-label">Lightfastness:</span>
                            <span class="detail-value">${p.lightfastness} - ${p.lightfastnessText}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Transparency:</span>
                            <span class="detail-value">${p.transparency}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Color Family:</span>
                            <span class="detail-value">${p.colorFamily}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

// Load pigments when the page loads
loadPigments();

// Listen for the Enter key
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchPigments();
    }
});
```

