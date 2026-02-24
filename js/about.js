document.addEventListener('DOMContentLoaded', function () {
    fetch('content/about.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load');
            return response.json();
        })
        .then(data => {
            if (data.page_info && data.page_info.title) {
                const titleElement = document.getElementById('page-title');
                if (titleElement) {
                    titleElement.textContent = data.page_info.title;
                }
            }

            if (data.career_timeline) {
                populateCareerTimeline(data.career_timeline);
            }

            if (data.awards) {
                populateAwards(data.awards);
            }

            if (data.grants) {
                populateGrants(data.grants);
            }

            if (data.invited_talks) {
                populateInvitedTalks(data.invited_talks);
            }

            if (data.community_engagement) {
                populateCommunityEngagement(data.community_engagement);
            }
        })
        .catch(error => {
            console.error('Error loading about content:', error);
            const errorHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading content. Please try again later.</p></div>';
            ['career-timeline', 'awards-container', 'grants-container', 'invited-talks-container', 'community-engagement-container'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = errorHTML;
            });
        });

    function populateCareerTimeline(timelineData) {
        const container = document.getElementById('career-timeline');
        if (!container) return;

        container.innerHTML = '';

        timelineData.entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry-item');

            let entryHTML = `
                <div class="entry-content">
                    <div class="entry-title">
                        ${entry.position}${entry.grade ? ` <em>(${entry.grade})</em>` : ''}
                    </div>
                    <div class="entry-subtitle">${entry.organization}</div>
                    <div class="entry-meta">${entry.period}</div>
            `;

            if (entry.description) {
                entryHTML += `<div class="entry-description">${entry.description}</div>`;
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

            entryHTML += `</div>`;

            if (entry.logo) {
                entryHTML += `
                    <div class="entry-logo">
                        <img src="${entry.logo}" alt="${entry.organization} logo" onerror="this.style.display='none'">
                    </div>
                `;
            }

            entryDiv.innerHTML = entryHTML;
            container.appendChild(entryDiv);
        });
    }

    function populateAwards(awardsData) {
        const container = document.getElementById('awards-container');
        if (!container) return;

        container.innerHTML = '';

        awardsData.entries.forEach(award => {
            const awardDiv = document.createElement('div');
            awardDiv.classList.add('entry-item', 'entry-item--award');

            awardDiv.innerHTML = `
                <div class="entry-title">${award.title}</div>
                <div class="entry-subtitle" style="font-size: 0.9rem;">${award.organization}, ${award.year}</div>
            `;

            container.appendChild(awardDiv);
        });
    }

    function populateGrants(grantsData) {
        const container = document.getElementById('grants-container');
        if (!container) return;

        container.innerHTML = '';

        grantsData.entries.forEach(grant => {
            const grantDiv = document.createElement('div');
            grantDiv.classList.add('entry-item', 'entry-item--grant');

            grantDiv.innerHTML = `
                <div class="entry-title" style="margin-bottom: 0.5rem;">${grant.title}</div>
                <div class="entry-description">${grant.grant_id}</div>
                <div class="entry-subtitle"><strong>Project:</strong> ${grant.project_name} - ${grant.description}</div>
            `;

            container.appendChild(grantDiv);
        });
    }

    function populateInvitedTalks(talksData) {
        const container = document.getElementById('invited-talks-container');
        if (!container) return;

        container.innerHTML = '';

        talksData.entries.forEach(talk => {
            const talkDiv = document.createElement('div');
            talkDiv.classList.add('entry-item', 'entry-item--talk');

            let talkHTML = `
                <div class="entry-title" style="margin-bottom: 0.5rem;">${talk.title}</div>
                <div class="entry-subtitle" style="font-size: 0.95rem; margin-bottom: 0.5rem;">
                    <strong>${talk.event}</strong> ${talk.location ? `• ${talk.location}` : ''} • ${talk.date}
                </div>
            `;

            if (talk.description) {
                talkHTML += `<div class="entry-description" style="line-height: 1.5; margin-bottom: 0.75rem;">${talk.description}</div>`;
            }

            const typeClass = 'badge-type--' + talk.type.replace('_', '-');
            talkHTML += `<span class="badge-type ${typeClass}">${talk.type.replace('_', ' ')}</span>`;

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

        container.innerHTML = '';

        engagementData.entries.forEach(engagement => {
            const engagementDiv = document.createElement('div');
            engagementDiv.classList.add('entry-item', 'entry-item--engagement');

            let engagementHTML = `
                <div class="entry-title" style="margin-bottom: 0.5rem;">${engagement.title}</div>
                <div class="entry-subtitle" style="font-size: 0.95rem; margin-bottom: 0.5rem;">
                    <strong>Role:</strong> ${engagement.role} • ${engagement.date}
                </div>
            `;

            if (engagement.description) {
                engagementHTML += `<div class="entry-description" style="line-height: 1.5; margin-bottom: 0.75rem;">${engagement.description}</div>`;
            }

            if (engagement.participants) {
                engagementHTML += `<div class="entry-detail"><strong>Participants:</strong> ${engagement.participants}</div>`;
            }

            if (engagement.journals && engagement.journals.length > 0) {
                engagementHTML += `<div class="entry-detail"><strong>Journals/Conferences:</strong> ${engagement.journals.join(', ')}</div>`;
            }

            const typeClass = 'badge-type--' + engagement.type;
            engagementHTML += `<span class="badge-type badge-type--capitalize ${typeClass}">${engagement.type}</span>`;

            if (engagement.link) {
                engagementHTML += `<a href="${engagement.link}" target="_blank" class="publication-link" style="margin-left: 0.5rem;">Learn More</a>`;
            }

            engagementDiv.innerHTML = engagementHTML;
            container.appendChild(engagementDiv);
        });
    }
});
