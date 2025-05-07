/**
 * AI Assistant - Interactive chat behavior for HostNova
 * 
 * This script implements the functionality for the AI chat assistant widget,
 * including toggling the panel, handling user input, and generating responses.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const aiAssistant = document.getElementById('ai-assistant');
    const aiToggle = document.getElementById('ai-toggle');
    const aiClose = document.querySelector('.ai-close');
    const aiConversation = document.querySelector('.ai-conversation');
    const aiUserInput = document.getElementById('ai-user-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    
    // Initialize D3.js visualization if available
    initializePlatformMetrics();

    // Toggle assistant panel
    aiToggle.addEventListener('click', () => {
        aiAssistant.classList.toggle('active');
    });
    
    // Close assistant panel
    aiClose.addEventListener('click', () => {
        aiAssistant.classList.remove('active');
    });
    
    // Send message on button click
    aiSendBtn.addEventListener('click', () => {
        sendMessage();
    });
    
    // Send message on Enter key
    aiUserInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Handle sending a message
    function sendMessage() {
        const message = aiUserInput.value.trim();
        if (message === '') return;
        
        // Add user message to conversation
        addMessage('outgoing', message);
        
        // Clear input field
        aiUserInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Generate AI response after a delay (simulating thinking)
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Generate and add AI response
            const response = generateResponse(message);
            addMessage('incoming', response);
            
            // Scroll to bottom
            scrollToBottom();
        }, 1500);
    }
    
    // Add a message to the conversation
    function addMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-${type}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'ai-avatar';
        avatar.textContent = type === 'incoming' ? 'AI' : 'You';
        
        const content = document.createElement('div');
        content.className = 'ai-content';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        
        content.appendChild(paragraph);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        aiConversation.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-typing';
        typingDiv.id = 'ai-typing';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        
        aiConversation.appendChild(typingDiv);
        scrollToBottom();
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('ai-typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Scroll conversation to bottom
    function scrollToBottom() {
        aiConversation.scrollTop = aiConversation.scrollHeight;
    }
    
    // Generate a response based on user input
    function generateResponse(message) {
        message = message.toLowerCase();
        
        // Simple response logic based on keywords
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello there! I'm Nova, your personal assistant for HostNova. How can I help you today?";
        } 
        else if (message.includes('hostara') || message.includes('host')) {
            return "Hostara is our cutting-edge decentralized hosting platform, designed for unparalleled security, performance, and user control. It leverages a global network of nodes to ensure content delivery from the nearest point, with end-to-end encryption and censorship resistance.";
        }
        else if (message.includes('gainchain') || message.includes('os')) {
            return "GainChain OS is the specialized operating system that powers HostNova. It's designed from the ground up for decentralized applications and services, ensuring maximum efficiency, security, and interoperability across our network.";
        }
        else if (message.includes('decentralized') || message.includes('decentralization')) {
            return "HostNova is built on true decentralization. This means no central servers or authorities - your website or application runs on a global network of nodes, ensuring maximum uptime and resistance to censorship. You maintain full control over your data and content.";
        }
        else if (message.includes('security') || message.includes('secure')) {
            return "Security is at the core of HostNova. We utilize distributed data storage and cryptographic verification to make your digital assets virtually impervious to common attacks and single points of failure. Your data remains private and secure at all times.";
        }
        else if (message.includes('performance') || message.includes('speed')) {
            return "HostNova offers optimized performance through our distributed network, where content is served from nodes closest to your users. This ensures faster load times and a superior user experience globally.";
        }
        else if (message.includes('join') || message.includes('contact') || message.includes('subscribe')) {
            return "Great! To join HostNova or stay updated, please use the contact form in the Connect section of our website. You can also follow us on Twitter, Discord, GitHub, and Telegram for the latest updates.";
        }
        else if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! If you have any more questions about HostNova, don't hesitate to ask.";
        }
        else {
            return "Thank you for your message. HostNova is building a revolutionary decentralized hosting platform, offering unparalleled security, uptime, and user control. Would you like to know more about Hostara, GainChain OS, or any specific features?";
        }
    }
    
    // Initialize the platform metrics visualization with D3.js
    function initializePlatformMetrics() {
        const d3 = window.d3;
        if (!d3 || !document.getElementById('platform-metrics')) return;
        
        const container = document.getElementById('platform-metrics');
        const width = container.clientWidth;
        const height = container.clientHeight || 400;
        
        // Create SVG element
        const svg = d3.select('#platform-metrics')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
            
        // Generate random nodes and links data
        const nodesCount = 25;
        const nodes = Array.from({ length: nodesCount }, (_, i) => ({
            id: i,
            radius: Math.random() * 5 + 3,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        }));
        
        const links = [];
        for (let i = 0; i < nodes.length; i++) {
            const linkCount = Math.floor(Math.random() * 3) + 1;
            for (let j = 0; j < linkCount; j++) {
                const target = Math.floor(Math.random() * nodes.length);
                if (i !== target) {
                    links.push({ source: i, target });
                }
            }
        }
        
        // Create the links
        const linkElements = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('class', 'link')
            .attr('stroke', 'rgba(255, 255, 255, 0.1)')
            .attr('stroke-width', 1);
            
        // Create the nodes
        const nodeElements = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', d => d.radius)
            .attr('fill', 'rgba(96, 120, 234, 0.7)')
            .attr('stroke', 'rgba(255, 255, 255, 0.3)')
            .attr('stroke-width', 1.5);
            
        // Animation function
        function ticked() {
            // Update node positions
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x < node.radius || node.x > width - node.radius) {
                    node.vx *= -1;
                }
                if (node.y < node.radius || node.y > height - node.radius) {
                    node.vy *= -1;
                }
            });
            
            // Update visual elements
            nodeElements
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
                
            linkElements
                .attr('x1', d => nodes[d.source].x)
                .attr('y1', d => nodes[d.source].y)
                .attr('x2', d => nodes[d.target].x)
                .attr('y2', d => nodes[d.target].y);
        }
        
        // Start animation loop
        function animate() {
            ticked();
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Add interaction - highlight connections on hover
        nodeElements.on('mouseenter', (event, d) => {
            // Highlight node
            d3.select(event.currentTarget)
                .transition()
                .duration(300)
                .attr('r', d.radius * 1.5)
                .attr('fill', 'rgba(96, 120, 234, 0.9)');
                
            // Highlight connected links and nodes
            linkElements.each(function(link) {
                if (link.source === d.id || link.target === d.id) {
                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr('class', 'link active-link')
                        .attr('stroke', 'rgba(96, 120, 234, 0.6)')
                        .attr('stroke-width', 2);
                        
                    // Highlight connected node
                    const connectedNodeId = link.source === d.id ? link.target : link.source;
                    nodeElements.filter(node => node.id === connectedNodeId)
                        .transition()
                        .duration(300)
                        .attr('r', node => node.radius * 1.3)
                        .attr('fill', 'rgba(96, 120, 234, 0.8)');
                }
            });
        }).on('mouseleave', (event, d) => {
            // Reset node
            d3.select(event.currentTarget)
                .transition()
                .duration(300)
                .attr('r', d.radius)
                .attr('fill', 'rgba(96, 120, 234, 0.7)');
                
            // Reset all links and nodes
            linkElements
                .transition()
                .duration(300)
                .attr('class', 'link')
                .attr('stroke', 'rgba(255, 255, 255, 0.1)')
                .attr('stroke-width', 1);
                
            nodeElements
                .transition()
                .duration(300)
                .attr('r', node => node.radius)
                .attr('fill', 'rgba(96, 120, 234, 0.7)');
        });
    }
});