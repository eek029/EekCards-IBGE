/* ============================================
   EekCards - Lógica de Negócio e SRS
   PWA para Estudos do Concurso IBGE
   ============================================ */

// ============================================
// BANCO DE DADOS - Flashcards IBGE
// ============================================

const flashcardsDatabase = [
    // Código de Ética IBGE (6 cards)
    {
        id: 1,
        category: 'Ética IBGE',
        question: 'Qual o principal objetivo do Código de Ética do IBGE?',
        answer: 'Estabelecer princípios, valores e deveres que orientam a conduta dos servidores do IBGE, assegurando a transparência, imparcialidade e qualidade na produção de informações estatísticas e geocientíficas.'
    },
    {
        id: 2,
        category: 'Ética IBGE',
        question: 'De acordo com o Código de Ética, qual é o dever fundamental do servidor IBGE em relação aos dados coletados?',
        answer: 'Garantir o sigilo absoluto das informações individualizadas coletadas, utilizando-as exclusivamente para fins estatísticos, conforme determina a Lei do Sigilo Estatístico.'
    },
    {
        id: 3,
        category: 'Ética IBGE',
        question: 'É permitido ao servidor IBGE divulgar informações que identifiquem respondentes de pesquisas?',
        answer: 'NÃO. É terminantemente vedado. O sigilo é uma das premissas fundamentais da ética do IBGE, protegendo a privacidade dos informantes e garantindo a credibilidade institucional.'
    },
    {
        id: 4,
        category: 'Ética IBGE',
        question: 'Quais são os valores éticos centrais que devem nortear a conduta do servidor IBGE?',
        answer: 'Imparcialidade, transparência, qualidade, compromisso com a sociedade, respeito à diversidade e responsabilidade com o patrimônio público.'
    },
    {
        id: 5,
        category: 'Ética IBGE',
        question: 'Como o servidor IBGE deve agir ao identificar irregularidades no trabalho?',
        answer: 'Deve comunicar imediatamente aos superiores hierárquicos, agindo com responsabilidade e zelo para preservar a integridade e credibilidade da instituição.'
    },
    {
        id: 6,
        category: 'Ética IBGE',
        question: 'O que configura conflito de interesses para um servidor do IBGE?',
        answer: 'Situações onde interesses pessoais, familiares ou financeiros possam comprometer a imparcialidade e objetividade na coleta, tratamento ou divulgação de informações estatísticas e geográficas.'
    },

    // Setor Censitário (4 cards)
    {
        id: 7,
        category: 'Setor Censitário',
        question: 'O que é um Setor Censitário?',
        answer: 'É a menor unidade territorial, formada por área contínua, respeitando limites físicos-geográficos definidos, com dimensão adequada à operação de coleta do Censo, permitindo que um recenseador complete a coleta em seu território dentro do prazo estabelecido.'
    },
    {
        id: 8,
        category: 'Setor Censitário',
        question: 'Quais são os dois principais tipos de Setores Censitários quanto à localização?',
        answer: 'Setores Urbanos (localizados em áreas urbanizadas de cidades e vilas) e Setores Rurais (localizados em áreas rurais, incluindo aglomerados rurais, povoados e áreas isoladas).'
    },
    {
        id: 9,
        category: 'Setor Censitário',
        question: 'Qual é o critério fundamental para delimitação de um Setor Censitário?',
        answer: 'Deve respeitar limites físicos perceptíveis em campo (ruas, rios, ferrovias, etc.), ter área contínua, ser percorrível por um único recenseador, e conter aproximadamente 250 a 350 domicílios em área urbana.'
    },
    {
        id: 10,
        category: 'Setor Censitário',
        question: 'Por que os Setores Censitários são importantes para o planejamento do Censo?',
        answer: 'Permitem a organização operacional eficiente da coleta, facilitam o controle de qualidade, possibilitam a divulgação de dados em pequenas áreas geográficas e servem como base territorial para pesquisas e políticas públicas locais.'
    }
];

// ============================================
// CONFIGURAÇÕES E ESTADO GLOBAL
// ============================================

const studyPlan = {
    conhecimentos_tecnicos: 35,
    geografia: 30,
    portugues: 25,
    matematica: 10
};

let currentCardIndex = 0;
let isFlipped = false;
let studySession = {
    startTime: Date.now(),
    cardsStudied: 0,
    reviews: 0
};

// ============================================
// SISTEMA DE REPETIÇÃO ESPAÇADA (SM-2)
// ============================================

