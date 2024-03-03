document.addEventListener('DOMContentLoaded', function () {
    const showMoreButton = document.getElementById('show-more');
    const papersList = document.getElementById('papers-list');

    showMoreButton.addEventListener('click', function () {
    papersList.classList.toggle('hidden-pub');
    });
});