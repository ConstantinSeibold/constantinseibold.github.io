document.addEventListener('DOMContentLoaded', function () {
    fetch('content/research-group.json')
        .then(response => response.json())
        .then(data => {
            const groupData = data.research_group;
            
            // Update page title and description
            document.getElementById('group-title').textContent = groupData.name;
            document.getElementById('group-description').textContent = groupData.description;
            
            // Populate research areas
            const researchAreasContainer = document.getElementById('research-areas-container');
            groupData.research_areas.forEach(area => {
                const areaCard = document.createElement('div');
                areaCard.className = 'card';
                areaCard.innerHTML = `
                    <div style="text-align: center; margin-bottom: 1rem;">
                        <span style="font-size: 2rem;">${area.icon}</span>
                    </div>
                    <h4 style="color: var(--color-primary); margin-bottom: 0.75rem; text-align: center;">${area.area}</h4>
                    <p style="color: var(--color-text-secondary); text-align: center; font-size: 0.9rem;">${area.description}</p>
                `;
                researchAreasContainer.appendChild(areaCard);
            });
            
            // Populate team members
            const teamContainer = document.getElementById('team-members-container');
            
            // Add leader first
            const leaderCard = document.createElement('div');
            leaderCard.className = 'card';
            leaderCard.style.border = '2px solid var(--color-primary)';
            leaderCard.innerHTML = `
                <div style="text-align: center;">
                    <img src="${groupData.leader.image}" alt="${groupData.leader.name}" 
                         style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 1rem; object-fit: cover;" />
                    <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">${groupData.leader.name}</h4>
                    <div style="color: var(--color-accent); font-weight: 500; margin-bottom: 0.75rem;">${groupData.leader.position}</div>
                    <p style="color: var(--color-text-secondary); font-size: 0.9rem;">${groupData.leader.bio}</p>
                    <div style="margin-top: 1rem;">
                        <span style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 0.25rem 0.75rem; border-radius: var(--radius-md); font-size: 0.8rem;">
                            <i class="fas fa-crown" style="margin-right: 0.25rem;"></i>Group Leader
                        </span>
                    </div>
                </div>
            `;
            teamContainer.appendChild(leaderCard);
            
            // Add team members
            groupData.members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.className = 'card';
                memberCard.innerHTML = `
                    <div style="text-align: center;">
                        <img src="${member.image}" alt="${member.name}" 
                             style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 1rem; object-fit: cover;" />
                        <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">${member.name}</h4>
                        <div style="color: var(--color-text-secondary); margin-bottom: 0.75rem;">${member.position}</div>
                        <div style="margin-bottom: 1rem;">
                            ${member.research_interests.map(interest => 
                                `<span style="background: var(--color-background-alt); color: var(--color-text-secondary); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem; margin: 0.125rem; display: inline-block;">${interest}</span>`
                            ).join('')}
                        </div>
                        <a href="${member.profile_url}" target="_blank" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.5rem 1rem;">
                            <i class="fas fa-external-link-alt" style="margin-right: 0.25rem;"></i>Profile
                        </a>
                    </div>
                `;
                teamContainer.appendChild(memberCard);
            });
            
            // Populate facilities
            const facilitiesContainer = document.getElementById('facilities-container');
            facilitiesContainer.innerHTML = `
                <div style="margin-bottom: 1rem;">
                    <h5 style="color: var(--color-text-primary); margin-bottom: 0.5rem;">
                        <i class="fas fa-map-marker-alt" style="margin-right: 0.5rem; color: var(--color-primary);"></i>
                        Location
                    </h5>
                    <p style="color: var(--color-text-secondary); margin-left: 1.5rem;">${groupData.facilities.location}</p>
                </div>
                <div>
                    <h5 style="color: var(--color-text-primary); margin-bottom: 0.5rem;">
                        <i class="fas fa-cogs" style="margin-right: 0.5rem; color: var(--color-primary);"></i>
                        Equipment
                    </h5>
                    <ul style="color: var(--color-text-secondary); margin-left: 1rem;">
                        ${groupData.facilities.equipment.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            // Populate collaborations
            const collaborationsContainer = document.getElementById('collaborations-container');
            collaborationsContainer.innerHTML = `
                <ul style="color: var(--color-text-secondary); list-style: none; padding: 0;">
                    ${groupData.facilities.collaborations.map(collab => 
                        `<li style="margin-bottom: 0.75rem; padding: 0.75rem; background: var(--color-background-alt); border-radius: var(--radius-md);">
                            <i class="fas fa-university" style="margin-right: 0.5rem; color: var(--color-primary);"></i>
                            ${collab}
                        </li>`
                    ).join('')}
                </ul>
            `;
        })
        .catch(error => {
            console.error('Error loading research group data:', error);
            document.getElementById('group-title').textContent = 'Computer Vision in Medicine';
            document.getElementById('group-description').textContent = 'Error loading group information.';
        });
});