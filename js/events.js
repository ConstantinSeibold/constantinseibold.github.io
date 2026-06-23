document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    fetch('content/events.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load');
            return response.json();
        })
        .then(data => {
            const items = merge(data.organized || [], data.attending || []);
            if (items.length === 0) {
                container.innerHTML = '<div class="empty-state"><div class="empty-state__icon"><i class="fas fa-calendar" aria-hidden="true"></i></div><p>No events yet.</p></div>';
                return;
            }
            renderTimeline(items, container);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            container.innerHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading events. Please try again later.</p></div>';
        });

    function merge(organized, attending) {
        const all = [];
        organized.forEach(e => all.push(Object.assign({}, e, { _type: 'organizer' })));
        attending.forEach(e => all.push(Object.assign({}, e, { _type: 'attendee', title: e.name })));
        all.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        return all;
    }

    function year(dateStr) {
        return dateStr ? dateStr.split('-')[0] : '';
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        const d = new Date(Number(parts[0]), parts[1] ? Number(parts[1]) - 1 : 0, 1);
        return d.toLocaleDateString('en-US', parts[1] ? { year: 'numeric', month: 'long' } : { year: 'numeric' });
    }

    function renderTimeline(items, container) {
        container.innerHTML = '';
        const timeline = document.createElement('div');
        timeline.className = 'timeline';

        let currentYear = null;

        items.forEach(item => {
            const yr = year(item.date);

            if (yr !== currentYear) {
                currentYear = yr;
                const rule = document.createElement('div');
                rule.className = 'timeline-rule';
                rule.innerHTML = `<span class="timeline-rule__year">${yr}</span>`;
                timeline.appendChild(rule);
            }

            timeline.appendChild(createItem(item));
        });

        container.appendChild(timeline);
    }

    function createItem(item) {
        const row = document.createElement('div');
        row.className = 'timeline-item timeline-item--' + item._type;

        // Dot column
        const dotCol = document.createElement('div');
        dotCol.className = 'timeline-item__dot-col';
        dotCol.innerHTML = '<div class="timeline-dot"></div>';

        // Card body
        const body = document.createElement('div');
        body.className = 'timeline-item__body card';

        const badge = item._type === 'organizer'
            ? '<span class="badge-organizer">Organizer</span>'
            : '<span class="badge-attendee">Attendee</span>';

        const metaParts = [];
        if (item._type === 'organizer' && item.venue) metaParts.push(item.venue);
        if (item.location) metaParts.push(item.location);
        if (item.date) metaParts.push(formatDate(item.date));
        const metaText = metaParts.join(' &middot; ');

        let imageHTML = '';
        if (item._type === 'organizer' && item.image) {
            imageHTML = `<div class="timeline-card__image" style="background-image: url('${item.image}');"></div>`;
        }

        let tagsHTML = '';
        if (item.tags && item.tags.length > 0) {
            tagsHTML = item.tags.map(t => `<span class="badge-tag">${t}</span>`).join(' ');
        }

        let linkHTML = '';
        if (item.url) {
            linkHTML = `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="publication-link">Event Page</a>`;
        }

        const descriptionText = item.description || item.note || '';

        body.innerHTML = `
            ${imageHTML}
            <div class="timeline-card__meta">
                ${badge}
                ${metaText ? `<span class="timeline-card__meta-text">${metaText}</span>` : ''}
            </div>
            <h3 class="timeline-card__title">${item.title}</h3>
            ${descriptionText ? `<p class="timeline-card__description">${descriptionText}</p>` : ''}
            ${tagsHTML || linkHTML ? `<div class="timeline-card__footer">${tagsHTML}${linkHTML}</div>` : ''}
        `;

        row.appendChild(dotCol);
        row.appendChild(body);
        return row;
    }
});
