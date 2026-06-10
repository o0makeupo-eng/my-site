(function() {
    'use strict';

    // 1. Инициализация: подсчёт карточек и установка текущего года
    function initGallery() {
        const cards = document.querySelectorAll('.image-card');
        const counter = document.getElementById('image-counter');
        const yearSpan = document.getElementById('current-year');
        
        if (counter) counter.textContent = cards.length;
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        console.log('✅ Галерея загружена. Найдено карточек:', cards.length);
    }

    // 2. Логика лайков с оптимизацией переключения классов
    function setupLikes() {
        const likeButtons = document.querySelectorAll('.like-btn');
        const totalLikesEl = document.getElementById('total-likes');
        let totalLikes = 0;

        likeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const isLiked = this.classList.toggle('liked');
                
                totalLikes += isLiked ? 1 : -1;
                icon.className = isLiked ? 'fas fa-heart' : 'far fa-heart';

                // Кратковременная анимация увеличения
                this.style.transform = 'scale(1.3)';
                setTimeout(() => this.style.transform = 'scale(1)', 200);

                if (totalLikesEl) totalLikesEl.textContent = totalLikes;
            });
        });
    }

    // 3. Фильтрация по категориям
    function setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.image-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;
                cards.forEach(card => {
                    // Показываем, если фильтр "all" или совпадает с категорией карточки
                    const isVisible = filter === 'all' || card.dataset.category === filter;
                    card.classList.toggle('hidden', !isVisible);
                });
            });
        });
    }

    // 4. Переключение вида (Сетка / Список)
    function setupViewToggle() {
        const gridBtn = document.getElementById('grid-view');
        const listBtn = document.getElementById('list-view');
        const galleryGrid = document.getElementById('image-gallery');
        if (!galleryGrid) return;

        gridBtn?.addEventListener('click', () => {
            galleryGrid.classList.remove('list-view');
            gridBtn.classList.add('active');
            listBtn?.classList.remove('active');
        });

        listBtn?.addEventListener('click', () => {
            galleryGrid.classList.add('list-view');
            listBtn.classList.add('active');
            gridBtn?.classList.remove('active');
        });
    }

    // Запуск после полной загрузки DOM
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🌿 Секреты комнатных растений: Галерея готова!');
        initGallery();
        setupLikes();
        setupFilters();
        setupViewToggle();
    });
})();