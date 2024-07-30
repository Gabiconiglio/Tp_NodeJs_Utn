function generateArticlesHtml(articlesCollection) {
    return articlesCollection.map(article => `
        <div>
            <h4>${article.title}</h4>
            <p>Id: ${article.id}</p>
            <p>Brand: ${article.brand}</p>
            <p>Type: ${article.type}</p>
            ${article.capacity ? `<p>Capacity: ${article.capacity}</p>` : `<p>Cores: ${article.cores}</p>`}
            ${article.speed ? `<p>Speed: ${article.speed}</p>` : `<p>Clock Speed: ${article.clockSpeed}</p>`}
            ${article.casLatency ? `<p>CasLatency: ${article.casLatency}</p>` : ``}
            ${article.memory ? `<p>Memory: ${article.memory}</p>` : ``}
            ${article.chipset ? `<p>Chipset: ${article.chipset}</p>` : ``}
            ${article.description ? `<p>Description: ${article.description}</p>` : ``}
            <p>Url: <a href="${article.image}" target="_blank">${article.image}</a></p>
            <p>Stock: ${article.stock}</p>
            <p>Rating: ${article.rating}</p>
            <p>Price: $${article.price}</p>
        </div>
    `).join('');
}

module.exports={generateArticlesHtml};