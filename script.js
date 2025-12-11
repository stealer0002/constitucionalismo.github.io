/**
 * =================================================================================
 * ARQUITETURA DE SISTEMA - CONSTITUCIONAL 2026 [FINAL GOLD MASTER]
 * =================================================================================
 * 
 * Engenharia: Vanilla JS SPA
 * Conteúdo: Tratado de Direito Constitucional Avançado (Integral)
 * Features: 
 *   - Busca Insensitive (Ignora acentos e maiúsculas)
 *   - Deep Linking (Sincronização de estado via URL)
 *   - XSS Protection (Sanitização de HTML via Utils)
 *   - Performance (Debounce e Event Delegation)
 * 
 * =================================================================================
 */

'use strict';

/* =========================================
   1. CONSTANTS & CONFIG
   ========================================= */
const CONFIG = {
    selectors: {
        timelineContainer: '#timeline-container',
        lessonsGrid: '#lessons-grid',
        biblioContainer: '#biblio-container',
        infoList: '#info-list-container',
        searchOriginal: '#lesson-search',
        searchCounter: '#search-counter',
        emptyState: '#search-empty-state',
        scrollProgress: '#scroll-progress',
        nav: '#main-nav',
        mobileToggle: '.mobile-toggle',
        mobileOverlay: '.mobile-menu-overlay',
        closeMenu: '.close-menu'
    },
    animation: {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px'
    }
};

/* =========================================
   2. DATA LAYER (ENCICLOPÉDIA CONSTITUCIONAL)
   ========================================= */
