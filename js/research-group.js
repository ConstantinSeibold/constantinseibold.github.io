document.addEventListener('DOMContentLoaded', function () {
    fetch('content/research-group.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load');
            return response.json();
        })
        .then(data => {
            const groupData = data.research_group;

            const groupTitle = document.getElementById('group-title');
            const groupDescription = document.getElementById('group-description');
            if (groupTitle) groupTitle.textContent = groupData.name;
            if (groupDescription) groupDescription.textContent = groupData.description;

            // Populate research areas
            const researchAreasContainer = document.getElementById('research-areas-container');
            researchAreasContainer.innerHTML = '';
            groupData.research_areas.forEach(area => {
                const areaCard = document.createElement('div');
                areaCard.className = 'card';
                areaCard.innerHTML = `
                    <div class="research-area__icon">${area.icon}</div>
                    <h4 class="research-area__title">${area.area}</h4>
                    <p class="research-area__description">${area.description}</p>
                `;
                researchAreasContainer.appendChild(areaCard);
            });

            // Populate team members
            const teamContainer = document.getElementById('team-members-container');
            teamContainer.innerHTML = '';

            // Add leader first
            const leaderCard = document.createElement('div');
            leaderCard.className = 'card team-card team-card--leader';
            leaderCard.innerHTML = `
                <div class="team-card">
                    <img src="${groupData.leader.image}" alt="${groupData.leader.name}" class="team-card__avatar" />
                    <h4 class="team-card__name">${groupData.leader.name}</h4>
                    <div class="team-card__role team-card__role--accent">${groupData.leader.position}</div>
                    <p class="team-card__bio">${groupData.leader.bio}</p>
                    <div>
                        <span class="leader-badge">
                            <i class="fas fa-crown" aria-hidden="true" style="margin-right: 0.25rem;"></i>Group Leader
                        </span>
                    </div>
                </div>
            `;
            teamContainer.appendChild(leaderCard);

            // Add team members
            groupData.members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.className = 'card team-card';
                memberCard.innerHTML = `
                    <div class="team-card">
                        <img src="${member.image}" alt="${member.name}" class="team-card__avatar" />
                        <h4 class="team-card__name">${member.name}</h4>
                        <div class="team-card__role">${member.position}</div>
                        <div class="team-card__interests">
                            ${member.research_interests.map(interest =>
                                `<span class="badge-tag">${interest}</span>`
                            ).join('')}
                        </div>
                        <a href="${member.profile_url}" target="_blank" class="btn btn-secondary btn--sm">
                            <i class="fas fa-external-link-alt" aria-hidden="true" style="margin-right: 0.25rem;"></i>Profile
                        </a>
                    </div>
                `;
                teamContainer.appendChild(memberCard);
            });

            // Populate facilities
            const facilitiesContainer = document.getElementById('facilities-container');
            facilitiesContainer.innerHTML = `
                <div class="facility-section">
                    <h5>
                        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                        Location
                    </h5>
                    <p>${groupData.facilities.location}</p>
                </div>
                <div class="facility-section">
                    <h5>
                        <i class="fas fa-cogs" aria-hidden="true"></i>
                        Equipment
                    </h5>
                    <ul>
                        ${groupData.facilities.equipment.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;

            // Populate collaborations
            const collaborationsContainer = document.getElementById('collaborations-container');
            collaborationsContainer.innerHTML = `
                <ul class="collab-list">
                    ${groupData.facilities.collaborations.map(collab =>
                        `<li>
                            <i class="fas fa-university" aria-hidden="true"></i>
                            ${collab}
                        </li>`
                    ).join('')}
                </ul>
            `;
        })
        .catch(error => {
            console.error('Error loading research group data:', error);
            const errorHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading content. Please try again later.</p></div>';
            ['research-areas-container', 'team-members-container', 'facilities-container', 'collaborations-container'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = errorHTML;
            });
        });
});
