document.addEventListener('DOMContentLoaded', function () {
    const publicationsContainer = document.getElementById('publications-container');
    const tagFilter = $('#tag-filter');
    const yearFilter = $('#year-filter');
    const authorFilter = $('#author-filter');

    fetch('content/publications.json')
    .then(response => {
        if (!response.ok) throw new Error('Failed to load');
        return response.json();
    })
    .then(data => {
        // Populate the tag, year, and author filter options dynamically
        populateTagFilter(data);
        populateYearFilter(data);
        populateAuthorFilter(data);
        
        const reversedPublications = data.publications.reverse();

        // Clear loading spinner and display all publications
        publicationsContainer.innerHTML = '';
        reversedPublications.forEach(publication => {
            const publicationElement = createPublicationElement(publication);
            publicationsContainer.appendChild(publicationElement);
        });

        // Attach event listeners to filter publications when tag, year, or author changes
        tagFilter.on('change', function () {
            filterPublications(data);
        });
        yearFilter.on('change', function () {
            filterPublications(data);
        });
        authorFilter.on('change', function () {
            filterPublications(data);
        });
    })
    .catch(error => {
        console.error('Error fetching publications:', error);
        publicationsContainer.innerHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading publications. Please try again later.</p></div>';
    });

    function populateTagFilter(data) {
        const allTags = new Set();
        data.publications.forEach(publication => {
            publication.tags.forEach(tag => allTags.add(tag));
        });
        
        // Add tag options dynamically
        allTags.forEach(tag => {
            tagFilter.append(new Option(tag, tag));
        });

        // Initialize Select2 after updating options
        tagFilter.select2();

        // Set default selection to "Show All"
        tagFilter.val('all').trigger('change');
    }

    function populateAuthorFilter(data) {
        const allAuthors = new Set();
        data.publications.forEach(publication => {
            publication.authors.forEach(author => allAuthors.add(author));
        });
        
        // Add author options dynamically
        allAuthors.forEach(author => {
            authorFilter.append(new Option(author, author));
        });

        // Initialize Select2 after updating options
        authorFilter.select2();

        // Set default selection to "Show All"
        authorFilter.val('all').trigger('change');
    }

    function populateYearFilter(data) {
        const allYears = new Set();
        data.publications.forEach(publication => {
            allYears.add(publication.date); // Add the date (year) directly
        });
        
        // Add year options dynamically
        allYears.forEach(year => {
            yearFilter.append(new Option(year, year));
        });

        // Initialize Select2 after updating options
        yearFilter.select2();

        // Set default selection to "Show All"
        yearFilter.val('all').trigger('change');
    }

    function filterPublications(data) {
        const selectedTags = tagFilter.val() || [];
        const selectedYears = yearFilter.val() || [];
        const selectedAuthors = authorFilter.val() || [];

        // Clear existing publications
        publicationsContainer.innerHTML = '';

        // Filter based on selected tags, years, and authors
        const filteredPublications = data.publications.filter(publication => {
            const matchesTags = (selectedTags.length === 0 || selectedTags.includes('all')) || 
                publication.tags.some(tag => selectedTags.includes(tag));

            const matchesYear = (selectedYears.length === 0 || selectedYears.includes('all')) || 
                selectedYears.includes(publication.date);

            const matchesAuthor = (selectedAuthors.length === 0 || selectedAuthors.includes('all')) || 
                publication.authors.some(author => selectedAuthors.includes(author));

            return matchesTags && matchesYear && matchesAuthor;
        });

        // Display filtered publications or all publications if no filter is applied
        filteredPublications.forEach(publication => {
            const publicationElement = createPublicationElement(publication);
            publicationsContainer.appendChild(publicationElement);
        });
    }

    function createPublicationElement(publication) {
        const publicationDiv = document.createElement('div');
        publicationDiv.classList.add('publication-item');
        publicationDiv.classList.add('publication-item--flex');

        // Preview image (if available)
        if (publication.image) {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('publication-item__image');
            
            const image = document.createElement('img');
            image.src = publication.image;
            image.alt = publication.title;
            
            imageContainer.appendChild(image);
            publicationDiv.appendChild(imageContainer);
        }

        // Content container
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('publication-item__content');

        // Title
        const title = document.createElement('h3');
        title.classList.add('publication-title');
        title.textContent = publication.title;
        contentDiv.appendChild(title);

        // Authors with highlighting for Constantin Seibold
        const authors = document.createElement('div');
        authors.classList.add('publication-authors');
        const authorText = publication.authors.map(author => 
            author.includes('Constantin Seibold') ? `<strong>${author}</strong>` : author
        ).join(', ');
        authors.innerHTML = authorText;
        contentDiv.appendChild(authors);

        // Venue, year, and award in same line
        const metaContainer = document.createElement('div');
        metaContainer.classList.add('publication-meta');
        
        if (publication.venue) {
            const venue = document.createElement('span');
            venue.classList.add('publication-venue');
            venue.textContent = publication.venue;
            metaContainer.appendChild(venue);
        }

        if (publication.date) {
            const year = document.createElement('span');
            year.classList.add('publication-year');
            year.textContent = publication.date;
            metaContainer.appendChild(year);
        }
        
        if (publication.award) {
            const award = document.createElement('span');
            award.classList.add('publication-award');
            award.textContent = `🏆 ${publication.award}`;
            metaContainer.appendChild(award);
        }

        contentDiv.appendChild(metaContainer);

        // Links
        const linksContainer = document.createElement('div');
        linksContainer.classList.add('publication-links');
        
        if (publication.paperLink) {
            linksContainer.appendChild(createModernLinkElement('Paper', publication.paperLink));
        }
        
        if (publication.arxivLink) {
            linksContainer.appendChild(createModernLinkElement('ArXiv', publication.arxivLink));
        }
        
        if (publication.codeLink) {
            linksContainer.appendChild(createModernLinkElement('Code', publication.codeLink));
        }
        
        if (publication.dataLink) {
            linksContainer.appendChild(createModernLinkElement('Data', publication.dataLink));
        }

        if (linksContainer.children.length > 0) {
            contentDiv.appendChild(linksContainer);
        }

        // Abstract (expandable)
        if (publication.abstract) {
            const abstract = document.createElement('div');
            abstract.style.marginTop = 'var(--space-md)';
            abstract.innerHTML = `
                <div class="abstract-text">
                    ${publication.abstract}
                </div>
                <button class="btn btn-secondary abstract-toggle" onclick="toggleAbstract(this)">Show Abstract</button>
            `;
            contentDiv.appendChild(abstract);
        }

        // Add content container to publication div
        publicationDiv.appendChild(contentDiv);

        return publicationDiv;
    }

    function createModernLinkElement(label, link) {
        const linkElement = document.createElement('a');
        linkElement.classList.add('publication-link');
        linkElement.href = link;
        linkElement.textContent = label;
        linkElement.target = '_blank';
        return linkElement;
    }

    function createDetailElement(text) {
        const detail = document.createElement('p');
        detail.textContent = text;
        return detail;
    }

    // Add global toggle function for abstracts
    window.toggleAbstract = function(button) {
        const abstractText = button.parentElement.querySelector('.abstract-text');
        const isExpanded = abstractText.classList.toggle('abstract-text--expanded');
        button.textContent = isExpanded ? 'Hide Abstract' : 'Show Abstract';
    }
});
