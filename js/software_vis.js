document.addEventListener('DOMContentLoaded', function () {
    const softwareContainer = document.getElementById('software-container');

    fetch('software.json')
    .then(response => response.json())
    .then(data => {
        const softwares = data.softwares;

        softwares.forEach(software => {
            const softwareElement = createsoftwareElement(software);
            softwareContainer.appendChild(softwareElement);            
        });
        
    })
    .catch(error => console.error("Error fetching softwares: ", error));

    function createsoftwareElement(software) {
        const softwareDiv = document.createElement('div');
        softwareDiv.classList.add('software');

        // Title and software Icon (Clickable to Redirect to URL)
        const titleLink = document.createElement('h2');
        titleLink.textContent = software.title;
        titleLink.classList.add('title-link');
        titleLink.addEventListener('click', function () {
            redirectToURL(software.url);
        });

        const img = document.createElement('img');
        img.src = software.software_icon;
        img.alt = 'Software Preview';
        img.classList.add('software-icon');
        img.addEventListener('click', function () {
            redirectToURL(software.url);
        });

        // Publications
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('text-wrapper');

        const publicationsContainer = document.createElement('div');
        publicationsContainer.classList.add('publications');

        publicationsContainer.appendChild(document.createTextNode('Paper: ['));
        software.publications.forEach((publication, index) => {
            const publicationLink = document.createElement('a');
            publicationLink.textContent = index + 1;
            publicationLink.href = publication;
            publicationLink.target = "_blank"; // Open link in a new tab
            publicationsContainer.appendChild(publicationLink);

            if (index < software.publications.length - 1) {
                publicationsContainer.appendChild(document.createTextNode(', '));
            }
        });
        publicationsContainer.appendChild(document.createTextNode(']'));

        // Explore URL
        if (software.explore_url) {
            const exploreLink = document.createElement('a');
            exploreLink.textContent = '[Explore software]';
            exploreLink.href = software.explore_url;
            exploreLink.target = "_blank"; // Open link in a new tab
            publicationsContainer.appendChild(exploreLink);
        }

        // Short Description
        const shortDescription = document.createElement('p');
        shortDescription.textContent = software.short_description;

        // Append elements to softwareDiv

        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('title-wrapper');

        const hlineright = document.createElement('div');
        hlineright.classList.add('horizontal-line');

        const hlineleft = document.createElement('div');
        hlineleft.classList.add('horizontal-line');

        titleWrapper.appendChild(hlineleft);
        titleWrapper.appendChild(titleLink);
        titleWrapper.appendChild(hlineright);
        
        softwareDiv.appendChild(titleWrapper);
        softwareDiv.appendChild(img);
        textWrapper.appendChild(publicationsContainer);
        textWrapper.appendChild(shortDescription);
        softwareDiv.appendChild(textWrapper);

        return softwareDiv;
    }

    function redirectToURL(url) {
        window.open(url, '_blank'); // Open link in a new tab
    }
});
