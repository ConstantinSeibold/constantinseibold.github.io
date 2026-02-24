document.addEventListener('DOMContentLoaded', function () {
    const softwareContainer = document.getElementById('software-container');

    fetch('content/software.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        const softwares = data.software;

        softwareContainer.innerHTML = '';

        if (!softwares || softwares.length === 0) {
            softwareContainer.innerHTML = '<div class="empty-state"><div class="empty-state__icon"><i class="fas fa-code" aria-hidden="true"></i></div><p>No software available.</p></div>';
            return;
        }

        softwares.forEach(software => {
            const softwareElement = createSoftwareElement(software);
            softwareContainer.appendChild(softwareElement);
        });

    })
    .catch(error => {
        console.error("Error fetching softwares: ", error);
        softwareContainer.innerHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading software. Please try again later.</p></div>';
    });

    function createSoftwareElement(software) {
        const softwareCard = document.createElement('div');
        softwareCard.classList.add('card', 'card--media');

        // Software Image with overlay
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('card__image');
        imageContainer.style.backgroundImage = `url('${software.software_icon}')`;
        imageContainer.style.cursor = 'pointer';

        // Add overlay for hover effect
        const overlay = document.createElement('div');
        overlay.classList.add('card__overlay');

        const overlayText = document.createElement('div');
        overlayText.classList.add('card__overlay-text');
        overlayText.innerHTML = '<i class="fab fa-github" aria-hidden="true" style="margin-right: 0.5rem;"></i>View on GitHub';
        overlay.appendChild(overlayText);
        imageContainer.appendChild(overlay);

        // Click handler for image
        imageContainer.addEventListener('click', () => {
            window.open(software.url, '_blank');
        });

        // Content container
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('card__body');

        // Title
        const title = document.createElement('h3');
        title.classList.add('card__title');
        title.textContent = software.title;

        // Description
        const description = document.createElement('p');
        description.classList.add('card__description');
        description.textContent = software.short_description;

        // Links Container
        const linksContainer = document.createElement('div');
        linksContainer.classList.add('card__links');

        // GitHub Link (main button)
        if (software.url) {
            const githubLink = document.createElement('a');
            githubLink.classList.add('btn', 'btn-primary', 'btn--sm');
            githubLink.href = software.url;
            githubLink.target = '_blank';
            githubLink.innerHTML = '<i class="fab fa-github" aria-hidden="true" style="margin-right: 0.5rem;"></i>GitHub';

            linksContainer.appendChild(githubLink);
        }

        // Publication Links
        if (software.publications && software.publications.length > 0) {
            software.publications.forEach((publication, index) => {
                const pubLink = document.createElement('a');
                pubLink.classList.add('publication-link');
                pubLink.href = publication;
                pubLink.target = '_blank';
                pubLink.textContent = `Paper ${index + 1}`;
                pubLink.style.fontSize = '0.875rem';
                linksContainer.appendChild(pubLink);
            });
        }

        // Explore Link (if available)
        if (software.explore_url) {
            const exploreLink = document.createElement('a');
            exploreLink.classList.add('btn', 'btn-secondary', 'btn--sm');
            exploreLink.href = software.explore_url;
            exploreLink.target = '_blank';
            exploreLink.innerHTML = '<i class="fas fa-external-link-alt" aria-hidden="true" style="margin-right: 0.5rem;"></i>Explore';
            linksContainer.appendChild(exploreLink);
        }

        // Assemble the content container
        contentContainer.appendChild(title);
        contentContainer.appendChild(description);
        contentContainer.appendChild(linksContainer);

        // Assemble the card
        softwareCard.appendChild(imageContainer);
        softwareCard.appendChild(contentContainer);

        return softwareCard;
    }

    function redirectToURL(url) {
        window.open(url, '_blank');
    }
});
