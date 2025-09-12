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

            // Populate invited talks
            if (data.invited_talks) {
                populateInvitedTalks(data.invited_talks);
            }

            // Populate community engagement
            if (data.community_engagement) {
                populateCommunityEngagement(data.community_engagement);
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

    function populateInvitedTalks(talksData) {
        const container = document.getElementById('invited-talks-container');
        if (!container) return;

        talksData.entries.forEach(talk => {
            const talkDiv = document.createElement('div');
            talkDiv.style.cssText = `
                padding: 1.5rem;
                background: var(--color-background-alt);
                border-radius: var(--radius-md);
                border-left: 3px solid #10b981;
                margin-bottom: 1rem;
            `;

            let talkHTML = `
                <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.5rem;">${talk.title}</div>
                <div style="color: var(--color-text-secondary); font-size: 0.95rem; margin-bottom: 0.5rem;">
                    <strong>${talk.event}</strong> ${talk.location ? `• ${talk.location}` : ''} • ${talk.date}
                </div>
            `;

            if (talk.description) {
                talkHTML += `<div style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 0.75rem;">${talk.description}</div>`;
            }

            // Add type badge
            const typeColors = {
                'keynote': '#dc2626',
                'invited_talk': '#059669', 
                'panel': '#7c3aed',
                'presentation': '#0ea5e9'
            };
            const typeColor = typeColors[talk.type] || '#64748b';
            talkHTML += `<span style="background: ${typeColor}; color: white; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem; text-transform: uppercase; font-weight: 500; margin-right: 0.5rem;">${talk.type.replace('_', ' ')}</span>`;

            if (talk.link) {
                talkHTML += `<a href="${talk.link}" target="_blank" class="publication-link" style="margin-left: 0.5rem;">View Event</a>`;
            }

            talkDiv.innerHTML = talkHTML;
            container.appendChild(talkDiv);
        });
    }

    function populateCommunityEngagement(engagementData) {
        const container = document.getElementById('community-engagement-container');
        if (!container) return;

        engagementData.entries.forEach(engagement => {
            const engagementDiv = document.createElement('div');
            engagementDiv.style.cssText = `
                padding: 1.5rem;
                background: var(--color-background-alt);
                border-radius: var(--radius-md);
                border-left: 3px solid #8b5cf6;
                margin-bottom: 1rem;
            `;

            let engagementHTML = `
                <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.5rem;">${engagement.title}</div>
                <div style="color: var(--color-text-secondary); font-size: 0.95rem; margin-bottom: 0.5rem;">
                    <strong>Role:</strong> ${engagement.role} • ${engagement.date}
                </div>
            `;

            if (engagement.description) {
                engagementHTML += `<div style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 0.75rem;">${engagement.description}</div>`;
            }

            if (engagement.participants) {
                engagementHTML += `<div style="color: var(--color-text-muted); font-size: 0.85rem; margin-bottom: 0.5rem;"><strong>Participants:</strong> ${engagement.participants}</div>`;
            }

            if (engagement.journals && engagement.journals.length > 0) {
                engagementHTML += `<div style="color: var(--color-text-muted); font-size: 0.85rem; margin-bottom: 0.5rem;"><strong>Journals/Conferences:</strong> ${engagement.journals.join(', ')}</div>`;
            }

            // Add type badge
            const typeColors = {
                'tutorial': '#dc2626',
                'workshop': '#059669',
                'educational': '#0ea5e9',
                'service': '#64748b'
            };
            const typeColor = typeColors[engagement.type] || '#64748b';
            engagementHTML += `<span style="background: ${typeColor}; color: white; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem; text-transform: capitalize; font-weight: 500; margin-right: 0.5rem;">${engagement.type}</span>`;

            if (engagement.link) {
                engagementHTML += `<a href="${engagement.link}" target="_blank" class="publication-link" style="margin-left: 0.5rem;">Learn More</a>`;
            }

            engagementDiv.innerHTML = engagementHTML;
            container.appendChild(engagementDiv);
        });
    }
});