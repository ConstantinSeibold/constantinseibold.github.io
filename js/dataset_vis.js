document.addEventListener('DOMContentLoaded', function () {
    const datasetContainer = document.getElementById('dataset-container');

    fetch('datasets.json')
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
        const datasetDiv = document.createElement('div');
        datasetDiv.classList.add('dataset');

        // Title and Dataset Icon (Clickable to Redirect to URL)
        const titleLink = document.createElement('h2');
        titleLink.textContent = dataset.title;
        titleLink.classList.add('title-link');
        titleLink.addEventListener('click', function () {
            redirectToURL(dataset.url);
        });

        const img = document.createElement('img');
        img.src = dataset.dataset_icon;
        img.alt = 'Dataset Preview';
        img.classList.add('dataset-icon');
        img.addEventListener('click', function () {
            redirectToURL(dataset.url);
        });

        // Publications
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('text-wrapper');

        const publicationsContainer = document.createElement('div');
        publicationsContainer.classList.add('publications');

        publicationsContainer.appendChild(document.createTextNode('Paper: ['));
        dataset.publications.forEach((publication, index) => {
            const publicationLink = document.createElement('a');
            publicationLink.textContent = index + 1;
            publicationLink.href = publication;
            publicationLink.target = "_blank"; // Open link in a new tab
            publicationsContainer.appendChild(publicationLink);

            if (index < dataset.publications.length - 1) {
                publicationsContainer.appendChild(document.createTextNode(', '));
            }
        });
        publicationsContainer.appendChild(document.createTextNode(']'));

        // Explore URL
        if (dataset.explore_url) {
            const exploreLink = document.createElement('a');
            exploreLink.textContent = '[Explore dataset]';
            exploreLink.href = dataset.explore_url;
            exploreLink.target = "_blank"; // Open link in a new tab
            publicationsContainer.appendChild(exploreLink);
        }

        // Short Description
        const shortDescription = document.createElement('p');
        shortDescription.textContent = dataset.short_description;

        // Append elements to datasetDiv

        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('title-wrapper');

        const hlineright = document.createElement('div');
        hlineright.classList.add('horizontal-line');

        const hlineleft = document.createElement('div');
        hlineleft.classList.add('horizontal-line');

        titleWrapper.appendChild(hlineleft);
        titleWrapper.appendChild(titleLink);
        titleWrapper.appendChild(hlineright);
        
        datasetDiv.appendChild(titleWrapper);
        datasetDiv.appendChild(img);
        textWrapper.appendChild(publicationsContainer);
        textWrapper.appendChild(shortDescription);
        datasetDiv.appendChild(textWrapper);

        return datasetDiv;
    }

    function redirectToURL(url) {
        window.open(url, '_blank'); // Open link in a new tab
    }
});
