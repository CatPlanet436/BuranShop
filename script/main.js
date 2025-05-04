document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[name="tag"]');
    const cards = document.querySelectorAll('.card');

    function filterCards() {
        const checkedTags = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        cards.forEach(card => {
            const tags = card.dataset.tags.split(',');

            // Если фильтров нет — показать все
            if (checkedTags.length === 0) {
                card.style.display = 'block';
                return;
            }

            // Сравнение тегов
            const matches = checkedTags.some(tag => tags.includes(tag));
            card.style.display = matches ? 'block' : 'none';
        });
    }

    checkboxes.forEach(cb => cb.addEventListener('change', filterCards));
});