document.addEventListener('DOMContentLoaded', function () {
    const datasetContainer = document.getElementById('dataset-container');

    fetch('content/datasets.json')
    .then(response => response.json())
    .then(data => {
        const datasets = data.datasets;

        datasets.forEach(dataset => {
            const datasetElement = createDatasetElement(dataset);
            datasetContainer.appendChild(datasetElement);            
        });
        
    })
    .catch(error => console.error("Error fetching datasets: ", error));

    function createDatasetElement(dataset) {
        const datasetCard = document.createElement('div');
        datasetCard.classList.add('card');
        datasetCard.style.cssText = `
            cursor: pointer;
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: 400px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        `;
        
        // Make entire card clickable
        datasetCard.addEventListener('click', function (e) {
            if (!e.target.closest('a')) { // Don't trigger if clicking on a link
                redirectToURL(dataset.url);
            }
        });

        // Dataset Image
        const imageContainer = document.createElement('div');
        imageContainer.style.cssText = `
            width: 100%;
            height: 180px;
            background-image: url('${dataset.dataset_icon}');
            background-size: cover;
            background-position: center;
            border-radius: var(--radius-md);
            margin-bottom: var(--space-lg);
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
        `;
        
        // Add overlay for better text readability
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.8), rgba(14, 165, 233, 0.8));
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const overlayText = document.createElement('div');
        overlayText.style.cssText = `
            color: white;
            font-size: 1.125rem;
            font-weight: 600;
            text-align: center;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        `;
        overlayText.textContent = 'View Dataset';
        overlay.appendChild(overlayText);
        
        imageContainer.appendChild(overlay);
        
        // Hover effect
        datasetCard.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });
        
        datasetCard.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });

        // Title
        const title = document.createElement('h3');
        title.style.cssText = `
            color: var(--color-primary);
            margin-bottom: var(--space-md);
            font-size: 1.25rem;
            font-weight: 600;
        `;
        title.textContent = dataset.title;

        // Content container
        const contentContainer = document.createElement('div');
        contentContainer.style.cssText = `
            flex: 1;
            display: flex;
            flex-direction: column;
        `;

        // Description
        const description = document.createElement('p');
        description.style.cssText = `
            color: var(--color-text-secondary);
            margin-bottom: var(--space-lg);
            line-height: 1.5;
            font-size: 0.95rem;
            flex: 1;
        `;
        description.textContent = dataset.short_description;

        // Links Container
        const linksContainer = document.createElement('div');
        linksContainer.style.cssText = `
            display: flex;
            gap: var(--space-sm);
            flex-wrap: wrap;
        `;

        // Publication Links
        if (dataset.publications && dataset.publications.length > 0) {
            dataset.publications.forEach((publication, index) => {
                const pubLink = document.createElement('a');
                pubLink.classList.add('publication-link');
                pubLink.href = publication;
                pubLink.target = '_blank';
                pubLink.textContent = `Paper ${index + 1}`;
                pubLink.style.fontSize = '0.875rem';
                linksContainer.appendChild(pubLink);
            });
        }

        // Explore Link
        if (dataset.explore_url) {
            const exploreLink = document.createElement('a');
            exploreLink.classList.add('btn', 'btn-primary');
            exploreLink.href = dataset.explore_url;
            exploreLink.target = '_blank';
            exploreLink.textContent = 'Explore Dataset';
            exploreLink.style.cssText = `
                font-size: 0.875rem;
                padding: 0.5rem 1rem;
                margin-top: var(--space-md);
                display: inline-block;
                text-decoration: none;
                align-self: flex-start;
            `;
            
            // Prevent card click when clicking explore button
            exploreLink.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            contentContainer.appendChild(exploreLink);
        }

        // Assemble the content container
        contentContainer.appendChild(title);
        contentContainer.appendChild(description);
        if (linksContainer.children.length > 0) {
            contentContainer.appendChild(linksContainer);
        }
        
        // Assemble the card
        datasetCard.appendChild(imageContainer);
        datasetCard.appendChild(contentContainer);

        return datasetCard;
    }

    function redirectToURL(url) {
        window.open(url, '_blank'); // Open link in a new tab
    }
});