class SRSManager {
    constructor() {
        this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem('eekcards_progress');
        if (saved) {
            this.progress = JSON.parse(saved);
        } else {
            this.progress = {};
            flashcardsDatabase.forEach(card => {
                this.progress[card.id] = {
                    easeFactor: 2.5,
                    interval: 1,
                    repetitions: 0,
                    nextReview: Date.now(),
                    lastReviewed: null
                };
            });
            this.saveProgress();
        }

        // Inicializar tracking de performance por categoria
        this.loadCategoryPerformance();
    }

    loadCategoryPerformance() {
        const saved = localStorage.getItem('eekcards_category_performance');
        if (saved) {
            this.categoryPerformance = JSON.parse(saved);
        } else {
            this.categoryPerformance = {
                'Ética IBGE': { correct: 0, total: 0 },
                'Setor Censitário': { correct: 0, total: 0 }
            };
            this.saveCategoryPerformance();
        }
    }

    saveCategoryPerformance() {
        localStorage.setItem('eekcards_category_performance', JSON.stringify(this.categoryPerformance));
    }

    saveProgress() {
        localStorage.setItem('eekcards_progress', JSON.stringify(this.progress));
    }

    /**
     * Algoritmo SM-2 simplificado
     * @param {number} cardId - ID do flashcard
     * @param {number} quality - Qualidade da resposta (0=errei, 3=difícil, 5=fácil)
     */
    updateCard(cardId, quality) {
        const card = this.progress[cardId];
        const flashcard = flashcardsDatabase.find(c => c.id === cardId);

        // Rastrear performance por categoria
        if (flashcard && this.categoryPerformance[flashcard.category]) {
            this.categoryPerformance[flashcard.category].total++;
            if (quality >= 3) {
                this.categoryPerformance[flashcard.category].correct++;
            }
            this.saveCategoryPerformance();
        }

        // Atualizar easeFactor (fator de facilidade)
        card.easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

        if (quality < 3) {
            // Resposta difícil - recomeçar intervalo
            card.repetitions = 0;
            card.interval = 1;
        } else {
            // Resposta boa - aumentar intervalo
            if (card.repetitions === 0) {
                card.interval = 1;
            } else if (card.repetitions === 1) {
                card.interval = 6;
            } else {
                card.interval = Math.round(card.interval * card.easeFactor);
            }
            card.repetitions++;
        }

        // Calcular próxima revisão
        card.nextReview = Date.now() + (card.interval * 24 * 60 * 60 * 1000);
        card.lastReviewed = Date.now();

        this.saveProgress();

        return {
            interval: card.interval,
            nextReview: new Date(card.nextReview).toLocaleDateString('pt-BR')
        };
    }

    getDueCards() {
        const now = Date.now();
        return flashcardsDatabase.filter(card =>
            this.progress[card.id].nextReview <= now
        );
    }

    getStats() {
        const stats = {
            total: flashcardsDatabase.length,
            studied: 0,
            mastered: 0,
            avgInterval: 0
        };

        let totalInterval = 0;
        Object.values(this.progress).forEach(card => {
            if (card.repetitions > 0) stats.studied++;
            if (card.repetitions >= 3 && card.easeFactor > 2.5) stats.mastered++;
            totalInterval += card.interval;
        });

        stats.avgInterval = Math.round(totalInterval / flashcardsDatabase.length);

        return stats;
    }

    getCategoryPerformance() {
        const performance = {};
        Object.keys(this.categoryPerformance).forEach(category => {
            const data = this.categoryPerformance[category];
            performance[category] = data.total > 0
                ? Math.round((data.correct / data.total) * 100)
                : 0;
        });
        return performance;
    }
}

const srsManager = new SRSManager();

// ============================================
// TUTOR DINÂMICO
// ============================================

