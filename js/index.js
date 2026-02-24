document.addEventListener('DOMContentLoaded', function () {
    fetch('content/index.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load');
            return response.json();
        })
        .then(data => {
            if (data.hero) {
                const heroBanner = document.getElementById('hero-banner');
                const heroTitle = document.getElementById('hero-title');
                const heroSubtitle = document.getElementById('hero-subtitle');
                const heroDescription = document.getElementById('hero-description');
                const heroCtaText = document.getElementById('hero-cta-text');
                const heroCtaLink = document.getElementById('hero-cta-link');

                if (heroBanner && data.hero.background_image) {
                    heroBanner.style.backgroundImage = `url('${data.hero.background_image}')`;
                }
                if (heroTitle) heroTitle.textContent = data.hero.title;
                if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;
                if (heroDescription) heroDescription.textContent = data.hero.description;
                if (heroCtaText) heroCtaText.textContent = data.hero.cta.text;
                if (heroCtaLink) heroCtaLink.href = data.hero.cta.link;
            }

            if (data.news) {
                populateNews(data.news);
            }

            if (data.navigation_slides) {
                populateNavigationSlides(data.navigation_slides);
            }

            if (data.featured_work) {
                populateFeaturedWork(data.featured_work);
            }
        })
        .catch(error => {
            console.error('Error loading index content:', error);
            const errorHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading content. Please try again later.</p></div>';
            ['news-container', 'navigation-slides', 'featured-work'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = errorHTML;
            });
        });

    function populateNews(newsData) {
        const container = document.getElementById('news-container');
        if (!container) return;

        container.innerHTML = '';

        newsData.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');

            let newsHTML = `
                <div class="news-item__header">
                    <div class="news-item__title">${item.title}</div>
                    <div class="news-item__date">${formatDate(item.date)}</div>
                </div>
                <div class="news-item__body">${item.description}</div>
            `;

            if (item.link) {
                newsHTML += `<a href="${item.link}" target="_blank" class="publication-link" style="margin-top: 0.5rem; display: inline-block;">Read More</a>`;
            }

            if (item.type) {
                const typeColor = getTypeColor(item.type);
                newsHTML = `
                    <div class="news-item__indicator">
                        <div class="news-item__dot" style="background: ${typeColor};"></div>
                        <div style="flex: 1;">${newsHTML}</div>
                    </div>
                `;
            }

            newsItem.innerHTML = newsHTML;
            container.appendChild(newsItem);
        });
    }

    function populateNavigationSlides(slidesData) {
        const container = document.getElementById('navigation-slides');
        if (!container) return;

        container.innerHTML = '';

        slidesData.forEach(slide => {
            const slideElement = document.createElement('a');
            slideElement.href = slide.link;
            slideElement.className = 'nav-slide-card';
            slideElement.style.backgroundImage = `linear-gradient(135deg, rgba(37, 99, 235, 0.7), rgba(14, 165, 233, 0.6)), url('${slide.background_image || 'assets/img/backgrounds/default.jpg'}')`;

            slideElement.innerHTML = `
                <div class="nav-slide-card__header">
                    <i class="${slide.icon} nav-slide-card__icon" aria-hidden="true"></i>
                    <h3 class="nav-slide-card__title">${slide.title}</h3>
                </div>
                <p class="nav-slide-card__description">${slide.description}</p>
            `;

            container.appendChild(slideElement);
        });
    }

    function populateFeaturedWork(workData) {
        const container = document.getElementById('featured-work');
        if (!container) return;

        container.innerHTML = '';

        workData.forEach(work => {
            const workCard = document.createElement('div');
            workCard.className = 'card';

            let linksHTML = '';
            if (work.links) {
                const links = [];
                if (work.links.paper) links.push(`<a href="${work.links.paper}" target="_blank" class="publication-link">Paper</a>`);
                if (work.links.code) links.push(`<a href="${work.links.code}" target="_blank" class="publication-link">Code</a>`);
                if (work.links.demo) links.push(`<a href="${work.links.demo}" target="_blank" class="publication-link">Demo</a>`);
                if (work.links.homepage) links.push(`<a href="${work.links.homepage}" target="_blank" class="publication-link">Homepage</a>`);
                linksHTML = links.length > 0 ? `<div style="margin-top: 1rem;">${links.join(' ')}</div>` : '';
            }

            let tagsHTML = '';
            if (work.tags && work.tags.length > 0) {
                const tagElements = work.tags.map(tag =>
                    `<span class="badge-tag">${tag}</span>`
                ).join(' ');
                tagsHTML = `<div style="margin-top: 1rem;">${tagElements}</div>`;
            }

            workCard.innerHTML = `
                ${work.image ? `<div class="card__featured-image" style="background-image: url('${work.image}');"></div>` : ''}
                <h3 class="card__title" style="font-size: 1.125rem;">${work.title}</h3>
                <p class="card__description" style="margin-bottom: 1rem;">${work.description}</p>
                ${tagsHTML}
                ${linksHTML}
            `;

            container.appendChild(workCard);
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function getTypeColor(type) {
        const colors = {
            'news': '#2563eb',
            'publication': '#059669',
            'award': '#fbbf24',
            'presentation': '#8b5cf6'
        };
        return colors[type] || '#64748b';
    }
});
