document.addEventListener('DOMContentLoaded', () => {

    // 0. Intro Splash Sequence
    const splash = document.getElementById('intro-splash');
    const splashWindow = document.getElementById('splash-window');
    const mainContent = document.getElementById('main-content');
    
    let splashScale = 1;
    let splashCompleted = false;

    if (splash && splashWindow) {
        window.addEventListener('wheel', handleSplashScroll, { passive: false });
        window.addEventListener('touchmove', handleSplashScroll, { passive: false });
        window.addEventListener('keydown', (e) => {
            if (!splashCompleted && ['ArrowDown', 'ArrowUp', 'Space', 'PageDown'].includes(e.code)) {
                e.preventDefault();
                handleSplashScroll({ deltaY: e.code === 'ArrowUp' ? -100 : 100, preventDefault: () => {} });
            }
        }, { passive: false });
    } else {
        document.body.classList.remove('scroll-locked');
        if (mainContent) mainContent.style.opacity = 1;
        initHeroChat();
    }

    function handleSplashScroll(e) {
        if (splashCompleted) return;
        if (e.preventDefault) e.preventDefault();
        const delta = e.deltaY || 10;
        
        if (delta > 0) {
            splashScale += 0.15;
        } else if (delta < 0 && splashScale > 1) {
            splashScale -= 0.15;
        }

        splashWindow.style.transform = `scale(${splashScale})`;

        if (splashScale > 20) {
            splashCompleted = true;
            splash.style.transition = 'opacity 0.8s ease';
            splash.style.opacity = 0;
            
            document.body.classList.remove('scroll-locked');
            mainContent.style.opacity = 1;
            
            window.removeEventListener('wheel', handleSplashScroll);
            window.removeEventListener('touchmove', handleSplashScroll);
            
            setTimeout(() => {
                splash.style.display = 'none';
                initHeroChat();
            }, 800);
        }
    }

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

    // 1. Scroll Reveal System
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));
    setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) hero.classList.add('active');
    }, 100);

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
                    addChatMessage(data.response, 'assistant');
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
        contentDiv.textContent = content;
        div.appendChild(contentDiv);
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ==========================================
    // 9. Pricing Matrix Dynamic Logic
    // ==========================================
    const pricingMatrix = {
        web: {
            t1: { t: "Starter MVP", p: "₹30K", f: ["Custom UI/UX Design", "Responsive Frontend", "Basic Backend API"] },
            t2: { t: "Professional App", p: "₹99K", f: ["Fullstack Architecture", "Database Design", "Payment Gateway", "Admin Dashboard"] },
            t3: { t: "Enterprise Scale", p: "₹2.5L", f: ["Microservices", "Load Balancing", "Advanced Security", "Custom Integrations"] }
        },
        ai: {
            t1: { t: "Basic Agent", p: "₹50K", f: ["OpenAI API Integration", "Single Workflow", "Basic Prompt Engineering"] },
            t2: { t: "Custom RAG", p: "₹1.5L", f: ["Vector Database Setup", "Custom Data Ingestion", "Advanced RAG Pipeline", "Chat Interface"] },
            t3: { t: "Autonomous Pod", p: "₹4L", f: ["Multi-Agent Architecture", "Fine-tuned Local Models", "Enterprise Security", "Continuous Learning"] }
        },
        data: {
            t1: { t: "Data Setup", p: "₹75K", f: ["Basic ETL Pipeline", "SQL Database Optimization", "Automated Backups"] },
            t2: { t: "Warehouse", p: "₹2L", f: ["Cloud Data Warehouse", "Real-time Streaming", "Dashboard Analytics", "API Endpoints"] },
            t3: { t: "Predictive Analytics", p: "₹5L", f: ["Machine Learning Models", "Big Data Clusters", "Predictive Dashboards", "SOC2 Compliance"] }
        },
        enterprise: {
            t1: { t: "Cloud Migration", p: "₹1.5L", f: ["AWS/GCP Migration", "Docker Containerization", "CI/CD Setup"] },
            t2: { t: "Kubernetes Core", p: "₹3.5L", f: ["K8s Cluster Setup", "Auto-scaling", "Monitoring & Logging", "Zero-downtime Deploy"] },
            t3: { t: "Dedicated Pod", p: "₹8L", f: ["Full Embedded Team", "24/7 SLA Support", "Infrastructure as Code", "Compliance Audits"] }
        },
        consulting: {
            t1: { t: "Tech Audit", p: "₹25K", f: ["Codebase Review", "Architecture Audit", "Security Vulnerability Scan"] },
            t2: { t: "Strategy Sprint", p: "₹75K", f: ["1-Week Design Sprint", "Tech Stack Selection", "Feasibility Report", "Prototype Blueprint"] },
            t3: { t: "Fractional CTO", p: "₹2L/mo", f: ["Weekly Strategy Calls", "Team Leadership", "Vendor Management", "Board Reporting"] }
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
                    document.getElementById('tier1-price').innerText = data.t1.p;
                    document.getElementById('tier1-features').innerHTML = data.t1.f.map(item => `<li>${item}</li>`).join('');
                    
                    document.getElementById('tier2-title').innerText = data.t2.t;
                    document.getElementById('tier2-price').innerText = data.t2.p;
                    document.getElementById('tier2-features').innerHTML = data.t2.f.map(item => `<li>${item}</li>`).join('');
                    
                    document.getElementById('tier3-title').innerText = data.t3.t;
                    document.getElementById('tier3-price').innerText = data.t3.p;
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

});
