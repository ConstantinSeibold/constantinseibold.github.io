document.addEventListener('DOMContentLoaded', function () {
    fetch('content/index.json')
        .then(response => response.json())
        .then(data => {
            // Update hero section
            if (data.hero) {
                const heroTitle = document.getElementById('hero-title');
                const heroSubtitle = document.getElementById('hero-subtitle');
                const heroDescription = document.getElementById('hero-description');
                const heroCtaText = document.getElementById('hero-cta-text');
                const heroCtaLink = document.getElementById('hero-cta-link');

                if (heroTitle) heroTitle.textContent = data.hero.title;
                if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;
                if (heroDescription) heroDescription.textContent = data.hero.description;
                if (heroCtaText) heroCtaText.textContent = data.hero.cta.text;
                if (heroCtaLink) heroCtaLink.href = data.hero.cta.link;
            }

            // Populate news section
            if (data.news) {
                populateNews(data.news);
            }

            // Populate navigation slides
            if (data.navigation_slides) {
                populateNavigationSlides(data.navigation_slides);
            }

            // Populate featured work
            if (data.featured_work) {
                populateFeaturedWork(data.featured_work);
            }
        })
        .catch(error => {
            console.error('Error loading index content:', error);
        });

    function populateNews(newsData) {
        const container = document.getElementById('news-container');
        if (!container) return;

        container.innerHTML = ''; // Clear existing content

        newsData.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.style.cssText = `
                padding: 1rem;
                background: var(--color-background-alt);
                border-radius: var(--radius-md);
                border-left: 3px solid var(--color-primary);
                margin-bottom: 1rem;
            `;

            let newsHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <div style="font-weight: 600; color: var(--color-text-primary);">${item.title}</div>
                    <div style="color: var(--color-text-muted); font-size: 0.875rem; white-space: nowrap; margin-left: 1rem;">${formatDate(item.date)}</div>
                </div>
                <div style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5;">${item.description}</div>
            `;

            if (item.link) {
                newsHTML += `<a href="${item.link}" target="_blank" class="publication-link" style="margin-top: 0.5rem; display: inline-block;">Read More</a>`;
            }

            if (item.type) {
                const typeColor = getTypeColor(item.type);
                newsHTML = `
                    <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: ${typeColor}; margin-top: 0.5rem; flex-shrink: 0;"></div>
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

        container.innerHTML = ''; // Clear existing content

        slidesData.forEach(slide => {
            const slideElement = document.createElement('a');
            slideElement.href = slide.link;
            slideElement.className = 'nav-slide-card';
            slideElement.style.cssText = `
                display: block;
                text-decoration: none;
                background: linear-gradient(135deg, rgba(37, 99, 235, 0.7), rgba(14, 165, 233, 0.6)), url('${slide.background_image || 'assets/img/backgrounds/default.jpg'}');
                background-size: cover;
                background-position: center;
                border-radius: var(--radius-lg);
                padding: 2rem;
                color: white;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            `;

            slideElement.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 0.75rem;">
                    <i class="${slide.icon}" style="font-size: 1.5rem; margin-right: 0.75rem;"></i>
                    <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600;">${slide.title}</h3>
                </div>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.5; opacity: 0.9;">${slide.description}</p>
            `;

            // Add hover effect
            slideElement.addEventListener('mouseenter', () => {
                slideElement.style.transform = 'translateY(-4px)';
                slideElement.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.2)';
            });

            slideElement.addEventListener('mouseleave', () => {
                slideElement.style.transform = 'translateY(0)';
                slideElement.style.boxShadow = 'none';
            });

            container.appendChild(slideElement);
        });
    }

    function populateFeaturedWork(workData) {
        const container = document.getElementById('featured-work');
        if (!container) return;

        container.innerHTML = ''; // Clear existing content

        workData.forEach(work => {
            const workCard = document.createElement('div');
            workCard.className = 'card';
            workCard.style.cssText = `
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            `;

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
                    `<span style="background: var(--color-background-alt); color: var(--color-text-secondary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem;">${tag}</span>`
                ).join(' ');
                tagsHTML = `<div style="margin-top: 1rem;">${tagElements}</div>`;
            }

            workCard.innerHTML = `
                ${work.image ? `
                    <div style="width: 100%; height: 200px; background-image: url('${work.image}'); background-size: cover; background-position: center; border-radius: var(--radius-md); margin-bottom: 1rem;"></div>
                ` : ''}
                <h3 style="color: var(--color-primary); margin-bottom: 0.75rem; font-size: 1.125rem; font-weight: 600;">${work.title}</h3>
                <p style="color: var(--color-text-secondary); line-height: 1.5; font-size: 0.95rem; margin-bottom: 1rem;">${work.description}</p>
                ${tagsHTML}
                ${linksHTML}
            `;

            // Add hover effect
            workCard.addEventListener('mouseenter', () => {
                workCard.style.transform = 'translateY(-2px)';
                workCard.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            });

            workCard.addEventListener('mouseleave', () => {
                workCard.style.transform = 'translateY(0)';
                workCard.style.boxShadow = 'var(--shadow-card)';
            });

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