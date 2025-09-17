class DomainChecker {
    constructor() {
        this.domains = this.loadDomains();
        this.init();
    }

    // Default list of domains to check
    getDefaultDomains() {
        return [
            'google.com',
            'github.com', 
            'stackoverflow.com',
            'example.com',
            'nonexistent-domain-12345.com',
            'test-domain-availability.org',
            'kanoe.moe',
            'domain-checker-test.net'
        ];
    }

    loadDomains() {
        const saved = localStorage.getItem('domains');
        return saved ? JSON.parse(saved) : this.getDefaultDomains();
    }

    saveDomains() {
        localStorage.setItem('domains', JSON.stringify(this.domains));
    }

    async init() {
        this.renderDomains();
        await this.loadWorkflowData();
        this.updateStats();
        this.bindEvents();
        this.updateLastChecked();
        
        // Auto-refresh every 5 minutes
        setInterval(() => this.refreshAll(), 5 * 60 * 1000);
    }

    async loadWorkflowData() {
        try {
            // Try to load workflow results
            const response = await fetch('./status-summary.json');
            if (response.ok) {
                const data = await response.json();
                if (data.lastUpdate) {
                    localStorage.setItem('lastWorkflowUpdate', new Date(data.lastUpdate).toLocaleString());
                }
            }
        } catch (error) {
            console.log('No workflow data available yet');
        }
    }

    bindEvents() {
        document.getElementById('refresh-all').addEventListener('click', () => this.refreshAll());
        document.getElementById('add-domain').addEventListener('click', () => this.addDomain());
        document.getElementById('new-domain').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addDomain();
        });
    }

    addDomain() {
        const input = document.getElementById('new-domain');
        const domain = input.value.trim().toLowerCase();
        
        if (!domain) return;
        
        // Basic domain validation
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            alert('Please enter a valid domain name (e.g., example.com)');
            return;
        }
        
        if (this.domains.includes(domain)) {
            alert('Domain already exists in the list');
            return;
        }
        
        this.domains.push(domain);
        this.saveDomains();
        input.value = '';
        this.renderDomains();
        this.updateStats();
    }

    removeDomain(domain) {
        if (confirm(`Remove ${domain} from the list?`)) {
            this.domains = this.domains.filter(d => d !== domain);
            this.saveDomains();
            this.renderDomains();
            this.updateStats();
        }
    }

    async refreshAll() {
        const button = document.getElementById('refresh-all');
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span> Checking...';
        
        try {
            await Promise.all(this.domains.map(domain => this.checkDomain(domain)));
            this.updateStats();
            this.updateLastChecked();
        } finally {
            button.disabled = false;
            button.innerHTML = 'Refresh All';
        }
    }

    async checkDomain(domain) {
        const card = document.querySelector(`[data-domain="${domain}"]`);
        if (!card) return;
        
        this.setDomainStatus(card, 'checking', 'Checking...');
        
        try {
            // Check if domain is alive (responds to HTTP/HTTPS)
            const aliveStatus = await this.checkDomainAlive(domain);
            
            // For availability, we'll use a mock check since real WHOIS requires server-side
            const availabilityStatus = await this.checkDomainAvailability(domain);
            
            this.setDomainResult(card, availabilityStatus, aliveStatus);
        } catch (error) {
            this.setDomainStatus(card, 'error', 'Error checking domain');
            console.error(`Error checking ${domain}:`, error);
        }
    }

    async checkDomainAlive(domain) {
        try {
            // Try HTTPS first, then HTTP
            const protocols = ['https', 'http'];
            
            for (const protocol of protocols) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
                    
                    const response = await fetch(`${protocol}://${domain}`, {
                        method: 'HEAD',
                        mode: 'no-cors', // This will always succeed but we can't read the response
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    return { alive: true, protocol };
                } catch (e) {
                    continue;
                }
            }
            
            return { alive: false, protocol: null };
        } catch (error) {
            return { alive: false, protocol: null };
        }
    }

    async checkDomainAvailability(domain) {
        // Since we can't do real WHOIS lookups from the browser,
        // we'll simulate availability based on domain patterns
        // In a real implementation, this would be a server-side API call
        
        const knownDomainPatterns = [
            'google.com', 'github.com', 'stackoverflow.com', 'example.com',
            'microsoft.com', 'apple.com', 'amazon.com', 'facebook.com'
        ];
        
        const isKnownDomain = knownDomainPatterns.some(pattern => 
            domain.includes(pattern.split('.')[0])
        );
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        return {
            available: !isKnownDomain && Math.random() > 0.6, // Random for demo
            registrar: isKnownDomain ? 'Known Domain' : 'Unknown'
        };
    }

    setDomainStatus(card, status, message) {
        card.className = `domain-card ${status}`;
        const statusElement = card.querySelector('.domain-status');
        statusElement.innerHTML = `<span class="status-badge status-${status}">${message}</span>`;
    }

    setDomainResult(card, availability, aliveStatus) {
        const availabilityClass = availability.available ? 'available' : 'unavailable';
        const aliveClass = aliveStatus.alive ? 'alive' : 'dead';
        
        card.className = `domain-card ${availabilityClass}`;
        
        const statusElement = card.querySelector('.domain-status');
        const availabilityBadge = availability.available 
            ? '<span class="status-badge status-available">Available</span>'
            : '<span class="status-badge status-unavailable">Registered</span>';
        
        const aliveBadge = aliveStatus.alive
            ? `<span class="status-badge status-alive">Alive (${aliveStatus.protocol?.toUpperCase()})</span>`
            : '<span class="status-badge status-dead">Not Responding</span>';
        
        statusElement.innerHTML = availabilityBadge + aliveBadge;
        
        const details = card.querySelector('.domain-details');
        details.innerHTML = `
            <div><strong>Registrar:</strong> ${availability.registrar}</div>
            <div><strong>Status:</strong> ${availability.available ? 'Available for registration' : 'Already registered'}</div>
            <div><strong>Connection:</strong> ${aliveStatus.alive ? `Responds via ${aliveStatus.protocol?.toUpperCase()}` : 'No response'}</div>
            <div><strong>Last checked:</strong> ${new Date().toLocaleString()}</div>
        `;
    }

    renderDomains() {
        const grid = document.getElementById('domains-grid');
        grid.innerHTML = '';
        
        this.domains.forEach(domain => {
            const card = this.createDomainCard(domain);
            grid.appendChild(card);
        });
    }

    createDomainCard(domain) {
        const card = document.createElement('div');
        card.className = 'domain-card';
        card.setAttribute('data-domain', domain);
        
        card.innerHTML = `
            <div class="domain-header">
                <div class="domain-name">${domain}</div>
            </div>
            <div class="domain-status">
                <span class="status-badge status-checking">Not checked</span>
            </div>
            <div class="domain-details">
                Click "Refresh All" or the refresh button to check this domain.
            </div>
            <div class="domain-actions">
                <button class="btn btn-small btn-secondary" onclick="domainChecker.checkDomain('${domain}')">
                    Refresh
                </button>
                <button class="btn btn-small remove-btn" onclick="domainChecker.removeDomain('${domain}')">
                    Remove
                </button>
            </div>
        `;
        
        return card;
    }

    updateStats() {
        document.getElementById('total-domains').textContent = this.domains.length;
        
        const cards = document.querySelectorAll('.domain-card');
        let available = 0;
        let alive = 0;
        
        cards.forEach(card => {
            if (card.classList.contains('available')) available++;
            if (card.querySelector('.status-alive')) alive++;
        });
        
        document.getElementById('available-domains').textContent = available;
        document.getElementById('alive-domains').textContent = alive;
    }

    updateLastChecked() {
        const now = new Date().toLocaleString();
        document.getElementById('last-updated').textContent = now;
        
        // Update workflow timestamp from localStorage if available
        const workflowUpdate = localStorage.getItem('lastWorkflowUpdate');
        if (workflowUpdate) {
            document.getElementById('workflow-update').textContent = workflowUpdate;
        }
    }
}

// Initialize the application
let domainChecker;

document.addEventListener('DOMContentLoaded', () => {
    domainChecker = new DomainChecker();
    
    // Check if we have workflow data from GitHub Actions
    const urlParams = new URLSearchParams(window.location.search);
    const workflowRun = urlParams.get('workflow');
    if (workflowRun) {
        localStorage.setItem('lastWorkflowUpdate', new Date().toLocaleString());
        domainChecker.updateLastChecked();
    }
});