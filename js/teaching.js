document.addEventListener('DOMContentLoaded', function () {
    fetch('content/teaching.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load');
            return response.json();
        })
        .then(data => {
            if (data.courses) {
                populateCourses(data.courses);
            }

            if (data.supervision) {
                populateSupervision(data.supervision);
            }
        })
        .catch(error => {
            console.error('Error loading teaching content:', error);
            const errorHTML = '<div class="error-state"><div class="error-state__icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></div><p>Error loading content. Please try again later.</p></div>';
            ['courses-container', 'supervision-container'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = errorHTML;
            });
        });

    function populateCourses(coursesData) {
        const container = document.getElementById('courses-container');
        if (!container) return;

        let coursesHTML = `<h3 class="section-heading">${coursesData.title}</h3>`;

        if (coursesData.subtitle) {
            coursesHTML += `<h4 style="margin-bottom: 1rem;">${coursesData.subtitle}</h4>`;
        }

        coursesHTML += `<div class="stack-lg">`;

        coursesData.entries.forEach(course => {
            coursesHTML += `
                <div class="course-item">
                    <div class="course-item__title">
                        ${course.title}
                    </div>
                    <div class="course-item__period">
                        ${course.link ? `<a href="${course.link}" target="_blank" class="publication-link">${course.period}</a>` : course.period}
                    </div>

                    ${course.award ? `
                        <div class="award-banner">
                            <strong>🏆 ${course.award.title}</strong> by the ${course.award.organization}
                        </div>
                    ` : ''}

                    ${course.student_publications && course.student_publications.length > 0 ? `
                        <div class="info-panel">
                            <strong style="color: var(--color-primary);">Student Publications:</strong>
                            <div class="stack-sm" style="margin-top: 0.75rem;">
                                ${course.student_publications.map(pub => `
                                    <div class="student-pub">
                                        <strong>${pub.title}</strong><br>
                                        <span class="student-pub__authors">${pub.authors.join(', ')}</span>
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

        let supervisionHTML = `<h3 class="section-heading">${supervisionData.title}</h3>`;

        supervisionHTML += `<div class="card-grid card-grid-2">`;

        // Master students
        if (supervisionData.master_theses && supervisionData.master_theses.length > 0) {
            supervisionHTML += `
                <div>
                    <h4 class="section-heading" style="font-size: 1.25rem;">${'Master Theses'}</h4>
                    <div class="stack-md">
                        ${supervisionData.master_theses.map(thesis => `
                            <div class="thesis-item">
                                <div class="thesis-item__title">
                                    ${thesis.link ? `<a href="${thesis.link}" target="_blank">${thesis.title}</a>` : thesis.title}
                                </div>
                                <div class="thesis-item__meta">${thesis.year}, ${thesis.student}</div>
                                ${thesis.publication_link ? `<div class="thesis-item__link"><a href="${thesis.publication_link}" target="_blank" class="publication-link">Paper</a></div>` : ''}
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
                    <h4 class="section-heading" style="font-size: 1.25rem;">${'Bachelor Theses'}</h4>
                    <div class="stack-md">
                        ${supervisionData.bachelor_theses.map(thesis => `
                            <div class="thesis-item">
                                <div class="thesis-item__title">
                                    ${thesis.link ? `<a href="${thesis.link}" target="_blank">${thesis.title}</a>` : thesis.title}
                                </div>
                                <div class="thesis-item__meta">${thesis.year}, ${thesis.student}</div>
                                ${thesis.publication_link ? `<div class="thesis-item__link"><a href="${thesis.publication_link}" target="_blank" class="publication-link">Paper</a></div>` : ''}
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
