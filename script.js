/* ============================================
   EekCards - Lógica de Negócio e SRS
   PWA para Estudos do Concurso IBGE
   ============================================ */

// ============================================
// BANCO DE DADOS - Flashcards IBGE
// ============================================

const flashcardsDatabase = [
    // --- ÉTICA NO SERVIÇO PÚBLICO (25 cards) ---
    { id: 1, category: 'Ética', question: "O que é o 'Primado do Bem Comum'?", answer: "A consciência de que o trabalho do servidor é integrado na vida da comunidade." },
    { id: 2, category: 'Ética', question: "A moralidade administrativa se limita à distinção entre bem e mal?", answer: "Não. Deve ser acrescida da ideia de que o fim é sempre o Bem Comum." },
    { id: 3, category: 'Ética', question: "Qual o valor da transparência para a administração pública?", answer: "A publicidade dos atos administrativos é requisito de eficácia e moralidade." },
    { id: 4, category: 'Ética', question: "O que é a 'Verdade' no serviço público?", answer: "O servidor não pode omitir a verdade, mesmo que contrária aos seus interesses ou da administração." },
    { id: 5, category: 'Ética', question: "Dano moral ao cidadão gera que tipo de infração?", answer: "Infração ética grave, pois o servidor deve tratar todos com cortesia e urbanidade." },
    { id: 6, category: 'Ética', question: "O que diz o Código sobre o sigilo estatístico?", answer: "As informações individuais de pessoas/empresas são confidenciais e usadas apenas para estatística." },
    { id: 7, category: 'Ética', question: "É permitido ao servidor aceitar presentes?", answer: "Não. É vedado aceitar presentes, doações ou vantagens de qualquer espécie." },
    { id: 8, category: 'Ética', question: "Qual a função da Comissão de Ética do IBGE?", answer: "Orientar, aconselhar e aplicar a pena de Censura ao servidor." },
    { id: 9, category: 'Ética', question: "O trabalho externo do servidor é considerado serviço público?", answer: "Sim. O servidor é servidor inclusive fora do horário e local de trabalho para fins éticos." },
    { id: 10, category: 'Ética', question: "O que é o 'conflito de interesses'?", answer: "Situação em que o interesse privado pode influenciar o cumprimento do dever público." },
    { id: 11, category: 'Ética', question: "Qual o principal objetivo do Código de Ética do IBGE?", answer: "Estabelecer princípios, valores e deveres que orientam a conduta dos servidores do IBGE, assegurando a transparência, imparcialidade e qualidade." },
    { id: 12, category: 'Ética', question: "O servidor pode usar cargo para obter vantagens?", answer: "Não. É vedado usar o cargo ou função para lograr proveito pessoal ou para terceiros." },
    { id: 13, category: 'Ética', question: "A cortesia no atendimento é opcional?", answer: "Não. É dever funcional tratar todos com respeito, cortesia e atenção." },
    { id: 14, category: 'Ética', question: "O que caracteriza nepotismo?", answer: "Nomeação de parentes para cargos ou funções públicas, violando a impessoalidade." },
    { id: 15, category: 'Ética', question: "O servidor pode ser punido por conduta fora do trabalho?", answer: "Sim, se a conduta afetar a dignidade da função pública ou desrespeitar valores éticos." },
    { id: 16, category: 'Ética', question: "Qual a importância da imparcialidade?", answer: "Garante tratamento igualitário e decisões baseadas em critérios técnicos, não em preferências pessoais." },
    { id: 17, category: 'Ética', question: "O que é assiduidade no serviço público?", answer: "Dever de comparecimento regular ao trabalho, cumprindo horários e prazos estabelecidos." },
    { id: 18, category: 'Ética', question: "Servidor pode omitir irregularidades?", answer: "Não. Deve comunicar imediatamente qualquer irregularidade de que tenha conhecimento." },
    { id: 19, category: 'Ética', question: "O que caracteriza a probidade administrativa?", answer: "Agir com honestidade, integridade e lealdade às instituições públicas." },
    { id: 20, category: 'Ética', question: "Pode usar informações privilegiadas?", answer: "Não. É vedado usar informações obtidas no cargo para benefício próprio ou alheio." },
    { id: 21, category: 'Ética', question: "O que é zelo no serviço público?", answer: "Dedicação e cuidado na execução das tarefas, buscando excelência e qualidade." },
    { id: 22, category: 'Ética', question: "Servidor pode receber comissão de fornecedores?", answer: "Não. É vedado receber qualquer vantagem de fornecedores ou interessados." },
    { id: 23, category: 'Ética', question: "O que é a responsabilidade no serviço público?", answer: "Assumir as consequências de seus atos e decisões perante a sociedade." },
    { id: 24, category: 'Ética', question: "Pode retardar procedimento sem motivo justo?", answer: "Não. É dever dar andamento a processos e documentos na ordem cronológica." },
    { id: 25, category: 'Ética', question: "O que caracteriza conduta exemplar?", answer: "Ser referência de integridade, eficiência e respeito aos princípios éticos." },

    // --- CONHECIMENTOS TÉCNICOS: OPERAÇÃO E COLETA (40 cards) ---
    { id: 26, category: 'Técnico', question: "O que é o Setor Censitário?", answer: "A menor unidade territorial de trabalho para fins de controle e coleta." },
    { id: 27, category: 'Técnico', question: "O que é um Domicílio Particular Permanente?", answer: "Local construído para fins de habitação, ocupado na data de referência." },
    { id: 28, category: 'Técnico', question: "O que caracteriza um Morador?", answer: "Pessoa que tem o domicílio como local habitual de residência." },
    { id: 29, category: 'Técnico', question: "O que é o DMC?", answer: "Dispositivo Móvel de Coleta, o equipamento usado pelo agente em campo." },
    { id: 30, category: 'Técnico', question: "O que é a Data de Referência?", answer: "Instante exato ao qual os dados coletados devem se referir (ex: meia-noite de tal dia)." },
    { id: 31, category: 'Técnico', question: "O que é um Setor de Aglomerado Subnormal?", answer: "Assentamentos irregulares (favelas, invasões) que exigem coleta especial." },
    { id: 32, category: 'Técnico', question: "O que deve ser feito se o morador recusar a entrevista?", answer: "O agente deve manter a cortesia, explicar a importância e, se persistir, comunicar ao supervisor." },
    { id: 33, category: 'Técnico', question: "Qual a função do Questionário Básico?", answer: "Coletar características principais do domicílio e de todos os moradores." },
    { id: 34, category: 'Técnico', question: "O que é a 'Unidade de Visita'?", answer: "A estrutura física (casa, apto) que o agente identifica e registra no DMC." },
    { id: 35, category: 'Técnico', question: "Pode-se preencher dados por estimativa?", answer: "Jamais. Todos os dados devem ser obtidos via entrevista direta ou informante qualificado." },
    { id: 36, category: 'Técnico', question: "O que é o Mapa do Setor?", answer: "Representação gráfica do setor que orienta o agente sobre os limites de trabalho." },
    { id: 37, category: 'Técnico', question: "O que caracteriza um Domicílio Coletivo?", answer: "Instituições como hotéis, hospitais, quartéis e presídios onde a relação é de norma." },
    { id: 38, category: 'Técnico', question: "Quais são os dois tipos de setores quanto à localização?", answer: "Setores Urbanos (áreas urbanizadas) e Setores Rurais (áreas rurais e aglomerados)." },
    { id: 39, category: 'Técnico', question: "Critério fundamental para delimitação de setor?", answer: "Respeitar limites físicos perceptíveis em campo (ruas, rios, ferrovias)." },
    { id: 40, category: 'Técnico', question: "Quantos domicílios aproximadamente deve ter um setor urbano?", answer: "Aproximadamente 250 a 350 domicílios." },
    { id: 41, category: 'Técnico', question: "O que é um informante qualificado?", answer: "Pessoa capaz de fornecer informações sobre o domicílio e seus moradores." },
    { id: 42, category: 'Técnico', question: "O que são os limites do setor?", answer: "Fronteiras geográficas definidas que delimitam a área de trabalho do recenseador." },
    { id: 43, category: 'Técnico', question: "O que se registra sobre cada domicílio?", answer: "Localização, características, condições de ocupação e dados dos moradores." },
    { id: 44, category: 'Técnico', question: "O que é controle de qualidade na coleta?", answer: "Supervisão sistemática para garantir precisão, completude e consistência dos dados." },
    { id: 45, category: 'Técnico', question: "Quando deve ser feita revisita?", answer: "Quando houver recusa, ausência de moradores ou necessidade de complementar dados." },
    { id: 46, category: 'Técnico', question: "O que é croqui do setor?", answer: "Desenho esquemático detalhado das quadras e domicílios do setor." },
    { id: 47, category: 'Técnico', question: "Como identificar um domicílio vago?", answer: "Imóvel sem moradores na data de referência, mas em condições de ser habitado." },
    { id: 48, category: 'Técnico', question: "O que é endereço de referência?", answer: "Localização geográfica exata do domicílio com logradouro, número e complemento." },
    { id: 49, category: 'Técnico', question: "Qual a importância do sigilo na coleta?", answer: "Proteger a privacidade dos informantes e garantir a credibilidade institucional." },
    { id: 50, category: 'Técnico', question: "O que fazer com domicílio fechado?", answer: "Tentar contato em diferentes horários e, persistindo, consultar vizinhos ou síndico." },
    { id: 51, category: 'Técnico', question: "O que é área de ponderação?", answer: "Agrupamento de setores censitários para fins de divulgação de resultados amostrais." },
    { id: 52, category: 'Técnico', question: "Como proceder com endereço inexistente?", answer: "Registrar como não encontrado e reportar ao supervisor para verificação." },
    { id: 53, category: 'Técnico', question: "O que é sincronização de dados?", answer: "Envio periódico das informações coletadas do DMC para o sistema central." },
    { id: 54, category: 'Técnico', question: "Quando usar questionário da amostra?", answer: "Apenas nos domicílios selecionados pela metodologia estatística do IBGE." },
    { id: 55, category: 'Técnico', question: "O que é crítica no DMC?", answer: "Validação automática que identifica inconsistências nos dados durante a coleta." },
    { id: 56, category: 'Técnico', question: "Como tratar dados sensíveis?", answer: "Com absoluto sigilo, sem compartilhar informações individualizadas." },
    { id: 57, category: 'Técnico', question: "O que é cobertura censitária?", answer: "Garantia de que todos os domicílios e pessoas foram identificados e pesquisados." },
    { id: 58, category: 'Técnico', question: "Prazo típico de coleta em um setor?", answer: "Varia conforme densidade, mas geralmente de 2 a 4 semanas." },
    { id: 59, category: 'Técnico', question: "O que fazer se encontrar domicílio novo?", answer: "Incluir na coleta e reportar ao supervisor para atualização da base territorial." },
    { id: 60, category: 'Técnico', question: "O que é face de quadra?", answer: "Lado ou trecho de quarteirão delimitado por esquinas ou mudanças de direção." },
    { id: 61, category: 'Técnico', question: "Como identificar domicílios coletivos?", answer: "Verificar relação institucional entre moradores e ausência de laços familiares." },
    { id: 62, category: 'Técnico', question: "O que registrar sobre domicílio de uso ocasional?", answer: "Domicílio que serve para descanso de fins de semana ou férias, sem morador permanente." },
    { id: 63, category: 'Técnico', question: "Diferença entre residente e morador?", answer: "Morador tem residência habitual; residente pode estar temporariamente no local." },
    { id: 64, category: 'Técnico', question: "O que é importância do GPS no DMC?", answer: "Permite georreferenciamento preciso dos domicílios visitados." },
    { id: 65, category: 'Técnico', question: "Como proceder com condomínios?", answer: "Identificar cada unidade autônoma como domicílio independente." },

    // --- GEOGRAFIA (30 cards) ---
    { id: 66, category: 'Geografia', question: "O que são as Regiões Geográficas Imediatas?", answer: "Divisões que têm a rede urbana e centros regionais como base de integração." },
    { id: 67, category: 'Geografia', question: "Qual a diferença entre Relevo e Solo?", answer: "Relevo é a forma da superfície terrestre; Solo é a camada superficial decomposta." },
    { id: 68, category: 'Geografia', question: "O que é Urbanização?", answer: "Processo de crescimento da população urbana superior ao crescimento da população rural." },
    { id: 69, category: 'Geografia', question: "O que caracteriza o Clima Semiárido no Brasil?", answer: "Baixas precipitações e temperaturas elevadas, comum no Sertão Nordestino." },
    { id: 70, category: 'Geografia', question: "O que é o Bioma Cerrado?", answer: "Savana brasileira, com árvores de troncos retorcidos e cascas grossas." },
    { id: 71, category: 'Geografia', question: "Qual a maior bacia hidrográfica do mundo presente no Brasil?", answer: "Bacia Amazônica." },
    { id: 72, category: 'Geografia', question: "O que é o IBGE?", answer: "Instituto Brasileiro de Geografia e Estatística, principal provedor de dados do país." },
    { id: 73, category: 'Geografia', question: "O que é Densidade Demográfica?", answer: "Razão entre o número de habitantes e a área do território (hab/km²)." },
    { id: 74, category: 'Geografia', question: "O que são as Metrópoles?", answer: "Centros urbanos de grande porte com influência nacional ou regional." },
    { id: 75, category: 'Geografia', question: "O que é o Crescimento Vegetativo?", answer: "Diferença entre a taxa de natalidade e a taxa de mortalidade." },
    { id: 76, category: 'Geografia', question: "Quais as 5 regiões brasileiras?", answer: "Norte, Nordeste, Centro-Oeste, Sudeste e Sul." },
    { id: 77, category: 'Geografia', question: "O que é a Amazônia Legal?", answer: "Área que engloba nove estados para fins de planejamento e desenvolvimento." },
    { id: 78, category: 'Geografia', question: "O que caracteriza o Bioma Mata Atlântica?", answer: "Floresta tropical úmida da costa brasileira, altamente biodiversa e ameaçada." },
    { id: 79, category: 'Geografia', question: "O que é o Pantanal?", answer: "Maior planície inundável do mundo, localizada no Centro-Oeste." },
    { id: 80, category: 'Geografia', question: "O que é migração pendular?", answer: "Deslocamento diário entre município de residência e trabalho/estudo." },
    { id: 81, category: 'Geografia', question: "O que é conurbação?", answer: "Fusão de áreas urbanas de municípios vizinhos formando mancha urbana contínua." },
    { id: 82, category: 'Geografia', question: "Diferença entre clima e tempo?", answer: "Clima é padrão de longo prazo; tempo é condição atmosférica momentânea." },
    { id: 83, category: 'Geografia', question: "O que é o Polígono das Secas?", answer: "Região do Nordeste caracterizada por estiagens prolongadas e irregularidade de chuvas." },
    { id: 84, category: 'Geografia', question: "O que são as Regiões Metropolitanas?", answer: "Conjuntos de municípios integrados econômica e socialmente a uma metrópole." },
    { id: 85, category: 'Geografia', question: "O que é êxodo rural?", answer: "Migração de pessoas do campo para as cidades." },
    { id: 86, category: 'Geografia', question: "O que caracteriza o Clima Equatorial?", answer: "Temperaturas elevadas e chuvas abundantes durante todo o ano." },
    { id: 87, category: 'Geografia', question: "O que é a Caatinga?", answer: "Bioma exclusivamente brasileiro com vegetação adaptada à seca." },
    { id: 88, category: 'Geografia', question: "O que é transição demográfica?", answer: "Mudança de altas para baixas taxas de natalidade e mortalidade." },
    { id: 89, category: 'Geografia', question: "O que são as Mesorregiões?", answer: "Subdivisões dos estados que guardam especificidades geográficas e econômicas." },
    { id: 90, category: 'Geografia', question: "O que é inversão térmica?", answer: "Fenômeno onde camada de ar frio fica abaixo de ar quente, prendendo poluentes." },
    { id: 91, category: 'Geografia', question: "O que caracteriza o Pampa?", answer: "Bioma de campos do sul do Brasil, com vegetação rasteira." },
    { id: 92, category: 'Geografia', question: "O que é a Taxa de Fecundidade?", answer: "Número médio de filhos por mulher em idade reprodutiva." },
    { id: 93, category: 'Geografia', question: "O que é o Aquífero Guarani?", answer: "Uma das maiores reservas de água subterrânea do mundo." },
    { id: 94, category: 'Geografia', question: "O que caracteriza o planalto?", answer: "Superfície elevada e relativamente plana, com bordas mais altas que o centro." },
    { id: 95, category: 'Geografia', question: "O que é bacia hidrográfica?", answer: "Área drenada por um rio principal e seus afluentes." },

    // --- PORTUGUÊS: FOCO EM GRAMÁTICA E INTERPRETAÇÃO (15 cards) ---
    { id: 96, category: 'Português', question: "Qual a função da vírgula em enumerações?", answer: "Separar elementos de mesma função sintática em uma lista." },
    { id: 97, category: 'Português', question: "O que é 'Coesão Textual'?", answer: "A ligação lógica entre as partes do texto através de conectivos." },
    { id: 98, category: 'Português', question: "Sinônimo de 'Paulatinamente'?", answer: "Gradualmente; aos poucos." },
    { id: 99, category: 'Português', question: "O que é o sentido Conotativo?", answer: "O sentido figurado, subjetivo das palavras." },
    { id: 100, category: 'Português', question: "Regência do verbo 'Visar' (no sentido de objetivo)?", answer: "É transitivo indireto (quem visa, visa A alguma coisa)." },
    { id: 101, category: 'Português', question: "O que é sujeito indeterminado?", answer: "Quando não se pode ou não se quer identificar quem pratica a ação." },
    { id: 102, category: 'Português', question: "Diferença entre 'mal' e 'mau'?", answer: "Mal é advérbio (oposto de bem); Mau é adjetivo (oposto de bom)." },
    { id: 103, category: 'Português', question: "O que é aposto?", answer: "Termo que explica, resume ou especifica outro termo da oração." },
    { id: 104, category: 'Português', question: "Quando usar 'há' ou 'a' indicando tempo?", answer: "Há indica tempo passado; A indica tempo futuro." },
    { id: 105, category: 'Português', question: "O que é predicado nominal?", answer: "Aquele cujo núcleo é um nome (substantivo, adjetivo) ligado por verbo de ligação." },
    { id: 106, category: 'Português', question: "O que é polissemia?", answer: "Capacidade de uma palavra ter múltiplos significados." },
    { id: 107, category: 'Português', question: "Diferença entre 'onde' e 'aonde'?", answer: "Onde indica permanência; Aonde indica movimento (destino)." },
    { id: 108, category: 'Português', question: "O que é oração subordinada?", answer: "Oração que depende sintaticamente de outra (principal) para ter sentido completo." },
    { id: 109, category: 'Português', question: "O que é ambiguidade?", answer: "Duplo sentido causado por má construção da frase." },
    { id: 110, category: 'Português', question: "Plural de 'cidadão'?", answer: "Cidadãos." }
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
            // Adicionar categorias que possam estar faltando
            const categories = ['Ética', 'Técnico', 'Geografia', 'Português'];
            categories.forEach(cat => {
                if (!this.categoryPerformance[cat]) {
                    this.categoryPerformance[cat] = { correct: 0, total: 0 };
                }
            });
        } else {
            this.categoryPerformance = {
                'Ética': { correct: 0, total: 0 },
                'Técnico': { correct: 0, total: 0 },
                'Geografia': { correct: 0, total: 0 },
                'Português': { correct: 0, total: 0 }
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