const CourseRepository = {
    getInfo: () => ({
        curso: "4 100 - DIREITO",
        disciplina: "16913 - CONSTITUIÇÃO FEDERAL",
        cargaHoraria: "107h",
        semestre: "2º semestre de 2026",
        metodologia: "Ensino de Alta Performance baseado na dogmática alemã/brasileira e na análise profunda de Leading Cases do STF. Foco na transição do Estado Liberal para o Estado Democrático de Direito.",
        avaliacao: [
            "M1: Avaliação Dogmática (Aulas 1-8) - Teoria Geral, Direitos Fundamentais e Federalismo.",
            "M2: Avaliação Dogmática (Aulas 10-17) - Separação de Poderes, Processo Legislativo e Controle de Constitucionalidade."
        ]
    }),

    getBibliography: () => [
        { title: "Tratado de Direito Constitucional Avançado", author: "CORPO DOCENTE", detail: "Material Base 2026 (Análise Dogmática)" },
        { title: "Curso de Direito Constitucional", author: "MENDES, Gilmar; BRANCO, Paulo G.", detail: "Jurisprudência Comentada e Doutrina Alemã" },
        { title: "Teoria dos Direitos Fundamentais", author: "ALEXY, Robert", detail: "Teoria da Argumentação Jurídica e Colisão" },
        { title: "Hermenêutica Constitucional", author: "HÄBERLE, Peter", detail: "A Sociedade Aberta dos Intérpretes da Constituição" },
        { title: "Direito Constitucional", author: "MORAES, Alexandre de", detail: "Doutrina Clássica e Pragmática" }
    ],

    getTimeline: () => [
        { id: 1, title: "", content: "Teoria Geral dos Direitos Fundamentais e Estrutura Normativa de Defesa." },
        { id: 2, title: "", content: "A Eficácia dos Direitos Individuais e o Direito à Vida." },
        { id: 3, title: "", content: "Liberdades do Pensamento e a Vedação à Tortura." },
        { id: 4, title: "", content: "Privacidade, Inviolabilidade e Direitos de Associação." },
        { id: 5, title: "", content: "Garantias Processuais e Judiciais." },
        { id: 6, title: "", content: "Nacionalidade e Tratados Internacionais." },
        { id: 7, title: "", content: "Direitos Políticos e Inelegibilidades." },
        { id: 8, title: "", content: "Organização Político-Administrativa e Federalismo." },
        { id: "M1", title: "", content: "Revisão e avaliação aprofundada dos tópicos das aulas 1 a 8.", type: "highlight" },
        { id: 10, title: "", content: "Defesa do Estado e das Instituições Democráticas." },
        { id: 11, title: "", content: "Organização dos Poderes e Funções Essenciais." },
        { id: 12, title: "", content: "Processo Legislativo e Medidas Provisórias." },
        { id: 13, title: "", content: "Tutela das Liberdades: Habeas Corpus e Habeas Data." },
        { id: 14, title: "", content: "Mandado de Segurança (MS)." },
        { id: 15, title: "", content: "Mandado de Injunção e Ação Popular." },
        { id: 16, title: "", content: "Controle de Constitucionalidade: Conceitos e Espécies." },
        { id: 17, title: "", content: "Controle Repressivo Judicial: Difuso e Concentrado." },
        { id: "M2", title: "", content: "Foco em Processo Legislativo e Teoria Geral do Controle.", type: "highlight" },
        { id: 19, title: "", content: "Ações do Controle Concentrado (ADI, ADO, ADC, ADPF)." },
        { id: 20, title: "", content: "Revisão Final e Síntese do Curso." }
    ],

    getDidacticLessons: () => [
        {
            aula: "01",
            titulo: "Teoria Geral e Estrutura Normativa",
            conceitos: [
                "<strong>Dupla Dimensão dos Direitos (Subjetiva e Objetiva):</strong> Superação da visão liberal clássica. Sob a ótica subjetiva, conferem ao indivíduo a prerrogativa de exigir comportamentos (ações/omissões) do Estado. Sob a ótica objetiva, funcionam como a base axiológica fundamental de todo o ordenamento jurídico, condicionando a interpretação de todas as normas infraconstitucionais.",
                "<strong>Natureza Jurídica (Robert Alexy):</strong> Distinção estrutural entre Regras e Princípios. Direitos fundamentais frequentemente assumem a forma de <em>Princípios</em> (mandamentos de otimização). Em caso de colisão, não se usa a revogação (antinomia), mas a técnica da <strong>Ponderação (Abwägung)</strong> baseada no postulado da Proporcionalidade (adequação, necessidade e proporcionalidade em sentido estrito).",
                "<strong>Teoria das Dimensões (Paulo Bonavides):</strong> Preferência terminológica sobre 'Gerações', indicando que novos direitos não substituem os anteriores, mas se acumulam. <br>• 1ª Dimensão: Liberdade (Civis/Políticos - Status Negativus). <br>• 2ª Dimensão: Igualdade (Sociais/Econômicos - Status Positivus). <br>• 3ª Dimensão: Fraternidade (Difusos/Coletivos). <br>• 4ª/5ª Dimensões: Bioética, pluralismo e democracia digital."
            ],
            tags: ["alexy", "dimensões", "ponderação", "bonavides", "regras e princípios", "subjetiva", "objetiva"]
        },
        {
            aula: "02",
            titulo: "Eficácia e Direito à Vida",
            conceitos: [
                "<strong>Eficácia Horizontal (Drittwirkung):</strong> Os direitos fundamentais irradiam efeitos diretos nas relações entre particulares, especialmente onde há assimetria de poder. <em>Leading Case:</em> <strong>RE 201.819 (União Brasileira de Compositores)</strong>, onde o STF garantiu o devido processo legal na exclusão de um associado de entidade privada.",
                "<strong>Células-Tronco (ADI 3510):</strong> O STF julgou constitucional a Lei de Biossegurança. Prevaleceu a tese de que o embrião <em>in vitro</em> não implantado não possui a mesma proteção jurídica da pessoa nascida viva, devendo o direito à vida ser ponderado com o direito à saúde e ao progresso científico.",
                "<strong>Anencefalia (ADPF 54):</strong> O STF descriminalizou a antecipação terapêutica do parto de fetos anencéfalos. Entendeu-se ser um fato atípico (não é aborto), fundamentado na inviabilidade de vida extrauterina e na dignidade da gestante, equiparando a gestação compulsória à tortura psicológica.",
                "<strong>Aborto e 1º Trimestre (HC 124.306):</strong> Decisão da 1ª Turma (não vinculante erga omnes) sinalizou que a criminalização do aborto nos três primeiros meses violaria os direitos fundamentais da mulher (autonomia, integridade física e psíquica), propondo uma interpretação conforme a Constituição."
            ],
            tags: ["vida", "aborto", "anencefalia", "eficacia horizontal", "drittwirkung", "bioética", "adi 3510"]
        },
        {
            aula: "03",
            titulo: "Liberdades e Vedação à Tortura",
            conceitos: [
                "<strong>Tortura (Direito Absoluto):</strong> A Constituição de 1988 repudia a tortura de forma absoluta (Art. 5º, III). Diferente de outros direitos que admitem ponderação, a vedação à tortura e ao tratamento desumano reflete a dignidade da pessoa humana como 'superprincípio', sendo crime inafiançável e insuscetível de graça ou anistia.",
                "<strong>Hate Speech (Caso Ellwanger - HC 82.424):</strong> O STF decidiu que a liberdade de expressão não protege o discurso de ódio. Siegfried Ellwanger foi condenado por racismo (antissemitismo). O Tribunal definiu que 'racismo' é um conceito político-social de dominação, não biológico, e que direitos não podem servir de escudo para práticas ilícitas.",
                "<strong>Homotransfobia (ADO 26):</strong> Diante da inércia do Congresso, o STF enquadrou as condutas de homofobia e transfobia nos tipos penais definidos na Lei de Racismo (Lei 7.716/89), até que sobrevenha legislação específica (Omissão Inconstitucional).",
                "<strong>Escusa de Consciência (Art. 5º, VIII):</strong> O Estado protege a liberdade de crença. O indivíduo pode recusar-se a cumprir obrigação legal a todos imposta, desde que cumpra <em>prestação alternativa</em> fixada em lei. A recusa de ambas acarreta a perda (ou suspensão) dos direitos políticos."
            ],
            tags: ["tortura", "ellwanger", "hate speech", "racismo", "homofobia", "consciência", "ado 26"]
        },
        {
            aula: "04",
            titulo: "Privacidade, Sigilo e Reunião",
            conceitos: [
                "<strong>Inviolabilidade Domiciliar:</strong> O conceito de 'casa' é amplo (quartos de hotel ocupados, trailers, escritórios fechados). A entrada sem consentimento é restrita: a qualquer hora em caso de flagrante, desastre ou socorro; durante o dia, apenas com ordem judicial. A invasão policial sem justa causa prévia anula as provas (STJ).",
                "<strong>Sigilo Bancário (LC 105/2001 - Tema 990):</strong> O STF validou o acesso direto a dados bancários pela Receita Federal sem necessidade de ordem judicial prévia. A tese é que não há quebra de sigilo, mas <em>transferência de sigilo</em> da esfera bancária para a fiscal, necessária para combater a evasão de divisas e garantir a isonomia tributária.",
                "<strong>Marcha da Maconha (ADPF 187):</strong> O STF declarou a constitucionalidade das manifestações pela legalização de drogas. Entendeu-se que o art. 287 do Código Penal (apologia ao crime) não pode impedir o debate público e o exercício da liberdade de reunião e expressão, essenciais à democracia."
            ],
            tags: ["domicilio", "sigilo bancário", "marcha da maconha", "reuniao", "privacidade", "adpf 187"]
        },
        {
            aula: "05",
            titulo: "Garantias Processuais e Prisão",
            conceitos: [
                "<strong>Presunção de Inocência (ADCs 43, 44 e 54):</strong> Em 2019, o STF reverteu jurisprudência anterior e assentou a constitucionalidade do art. 283 do CPP, definindo que a execução da pena exige o <strong>trânsito em julgado</strong> da condenação, vedando a execução provisória automática após 2ª instância (ressalvadas as prisões cautelares).",
                "<strong>Princípio do Juiz Natural:</strong> Veda-se o tribunal de exceção e garante-se que ninguém será processado senão pela autoridade competente previamente estabelecida em lei. O Tribunal do Júri possui competência mínima constitucional para crimes dolosos contra a vida, com soberania dos vereditos.",
                "<strong>Provas Ilícitas:</strong> São inadmissíveis no processo (Art. 5º, LVI). Aplica-se a teoria dos <em>Frutos da Árvore Envenenada</em> (provas derivadas também são nulas). Exceções aceitas pelo STF: Fonte Independente, Descoberta Inevitável e Teoria da Tinta Diluída (nexo causal atenuado)."
            ],
            tags: ["prisão", "segunda instancia", "juri", "provas", "arvore envenenada", "inocencia", "adc 43"]
        },
        {
            aula: "06",
            titulo: "Nacionalidade e Tratados",
            conceitos: [
                "<strong>Hierarquia dos Tratados (EC 45/2004):</strong> <br>1. Tratados de Direitos Humanos aprovados pelo rito de emenda (3/5, 2 turnos) = <strong>Status Constitucional</strong> (Ex: Convenção Pessoas com Deficiência). <br>2. Tratados de DH aprovados pelo rito comum = <strong>Status Supralegal</strong> (acima das leis, abaixo da CF). <br>3. Outros Tratados = Status de Lei Ordinária.",
                "<strong>Depositário Infiel (Súmula Vinculante 25):</strong> É ilícita a prisão civil de depositário infiel, qualquer que seja a modalidade do depósito. Baseado no Pacto de San José da Costa Rica (norma supralegal), que paralisou a eficácia da legislação interna.",
                "<strong>Perda de Nacionalidade (EC 131/2023):</strong> Alteração profunda. Antes, a aquisição voluntária de outra nacionalidade gerava perda automática da brasileira (Caso Claudia Hoerig - MS 33.864). Agora, a perda depende de <em>pedido expresso</em> do cidadão à autoridade brasileira, salvo fraude ou atentado à ordem constitucional."
            ],
            tags: ["nacionalidade", "tratados", "supralegalidade", "claudia hoerig", "pacto san jose", "ec 45"]
        },
        {
            aula: "07",
            titulo: "Direitos Políticos e Ficha Limpa",
            conceitos: [
                "<strong>Lei da Ficha Limpa (LC 135/2010):</strong> Declarada constitucional pelo STF (ADCs 29 e 30). Instituiu hipóteses de inelegibilidade para proteger a moralidade administrativa. O STF definiu que a inelegibilidade não constitui pena, mas um <em>requisito de idoneidade</em> (status jurídico), podendo ser aplicada a fatos anteriores à lei (retrospectividade) sem violar a irretroatividade penal.",
                "<strong>Capacidade Eleitoral Ativa:</strong> O sufrágio é universal. O alistamento e o voto são obrigatórios para maiores de 18 anos e facultativos para: analfabetos, maiores de 70 anos e jovens entre 16 e 18 anos. Conscritos durante o serviço militar obrigatório são inalistáveis.",
                "<strong>Inelegibilidade Reflexa (Art. 14, §7º):</strong> São inelegíveis, no território de jurisdição do titular, o cônjuge e os parentes consanguíneos ou afins, até o segundo grau, do Presidente, Governador ou Prefeito, salvo se já titulares de mandato eletivo e candidatos à reeleição."
            ],
            tags: ["voto", "ficha limpa", "inelegibilidade", "políticos", "moralidade", "adc 29"]
        },
        {
            aula: "08",
            titulo: "Federalismo e Crise Sanitária",
            conceitos: [
                "<strong>Federalismo de Cooperação:</strong> O Brasil adota a repartição constitucional de competências: <br>• Privativa da União (Art. 22 - Interesse Geral). <br>• Comum (Art. 23 - Administrativa). <br>• Concorrente (Art. 24 - Legislativa: União fixa normas gerais, Estados suplementam).",
                "<strong>Federalismo na Pandemia (ADI 6341):</strong> O STF reafirmou a competência comum dos entes federativos para cuidar da saúde pública. A Corte impediu a centralização das decisões no Executivo Federal, garantindo a Governadores e Prefeitos autonomia para decretar medidas restritivas (isolamento, uso de máscaras) baseadas em evidências científicas locais. Caracterização do 'Federalismo de Emergência'."
            ],
            tags: ["federalismo", "covid", "competencia", "adi 6341", "autonomia", "cooperação"]
        },
        {
            aula: "09",
            titulo: "Avaliação Institucional M1",
            conceitos: [
                "<strong>Escopo Dogmático:</strong> Revisão aprofundada das Aulas 1 a 8.",
                "<strong>Pontos Focais:</strong> Resolução de antinomias (colisão de direitos), aplicação da teoria dos princípios de Robert Alexy, análise crítica da jurisprudência do STF sobre direito à vida (aborto/anencefalia) e liberdade de expressão (hate speech).",
                "<strong>Estudo de Caso:</strong> Federalismo em tempos de crise e a repartição de competências na saúde."
            ],
            tags: ["m1", "prova", "revisão", "avaliação"],
            highlight: true
        },
        {
            aula: "10",
            titulo: "Defesa do Estado (Art. 142)",
            conceitos: [
                "<strong>Mito do Poder Moderador:</strong> O Art. 142 estabelece que as Forças Armadas são instituições de Estado, permanentes e regulares, sob autoridade suprema do Presidente. O STF (ADPF 289 e ADI 6457) rechaçou categoricamente a tese de que militares poderiam atuar como 'poder moderador' ou arbitrar conflitos entre os Três Poderes. Tal interpretação é golpista e inconstitucional.",
                "<strong>Sistema Constitucional das Crises:</strong> <br>• <em>Estado de Defesa:</em> Crises menores, locais ou restritas. Decretado pelo Presidente (ouvidos Conselho da República/Defesa) e submetido ao Congresso em 24h. <br>• <em>Estado de Sítio:</em> Guerra ou comoção grave de repercussão nacional. Medida extrema que exige <strong>autorização prévia</strong> da maioria absoluta do Congresso Nacional."
            ],
            tags: ["art 142", "golpe", "intervenção", "estado de sitio", "forças armadas", "adpf 289"]
        },
        {
            aula: "11",
            titulo: "Poderes e Ativismo Judicial",
            conceitos: [
                "<strong>Checks and Balances:</strong> O sistema de freios e contrapesos garante que os poderes sejam independentes e harmônicos. A separação não é estanque; a Constituição prevê interferências legítimas (Ex: Veto presidencial, aprovação de Ministros pelo Senado, controle de constitucionalidade pelo Judiciário).",
                "<strong>Ativismo vs. Judicialização:</strong> A judicialização é efeito natural da Constituição analítica de 1988. O Ativismo é uma postura proativa do magistrado. Críticos como Lenio Streck apontam o risco do 'solipsismo judicial' (decidir conforme a consciência individual). Defensores (teoria de Dworkin/Alexy) invocam a proteção de minorias e a integridade do direito."
            ],
            tags: ["ativismo", "poderes", "checks and balances", "lenio streck", "judicialização"]
        },
        {
            aula: "12",
            titulo: "Legislativo e Imunidades",
            conceitos: [
                "<strong>Medidas Provisórias (Art. 62):</strong> Editadas pelo PR em caso de relevância e urgência. Têm força de lei imediata. O STF (MS 27.931) decidiu que o trancamento de pauta após 45 dias atinge apenas leis ordinárias passíveis de MP, não bloqueando PECs ou Leis Complementares.",
                "<strong>Imunidade Material (Inviolabilidade):</strong> Protege opiniões, palavras e votos. O STF restringiu seu alcance no Caso Daniel Silveira (AP 1044), decidindo que a imunidade não cobre discursos de ódio, incitação à violência ou ataques ao Estado Democrático de Direito.",
                "<strong>Imunidade Formal (Prisão):</strong> Parlamentares federais só podem ser presos em flagrante de crime inafiançável. Os autos devem ser remetidos à Casa Legislativa em 24h para deliberação sobre a prisão."
            ],
            tags: ["mp", "imunidade", "daniel silveira", "legislativo", "medida provisoria"]
        },
        {
            aula: "13",
            titulo: "Habeas Corpus e Habeas Data",
            conceitos: [
                "<strong>Habeas Corpus (HC):</strong> Remédio heroico para tutela da liberdade de locomoção. O STF tem admitido o <strong>HC Coletivo</strong> (Ex: HC 143.641), concedendo prisão domiciliar para todas as presas gestantes ou mães de crianças, superando a análise puramente individual. Aplica-se a 'jurisprudência defensiva' para não conhecer de HCs substitutivos de recurso ordinário.",
                "<strong>Habeas Data (HD):</strong> Ação personalíssima para assegurar o conhecimento ou retificação de informações relativas à pessoa do impetrante, constantes de registros ou bancos de dados de entidades governamentais ou de caráter público. A Súmula 2 do STJ exige a prova da <strong>recusa administrativa</strong> prévia como condição de interesse de agir."
            ],
            tags: ["hc", "hd", "coletivo", "gestantes", "locomoção", "dados", "súmula 2"]
        },
        {
            aula: "14",
            titulo: "Mandado de Segurança (MS)",
            conceitos: [
                "<strong>Direito Líquido e Certo:</strong> Conceito processual. É o direito que pode ser comprovado de plano, documentalmente, no momento da impetração. O MS não admite dilação probatória (produção de provas como perícias ou testemunhas). O prazo decadencial é de 120 dias da ciência do ato.",
                "<strong>Mandado de Segurança Coletivo:</strong> Pode ser impetrado por partidos políticos com representação no Congresso, sindicatos e associações legalmente constituídas há pelo menos um ano. O STF (Tema 82) pacificou que a entidade atua por <strong>substituição processual</strong>, sendo desnecessária a autorização expressa individual dos associados (diferente da ação ordinária)."
            ],
            tags: ["ms", "mandado de segurança", "liquido e certo", "coletivo", "substituição processual"]
        },
        {
            aula: "15",
            titulo: "MI e Ação Popular",
            conceitos: [
                "<strong>Mandado de Injunção (MI):</strong> Combate a falta de norma regulamentadora que inviabiliza o exercício de direitos constitucionais (síndrome da inefetividade). O STF evoluiu da posição não-concretista para a <strong>Posição Concretista Geral</strong> (MI 6709 e MI 721), conferindo efeitos <em>erga omnes</em> à decisão e aplicando a lei de greve do setor privado aos servidores públicos.",
                "<strong>Ação Popular:</strong> Legitimidade ativa de qualquer cidadão (eleitor) para anular ato lesivo ao patrimônio público, moralidade administrativa, meio ambiente ou patrimônio histórico. O STF (RE 824.781) reafirmou a necessidade do binômio ilegalidade-lesividade, ressalvando que a lesividade pode ser presumida ou moral, não exigindo necessariamente prejuízo financeiro direto."
            ],
            tags: ["mi", "ação popular", "concretista", "greve", "omissão", "lesividade"]
        },
        {
            aula: "16",
            titulo: "Controle de Constitucionalidade: Teoria",
            conceitos: [
                "<strong>Supremacia e Parametricidade:</strong> Todo o ordenamento deve compatibilidade vertical com a Constituição (Pirâmide de Kelsen). O parâmetro de controle é o 'Bloco de Constitucionalidade', que inclui a CF/88, os Princípios Implícitos e os Tratados de Direitos Humanos com status de Emenda.",
                "<strong>Controle Preventivo:</strong> Ocorre antes da norma ingressar no ordenamento. Realizado pelo Legislativo (CCJ) e pelo Executivo (Veto Jurídico). O Judiciário atua excepcionalmente via MS impetrado por parlamentar para trancar PEC que viole cláusula pétrea ou trâmite legislativo.",
                "<strong>Controle Repressivo:</strong> Ocorre após a publicação da lei. Regra geral exercida pelo Poder Judiciário (controle difuso ou concentrado)."
            ],
            tags: ["controle", "preventivo", "repressivo", "bloco", "kelsen", "supremacia"]
        },
        {
            aula: "17",
            titulo: "Controle Difuso e Reserva de Plenário",
            conceitos: [
                "<strong>Controle Difuso (Incidenter Tantum):</strong> Realizado por qualquer juiz ou tribunal no caso concreto. A declaração de inconstitucionalidade é a fundamentação para resolver a lide. Efeitos tradicionais: <em>inter partes</em> e <em>ex tunc</em>.",
                "<strong>Reserva de Plenário (Art. 97 - SV 10):</strong> Tribunais somente podem declarar a inconstitucionalidade de lei pelo voto da maioria absoluta de seus membros ou do Órgão Especial. Órgãos fracionários (Turmas/Câmaras) não podem declarar inconstitucionalidade, devendo remeter a questão ao Pleno.",
                "<strong>Abstrativização do Controle Difuso:</strong> Tese defendida pelo Min. Gilmar Mendes (Rcl 4.335). Sustenta que o papel do Senado (Art. 52, X) sofreu mutação constitucional: a decisão do STF no controle difuso já teria eficácia <em>erga omnes</em> e vinculante devido à força dos precedentes, cabendo ao Senado apenas dar publicidade à decisão."
            ],
            tags: ["difuso", "plenario", "abstrativização", "gilmar mendes", "mutação", "sv 10"]
        },
        {
            aula: "18",
            titulo: "Avaliação Institucional M2",
            conceitos: [
                "<strong>Escopo Dogmático:</strong> Revisão profunda das Aulas 10 a 17.",
                "<strong>Pontos Focais:</strong> Diferenciação procedimental dos Remédios Constitucionais (MS vs HC vs Ação Popular), compreensão da Legitimidade no Controle Concentrado, efeitos das decisões em MI e a aplicação prática das imunidades parlamentares.",
                "<strong>Metodologia:</strong> Resolução de casos práticos envolvendo a atuação do STF no controle de constitucionalidade."
            ],
            tags: ["m2", "prova", "revisão", "avaliação"],
            highlight: true
        },
        {
            aula: "19",
            titulo: "Controle Concentrado (Ações)",
            conceitos: [
                "<strong>ADI (Ação Direta de Inconstitucionalidade):</strong> Ação genérica contra lei ou ato normativo federal/estadual. Legitimados do Art. 103 (3 Pessoas, 3 Mesas, 3 Entidades). Não admite desistência.",
                "<strong>ADC (Ação Declaratória de Constitucionalidade):</strong> Visa confirmar a validade de lei federal (apenas) diante de controvérsia judicial relevante. Possui efeito vinculante e erga omnes, impedindo decisões divergentes nas instâncias inferiores.",
                "<strong>ADO (Ação Direta de Inconstitucionalidade por Omissão):</strong> Combate a inércia legislativa que torna inviável norma constitucional (síndrome da inefetividade). O STF dá ciência ao Legislativo (sem impor prazo, em regra) ou fixa prazo para órgãos administrativos (Lei 9.868/99).",
                "<strong>ADPF (Arguição de Descumprimento de Preceito Fundamental):</strong> Ação subsidiária ('Soldado de Reserva'). Cabível quando não houver outro meio eficaz. Única via para atacar lei municipal ou lei pré-constitucional. No julgamento da <strong>ADPF 347</strong>, o STF reconheceu o 'Estado de Coisas Inconstitucional' do sistema prisional brasileiro, determinando medidas estruturais aos três poderes."
            ],
            tags: ["adi", "adpf", "ado", "adc", "eci", "estado de coisas", "concentrado"]
        },
        {
            aula: "20",
            titulo: "Síntese Final e Hermenêutica",
            conceitos: [
                "<strong>Sociedade Aberta dos Intérpretes (Peter Häberle):</strong> A hermenêutica constitucional contemporânea rompe com o monopólio judicial da interpretação. A Constituição é um projeto aberto que se legitima através da participação plural da sociedade (Amicus Curiae, Audiências Públicas).",
                "<strong>Conclusão do Curso:</strong> O aluno deve dominar a evolução da força normativa da Constituição (Konrad Hesse), compreendendo o STF não apenas como legislador negativo, mas como ator político-jurídico central na concretização dos direitos fundamentais e na manutenção da democracia."
            ],
            tags: ["haeberle", "hermenêutica", "sociedade aberta", "sintese", "konrad hesse"]
        }
    ]
};

