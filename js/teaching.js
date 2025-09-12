document.addEventListener('DOMContentLoaded', function () {
    fetch('content/teaching.json')
        .then(response => response.json())
        .then(data => {
            // Update page title if needed
            if (data.page_info && data.page_info.title) {
                const titleElement = document.getElementById('page-title');
                if (titleElement) {
                    titleElement.textContent = data.page_info.title;
                }
            }

            // Populate courses
            if (data.courses) {
                populateCourses(data.courses);
            }

            // Populate supervision
            if (data.supervision) {
                populateSupervision(data.supervision);
            }
        })
        .catch(error => {
            console.error('Error loading teaching content:', error);
        });

    function populateCourses(coursesData) {
        const container = document.getElementById('courses-container');
        if (!container) return;

        let coursesHTML = `<h3 style="color: var(--color-primary); margin-bottom: 1.5rem;">${coursesData.title}</h3>`;
        
        if (coursesData.subtitle) {
            coursesHTML += `<h4 style="margin-bottom: 1rem;">${coursesData.subtitle}</h4>`;
        }
        
        coursesHTML += `<div style="display: flex; flex-direction: column; gap: 1.5rem;">`;

        coursesData.entries.forEach(course => {
            coursesHTML += `
                <div style="border-left: 3px solid var(--color-primary); padding-left: 1rem;">
                    <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">
                        ${course.title}
                    </div>
                    <div style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
                        ${course.link ? `<a href="${course.link}" target="_blank" class="publication-link">${course.period}</a>` : course.period}
                    </div>
                    
                    ${course.award ? `
                        <div style="padding: 0.75rem; background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; border-radius: var(--radius-md); margin-bottom: 1rem;">
                            <strong>🏆 ${course.award.title}</strong> by the ${course.award.organization}
                        </div>
                    ` : ''}
                    
                    ${course.student_publications && course.student_publications.length > 0 ? `
                        <div style="background: var(--color-background-alt); padding: 1rem; border-radius: var(--radius-md);">
                            <strong style="color: var(--color-primary);">Student Publications:</strong>
                            <div style="margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem;">
                                ${course.student_publications.map(pub => `
                                    <div style="font-size: 0.9rem; line-height: 1.5;">
                                        <strong>${pub.title}</strong><br>
                                        <span style="color: var(--color-text-secondary);">${pub.authors.join(', ')}</span>
                                        ${pub.link ? `<a href="${pub.link}" target="_blank" class="publication-link">${pub.venue}</a>` : `<span class="publication-link">${pub.venue}</span>`}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        coursesHTML += `</div>`;
        container.innerHTML = coursesHTML;
    }

    function populateSupervision(supervisionData) {
        const container = document.getElementById('supervision-container');
        if (!container) return;

        let supervisionHTML = `<h3 style="color: var(--color-primary); margin-bottom: 1.5rem;">${supervisionData.title}</h3>`;
        
        supervisionHTML += `<div class="card-grid card-grid-2">`;

        // Master students
        if (supervisionData.master_theses && supervisionData.master_theses.length > 0) {
            supervisionHTML += `
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Master Theses</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        ${supervisionData.master_theses.map(thesis => `
                            <div style="padding: 1rem; background: var(--color-background-alt); border-radius: var(--radius-md);">
                                <div style="font-weight: 500; margin-bottom: 0.25rem;">
                                    ${thesis.link ? `<a href="${thesis.link}" target="_blank">${thesis.title}</a>` : thesis.title}
                                </div>
                                <div style="color: var(--color-text-secondary); font-size: 0.9rem;">${thesis.year}, ${thesis.student}</div>
                                ${thesis.publication_link ? `<div style="margin-top: 0.5rem;"><a href="${thesis.publication_link}" target="_blank" class="publication-link">Paper</a></div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Bachelor students  
        if (supervisionData.bachelor_theses && supervisionData.bachelor_theses.length > 0) {
            supervisionHTML += `
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Bachelor Theses</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        ${supervisionData.bachelor_theses.map(thesis => `
                            <div style="padding: 1rem; background: var(--color-background-alt); border-radius: var(--radius-md);">
                                <div style="font-weight: 500; margin-bottom: 0.25rem;">
                                    ${thesis.link ? `<a href="${thesis.link}" target="_blank">${thesis.title}</a>` : thesis.title}
                                </div>
                                <div style="color: var(--color-text-secondary); font-size: 0.9rem;">${thesis.year}, ${thesis.student}</div>
                                ${thesis.publication_link ? `<div style="margin-top: 0.5rem;"><a href="${thesis.publication_link}" target="_blank" class="publication-link">Paper</a></div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        supervisionHTML += `</div>`;
        container.innerHTML = supervisionHTML;
    }
});