document.getElementById('avaliacaoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const recursos = ['intencao', 'corpo', 'voz', 'fala', 'conteudo', 'atitude'];
    const recursoNames = ['Intenção', 'Expressão Corporal', 'Expressão Vocal', 'Fala', 'Conteúdo', 'Atitudes'];
    let totalScore = 0;
    let scores = [];
    let allAnswered = true;
    recursos.forEach((recurso, index) => {
        const selected = document.querySelector(`input[name="${recurso}"]:checked`);
        if (selected) {
            const score = parseInt(selected.value);
            scores.push({name: recursoNames[index], score: score});
            totalScore += score;
        } else {
            allAnswered = false;
        }
    });
    if (!allAnswered) {
        alert('Por favor, avalie todos os 6 Recursos Comunicativos.');
        return;
    }
    displayResults(scores, totalScore);
});

const form = e.target;
const formData = new FormData(form);
fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
});

function displayResults(scores, totalScore) {
    const resultsDiv = document.getElementById('results');
    const scoreBreakdown = document.getElementById('scoreBreakdown');
    const totalScoreDiv = document.getElementById('totalScore');
    const interpretaDiv = document.getElementById('interpreta');
    scoreBreakdown.innerHTML = '';
    scores.forEach(score => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `<h4>${score.name}</h4><div class="score-value">${score.score}/5</div>`;
        scoreBreakdown.appendChild(scoreItem);
    });
    const maxScore = 30;
    const percentage = Math.round((totalScore / maxScore) * 100);
    totalScoreDiv.innerHTML = `<h2>Pontuação Total: ${totalScore}/${maxScore}</h2><p>${percentage}% de aproveitamento</p>`;
    let interpreta = '';
    if (percentage >= 90) {
        interpreta = 'Excelente! Você demonstra habilidades de comunicação excepcionais. Continue desenvolvendo essas competências e considere compartilhar suas técnicas com outros.';
    } else if (percentage >= 75) {
        interpreta = 'Muito bom! Suas habilidades de comunicação são sólidas. Identifique os aspectos com menor pontuação e foque no desenvolvimento dessas áreas específicas.';
    } else if (percentage >= 60) {
        interpreta = 'Bom! Você tem uma base sólida de comunicação, mas há espaço para melhorias significativas. Considere treinamentos específicos nos aspectos com menor pontuação.';
    } else if (percentage >= 45) {
        interpreta = 'Regular. Suas habilidades de comunicação precisam de desenvolvimento. Recomenda-se buscar cursos, workshops ou coaching em comunicação.';
    } else {
        interpreta = 'Abaixo do esperado. É importante investir urgentemente no desenvolvimento das habilidades de comunicação. Considere buscar ajuda profissional especializada.';
    }
    interpretaDiv.innerHTML = `<h4>Interpretação dos Resultados</h4><p>${interpreta}</p>`;
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}