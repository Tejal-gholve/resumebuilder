document.getElementById('add-experience').addEventListener('click', () => addSection('experience-section', 'New Experience', 'Company | Year'));
document.getElementById('add-education').addEventListener('click', () => addSection('education-section', 'New Education', 'Institution | Year'));
document.getElementById('add-project').addEventListener('click', () => addFileSection('projects-section', 'New Project'));
document.getElementById('add-skill').addEventListener('click', () => addSection('skills-section', 'New Skill', 'Skill Details'));
document.getElementById('add-certificate').addEventListener('click', () => addFileSection('certificates-section', 'New Certificate'));
document.getElementById('download-btn').addEventListener('click', downloadResume); // Download Button

function addSection(sectionId, title, details) {
    const section = document.getElementById(sectionId);
    const newItem = document.createElement('div');
    newItem.className = 'resume-item';
    newItem.innerHTML = `
        <h4 contenteditable="true">${title}</h4>
        <p contenteditable="true">${details}</p>
        <button class="remove-btn">Remove</button>
    `;
    section.appendChild(newItem);

    newItem.querySelector('.remove-btn').addEventListener('click', () => newItem.remove());
}

function addFileSection(sectionId, title) {
    const section = document.getElementById(sectionId);
    const newItem = document.createElement('div');
    newItem.className = 'resume-item';
    newItem.innerHTML = `
        <h4 contenteditable="true">${title}</h4>
        <input type="file" class="file-input">
        <button class="remove-btn">Remove</button>
    `;
    section.appendChild(newItem);

    newItem.querySelector('.remove-btn').addEventListener('click', () => newItem.remove());
}

/* Function to Download Resume as PDF */
function downloadResume() {
    const { jsPDF } = window.jspdf;
    const resumeElement = document.getElementById('resume');

    html2canvas(resumeElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('My_Resume.pdf'); // Download as "My_Resume.pdf"
    });
}