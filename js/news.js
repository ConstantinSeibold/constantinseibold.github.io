document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.getElementById('news-container');

    if (!newsContainer) return;

    fetch('content/news.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load');
            return response.json();
        })
        .then(data => {
            const news = data.news;

            news.sort((a, b) => new Date(b.date) - new Date(a.date));

            newsContainer.innerHTML = '';

            if (!news || news.length === 0) {
                newsContainer.innerHTML = '<div class="empty-state"><div class="empty-state__icon"><i class="fas fa-newspaper" aria-hidden="true"></i></div><p>No news available.</p></div>';
                return;
            }

            const recentNews = news.slice(0, 4);

            recentNews.forEach(item => {
                const newsCard = createNewsCard(item);
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => {
            console.error('Error loading news:', error);
            newsContainer.innerHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading news. Please try again later.</p></div>';
        });

    function createNewsCard(news) {
        const newsCard = document.createElement('div');
        newsCard.className = 'card';
        newsCard.style.cursor = 'pointer';

        if (news.link) {
            newsCard.addEventListener('click', function(e) {
                if (!e.target.closest('a')) {
                    window.open(news.link, '_blank');
                }
            });
        }

        const getTypeIcon = (type) => {
            switch (type) {
                case 'conference': return 'fas fa-microphone';
                case 'position': return 'fas fa-briefcase';
                case 'achievement': return 'fas fa-trophy';
                case 'award': return 'fas fa-medal';
                case 'publication': return 'fas fa-file-alt';
                default: return 'fas fa-info-circle';
            }
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        newsCard.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <div class="news-card__header">
                    <div class="news-card__type">
                        <i class="${getTypeIcon(news.type)} news-card__type-icon" aria-hidden="true"></i>
                        <span class="badge-tag" style="text-transform: uppercase;">
                            ${news.type}
                        </span>
                    </div>
                    <div class="news-card__date">
                        ${formatDate(news.date)}
                    </div>
                </div>

                <h4 class="news-card__title">
                    ${news.title}
                </h4>

                <p class="news-card__description">
                    ${news.description}
                </p>

                ${news.tags ? `
                <div class="news-card__tags">
                    ${news.tags.map(tag =>
                        `<span class="badge-tag badge-tag--primary">#${tag}</span>`
                    ).join('')}
                </div>
                ` : ''}

                ${news.link ? `
                <div style="margin-top: auto;">
                    <a href="${news.link}" target="_blank" class="btn btn-secondary btn--sm" onclick="event.stopPropagation();">
                        <i class="fas fa-external-link-alt" aria-hidden="true" style="margin-right: 0.25rem;"></i>
                        Learn More
                    </a>
                </div>
                ` : ''}
            </div>
        `;

        return newsCard;
    }
});
