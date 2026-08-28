document.addEventListener('DOMContentLoaded', () => {

    // 0.2 Hero Typewriter Engine (Slot 1 strictly <= 10 characters)
    const heroPairs = [
        { slot1: "AI Agents", slot2: "Enterprise Operations" },
        { slot1: "Gen AI", slot2: "Proprietary Knowledge" },
        { slot1: "ML Models", slot2: "Strategic Decisions" },
        { slot1: "AI Systems", slot2: "Market Intelligence" },
        { slot1: "Web Apps", slot2: "Customer Engagement" },
        { slot1: "LLM Models", slot2: "Enterprise Security" },
        { slot1: "Smart AI", slot2: "Quality Control & Scale" },
        { slot1: "Cloud Tech", slot2: "Infrastructure Speed" },
        { slot1: "Data Tech", slot2: "Real-Time Analytics" },
        { slot1: "RAG Tech", slot2: "Team Productivity" }
    ];

    let pairIdx = 0;
    let charIdx1 = heroPairs[0].slot1.length;
    let charIdx2 = heroPairs[0].slot2.length;
    let isDeleting = false;

    function runHeroTypewriter() {
        const el1 = document.getElementById('hero-slot1');
        const el2 = document.getElementById('hero-slot2');
        if (!el1 || !el2) return;

        const currentPair = heroPairs[pairIdx];
        const target1 = currentPair.slot1;
        const target2 = currentPair.slot2;

        if (!isDeleting) {
            // Typing phase
            let d1 = false, d2 = false;
            if (charIdx1 < target1.length) {
                charIdx1++;
                el1.textContent = target1.substring(0, charIdx1);
            } else { d1 = true; }

            if (charIdx2 < target2.length) {
                charIdx2++;
                el2.textContent = target2.substring(0, charIdx2);
            } else { d2 = true; }

            if (d1 && d2) {
                setTimeout(() => {
                    isDeleting = true;
                    runHeroTypewriter();
                }, 2200);
                return;
            }
            setTimeout(runHeroTypewriter, 60);
        } else {
            // Deleting phase
            if (charIdx1 > 0) {
                charIdx1--;
                el1.textContent = target1.substring(0, charIdx1);
            }
            if (charIdx2 > 0) {
                charIdx2--;
                el2.textContent = target2.substring(0, charIdx2);
            }

            if (charIdx1 === 0 && charIdx2 === 0) {
                isDeleting = false;
                pairIdx = (pairIdx + 1) % heroPairs.length;
                setTimeout(runHeroTypewriter, 300);
                return;
            }
            setTimeout(runHeroTypewriter, 35);
        }
    }

    setTimeout(() => {
        isDeleting = true;
        runHeroTypewriter();
    }, 2500);

    initHeroChat();

    // 0.5 Hero Chat Simulation
    const chatScenarios = [
        {
            problem: "I am suffering from a complex data infrastructure problem where pipelines are too slow.",
            solution: "If you want a solution for this problem, then you have to consult to Buildlyst."
        },
        {
            problem: "Our current LLM deployment is hallucinating and lacks enterprise security.",
            solution: "To architect a secure, fine-tuned RAG system, you have to consult to Buildlyst."
        },
        {
            problem: "We need an autonomous agent to handle our real-time market analysis.",
            solution: "For enterprise-grade autonomous AI agents, you have to consult to Buildlyst."
        }
    ];

    let currentScenarioIndex = 0;

    function initHeroChat() {
        const chatContainer = document.getElementById('sim-messages');
        if (!chatContainer) return;
        
        playScenario(chatContainer);
    }

    function playScenario(container) {
        container.innerHTML = ''; 

        setTimeout(() => {
            const userMsg = document.createElement('div');
            userMsg.className = 'sim-message user';
            container.appendChild(userMsg);
            
            const scenario = chatScenarios[currentScenarioIndex];
            let i = 0;
            
            // Human typing effect for user (variable speed)
            function typeUser() {
                if (i < scenario.problem.length) {
                    userMsg.textContent += scenario.problem.charAt(i);
                    i++;
                    container.scrollTop = container.scrollHeight;
                    setTimeout(typeUser, Math.random() * 30 + 10);
                } else {
                    triggerAiResponse(container, scenario.solution);
                }
            }
            typeUser();
        }, 500);
    }

    function triggerAiResponse(container, solutionText) {
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'sim-message ai';
            aiMsg.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
            container.appendChild(aiMsg);
            container.scrollTop = container.scrollHeight;

            setTimeout(() => {
                aiMsg.innerHTML = ''; 
                
                // System typing effect for AI (fast, consistent speed)
                let j = 0;
                function typeAi() {
                    if (j < solutionText.length) {
                        aiMsg.textContent += solutionText.charAt(j);
                        j++;
                        container.scrollTop = container.scrollHeight;
                        setTimeout(typeAi, 15);
                    } else {
                        // Highlight Buildlyst at the end
                        aiMsg.innerHTML = aiMsg.innerHTML.replace('Buildlyst', '<strong style="color:var(--c-accent-cyan)">Buildlyst</strong>');
                        
                        // Wait and then proceed to next scenario
                        setTimeout(() => {
                            currentScenarioIndex = (currentScenarioIndex + 1) % chatScenarios.length;
                            
                            const messages = container.querySelectorAll('.sim-message');
                            messages.forEach(msg => {
                                msg.style.transition = 'opacity 0.5s ease';
                                msg.style.opacity = '0';
                            });
                            
                            setTimeout(() => {
                                playScenario(container);
                            }, 500);
                            
                        }, 4000);
                    }
                }
                typeAi();
                
            }, 1200); // 1.2s thinking time
        }, 400); // Wait 0.4s before showing typing indicator
    }

    // 1. Smooth Scrolling & Premium Animations (Lenis + GSAP)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Load Animation
        const tlHero = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });
        const hero = document.getElementById('hero');
        if (hero) hero.style.opacity = 1; // Prevent CSS from keeping it hidden
        
        tlHero.from('.pill-nav', { y: -50, opacity: 0, duration: 1 })
              .from('.hero-content h1', { y: 30, opacity: 0, stagger: 0.1 }, "-=0.6")
              .from('.hero-content .subtitle', { y: 20, opacity: 0 }, "-=0.8")
              .from('.hero-content .btn-group', { y: 20, opacity: 0 }, "-=0.8")
              .from('.chat-simulation-wrapper', { scale: 0.95, y: 40, opacity: 0 }, "-=0.8");

        // Generic Section Reveals (Fades & Slides Up)
        gsap.utils.toArray('.reveal').forEach(el => {
            if (el.id === 'hero') return; 
            gsap.fromTo(el, 
                { y: 60, opacity: 0 },
                { 
                    scrollTrigger: { 
                        trigger: el, 
                        start: "top 85%", 
                        toggleActions: "play none none reverse" 
                    },
                    y: 0, opacity: 1, duration: 1, ease: "power3.out"
                }
            );
        });

        // Advanced Staggers (Philosophy Cards)
        gsap.utils.toArray('.philosophy-card').forEach(card => {
            gsap.fromTo(card,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
                    y: 0, opacity: 1, duration: 0.8, ease: "power2.out"
                }
            );
        });

        // Pricing Matrix (Bounce in)
        if(document.querySelector('.pricing-card')) {
            gsap.fromTo('.pricing-card', 
                { scale: 0.95, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.pricing-matrix', start: "top 75%", toggleActions: "play none none reverse" },
                    scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)"
                }
            );
        }

        // Testimonials (Smooth slide stagger)
        if(document.querySelector('.testimonial-card')) {
            gsap.fromTo('.testimonial-card',
                { opacity: 0, scale: 0.9 },
                {
                    scrollTrigger: { trigger: '.testimonials-section', start: "top 70%", toggleActions: "play none none reverse" },
                    opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: "power2.out"
                }
            );
        }
    }

    // 2. Navigation Active State
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.pill-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Premium 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });

    // 3.5 Accordion Gallery Interactions (Capabilities)
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            accordionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
        item.addEventListener('click', () => {
            accordionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 4. Project Carousel Controls
    const projectsTrack = document.getElementById('projects-track');
    const prevProjectBtn = document.getElementById('prev-project');
    const nextProjectBtn = document.getElementById('next-project');

    if (projectsTrack && prevProjectBtn && nextProjectBtn) {
        nextProjectBtn.addEventListener('click', () => {
            projectsTrack.scrollBy({ left: 400, behavior: 'smooth' });
        });
        prevProjectBtn.addEventListener('click', () => {
            projectsTrack.scrollBy({ left: -400, behavior: 'smooth' });
        });
    }

    // 5. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open')); // Close others
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // 6. Pipeline Flow & Tabs Logic
    const archTabs = document.querySelectorAll('.arch-tab-btn');
    const pipelineFlows = document.querySelectorAll('.pipeline-flow');
    let pipelineInterval;

    function startPipelineAnimation(flowId) {
        clearInterval(pipelineInterval);
        const flowContainer = document.getElementById(flowId);
        if (!flowContainer) return;

        const arrows = flowContainer.querySelectorAll('.pipe-arrow');
        const nodes = flowContainer.querySelectorAll('.pipe-node');
        
        // Reset all flows globally first
        document.querySelectorAll('.pipe-arrow').forEach(a => a.classList.remove('active-flow'));
        document.querySelectorAll('.pipe-node').forEach(n => n.classList.remove('active-glow'));

        if (arrows.length > 0) {
            let currentStep = 0;
            pipelineInterval = setInterval(() => {
                arrows.forEach(a => a.classList.remove('active-flow'));
                nodes.forEach(n => n.classList.remove('active-glow'));
                
                if (currentStep < arrows.length) {
                    arrows[currentStep].classList.add('active-flow');
                    nodes[currentStep].classList.add('active-glow');
                    nodes[currentStep + 1].classList.add('active-glow');
                }
                
                currentStep = (currentStep + 1) % (arrows.length + 1);
            }, 1500);
        }
    }

    if (archTabs.length > 0) {
        archTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                archTabs.forEach(t => t.classList.remove('active'));
                pipelineFlows.forEach(f => f.classList.remove('active'));
                
                tab.classList.add('active');
                
                const targetId = tab.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
                startPipelineAnimation(targetId);
            });
        });
        
        startPipelineAnimation(archTabs[0].getAttribute('data-target'));
    }

    // 7. Conversational Contact UI
    const convMessages = document.getElementById('conv-messages');
    const convInputArea = document.getElementById('conv-input-area');
    const convInput = document.getElementById('conv-input');
    const convSendBtn = document.getElementById('conv-send');
    const convOptionsArea = document.getElementById('conv-options-area');
    
    if (convMessages) {
        let step = 0;
        let formData = { name: '', email: '', project_type: '', message: '', company: '' };

        function addConvBubble(text, sender) {
            const bubble = document.createElement('div');
            bubble.className = `conv-bubble ${sender}`;
            const avatar = document.createElement('div');
            avatar.className = 'conv-avatar';
            avatar.textContent = sender === 'system' ? 'B' : (formData.name.charAt(0).toUpperCase() || 'U');
            
            const content = document.createElement('div');
            content.className = 'conv-text';
            content.innerHTML = text;

            bubble.appendChild(avatar);
            bubble.appendChild(content);
            convMessages.appendChild(bubble);
            convMessages.scrollTop = convMessages.scrollHeight;
        }

        function handleInput() {
            const val = convInput.value.trim();
            if (!val) return;

            addConvBubble(val, 'user');
            convInput.value = '';

            setTimeout(() => {
                if (step === 0) {
                    if (val.length < 2) {
                        addConvBubble(`Please enter a valid name (at least 2 characters).`, 'system');
                        return;
                    }
                    formData.name = val;
                    addConvBubble(`Great to meet you, ${val}. What is your email address?`, 'system');
                    step++;
                } else if (step === 1) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(val)) {
                        addConvBubble(`That doesn't look like a valid email. Please try again.`, 'system');
                        return;
                    }
                    formData.email = val;
                    addConvBubble(`Thanks! What area do you need help with?`, 'system');
                    showOptions(['AI Agents', 'Gen AI', 'Machine Learning', 'Data Engineering', 'Web Development']);
                    step++;
                } else if (step === 3) {
                    if (val.length < 10) {
                        addConvBubble(`Please provide a bit more detail (at least 10 characters).`, 'system');
                        return;
                    }
                    formData.message = val;
                    addConvBubble(`Got it. Here is what I have:<br><br><b>Name:</b> ${formData.name}<br><b>Email:</b> ${formData.email}<br><b>Type:</b> ${formData.project_type}<br><b>Details:</b> ${formData.message}<br><br>Does this look correct?`, 'system');
                    showOptions(['Yes, send inquiry', 'No, start over']);
                    step++;
                }
            }, 600);
        }

        function showOptions(options) {
            convInputArea.classList.add('hidden');
            convOptionsArea.classList.remove('hidden');
            convOptionsArea.innerHTML = '';
            
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'conv-option-btn';
                btn.textContent = opt;
                btn.onclick = () => {
                    addConvBubble(opt, 'user');
                    convOptionsArea.classList.add('hidden');
                    convOptionsArea.innerHTML = '';
                    
                    setTimeout(() => {
                        if (step === 2) {
                            formData.project_type = opt;
                            addConvBubble(`Excellent. Could you provide a brief detail about your project?`, 'system');
                            convInputArea.classList.remove('hidden');
                            convInput.focus();
                            step++;
                        } else if (step === 4) {
                            if (opt.startsWith('Yes')) {
                                addConvBubble(`<div class="typing-indicator"><span></span><span></span><span></span></div>`, 'system');
                                submitForm();
                            } else {
                                step = 0;
                                formData = { name: '', email: '', project_type: '', message: '', company: '' };
                                addConvBubble(`Let's try again. What is your name?`, 'system');
                                convInputArea.classList.remove('hidden');
                                convInput.focus();
                            }
                        }
                    }, 600);
                };
                convOptionsArea.appendChild(btn);
            });
        }

        async function submitForm() {
            try {
                // Submit to our secure backend route which holds the access keys
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                if (convMessages.lastChild.querySelector('.typing-indicator')) {
                    convMessages.lastChild.remove();
                }
                
                if (response.ok) {
                    addConvBubble(`Success! Your inquiry has been securely sent directly to our team. We will be in touch shortly.`, 'system');
                } else {
                    throw new Error('Failed to send');
                }
            } catch (err) {
                if (convMessages.lastChild.querySelector('.typing-indicator')) {
                    convMessages.lastChild.remove();
                }
                addConvBubble(`Sorry, there was an error submitting your request. Please try emailing us directly at amankar125@gmail.com.`, 'system');
            }
        }

        if (convSendBtn) convSendBtn.addEventListener('click', handleInput);
        if (convInput) {
            convInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleInput();
            });
        }
    }

    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterStatus = document.getElementById('newsletter-status');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            newsletterStatus.className = 'form-status small';
            newsletterStatus.textContent = 'Subscribing...';
            try {
                const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
                if (response.ok) {
                    newsletterStatus.textContent = 'Subscribed successfully.';
                    newsletterStatus.classList.add('success');
                    newsletterForm.reset();
                } else { throw new Error('Subscription failed'); }
            } catch (err) {
                newsletterStatus.textContent = err.message || 'An error occurred.';
                newsletterStatus.classList.add('error');
            }
        });
    }

    // 8. Chat Widget
    const chatToggle = document.getElementById('chat-toggle');
    const chatPanel = document.getElementById('chat-panel');
    const chatClose = document.getElementById('chat-close');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    let conversationId = null;

    if (chatToggle && chatPanel && chatClose) {
        chatToggle.addEventListener('click', () => { chatPanel.classList.add('active'); chatInput.focus(); });
        chatClose.addEventListener('click', () => { chatPanel.classList.remove('active'); });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (!message) return;
            addChatMessage(message, 'user');
            chatInput.value = '';
            const typingId = 'typing-' + Date.now();
            addChatMessage('...', 'assistant', typingId);
            try {
                const payload = { message };
                if (conversationId) payload.conversation_id = conversationId;
                const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                const typingIndicator = document.getElementById(typingId);
                if (typingIndicator) typingIndicator.remove();
                if (response.ok) {
                    const data = await response.json();
                    conversationId = data.conversation_id;
                    addChatMessage(data.reply, 'assistant');
                } else {
                    addChatMessage('Sorry, I encountered an error.', 'assistant');
                }
            } catch (err) {
                const typingIndicator = document.getElementById(typingId);
                if (typingIndicator) typingIndicator.remove();
                addChatMessage('Connection error.', 'assistant');
            }
        });
    }

    function addChatMessage(content, sender, id = null) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        if (id) div.id = id;
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        if (sender === 'user') {
            // User messages: use textContent for safety
            contentDiv.textContent = content;
        } else {
            // Assistant messages: render formatted LLM responses
            let formatted = content
                .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') // Escape HTML
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // **bold**
                .replace(/\n/g, '<br>');  // Newlines → line breaks
            contentDiv.innerHTML = formatted;
        }
        div.appendChild(contentDiv);
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ==========================================
    // 9. Pricing Matrix Dynamic Logic
    // ==========================================
    const pricingMatrix = {
        web: {
            t1: { t: "Launch", p: "₹35K+", f: ["Custom UI/UX", "Responsive frontend", "Basic backend/API", "Deployment"] },
            t2: { t: "Build", p: "₹1L+", f: ["Full-stack application architecture", "Database design", "Authentication", "Admin dashboard", "One third-party integration", "Deployment"] },
            t3: { t: "Scale", p: "₹2.5L+", f: ["Scalable application architecture", "Advanced security", "Cloud deployment", "Multiple third-party integrations", "Performance optimization"] }
        },
        data: {
            t1: { t: "Insight", p: "₹40K+", f: ["Data cleaning", "Exploratory data analysis", "KPI analysis", "Interactive dashboard", "Business insights"] },
            t2: { t: "Pipeline", p: "₹90K+", f: ["Automated ETL/ELT", "Multiple data sources", "Database optimization", "Scheduled data pipelines"] },
            t3: { t: "Data Platform", p: "₹1.75L+", f: ["Cloud data warehouse", "Multiple data pipelines", "Data quality checks", "Analytics layer", "API/data access"] }
        },
        ml: {
            t1: { t: "Predict", p: "₹75K+", f: ["Data preparation", "Feature engineering", "ML model development", "Model evaluation", "Prediction report"] },
            t2: { t: "Intelligence", p: "₹1.5L+", f: ["Advanced ML", "Multiple features/models", "Prediction API", "Analytics dashboard", "Model deployment"] },
            t3: { t: "Enterprise ML", p: "₹3L+", f: ["Production ML pipeline", "Model serving", "Model monitoring", "Automated retraining", "Scalable infrastructure"] }
        },
        ai: {
            t1: { t: "AI Workflow", p: "₹50K+", f: ["LLM integration", "Single AI workflow", "Prompt/system design", "Basic tool/API integration", "Deployment"] },
            t2: { t: "AI Knowledge System", p: "₹1.5L+", f: ["Custom RAG", "Vector database", "Data ingestion", "Retrieval optimization", "Citations", "AI chat interface"] },
            t3: { t: "Autonomous AI", p: "₹3.5L+", f: ["Multi-agent architecture", "Tool orchestration", "Advanced RAG", "AI guardrails", "Monitoring", "Production deployment"] }
        },
        consulting: {
            t1: { t: "Tech Audit", p: "₹20K+", f: ["Codebase review", "Architecture review", "Dependency assessment", "Basic security assessment", "Technical improvement report"] },
            t2: { t: "Strategy Sprint", p: "₹50K+", f: ["One-week discovery", "Architecture planning", "Technology stack selection", "Feasibility analysis", "Prototype blueprint", "Implementation roadmap"] },
            t3: { t: "Fractional CTO", p: "₹1.5L+<span>/month</span>", f: ["Weekly strategy sessions", "Architecture leadership", "Engineering roadmap", "Team guidance", "Vendor evaluation", "Technical decision support"] }
        }
    };

    const tabs = document.querySelectorAll('.pricing-tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const key = tab.getAttribute('data-target');
                const data = pricingMatrix[key];
                const contentPanel = document.querySelector('.pricing-content');
                
                contentPanel.style.opacity = 0;
                
                setTimeout(() => {
                    document.getElementById('tier1-title').innerText = data.t1.t;
                    document.getElementById('tier1-price').innerHTML = data.t1.p;
                    document.getElementById('tier1-features').innerHTML = data.t1.f.map(item => `<li>${item}</li>`).join('');
                    
                    document.getElementById('tier2-title').innerText = data.t2.t;
                    document.getElementById('tier2-price').innerHTML = data.t2.p;
                    document.getElementById('tier2-features').innerHTML = data.t2.f.map(item => `<li>${item}</li>`).join('');
                    
                    document.getElementById('tier3-title').innerText = data.t3.t;
                    document.getElementById('tier3-price').innerHTML = data.t3.p;
                    document.getElementById('tier3-features').innerHTML = data.t3.f.map(item => `<li>${item}</li>`).join('');
                    
                    contentPanel.style.opacity = 1;
                }, 200);
            });
        });
    }

    // ==========================================
    // 10. AI Price Predictor (ML Simulation)
    // ==========================================
    const btnPredict = document.getElementById('btnPredict');
    if (btnPredict) {
        btnPredict.addEventListener('click', () => {
            const service = parseInt(document.getElementById('predService').value);
            const complexity = parseInt(document.getElementById('predComplexity').value);
            const timeline = parseFloat(document.getElementById('predTimeline').value);
            
            // Base Price Generation
            let base = 0;
            if (service === 1) base = 30000;
            if (service === 2) base = 99000;
            if (service === 3) base = 150000;
            if (service === 4) base = 300000;
            
            // Complexity Multiplier
            let multiplier = 1;
            if (complexity === 2) multiplier = 1.8;
            if (complexity === 3) multiplier = 3.5;
            
            // Timeline Multiplier
            const finalCost = base * multiplier * timeline;
            
            const resultDiv = document.getElementById('predictionResult');
            const priceText = document.getElementById('predictedPriceText');
            
            // Simulating ML prediction delay
            btnPredict.innerText = "Running Model...";
            
            setTimeout(() => {
                btnPredict.innerText = "Predict Estimate";
                resultDiv.style.display = 'block';
                
                // Format number to INR format
                const formattedPrice = Math.round(finalCost).toLocaleString('en-IN');
                priceText.innerText = '₹' + formattedPrice;
                
                // Add a small pulse animation to the result
                priceText.style.animation = 'none';
                priceText.offsetHeight; /* trigger reflow */
                priceText.style.animation = 'pulse 1s';
            }, 800);
        });
    }

    // Initialize Cobe Globe
    // Initialize Refined Custom Three.js Globe with Bloom & Real Continents
    function initGlobe() {
        const container = document.getElementById("three-globe-container");
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0); // Transparent background for bloom
        container.appendChild(renderer.domElement);

        // Setup Post-Processing (Bloom)
        let composer = null;
        if (typeof THREE.EffectComposer !== 'undefined') {
            const renderScene = new THREE.RenderPass(scene, camera);
            const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.2, 0.4, 0.85);
            bloomPass.threshold = 0.0; // Lower threshold so everything glows
            bloomPass.strength = 4.0; // Massive brightness boost
            bloomPass.radius = 1.0;

            composer = new THREE.EffectComposer(renderer);
            composer.addPass(renderScene);
            composer.addPass(bloomPass);
        }

        const globeGroup = new THREE.Group();
        scene.add(globeGroup);
        globeGroup.rotation.z = 23.5 * Math.PI / 180;

        // 1. The Glass Sphere
        const sphereGeo = new THREE.SphereGeometry(4.8, 64, 64);
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0x050505,
            transparent: true,
            opacity: 0.0, // Set to 0 to remove the dark "black background" core
            roughness: 0.1,
            transmission: 0.9,
            thickness: 0.5,
        });
        globeGroup.add(new THREE.Mesh(sphereGeo, glassMat));

        // 2. Atmospheric Rim Light
        const rimMat = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0x00d2ff) }
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
                    gl_FragColor = vec4(color, intensity * 0.4);
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });
        globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(5.05, 64, 64), rimMat));

        // 3. Real Continents (Texture Sampling)
        const dotsGeo = new THREE.BufferGeometry();
        const dotsMat = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0xffffff) } // Pure white for maximum brightness
            },
            vertexShader: `
                attribute float aOpacity;
                varying float vOpacity;
                varying vec3 vNormal;
                void main() {
                    vOpacity = aOpacity;
                    vNormal = normalize(normalMatrix * position);
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = (12.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                varying float vOpacity;
                varying vec3 vNormal;
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    // Facing ratio for opacity: Front=100%, Edge=80%, Back=50%
                    float facing = dot(vNormal, vec3(0.0, 0.0, 1.0));
                    float angleOpacity = smoothstep(-1.0, 1.0, facing);
                    float finalAngleOpacity = mix(0.5, 1.0, angleOpacity); // 0.5 min on the back so it's much brighter

                    // Micro-shimmer
                    float shimmer = (sin(time * 3.0 + vOpacity * 20.0) * 0.2) + 0.8;
                    float alpha = finalAngleOpacity * shimmer; // Removed distance dimming for massively brighter dots
                    
                    // Boost final color output to force intense bloom
                    gl_FragColor = vec4(color * 1.5, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        // Load map and generate points
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = "https://unpkg.com/three-globe/example/img/earth-water.png";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            const posArray = [];
            const opacities = [];
            const R = 4.81;
            const LAT_RES = 100;
            const LNG_RES = 200;

            for(let lat=0; lat<LAT_RES; lat++) {
                for(let lng=0; lng<LNG_RES; lng++) {
                    const latMap = (lat / LAT_RES) * 180 - 90;
                    const lngMap = (lng / LNG_RES) * 360 - 180;
                    
                    const px = Math.floor((lngMap + 180) / 360 * canvas.width);
                    const py = Math.floor((90 - latMap) / 180 * canvas.height);
                    
                    const idx = (py * canvas.width + px) * 4;
                    // earth-water.png usually has dark for water, bright for land, or vice-versa.
                    // Actually, three-globe uses earth-water.png where water is black (0) and land is white (255) for elevation.
                    // We assume land is bright (value > 128)
                    const isLand = imgData[idx] > 128; 

                    if(isLand) {
                        const phi = (90 - latMap) * (Math.PI / 180);
                        const theta = (lngMap + 180) * (Math.PI / 180);
                        
                        posArray.push(
                            -(R * Math.sin(phi) * Math.cos(theta)),
                            R * Math.cos(phi),
                            R * Math.sin(phi) * Math.sin(theta)
                        );
                        opacities.push(Math.random());
                    }
                }
            }

            dotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3));
            dotsGeo.setAttribute('aOpacity', new THREE.Float32BufferAttribute(opacities, 1));
            const dotMesh = new THREE.Points(dotsGeo, dotsMat);
            globeGroup.add(dotMesh);
        };

        // 4. Floating Particles (Dust)
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(400 * 3);
        for(let i = 0; i < 1200; i++) starPos[i] = (Math.random() - 0.5) * 35;
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMesh = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x88ffcc, size: 0.05, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
        scene.add(starMesh);

        // 5. Accent Nodes (Teal)
        const nodes = [];
        for(let i=0; i<5; i++) {
            const nodeGroup = new THREE.Group();
            const node = new THREE.Mesh(
                new THREE.SphereGeometry(0.08, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 1.0 })
            );
            nodeGroup.add(node);
            
            const halo = new THREE.Mesh(
                new THREE.SphereGeometry(0.18, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending })
            );
            nodeGroup.add(halo);
            
            globeGroup.add(nodeGroup);
            nodes.push({ 
                mesh: nodeGroup, 
                phiOffset: Math.random() * Math.PI, 
                thetaOffset: Math.random() * Math.PI, 
                speed: 0.1 + Math.random() * 0.2 
            });
        }

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 1.5));
        
        const dirLight = new THREE.DirectionalLight(0x00d2ff, 1.5); // Boosted and recolored light
        dirLight.position.set(-5, 5, -5);
        scene.add(dirLight);

        // Animation
        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            
            // 1 rot / 25s
            globeGroup.rotation.y += (Math.PI * 2) / (25 * 60);
            
            starMesh.rotation.y += 0.0003;
            dotsMat.uniforms.time.value = time;
            
            nodes.forEach(n => {
                const t = time * n.speed;
                const phi = Math.sin(t) * 0.5 + n.phiOffset;
                const theta = t + n.thetaOffset;
                n.mesh.position.set(
                    -(4.85 * Math.sin(phi) * Math.cos(theta)),
                    4.85 * Math.cos(phi),
                    4.85 * Math.sin(phi) * Math.sin(theta)
                );
            });
            
            if (composer) {
                composer.render();
            } else {
                renderer.render(scene, camera);
            }
        }
        animate();

        window.addEventListener('resize', () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            if (composer) composer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    setTimeout(initGlobe, 100);

    // 9. Interactive AI Playground Logic
    const runBtn = document.getElementById('run-playground-btn');
    const terminal = document.getElementById('playground-terminal');
    const statusInd = document.querySelector('.status-indicator');
    
    const dataSelect = document.getElementById('pg-data');
    const modelSelect = document.getElementById('pg-model');
    const taskSelect = document.getElementById('pg-task');
    const formatSelect = document.getElementById('pg-format');
    const codeSnippet = document.getElementById('live-code-snippet');
    
    function updateCodeSnippet() {
        if (!codeSnippet) return;
        const modelMap = {
            'gpt4': 'gpt-4-enterprise',
            'llama3': 'llama-3-custom',
            'claude': 'claude-3.5-sonnet'
        };
        const dataMap = {
            's3': 's3://raw-data/q3',
            'snowflake': 'snowflake://crm/users',
            'postgres': 'postgresql://server/logs'
        };
        const taskMap = {
            'sales': 'extract_insights',
            'churn': 'predict_churn',
            'anomaly': 'detect_anomalies'
        };
        const formatValue = formatSelect ? formatSelect.value : "json";
        
        codeSnippet.innerHTML = `
            <span style="color:#ff7b72">from</span> buildlyst <span style="color:#ff7b72">import</span> AIAgent<br>
            agent = AIAgent(model=<span style="color:#a5d6ff">"${modelMap[modelSelect.value]}"</span>)<br>
            data = agent.analyze_dataset(<br>
            &nbsp;&nbsp;&nbsp;&nbsp;source=<span style="color:#a5d6ff">"${dataMap[dataSelect.value]}"</span>,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;task=<span style="color:#a5d6ff">"${taskMap[taskSelect.value]}"</span>,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;format=<span style="color:#a5d6ff">"${formatValue}"</span><br>
            )
        `;
    }

    if (dataSelect) dataSelect.addEventListener('change', updateCodeSnippet);
    if (modelSelect) modelSelect.addEventListener('change', updateCodeSnippet);
    if (taskSelect) taskSelect.addEventListener('change', updateCodeSnippet);
    if (formatSelect) formatSelect.addEventListener('change', updateCodeSnippet);

    if (runBtn) {
        runBtn.addEventListener('click', () => {
            const dataSelect = document.getElementById('pg-data');
            const modelSelect = document.getElementById('pg-model');
            const taskSelect = document.getElementById('pg-task');
            const formatSelect = document.getElementById('pg-format');
            
            const dataSource = dataSelect.options[dataSelect.selectedIndex].text;
            const modelName = modelSelect.options[modelSelect.selectedIndex].text;
            const activeTask = taskSelect.value;
            const activeFormat = formatSelect ? formatSelect.value : "json";
            
            const loader = runBtn.querySelector('.btn-loader');
            const btnText = runBtn.querySelector('.btn-text');
            
            // Set loading state
            loader.style.display = 'block';
            btnText.style.display = 'none';
            statusInd.textContent = 'RUNNING';
            statusInd.classList.add('running');
            
            terminal.innerHTML = '<div class="terminal-line comment">&gt; Initializing ' + modelName + '...</div>';
            terminal.scrollTop = terminal.scrollHeight;
            
            setTimeout(() => {
                terminal.innerHTML += '<div class="terminal-line comment">&gt; Connecting to ' + dataSource + '... [CONNECTED]</div>';
                terminal.scrollTop = terminal.scrollHeight;
                
                setTimeout(() => {
                    terminal.innerHTML += '<div class="terminal-line comment">&gt; Executing pipeline task: ' + taskSelect.options[taskSelect.selectedIndex].text + '...</div>';
                    terminal.scrollTop = terminal.scrollHeight;
                    
                    setTimeout(() => {
                        // Reset button
                        loader.style.display = 'none';
                        btnText.style.display = 'block';
                        statusInd.textContent = 'COMPLETED';
                        statusInd.classList.remove('running');
                        
                        let resultText = "";
                        if (activeTask === 'sales') {
                            resultText = '{\n  "status": "success",\n  "insights": [\n    "Q3 Revenue: $4.2M (+24% YoY)",\n    "Top Region: APAC",\n    "Anomaly: Unusually high CAC in Week 4"\n  ]\n}';
                        } else if (activeTask === 'churn') {
                            resultText = '{\n  "status": "success",\n  "risk_score": 0.84,\n  "flagged_accounts": 12,\n  "primary_factors": [\n    "Low product engagement (30d)",\n    "Unresolved support tickets > 48h"\n  ]\n}';
                        } else {
                            resultText = '{\n  "status": "alert",\n  "threat_level": "High",\n  "anomalies_detected": 3,\n  "details": "Multiple failed login attempts from IP 192.168.1.45 targeting admin endpoints."\n}';
                        }
                        
                        const resultDiv = document.createElement('div');
                        resultDiv.className = 'terminal-line success';
                        terminal.appendChild(resultDiv);
                        
                        let i = 0;
                        function typeWriter() {
                            if (i < resultText.length) {
                                resultDiv.innerHTML += resultText.charAt(i);
                                i++;
                                terminal.scrollTop = terminal.scrollHeight;
                                setTimeout(typeWriter, 15);
                            } else {
                                terminal.innerHTML += '<br><div class="terminal-line comment">&gt; Ready.</div>';
                                terminal.scrollTop = terminal.scrollHeight;
                            }
                        }
                        typeWriter();
                        
                    }, 1000);
                }, 800);
            }, 600);
        });
    }

    // 10. Mobile Navigation Menu Toggle Logic
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            document.body.classList.add('scroll-locked');
        }
    }

    function closeMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('scroll-locked');
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });



});




/* ==========================================================================
   15 Real-World Scenario Auto-Rotation Engine (Enriched Content & 9s Timer)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const scenarios = [
        {
            title: "Retail Store (Bhopal)",
            tag: "Local Retail",
            impact: "+40% Retention",
            problem: "A retail business owner in Bhopal was losing 25% of repeat customers monthly and sales were plummeting with zero tracking.",
            solution: "We solved this by architecting & delivering a custom Cloud Data Warehouse connected to an Automated AI WhatsApp Offer Engine.",
            result: "Completely halted customer churn, boosted repeat retention by +42%, and delivered 2.5x total revenue growth in 60 days."
        },
        {
            title: "D2C Fashion Brand (Delhi)",
            tag: "E-Commerce",
            impact: "$14.5k Recovered",
            problem: "A clothing brand in Delhi suffered a 68% cart abandonment rate, burning $12,000 monthly in ad spend with zero recovery.",
            solution: "We solved this by engineering & delivering an Autonomous Multi-Channel AI Re-engagement Agent on WhatsApp & Email.",
            result: "Recovered 35% of abandoned carts, generating $14.5k in net new monthly revenue and cutting acquisition costs."
        },
        {
            title: "Logistics Firm (Mumbai)",
            tag: "Logistics",
            impact: "60% Faster Transit",
            problem: "A fleet operator in Mumbai with 150+ trucks suffered severe delivery delays due to unorganized manual driver tracking.",
            solution: "We solved this by building & delivering a real-time IoT Telemetry Pipeline and Predictive AI Route Optimization Engine.",
            result: "Achieved 60% faster transit speeds, reduced fuel costs by 22%, and guaranteed 99.8% on-time delivery."
        },
        {
            title: "SaaS Startup (Bangalore)",
            tag: "SaaS & Tech",
            impact: "3.2x Conversion",
            problem: "A SaaS platform in Bangalore saw 85% of trial users drop off before upgrading, leading to stagnant monthly revenue.",
            solution: "We solved this by deploying & delivering an in-app AI Behavioral Nudge System that predicts friction points.",
            result: "Increased trial-to-paid conversion rate by 3.2x and doubled Monthly Recurring Revenue (MRR) within one quarter."
        },
        {
            title: "Healthcare Clinic Chain",
            tag: "Healthcare",
            impact: "100% Centralized",
            problem: "A chain of 12 medical clinics had patient records trapped across 5 legacy systems, wasting 15 mins per patient.",
            solution: "We solved this by engineering & delivering a secure, HIPAA-compliant Unified Data Pipeline & Instant Search Dashboard.",
            result: "Saved doctors 15 mins per consultation, increased daily patient capacity by 30%, and achieved 100% data compliance."
        },
        {
            title: "Real Estate Brokerage",
            tag: "Real Estate",
            impact: "4x Deal Closures",
            problem: "A real estate firm was losing deal closures because brokers spent 4+ hours daily answering unqualified lead calls.",
            solution: "We solved this by developing & delivering an Autonomous AI Lead Qualification & Scheduling Agent.",
            result: "Eliminated broker admin work, increased site visit conversions by 4x, and closed $2.1M in property volume in 90 days."
        },
        {
            title: "Fintech Startup",
            tag: "Fintech",
            impact: "30s Credit Score",
            problem: "A digital lender was suffering high drop-offs due to a tedious 3-day manual credit scoring process.",
            solution: "We solved this by building & delivering a custom Machine Learning Risk Assessment Algorithm with instant data ingestion.",
            result: "Reduced credit approval time from 3 days to 30 seconds, leading to a 5x increase in daily approved loan volume."
        },
        {
            title: "Restaurant Chain",
            tag: "Food & Beverage",
            impact: "30% Less Spoilage",
            problem: "A 6-location restaurant chain suffered $8,000 monthly in food spoilage due to guesswork inventory ordering.",
            solution: "We solved this by deploying & delivering an ML Demand Forecasting Model trained on historical sales & local event data.",
            result: "Reduced food waste by 32%, saved $2,600 monthly per location, and completely eliminated stockouts."
        },
        {
            title: "EdTech Platform",
            tag: "EdTech",
            impact: "2.8x Completion",
            problem: "An online learning platform saw 70% student drop-outs during complex coding modules due to lack of night-time help.",
            solution: "We solved this by building & delivering an Adaptive AI Code Tutor Agent providing 24/7 instant debug assistance.",
            result: "Increased course completion rates by 2.8x and boosted student satisfaction scores from 3.2 to 4.9 stars."
        },
        {
            title: "Manufacturing Plant",
            tag: "Manufacturing",
            impact: "99.99% Uptime",
            problem: "A manufacturing plant suffered motor breakdowns that halted production lines, costing $45,000 per outage.",
            solution: "We solved this by installing & delivering an IoT Sensor Data Pipeline paired with Predictive Maintenance ML Models.",
            result: "Achieved 99.99% factory uptime, completely eliminated emergency outages, and saved $180k annually."
        },
        {
            title: "Digital Marketing Agency",
            tag: "Agency Services",
            impact: "$15k/mo Savings",
            problem: "An agency's account managers spent 25+ hours weekly manually pulling reports and answering client status emails.",
            solution: "We solved this by architecting & delivering an Autonomous Client Portal Agent with automated live metrics sync.",
            result: "Cut reporting overhead by 90%, saved $15k monthly in team payroll, and improved client retention to 98%."
        },
        {
            title: "Legal Practice",
            tag: "Legal",
            impact: "10x Audit Speed",
            problem: "Attorneys spent 20+ hours weekly manually auditing 100-page commercial contracts for compliance risks.",
            solution: "We solved this by engineering & delivering a secure Enterprise RAG Document Classification & Audit System.",
            result: "Accelerated contract review speed by 10x while detecting 100% of compliance anomalies with zero human error."
        },
        {
            title: "Luxury Hotel Chain",
            tag: "Hospitality",
            impact: "+28% RevPAR",
            problem: "A resort group was leaving money on the table due to static pricing that failed to adjust to local event surges.",
            solution: "We solved this by building & delivering a Real-Time Dynamic ML Pricing Engine analyzing market demand.",
            result: "Boosted Revenue Per Available Room (RevPAR) by +28% and increased annual hotel profit by $340,000."
        },
        {
            title: "E-Commerce Footwear Brand",
            tag: "E-Commerce",
            impact: "52% Fewer Returns",
            problem: "A shoe brand suffered a 35% return rate due to sizing confusion, burning $18,000 monthly in return shipping.",
            solution: "We solved this by building & delivering an AI Size & Fit Recommendation Widget trained on customer foot metrics.",
            result: "Reduced sizing returns by 52% and increased first-time buyer checkout confidence by 40%."
        },
        {
            title: "B2B Hardware Distributor",
            tag: "B2B Hardware",
            impact: "18 Days Faster Cash",
            problem: "Unpaid invoices averaged 45+ days overdue, creating severe cashflow bottlenecks for inventory re-ordering.",
            solution: "We solved this by delivering an Automated Accounts Receivable Agent with instant payment gateway integrations.",
            result: "Reduced average payment collection time by 18 days and improved cashflow predictability by 65%."
        }

    ];

    let currentIndex = 0;
    let timer = null;
    let progressTimer = null;
    let progress = 0;
    const SLIDE_DURATION = 9000; // 9 Seconds for relaxed reading

    const titleEl = document.getElementById('scenario-title');
    const problemEl = document.getElementById('scenario-problem');
    const solutionEl = document.getElementById('scenario-solution');
    const resultEl = document.getElementById('scenario-result');
    const tagEl = document.getElementById('scenario-industry-tag');
    const progressBar = document.getElementById('scenario-progress-bar');
    const container = document.getElementById('scenario-card-container');
    const chipBtns = document.querySelectorAll('.chip-btn');

    const p1 = document.getElementById('phase-1');
    const p2 = document.getElementById('phase-2');
    const p3 = document.getElementById('phase-3');

    if (!titleEl || !problemEl || !solutionEl || !resultEl) return;

    function resetProgress() {
        progress = 0;
        if (progressBar) progressBar.style.width = '0%';
    }

    function renderScenario(index) {
        resetProgress();

        if (p1) p1.style.opacity = '0';
        if (p2) p2.style.opacity = '0';
        if (p3) p3.style.opacity = '0';
        if (titleEl) titleEl.style.opacity = '0';

        setTimeout(() => {
            const data = scenarios[index];
            titleEl.textContent = data.title;
            if (tagEl) tagEl.textContent = data.tag;
            const impactEl = document.getElementById('scenario-impact-badge');
            if (impactEl) impactEl.textContent = `[ ${data.impact} ]`;
            problemEl.textContent = data.problem;
            solutionEl.textContent = data.solution;
            resultEl.textContent = data.result;

            chipBtns.forEach((btn) => {
                if (parseInt(btn.getAttribute('data-index')) === index) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            titleEl.style.opacity = '1';

            // Staggered Animations for 3 phases
            setTimeout(() => { if (p1) { p1.style.opacity = '1'; p1.classList.add('phase-card-animate'); } }, 100);
            setTimeout(() => { if (p2) { p2.style.opacity = '1'; p2.classList.add('phase-card-animate'); } }, 250);
            setTimeout(() => { if (p3) { p3.style.opacity = '1'; p3.classList.add('phase-card-animate'); } }, 400);

        }, 150);
    }

    function nextScenario() {
        currentIndex = (currentIndex + 1) % scenarios.length;
        renderScenario(currentIndex);
    }

    function prevScenario() {
        currentIndex = (currentIndex - 1 + scenarios.length) % scenarios.length;
        renderScenario(currentIndex);
    }

    function startAutoPlay() {
        if (!timer) {
            timer = setInterval(() => {
                nextScenario();
            }, SLIDE_DURATION);
        }
        if (!progressTimer) {
            progressTimer = setInterval(() => {
                progress += (100 / (SLIDE_DURATION / 100));
                if (progress > 100) progress = 100;
                if (progressBar) progressBar.style.width = `${progress}%`;
            }, 100);
        }
    }

    function stopAutoPlay() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        if (progressTimer) {
            clearInterval(progressTimer);
            progressTimer = null;
        }
    }

    const prevBtn = document.getElementById('prev-scenario-btn');
    const nextBtn = document.getElementById('next-scenario-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevScenario();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextScenario();
            startAutoPlay();
        });
    }

    chipBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index'));
            currentIndex = idx;
            stopAutoPlay();
            renderScenario(currentIndex);
            startAutoPlay();
        });
    });

    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();

                // Case Studies Carousel Controls
    const prevProjBtn = document.getElementById('prev-project');
    const nextProjBtn = document.getElementById('next-project');
    const projTrack = document.getElementById('projects-track');

    if (prevProjBtn && projTrack) {
        prevProjBtn.addEventListener('click', () => {
            projTrack.scrollBy({ left: -360, behavior: 'smooth' });
        });
    }

    if (nextProjBtn && projTrack) {
        nextProjBtn.addEventListener('click', () => {
            projTrack.scrollBy({ left: 360, behavior: 'smooth' });
        });
    }
});