/* =========================================
   3. SYSTEM UTILS (Core Helpers)
   ========================================= */
const Utils = {
    /**
     * Debounce function: Limita a taxa de execução de funções frequentes.
     */
    debounce: (func, wait) => {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    },

    /**
     * Normaliza strings (Remove acentos, lowercase).
     */
    normalize: (str) => {
        if (!str) return "";
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    },

    /**
     * SAFE HTML PARSER
     * Converte string com tags permitidas em fragmento de DOM seguro.
     * Previne XSS ao não usar innerHTML diretamente em strings desconhecidas.
     */
    parseSafeHTML: (htmlString) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString; 
        
        // Allowlist de tags
        const allowedTags = ['STRONG', 'EM', 'B', 'I', 'U', 'SPAN', 'BR'];
        
        const sanitize = (node) => {
            const fragment = document.createDocumentFragment();
            Array.from(node.childNodes).forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    fragment.appendChild(child.cloneNode(true));
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    if (allowedTags.includes(child.tagName)) {
                        const newChild = document.createElement(child.tagName);
                        newChild.appendChild(sanitize(child)); 
                        fragment.appendChild(newChild);
                    } else {
                        // Se tag proibida, extrai apenas o texto
                        fragment.appendChild(document.createTextNode(child.textContent));
                    }
                }
            });
            return fragment;
        };

        return sanitize(tempDiv);
    }
};

