document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.getElementById('news-container');

    if (!newsContainer) return; // Only load if news container exists

    fetch('content/news.json')
        .then(response => response.json())
        .then(data => {
            const news = data.news;
            
            // Sort news by date (newest first)
            news.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Show only the 4 most recent news items on homepage
            const recentNews = news.slice(0, 4);
            
            recentNews.forEach(item => {
                const newsCard = createNewsCard(item);
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => console.error('Error loading news:', error));

    function createNewsCard(news) {
        const newsCard = document.createElement('div');
        newsCard.className = 'card';
        newsCard.style.cursor = 'pointer';
        
        // Add click handler if there's a link
        if (news.link) {
            newsCard.addEventListener('click', function(e) {
                if (!e.target.closest('a')) { // Don't trigger if clicking on a link
                    window.open(news.link, '_blank');
                }
            });
        }

        // News type icon
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

        // Format date
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
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="${getTypeIcon(news.type)}" style="color: var(--color-primary); font-size: 1.1rem;"></i>
                        <span style="background: var(--color-background-alt); color: var(--color-text-secondary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem; text-transform: uppercase;">
                            ${news.type}
                        </span>
                    </div>
                    <div style="color: var(--color-text-muted); font-size: 0.875rem;">
                        ${formatDate(news.date)}
                    </div>
                </div>
                
                <h4 style="color: var(--color-text-primary); margin-bottom: 0.75rem; font-size: 1.125rem; line-height: 1.3;">
                    ${news.title}
                </h4>
                
                <p style="color: var(--color-text-secondary); line-height: 1.5; font-size: 0.9rem; margin-bottom: 1rem;">
                    ${news.description}
                </p>
                
                ${news.tags ? `
                <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    ${news.tags.map(tag => 
                        `<span style="background: rgba(37, 99, 235, 0.1); color: var(--color-primary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem;">
                            #${tag}
                        </span>`
                    ).join('')}
                </div>
                ` : ''}
                
                ${news.link ? `
                <div style="margin-top: auto;">
                    <a href="${news.link}" target="_blank" class="btn btn-secondary" style="font-size: 0.875rem; padding: 0.5rem 1rem;" onclick="event.stopPropagation();">
                        <i class="fas fa-external-link-alt" style="margin-right: 0.25rem;"></i>
                        Learn More
                    </a>
                </div>
                ` : ''}
            </div>
        `;

        return newsCard;
    }
});