function getTutorAdvice() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    // Verificar se é horário de plantão noturno (19h-07h)
    const isNightShift = hour >= 19 || hour < 7;

    // Lógica simples de escala 12x36 (exemplo: plantão nos dias pares)
    const isOffDay = (now.getDate() % 3 === 0);

    let greeting = '';
    let advice = '';

    if (isNightShift) {
        greeting = '🌙 Guerreiro do Plantão!';
        advice = 'Aproveite a calma da noite para fixar os conceitos. Você está fazendo história! 💪';
    } else {
        greeting = '☀️ Bom dia, Futuro Servidor!';
        advice = 'Cada card estudado é um passo em direção à aprovação. Vamos nessa! 🎯';
    }

    if (isOffDay) {
        advice = '🏆 Dia de folga! Que tal uma sessão mais longa? Consistência é a chave da vitória!';
    }

    // Mensagens específicas por horário
    if (hour >= 5 && hour < 12) {
        greeting = '☕ Bom dia, Determinado!';
    } else if (hour >= 12 && hour < 18) {
        greeting = '⚡ Boa tarde, Focado!';
    } else if (hour >= 18 && hour < 19) {
        greeting = '🌅 Boa noite, Persistente!';
    }

    // Adicionar dicas baseadas no progresso
    const stats = srsManager.getStats();
    if (stats.studied === 0) {
        advice = 'Bem-vindo à jornada! Comece estudando os conceitos de Ética e Setor Censitário. 📚';
    } else if (stats.mastered >= 5) {
        advice = `Parabéns! Você já dominou ${stats.mastered} conceitos. Continue assim! 🚀`;
    }

    return { greeting, advice };
}

// ============================================
// INTERFACE DO FLASHCARD
// ============================================

function displayCard() {
    if (flashcardsDatabase.length === 0) return;

    const card = flashcardsDatabase[currentCardIndex];

    // Atualizar frente do card
    document.getElementById('card-category').textContent = card.category;
    document.getElementById('card-question').textContent = card.question;

    // Atualizar verso do card
    document.getElementById('card-category-back').textContent = card.category;
    document.getElementById('card-answer').textContent = card.answer;

    // Atualizar contador
    document.getElementById('card-count').textContent = `${currentCardIndex + 1}/${flashcardsDatabase.length}`;

    // Resetar flip
    isFlipped = false;
    document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    isFlipped = !isFlipped;

    if (isFlipped) {
        flashcard.classList.add('flipped');
    } else {
        flashcard.classList.remove('flipped');
    }
}

function rateCard(quality) {
    const card = flashcardsDatabase[currentCardIndex];
    const result = srsManager.updateCard(card.id, quality);

    // Atualizar estatísticas
    studySession.cardsStudied++;
    studySession.reviews++;
    updateStats();

    // Feedback visual
    showFeedback(quality, result);

    // Próximo card
    setTimeout(() => {
        nextCard();
    }, 800);
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcardsDatabase.length;
    displayCard();
}

