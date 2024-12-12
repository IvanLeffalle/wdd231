const newsUrl = './data/weather-news-data.json';



async function fetchNews() {
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        displayNews(data.news_articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        alert('Failed to load news articles.');
    }
}

function displayNews(articles) {
    const container = document.querySelector('#news-container');

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        newsCard.innerHTML = `
            <div class="news-image-container">
                <img src="${article.image.url}" alt="${article.image.alt}" loading="lazy" class="article-image">
            </div>
            <div class="news-content">
                <div class="category">${article.category}</div>
                <h3>${article.title}</h3>
                <div class="date">${article.date}</div>
                <p>${article.summary}</p>
            </div>
        `;

        newsCard.addEventListener('click', () => openModal(article));

        container.appendChild(newsCard);
    });
}

function openModal(article) {
    const existingModal = document.querySelector('dialog');
    if (existingModal) {
        existingModal.remove();
    }

    const fullArticle = document.createElement('dialog');
    fullArticle.setAttribute('aria-labelledby', 'article-title');
    fullArticle.setAttribute('role', 'dialog');
    fullArticle.innerHTML = `
        <button id="close-modal" class="button-44">X</button>
        <h2 id="article-title">${article.title}</h2>
        <div class="news-image-container-modal">
            <img src="${article.image.url}" alt="${article.image.alt}" loading="lazy" class="article-image">
        </div>
        <p>${article.full_text}</p>
    `;

    const closeButton = fullArticle.querySelector('#close-modal');
    closeButton.addEventListener('click', () => fullArticle.close());

    document.body.appendChild(fullArticle);
    fullArticle.showModal();
}

fetchNews();
