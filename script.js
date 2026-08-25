/**
 * Human Anatomy Explorer (人體構造奧秘)
 * Interactive Script for Navigation, Scenarios & Anatomy Quiz
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Scroll Progress Bar ---
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    // --- 3. Active Nav Link on Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-target') === currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 4. Interactive Organ Cards Click Highlight ---
    const organCards = document.querySelectorAll('.organ-card');
    organCards.forEach(card => {
        card.addEventListener('click', () => {
            const parent = card.closest('.organ-cards');
            if (parent) {
                parent.querySelectorAll('.organ-card').forEach(c => c.classList.remove('active'));
            }
            card.classList.add('active');
        });
    });

    // --- 5. System Coordination Scenarios Switcher ---
    const scenariosData = {
        exercise: {
            title: "🏃 劇烈運動狀態下的跨系統協同作動",
            tag: "交感神經高亢激發 (Sympathetic Drive)",
            cards: [
                {
                    system: "🫁 呼吸系統",
                    border: "cyan-border",
                    title: "通氣量暴增 10 倍",
                    desc: "呼吸頻率增至 40-50 次/分，肺泡通氣量自靜止時 6 L/min 提升至 100+ L/min，全力供應肌肉爆發性耗氧需求。"
                },
                {
                    system: "🫀 循環系統",
                    border: "red-border",
                    title: "心輸出量提高 4~5 倍",
                    desc: "心率可由 70 次升至 170+ 次/分，肌肉微血管大量舒張，骨骼肌血流佔全身比例由 20% 飆升至 85%。"
                },
                {
                    system: "⚡ 內分泌系統",
                    border: "amber-border",
                    title: "腎上腺素全面釋放",
                    desc: "腎上腺釋放腎上腺素與正腎上腺素，刺激肝醣分解為葡萄糖供應能量，擴張支氣管並抑制非必要之消化活動。"
                },
                {
                    system: "🦴 骨骼肌肉",
                    border: "indigo-border",
                    title: "肌纖維高頻 ATP 消耗",
                    desc: "磷酸肌酸與有氧醣解系統全力供能，肌原纖維高頻滑行收縮，關節滑液增生減震保護軟骨。"
                }
            ]
        },
        sleep: {
            title: "🛌 深度睡眠時的自我修復與恆定重建",
            tag: "副交感神經主導 (Rest & Digest)",
            cards: [
                {
                    system: "🫁 呼吸系統",
                    border: "cyan-border",
                    title: "平緩深長節律呼吸",
                    desc: "呼吸頻率降至每分鐘 10-14 次，延髓呼吸中樞維持微調，降低耗氧量以利組織休息。"
                },
                {
                    system: "🫀 循環系統",
                    border: "red-border",
                    title: "心率與血壓適度下降",
                    desc: "心率降至 50-60 次/分，全身血管阻力降低，心肌獲得充足的冠狀動脈灌注與能量補給。"
                },
                {
                    system: "⚡ 內分泌系統",
                    border: "amber-border",
                    title: "生長激素 (GH) 分泌高峰",
                    desc: "腦垂腺在慢波睡眠期間大量分泌生長激素，刺激蛋白質合成、細胞修復與組織再生。"
                },
                {
                    system: "🦴 骨骼肌肉",
                    border: "indigo-border",
                    title: "肌肉完全放鬆與微創傷修復",
                    desc: "肌張力降至最低，造骨細胞加速骨基質礦化，肌肉微損傷纖維進行超量補償修復。"
                }
            ]
        },
        meal: {
            title: "🍽️ 進食與消化狀態下的養分吸收循環",
            tag: "腸神經與迷走神經興奮 (Digestive Surge)",
            cards: [
                {
                    system: "🫁 呼吸系統",
                    border: "cyan-border",
                    title: "穩態代謝換氣",
                    desc: "維持穩定的氣體交換，提供消化腺體細胞合成消化酵素與胃酸所需的 ATP 氧化代謝氧氣。"
                },
                {
                    system: "🫀 循環系統",
                    border: "red-border",
                    title: "內臟血流大增 (Splanchnic Flow)",
                    desc: "腸繫膜動脈與胃腸毛細血管舒張，大量血流湧入消化道吸收養分，經肝門靜脈直送肝臟。"
                },
                {
                    system: "⚡ 內分泌系統",
                    border: "amber-border",
                    title: "胰島素分泌與代謝轉化",
                    desc: "血糖上升刺激胰島 β 細胞釋放胰島素，促進全身細胞攝取葡萄糖並引導肝臟合成肝醣儲存。"
                },
                {
                    system: "🥗 消化系統",
                    border: "emerald-border",
                    title: "胃腸蠕動與多重酵素催化",
                    desc: "平滑肌規律分節蠕動，胃酸、膽汁與胰液協同作動，將食物精準分解為微小分子吸收。"
                }
            ]
        }
    };

    const scenarioTabs = document.querySelectorAll('.scenario-tab');
    const scenarioTitle = document.getElementById('scenario-title');
    const scenarioTag = document.getElementById('scenario-tag');
    const synergyGrid = document.getElementById('synergy-grid');

    if (scenarioTabs.length && scenarioTitle && synergyGrid) {
        scenarioTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetScenario = tab.getAttribute('data-scenario');
                const data = scenariosData[targetScenario];
                if (!data) return;

                // Update active tab
                scenarioTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update Header
                scenarioTitle.textContent = data.title;
                scenarioTag.textContent = data.tag;

                // Update Cards
                synergyGrid.innerHTML = data.cards.map(card => `
                    <div class="synergy-card ${card.border}">
                        <div class="syn-icon">${card.system}</div>
                        <h4>${card.title}</h4>
                        <p>${card.desc}</p>
                    </div>
                `).join('');
            });
        });
    }

    // --- 6. Interactive Anatomy Quiz Engine ---
    const quizQuestions = [
        {
            question: "1. 肺部中負責進行氧氣與二氧化碳「氣體擴散交換」的最微觀核心構造是？",
            options: [
                "A. 喉頭軟骨 (Larynx)",
                "B. 肺泡 (Alveoli)",
                "C. 終末細支氣管 (Terminal Bronchiole)",
                "D. 橫膈膜 (Diaphragm)"
            ],
            correct: 1, // Index 1 is B
            rationale: "雙肺擁有約 3 至 5 億個微型氣囊——肺泡 (Alveoli)，總擴散面積達 70-100 平方公尺，其單層扁平上皮與毛細血管緊密相貼，是氣體交換的終極場所。"
        },
        {
            question: "2. 人體心臟四個腔室中，哪一個腔室的肌肉壁最厚，負責承受高壓將充氧血泵入全身？",
            options: [
                "A. 右心房 (Right Atrium)",
                "B. 右心室 (Right Ventricle)",
                "C. 左心房 (Left Atrium)",
                "D. 左心室 (Left Ventricle)"
            ],
            correct: 3, // Index 3 is D
            rationale: "左心室 (Left Ventricle) 的心肌壁厚達 1.2-1.5 公分，需要產生足以克服全身血管阻力的強大收縮壓（約 120 mmHg），將充氧血液泵入主動脈。"
        },
        {
            question: "3. 腸道被譽為人體的「第二大腦」，是因為它擁有超過 5 億個神經元組成的何種系統？",
            options: [
                "A. 腸神經系統 (Enteric Nervous System, ENS)",
                "B. 中樞神經系統 (Central Nervous System)",
                "C. 體神經系統 (Somatic Nervous System)",
                "D. 脊髓反射神經網絡"
            ],
            correct: 0, // Index 0 is A
            rationale: "腸神經系統 (ENS) 獨立性極高，可自主調節消化蠕動與酵素分泌，並合成全身 90% 以上的血清素，透過迷走神經與大腦形成密切的「腸腦軸線」。"
        },
        {
            question: "4. 根據骨骼生物力學與沃爾夫定律，哪種細胞持續負責「合成新骨質、沉積鈣鹽」？",
            options: [
                "A. 破骨細胞 (Osteoclasts)",
                "B. 造骨細胞 (Osteoblasts)",
                "C. 軟骨細胞 (Chondrocytes)",
                "D. 成纖維細胞 (Fibroblasts)"
            ],
            correct: 1, // Index 1 is B
            rationale: "造骨細胞 (Osteoblasts) 負責分泌骨膠原基質並促進鈣化形成新骨；與破骨細胞 (Osteoclasts) 的骨吸收作用維持動態平衡，每 10 年將人體骨骼重塑更新一次。"
        }
    ];

    let currentQuestionIdx = 0;
    let userScore = 0;
    let hasAnswered = false;

    const quizCard = document.getElementById('quiz-card');
    const quizCounter = document.getElementById('quiz-counter');
    const quizScoreBadge = document.getElementById('quiz-score-badge');
    const quizProgressFill = document.getElementById('quiz-progress-fill');
    const quizQuestionText = document.getElementById('quiz-question-text');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    const feedbackBadge = document.getElementById('feedback-badge');
    const feedbackText = document.getElementById('feedback-text');
    const btnNextQuestion = document.getElementById('btn-next-question');

    const quizResultCard = document.getElementById('quiz-result-card');
    const resultScoreVal = document.getElementById('result-score-val');
    const resultEvaluation = document.getElementById('result-evaluation');
    const btnRestartQuiz = document.getElementById('btn-restart-quiz');

    function renderQuestion(idx) {
        if (idx >= quizQuestions.length) {
            showResult();
            return;
        }

        const q = quizQuestions[idx];
        hasAnswered = false;

        // Update progress & header
        quizCounter.textContent = `問題 ${idx + 1} / ${quizQuestions.length}`;
        quizScoreBadge.textContent = `目前得分: ${userScore * 25}`;
        quizProgressFill.style.width = `${((idx + 1) / quizQuestions.length) * 100}%`;

        // Render Question
        quizQuestionText.textContent = q.question;

        // Render Options
        quizOptions.innerHTML = '';
        q.options.forEach((opt, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.innerHTML = `
                <span class="opt-prefix">${['A', 'B', 'C', 'D'][optIdx]}</span>
                <span class="opt-content">${opt.substring(3)}</span>
            `;
            btn.addEventListener('click', () => handleAnswer(optIdx, q));
            quizOptions.appendChild(btn);
        });

        // Hide feedback
        quizFeedback.classList.add('hidden');
    }

    function handleAnswer(selectedIdx, questionObj) {
        if (hasAnswered) return;
        hasAnswered = true;

        const isCorrect = (selectedIdx === questionObj.correct);
        const optButtons = quizOptions.querySelectorAll('.quiz-opt-btn');

        optButtons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === questionObj.correct) {
                btn.classList.add('correct');
            } else if (i === selectedIdx) {
                btn.classList.add('wrong');
            }
        });

        if (isCorrect) {
            userScore++;
            feedbackBadge.textContent = "✓ 正確！太棒了";
            feedbackBadge.className = "feedback-badge correct";
        } else {
            feedbackBadge.textContent = "✕ 答錯了，請看解析";
            feedbackBadge.className = "feedback-badge wrong";
        }

        feedbackText.textContent = questionObj.rationale;
        quizFeedback.classList.remove('hidden');

        // Update Score Badge
        quizScoreBadge.textContent = `目前得分: ${userScore * 25}`;
    }

    function showResult() {
        if (quizCard) quizCard.classList.add('hidden');
        if (quizResultCard) {
            quizResultCard.classList.remove('hidden');
            const finalScore = userScore * 25;
            resultScoreVal.textContent = finalScore;

            if (finalScore === 100) {
                resultEvaluation.textContent = "🏆 滿分成就！您對人體各大系統與微觀生理機制的掌握已達醫學科普專家水準！";
            } else if (finalScore >= 75) {
                resultEvaluation.textContent = "🌟 非常優秀！您對人體解剖構造有著清晰且扎實的理解！";
            } else {
                resultEvaluation.textContent = "💪 表現不錯！複習上方各系統的 3D 解剖說明與臨床洞察，再來挑戰一次吧！";
            }
        }
    }

    if (btnNextQuestion) {
        btnNextQuestion.addEventListener('click', () => {
            currentQuestionIdx++;
            renderQuestion(currentQuestionIdx);
        });
    }

    if (btnRestartQuiz) {
        btnRestartQuiz.addEventListener('click', () => {
            currentQuestionIdx = 0;
            userScore = 0;
            hasAnswered = false;
            quizResultCard.classList.add('hidden');
            quizCard.classList.remove('hidden');
            renderQuestion(0);
        });
    }

    // Initialize Quiz
    if (quizQuestionText) {
        renderQuestion(0);
    }
});
