document.addEventListener('DOMContentLoaded', () => {

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
