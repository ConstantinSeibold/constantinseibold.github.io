document.addEventListener('DOMContentLoaded', function () {
    fetch('content/about.json')
        .then(response => response.json())
        .then(data => {
            // Update page title if needed
            if (data.page_info && data.page_info.title) {
                const titleElement = document.getElementById('page-title');
                if (titleElement) {
                    titleElement.textContent = data.page_info.title;
                }
            }

            // Populate career timeline
            if (data.career_timeline) {
                populateCareerTimeline(data.career_timeline);
            }

            // Populate awards
            if (data.awards) {
                populateAwards(data.awards);
            }

            // Populate grants
            if (data.grants) {
                populateGrants(data.grants);
            }
        })
        .catch(error => {
            console.error('Error loading about content:', error);
        });

    function populateCareerTimeline(timelineData) {
        const container = document.getElementById('career-timeline');
        if (!container) return;

        timelineData.entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.style.cssText = `
                border-left: 3px solid var(--color-primary);
                padding-left: 1rem;
                margin-bottom: 1.5rem;
            `;

            let entryHTML = `
                <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">
                    ${entry.position}${entry.grade ? ` <em>(${entry.grade})</em>` : ''}
                </div>
                <div style="color: var(--color-text-secondary); margin-bottom: 0.25rem;">${entry.organization}</div>
                <div style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">${entry.period}</div>
            `;

            if (entry.description) {
                entryHTML += `<div style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${entry.description}</div>`;
            }

            if (entry.dissertation) {
                entryHTML += `
                    <div style="font-size: 0.95rem; line-height: 1.5;">
                        <strong>Dissertation:</strong> "${entry.dissertation.title}"<br>
                        <strong>Advisors:</strong> ${entry.dissertation.advisors.join(' and ')}<br>
                        <a href="${entry.dissertation.link}" class="publication-link">View Thesis</a>
                        <span class="publication-award">🏆 ${entry.dissertation.award}</span>
                    </div>
                `;
            }

            if (entry.link) {
                entryHTML += `<a href="${entry.link}" class="publication-link" style="margin-top: 0.5rem;">Learn More</a>`;
            }

            entryDiv.innerHTML = entryHTML;
            container.appendChild(entryDiv);
        });
    }

    function populateAwards(awardsData) {
        const container = document.getElementById('awards-container');
        if (!container) return;

        awardsData.entries.forEach(award => {
            const awardDiv = document.createElement('div');
            awardDiv.style.cssText = `
                padding: 1rem;
                background: var(--color-background-alt);
                border-radius: var(--radius-md);
                border-left: 3px solid #fbbf24;
                margin-bottom: 1rem;
            `;

            awardDiv.innerHTML = `
                <div style="font-weight: 600; color: var(--color-text-primary);">${award.title}</div>
                <div style="color: var(--color-text-secondary); font-size: 0.9rem;">${award.organization}, ${award.year}</div>
            `;

            container.appendChild(awardDiv);
        });
    }

    function populateGrants(grantsData) {
        const container = document.getElementById('grants-container');
        if (!container) return;

        grantsData.entries.forEach(grant => {
            const grantDiv = document.createElement('div');
            grantDiv.style.cssText = `
                padding: 1.5rem;
                background: var(--color-background-alt);
                border-radius: var(--radius-md);
                border-left: 3px solid var(--color-primary);
                margin-bottom: 1rem;
            `;

            grantDiv.innerHTML = `
                <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.5rem;">${grant.title}</div>
                <div style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${grant.grant_id}</div>
                <div style="color: var(--color-text-secondary);"><strong>Project:</strong> ${grant.project_name} - ${grant.description}</div>
            `;

            container.appendChild(grantDiv);
        });
    }
});