function showFeedback(quality, result) {
    const messages = {
        0: `📚 Não desanime! Revise em ${result.interval} dia(s). A repetição leva à perfeição!`,
        3: `👍 Bom trabalho! Revise em ${result.interval} dia(s).`,
        5: `🎉 Excelente! Próxima revisão em ${result.interval} dia(s).`
    };

    // Criar notificação temporária
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #00f5ff, #b700ff);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 16px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        animation: fadeInOut 0.8s ease;
    `;
    notification.textContent = messages[quality];
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 800);
}

// ============================================
// ESTATÍSTICAS E PROGRESSO
// ============================================

function updateStats() {
    const stats = srsManager.getStats();

    document.getElementById('total-studied').textContent = stats.studied;
    document.getElementById('total-reviews').textContent = studySession.reviews;

    // Streak (dias seguidos) - implementação simplificada
    const streak = getStreak();
    document.getElementById('streak-days').textContent = streak;
}

function getStreak() {
    const lastStudy = localStorage.getItem('eekcards_last_study');
    const today = new Date().toDateString();

    if (!lastStudy) {
        localStorage.setItem('eekcards_last_study', today);
        localStorage.setItem('eekcards_streak', '1');
        return 1;
    }

    const lastDate = new Date(lastStudy);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    let streak = parseInt(localStorage.getItem('eekcards_streak') || '0');

    if (diffDays === 0) {
        // Mesmo dia
        return streak;
    } else if (diffDays === 1) {
        // Dia consecutivo
        streak++;
    } else {
        // Quebrou a sequência
        streak = 1;
    }

    localStorage.setItem('eekcards_last_study', today);
    localStorage.setItem('eekcards_streak', streak.toString());

    return streak;
}

let performanceChart = null; // Variável global para o gráfico

function showStats() {
    const stats = srsManager.getStats();
    const categoryPerformance = srsManager.getCategoryPerformance();
    const modal = document.getElementById('stats-modal');
    const detailsContainer = document.getElementById('detailed-stats');

    detailsContainer.innerHTML = `
        <div style="display: grid; gap: 1rem;">
            <div style="background: rgba(0, 245, 255, 0.1); padding: 1rem; border-radius: 12px; border: 1px solid rgba(0, 245, 255, 0.3);">
                <div style="font-size: 2rem; font-weight: 700; color: #00f5ff;">${stats.studied}/${stats.total}</div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.875rem;">Cards Estudados</div>
            </div>
            
            <div style="background: rgba(0, 255, 136, 0.1); padding: 1rem; border-radius: 12px; border: 1px solid rgba(0, 255, 136, 0.3);">
                <div style="font-size: 2rem; font-weight: 700; color: #00ff88;">${stats.mastered}</div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.875rem;">Conceitos Dominados</div>
            </div>
            
            <div style="background: rgba(183, 0, 255, 0.1); padding: 1rem; border-radius: 12px; border: 1px solid rgba(183, 0, 255, 0.3);">
                <div style="font-size: 2rem; font-weight: 700; color: #b700ff;">${stats.avgInterval} dias</div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.875rem;">Intervalo Médio</div>
            </div>
            
            <div style="background: rgba(255, 102, 0, 0.1); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255, 102, 0, 0.3);">
                <div style="font-size: 2rem; font-weight: 700; color: #ff6600;">${studySession.reviews}</div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.875rem;">Revisões Hoje</div>
            </div>
        </div>
        
        <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 12px;">
            <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">💡 Dica do Tutor</h3>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.875rem;">
                Continue revisando diariamente. O algoritmo SRS otimiza seu aprendizado mostrando cards no momento ideal para fixação!
            </p>
        </div>
    `;

    // Criar/Atualizar gráfico de performance
    createPerformanceChart(categoryPerformance);

    modal.classList.add('active');
}

function createPerformanceChart(categoryPerformance) {
    const ctx = document.getElementById('performanceChart');

    if (!ctx) return;

    // Destruir gráfico anterior se existir
    if (performanceChart) {
        performanceChart.destroy();
    }

    const categories = Object.keys(categoryPerformance);
    const values = Object.values(categoryPerformance);

    performanceChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Taxa de Acerto (%)',
                data: values,
                backgroundColor: 'rgba(0, 245, 255, 0.2)',
                borderColor: 'rgba(0, 245, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 245, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 245, 255, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 22, 22, 0.9)',
                    titleColor: '#00f5ff',
                    bodyColor: '#ffffff',
                    borderColor: '#00f5ff',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return `Taxa de Acerto: ${context.parsed.r}%`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: 'rgba(255, 255, 255, 0.5)',
                        backdropColor: 'transparent',
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        circular: true
                    },
                    pointLabels: {
                        color: '#ffffff',
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function closeModal() {
    document.getElementById('stats-modal').classList.remove('active');
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function resetProgress() {
    if (confirm('⚠️ Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('eekcards_progress');
        localStorage.removeItem('eekcards_category_performance');
        localStorage.removeItem('eekcards_last_study');
        localStorage.removeItem('eekcards_streak');
        location.reload();
    }
}

function exportData() {
    const data = {
        progress: srsManager.progress,
        stats: srsManager.getStats(),
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eekcards_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    alert('✅ Backup exportado com sucesso! Guarde este arquivo em local seguro.');
}

function updateConnectionStatus() {
    const statusElement = document.getElementById('connection-status');
    const statusDot = statusElement.querySelector('.status-dot');
    const statusText = statusElement.querySelector('.status-text');

    if (navigator.onLine) {
        statusText.textContent = 'Online';
        statusDot.classList.remove('offline');
    } else {
        statusText.textContent = 'Offline';
        statusDot.classList.add('offline');
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

function initApp() {
    // Atualizar tutor
    const tutorInfo = getTutorAdvice();
    document.getElementById('tutor-greeting').textContent = tutorInfo.greeting;
    document.getElementById('tutor-advice').textContent = tutorInfo.advice;

    // Exibir primeiro card
    displayCard();

    // Atualizar estatísticas
    updateStats();

    // Status de conexão
    updateConnectionStatus();

    // Event listeners
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('✅ Service Worker registrado:', reg))
            .catch(err => console.error('❌ Erro ao registrar Service Worker:', err));
    }

    console.log('🎯 EekCards inicializado com sucesso!');
    console.log(`📚 ${flashcardsDatabase.length} flashcards carregados`);
    console.log('💾 Dados salvos localmente - funciona 100% offline!');
}

// Adicionar animação de fade-in para o CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Iniciar app quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