/* =========================================
   4. DOM FACTORY
   ========================================= */
const DOM = {
    get: (selector) => document.querySelector(selector),
    
    create: (tag, classes = [], safeContent = '') => {
        const el = document.createElement(tag);
        if (classes.length) el.classList.add(...classes);
        
        if (safeContent) {
            const contentFragment = Utils.parseSafeHTML(safeContent);
            el.appendChild(contentFragment);
        }
        return el;
    }
};

/* =========================================
   5. VIEW RENDERER
   ========================================= */
class ViewRenderer {
    constructor() {
        this.els = {
            timeline: DOM.get(CONFIG.selectors.timelineContainer),
            grid: DOM.get(CONFIG.selectors.lessonsGrid),
            biblio: DOM.get(CONFIG.selectors.biblioContainer),
            info: DOM.get(CONFIG.selectors.infoList),
            methodology: DOM.get('#methodology-text'),
            evaluation: DOM.get('#evaluation-container'),
            empty: DOM.get(CONFIG.selectors.emptyState),
            counter: DOM.get(CONFIG.selectors.searchCounter)
        };
    }

    renderAll() {
        this.renderInfo();
        this.renderTimeline();
        this.renderLessons(); 
        this.renderBibliography();
    }

    renderInfo() {
        const info = CourseRepository.getInfo();
        if (this.els.info) {
            this.els.info.innerHTML = '';
            const frag = document.createDocumentFragment();
            [
                { l: 'Curso', v: info.curso },
                { l: 'Disciplina', v: info.disciplina },
                { l: 'Carga Horária', v: info.cargaHoraria },
                { l: 'Semestre', v: info.semestre }
            ].forEach(f => {
                const li = DOM.create('li', [], `<strong>${f.l}:</strong> ${f.v}`);
                frag.appendChild(li);
            });
            this.els.info.appendChild(frag);
        }
        if (this.els.methodology) this.els.methodology.textContent = info.metodologia;
        if (this.els.evaluation) {
            this.els.evaluation.innerHTML = '';
            info.avaliacao.forEach(txt => this.els.evaluation.appendChild(DOM.create('p', [], txt)));
        }
    }

