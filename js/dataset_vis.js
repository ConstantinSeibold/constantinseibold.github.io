document.addEventListener('DOMContentLoaded', function () {
    const datasetContainer = document.getElementById('dataset-container');

    fetch('content/datasets.json')
    .then(response => {
        if (!response.ok) throw new Error('Failed to load');
        return response.json();
    })
    .then(data => {
        const datasets = data.datasets;

        datasetContainer.innerHTML = '';

        if (!datasets || datasets.length === 0) {
            datasetContainer.innerHTML = '<div class="empty-state"><div class="empty-state__icon"><i class="fas fa-database" aria-hidden="true"></i></div><p>No datasets available.</p></div>';
            return;
        }

        datasets.forEach(dataset => {
            const datasetElement = createDatasetElement(dataset);
            datasetContainer.appendChild(datasetElement);
        });

    })
    .catch(error => {
        console.error("Error fetching datasets: ", error);
        datasetContainer.innerHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading datasets. Please try again later.</p></div>';
    });

    function createDatasetElement(dataset) {
        const datasetCard = document.createElement('div');
        datasetCard.classList.add('card', 'card--media');

        // Make entire card clickable
        datasetCard.addEventListener('click', function (e) {
            if (!e.target.closest('a')) {
                redirectToURL(dataset.url);
            }
        });

        // Dataset Image
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('card__image');
        imageContainer.style.backgroundImage = `url('${dataset.dataset_icon}')`;

        // Add overlay
        const overlay = document.createElement('div');
        overlay.classList.add('card__overlay');

        const overlayText = document.createElement('div');
        overlayText.classList.add('card__overlay-text');
        overlayText.textContent = 'View Dataset';
        overlay.appendChild(overlayText);

        imageContainer.appendChild(overlay);

        // Title
        const title = document.createElement('h3');
        title.classList.add('card__title');
        title.textContent = dataset.title;

        // Content container
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('card__body');

        // Description
        const description = document.createElement('p');
        description.classList.add('card__description');
        description.textContent = dataset.short_description;

        // Links Container
        const linksContainer = document.createElement('div');
        linksContainer.classList.add('card__links');

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
            exploreLink.classList.add('btn', 'btn-primary', 'btn--sm');
            exploreLink.href = dataset.explore_url;
            exploreLink.target = '_blank';
            exploreLink.textContent = 'Explore Dataset';
            exploreLink.style.marginTop = 'var(--space-md)';
            exploreLink.style.alignSelf = 'flex-start';

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
        window.open(url, '_blank');
    }
});
