document.addEventListener('DOMContentLoaded', function () {
    const organizedContainer = document.getElementById('organized-container');
    const attendingContainer = document.getElementById('attending-container');

    fetch('content/events.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load');
            return response.json();
        })
        .then(data => {
            populateOrganized(data.organized || []);
            populateAttending(data.attending || []);
        })
        .catch(error => {
            console.error('Error fetching events: ', error);
            const errorHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading events. Please try again later.</p></div>';
            [organizedContainer, attendingContainer].forEach(el => {
                if (el) el.innerHTML = errorHTML;
            });
        });

    function formatMonth(dateStr) {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        const date = new Date(Number(parts[0]), parts[1] ? Number(parts[1]) - 1 : 0, 1);
        const opts = parts[1] ? { year: 'numeric', month: 'long' } : { year: 'numeric' };
        return date.toLocaleDateString('en-US', opts);
    }

    function populateOrganized(events) {
        if (!organizedContainer) return;
        organizedContainer.innerHTML = '';

        if (events.length === 0) {
            organizedContainer.innerHTML = '<div class="empty-state"><div class="empty-state__icon"><i class="fas fa-calendar" aria-hidden="true"></i></div><p>No organized events yet.</p></div>';
            return;
        }

        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'card';

            const meta = [event.role, event.venue, event.location, formatMonth(event.date)]
                .filter(Boolean).join(' &middot; ');

            let tagsHTML = '';
            if (event.tags && event.tags.length > 0) {
                tagsHTML = '<div style="margin-top: 1rem;">' +
                    event.tags.map(tag => `<span class="badge-tag">${tag}</span>`).join(' ') +
                    '</div>';
            }

            let linkHTML = '';
            if (event.url) {
                linkHTML = `<div style="margin-top: 1rem;"><a href="${event.url}" target="_blank" class="publication-link">Event Page</a></div>`;
            }

            card.innerHTML = `
                ${event.image ? `<div class="card__featured-image" style="background-image: url('${event.image}');"></div>` : ''}
                <h3 class="card__title" style="font-size: 1.125rem;">${event.title}</h3>
                ${meta ? `<p class="card__description" style="margin-bottom: 0.5rem; font-weight: 600;">${meta}</p>` : ''}
                <p class="card__description" style="margin-bottom: 1rem;">${event.description || ''}</p>
                ${tagsHTML}
                ${linkHTML}
            `;

            organizedContainer.appendChild(card);
        });
    }

    function populateAttending(events) {
        if (!attendingContainer) return;
        attendingContainer.innerHTML = '';

        if (events.length === 0) {
            attendingContainer.innerHTML = '<div class="empty-state"><div class="empty-state__icon"><i class="fas fa-plane" aria-hidden="true"></i></div><p>No upcoming conferences listed.</p></div>';
            return;
        }

        events.forEach(event => {
            const card = document.createElement(event.url ? 'a' : 'div');
            card.className = 'card';
            if (event.url) {
                card.href = event.url;
                card.target = '_blank';
                card.style.textDecoration = 'none';
                card.style.color = 'inherit';
            }

            const meta = [event.location, formatMonth(event.date)].filter(Boolean).join(' &middot; ');

            card.innerHTML = `
                <h3 class="card__title" style="font-size: 1.125rem; margin-bottom: 0.25rem;">${event.name}</h3>
                ${meta ? `<p class="card__description">${meta}</p>` : ''}
                ${event.note ? `<p class="card__description" style="margin-top: 0.5rem;">${event.note}</p>` : ''}
            `;

            attendingContainer.appendChild(card);
        });
    }
});