    renderTimeline() {
        if (!this.els.timeline) return;
        const frag = document.createDocumentFragment();
        CourseRepository.getTimeline().forEach((item, idx) => {
            const div = DOM.create('div', ['timeline-item', 'observer-target']);
            div.style.animationDelay = `${idx * 0.05}s`;
            if (item.type === 'highlight') div.classList.add('highlight');

            div.append(
                DOM.create('div', ['timeline-marker'], String(item.id)),
                DOM.create('div', ['timeline-content'], `<h3>${item.title}</h3><p>${item.content}</p>`)
            );
            frag.appendChild(div);
        });
        this.els.timeline.innerHTML = '';
        this.els.timeline.appendChild(frag);
    }

    renderLessons(dataSet = null) {
        if (!this.els.grid) return;
        const data = dataSet || CourseRepository.getDidacticLessons();
        
        this.els.grid.innerHTML = ''; 

        const hasData = data.length > 0;
        if (this.els.empty) this.els.empty.classList.toggle('hidden', hasData);
        if (this.els.counter) this.els.counter.textContent = hasData ? `${data.length} aulas disponíveis` : '0 aulas';
        if (!hasData) return;

        const frag = document.createDocumentFragment();
        data.forEach(lesson => {
            const card = DOM.create('article', ['lesson-card', 'observer-target']);
            if (lesson.highlight) card.classList.add('highlight');

            const ul = DOM.create('ul');
            lesson.conceitos.forEach(c => ul.appendChild(DOM.create('li', [], c)));

            const body = DOM.create('div', ['lesson-body']);
            body.appendChild(ul);

            card.append(
                DOM.create('div', ['lesson-badge'], lesson.aula),
                DOM.create('h4', [], lesson.titulo),
                body
            );
            frag.appendChild(card);
        });
        this.els.grid.appendChild(frag);
        
        if (window.appObserver) {
            document.querySelectorAll('#lessons-grid .observer-target').forEach(el => window.appObserver.observe(el));
        }
    }

