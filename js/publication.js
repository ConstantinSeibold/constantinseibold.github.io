document.addEventListener('DOMContentLoaded', function () {
    const publicationsContainer = document.getElementById('publications-container');
    const tagFilter = $('#tag-filter');
    const yearFilter = $('#year-filter');
    const authorFilter = $('#author-filter');

    fetch('publications.json')
    .then(response => response.json())
    .then(data => {
        // Populate the tag, year, and author filter options dynamically
        populateTagFilter(data);
        populateYearFilter(data);
        populateAuthorFilter(data);
        
        const reversedPublications = data.publications.reverse();
        
        // Display all publications initially
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
    .catch(error => console.error('Error fetching publications:', error));

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
        publicationDiv.classList.add('publication');

        const img = document.createElement('img');
        img.src = publication.image;
        img.alt = 'Publication Preview';
        publicationDiv.appendChild(img);

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('publication-details');

        const title = document.createElement('h5');
        title.classList.add('publication-title');
        title.textContent = publication.title;
        detailsDiv.appendChild(title);

        const authors = document.createElement('p');
        authors.classList.add('authors');
        authors.textContent = publication.authors.join(', ');
        detailsDiv.appendChild(authors);

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details');
        
        if (publication.venue) {
            detailsContainer.appendChild(createDetailElement(publication.venue));
        }

        if (publication.date) {
            detailsContainer.appendChild(createDetailElement("  " + publication.date));
        }
        
        if (publication.award) {
            detailsContainer.appendChild(createDetailElement(publication.award));
        }

        const linksContainer = document.createElement('div');
        linksContainer.classList.add('links');
        
        if (publication.paperLink) {
            linksContainer.appendChild(createLinkElement('[Paper]', publication.paperLink));
        }
        
        if (publication.arxivLink) {
            linksContainer.appendChild(createLinkElement('[ArXiv]', publication.arxivLink));
        }
        
        if (publication.codeLink) {
            linksContainer.appendChild(createLinkElement('[Code]', publication.codeLink));
        }
        
        if (publication.dataLink) {
            linksContainer.appendChild(createLinkElement('[Data]', publication.dataLink));
        }
        
        if (detailsContainer.children.length > 0) {
            detailsDiv.appendChild(detailsContainer);
        }

        if (linksContainer.children.length > 0) {
            detailsDiv.appendChild(linksContainer);
        }

        if (publication.abstract) {
            const abstract = document.createElement('p');
            abstract.classList.add('abstract', 'collapsed');
            abstract.textContent = publication.abstract;
            detailsDiv.appendChild(abstract);

            // "Show more" and "Show less" buttons
            const showMoreButton = document.createElement('span');
            showMoreButton.textContent = 'Show more';
            showMoreButton.classList.add('show-more');
            showMoreButton.addEventListener('click', () => toggleAbstract(abstract));
            showMoreButton.addEventListener('click', () => toggleText(showMoreButton));
            detailsDiv.appendChild(showMoreButton);
        }

        publicationDiv.appendChild(detailsDiv);

        return publicationDiv;
    }

    function createLinkElement(label, link) {
        const linkElement = document.createElement('p');
        const linkAnchor = document.createElement('a');
        linkAnchor.href = link;
        linkAnchor.textContent = label;
        linkElement.appendChild(linkAnchor);
        return linkElement;
    }

    function createDetailElement(text) {
        const detail = document.createElement('p');
        detail.textContent = text;
        return detail;
    }

    function toggleAbstract(abstractElement) {
        abstractElement.classList.toggle('collapsed');
    }

    function toggleText(spanElement) {
        if (spanElement.textContent == "Show more") {
            spanElement.textContent = "Show less";
        } else {
            spanElement.textContent = "Show more";
        }
    }
});
