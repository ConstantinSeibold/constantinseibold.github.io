document.addEventListener('DOMContentLoaded', function () {
    const softwareContainer = document.getElementById('software-container');

    fetch('content/software.json')
    .then(response => {
        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        const softwares = data.software; // Corrected from 'softwares' to 'software'

        softwares.forEach(software => {
            const softwareElement = createSoftwareElement(software); // Corrected function name
            softwareContainer.appendChild(softwareElement);            
        });
        
    })
    .catch(error => console.error("Error fetching softwares: ", error));

    function createSoftwareElement(software) {
        const softwareCard = document.createElement('div');
        softwareCard.classList.add('card');
        
        // Software Image with overlay
        const imageContainer = document.createElement('div');
        imageContainer.style.cssText = `
            width: 100%;
            height: 200px;
            background-image: url('${software.software_icon}');
            background-size: cover;
            background-position: center;
            border-radius: var(--radius-md);
            margin-bottom: var(--space-lg);
            position: relative;
            overflow: hidden;
            cursor: pointer;
        `;
        
        // Add overlay for hover effect
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
        overlayText.innerHTML = '<i class="fab fa-github" style="margin-right: 0.5rem;"></i>View on GitHub';
        overlay.appendChild(overlayText);
        imageContainer.appendChild(overlay);
        
        // Click handler for image
        imageContainer.addEventListener('click', () => {
            window.open(software.url, '_blank');
        });
        
        // Hover effects
        softwareCard.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });
        
        softwareCard.addEventListener('mouseleave', () => {
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
        title.textContent = software.title;

        // Description
        const description = document.createElement('p');
        description.style.cssText = `
            color: var(--color-text-secondary);
            margin-bottom: var(--space-lg);
            line-height: 1.5;
            font-size: 0.95rem;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
        `;
        description.textContent = software.short_description;

        // Links Container
        const linksContainer = document.createElement('div');
        linksContainer.style.cssText = `
            display: flex;
            gap: var(--space-sm);
            flex-wrap: wrap;
            margin-top: auto;
        `;

        // GitHub Link (main button)
        if (software.url) {
            const githubLink = document.createElement('a');
            githubLink.classList.add('btn', 'btn-primary');
            githubLink.href = software.url;
            githubLink.target = '_blank';
            githubLink.style.cssText = `
                font-size: 0.875rem;
                padding: 0.5rem 1rem;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
            `;
            githubLink.innerHTML = '<i class="fab fa-github" style="margin-right: 0.5rem;"></i>GitHub';
            
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
            exploreLink.classList.add('btn', 'btn-secondary');
            exploreLink.href = software.explore_url;
            exploreLink.target = '_blank';
            exploreLink.style.cssText = `
                font-size: 0.875rem;
                padding: 0.5rem 1rem;
                text-decoration: none;
            `;
            exploreLink.innerHTML = '<i class="fas fa-external-link-alt" style="margin-right: 0.5rem;"></i>Explore';
            linksContainer.appendChild(exploreLink);
        }

        // Assemble the card
        softwareCard.appendChild(imageContainer);
        softwareCard.appendChild(title);
        softwareCard.appendChild(description);
        softwareCard.appendChild(linksContainer);

        return softwareCard;
    }

    function redirectToURL(url) {
        window.open(url, '_blank'); // Open link in a new tab
    }
});
