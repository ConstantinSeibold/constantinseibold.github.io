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

            // Populate teaching experience
            if (data.teaching_experience) {
                populateTeachingExperience(data.teaching_experience);
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

    function populateTeachingExperience(experienceData) {
        const container = document.getElementById('teaching-experience');
        if (!container) return;

        let experienceHTML = `<h3 style="color: var(--color-primary); margin-bottom: 1.5rem;">Teaching Experience</h3>`;
        
        experienceData.forEach(experience => {
            experienceHTML += `
                <div style="border-left: 3px solid var(--color-primary); padding-left: 1rem; margin-bottom: 1.5rem;">
                    <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">${experience.position}</div>
                    <div style="color: var(--color-text-secondary); margin-bottom: 0.25rem;">${experience.organization}</div>
                    <div style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">${experience.period}</div>
                    ${experience.description ? `<div style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${experience.description}</div>` : ''}
                    ${experience.courses ? `<div style="color: var(--color-text-muted); font-size: 0.85rem;"><strong>Courses:</strong> ${experience.courses.join(', ')}</div>` : ''}
                </div>
            `;
        });

        container.innerHTML = experienceHTML;
    }

    function populateCourses(coursesData) {
        const container = document.getElementById('courses-container');
        if (!container) return;

        let coursesHTML = `<h3 style="color: var(--color-primary); margin-bottom: 1.5rem;">Courses & Lectures</h3>`;
        
        coursesData.forEach(course => {
            coursesHTML += `
                <div style="border-left: 3px solid var(--color-primary); padding-left: 1rem; margin-bottom: 1.5rem;">
                    <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">
                        ${course.title}
                    </div>
                    <div style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
                        ${course.code ? `${course.code} • ` : ''}${course.semester}
                        ${course.materials && course.materials.link ? ` • <a href="${course.materials.link}" target="_blank" class="publication-link">Course Page</a>` : ''}
                    </div>
                    ${course.description ? `<div style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 0.75rem;">${course.description}</div>` : ''}
                    
                    ${course.award ? `
                        <div style="padding: 0.75rem; background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; border-radius: var(--radius-md); margin-bottom: 1rem;">
                            <strong>🏆 ${course.award}</strong>
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

        container.innerHTML = coursesHTML;
    }

    function populateSupervision(supervisionData) {
        const container = document.getElementById('supervision-container');
        if (!container) return;

        let supervisionHTML = `<h3 style="color: var(--color-primary); margin-bottom: 1.5rem;">Student Supervision</h3>`;
        
        supervisionHTML += `<div class="card-grid card-grid-2">`;

        // Master students
        if (supervisionData.master_students && supervisionData.master_students.length > 0) {
            supervisionHTML += `
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Master Theses</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        ${supervisionData.master_students.map(student => `
                            <div style="padding: 1rem; background: var(--color-background-alt); border-radius: var(--radius-md);">
                                <div style="font-weight: 500; margin-bottom: 0.25rem;">
                                    ${student.link ? `<a href="${student.link}" target="_blank">${student.thesis_title}</a>` : student.thesis_title}
                                </div>
                                <div style="color: var(--color-text-secondary); font-size: 0.9rem;">${student.year}, ${student.name}</div>
                                ${student.paper_link ? `<div style="margin-top: 0.5rem;"><a href="${student.paper_link}" target="_blank" class="publication-link">Paper</a></div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Bachelor students  
        if (supervisionData.bachelor_students && supervisionData.bachelor_students.length > 0) {
            supervisionHTML += `
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Bachelor Theses</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        ${supervisionData.bachelor_students.map(student => `
                            <div style="padding: 1rem; background: var(--color-background-alt); border-radius: var(--radius-md);">
                                <div style="font-weight: 500; margin-bottom: 0.25rem;">
                                    ${student.link ? `<a href="${student.link}" target="_blank">${student.thesis_title}</a>` : student.thesis_title}
                                </div>
                                <div style="color: var(--color-text-secondary); font-size: 0.9rem;">${student.year}, ${student.name}</div>
                                ${student.paper_link ? `<div style="margin-top: 0.5rem;"><a href="${student.paper_link}" target="_blank" class="publication-link">Paper</a></div>` : ''}
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