    renderBibliography() {
        if (!this.els.biblio) return;
        const frag = document.createDocumentFragment();
        CourseRepository.getBibliography().forEach(book => {
            const div = DOM.create('div', ['biblio-item']);
            div.append(
                DOM.create('h5', [], book.title),
                DOM.create('p', [], `${book.author} — ${book.detail}`)
            );
            frag.appendChild(div);
        });
        this.els.biblio.appendChild(frag);
    }
}

/* =========================================
   6. APP CONTROLLER
   ========================================= */
class AppController {
    constructor() {
        this.renderer = new ViewRenderer();
        this.init();
    }

    init() {
        this.renderer.renderAll();
        this.setupObservers();
        this.setupEvents();
        this.checkUrlParams(); // Deep Linking
    }

    checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('q');
        if (query) {
            const searchInput = DOM.get(CONFIG.selectors.searchOriginal);
            if (searchInput) {
                searchInput.value = query;
                this.performSearch(query);
                setTimeout(() => {
                    document.querySelector('#desenvolvimento-didatico')?.scrollIntoView({ behavior: 'smooth' });
                }, 800);
            }
        }
    }

    setupObservers() {
        const opts = { rootMargin: CONFIG.animation.rootMargin, threshold: CONFIG.animation.threshold };
        window.appObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, opts);

        setTimeout(() => {
            document.querySelectorAll('.observer-target').forEach(el => window.appObserver.observe(el));
        }, 100);
    }

    setupEvents() {
        // Busca
        const searchInput = DOM.get(CONFIG.selectors.searchOriginal);
        if (searchInput) {
            const debouncedSearch = Utils.debounce((val) => this.handleSearchInput(val), 300);
            searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
        }

        // Scroll
        window.addEventListener('scroll', () => {
            const h = document.documentElement;
            const scroll = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
            const bar = DOM.get(CONFIG.selectors.scrollProgress);
            const nav = DOM.get(CONFIG.selectors.nav);
            
            if(bar) bar.style.width = `${scroll}%`;
            if(nav) h.scrollTop > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        });

        // Mobile Menu
        const toggle = (forceClose = false) => {
            const overlay = document.querySelector(CONFIG.selectors.mobileOverlay);
            if (!overlay) return;
            if (forceClose || overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        const toggler = document.querySelector(CONFIG.selectors.mobileToggle);
        if(toggler) toggler.addEventListener('click', () => toggle());
        document.querySelector(CONFIG.selectors.closeMenu)?.addEventListener('click', () => toggle(true));
        document.querySelectorAll('.mobile-links a').forEach(l => l.addEventListener('click', () => toggle(true)));
    }

    handleSearchInput(value) {
        const url = new URL(window.location);
        if (value.trim()) {
            url.searchParams.set('q', value.trim());
        } else {
            url.searchParams.delete('q');
        }
        window.history.replaceState({}, '', url);

        this.performSearch(value);
    }

    performSearch(query) {
        const term = Utils.normalize(query);
        const all = CourseRepository.getDidacticLessons();

        if (!term) {
            this.renderer.renderLessons(all);
            return;
        }

        const filtered = all.filter(l => {
            const title = Utils.normalize(l.titulo);
            const badge = Utils.normalize(l.aula);
            const concepts = l.conceitos.map(c => Utils.normalize(c.replace(/<[^>]*>?/gm, '')));
            const tags = l.tags.map(t => Utils.normalize(t));

            return title.includes(term) || 
                   badge.includes(term) || 
                   concepts.some(c => c.includes(term)) || 
                   tags.some(t => t.includes(term));
        });

        this.renderer.renderLessons(filtered);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => new AppController());
