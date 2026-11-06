// =========================================================
// Site content: the single source of truth for the generated pages.
// Edit text here, then run:  node scripts/build.mjs
// Rules: only real facts. Anything unknown uses todo('...'), which renders a
// visible [ADD REAL DETAIL: ...] marker and is listed when the build runs.
// =========================================================

export const todo = (what) => `<mark class="todo">[ADD REAL DETAIL: ${what}]</mark>`;

// Case studies that still need real details. They are not built at all and nothing
// links to them, so no placeholder text reaches the live site. Remove a slug from
// this list once its case study has real details.
export const DRAFTS = new Set(['linkedin-bioster', 'leads-generation-app']);
const plink = (slug, text) => (DRAFTS.has(slug) ? text : `<a href="/projects/${slug}">${text}</a>`);

export const SITE = {
  url: 'https://www.mostafizur.me',
  name: 'Mostafizur Rahman',
  alternateName: 'Md Mostafizur Rahman',
  jobTitle: 'AI Builder & Gen AI Engineer',
  // One consistent descriptor everywhere, so search engines and AI assistants can tell this
  // Mostafizur Rahman apart from others with the same name.
  disambiguatingDescription: 'Freelance AI builder and Gen AI engineer based in Kushtia, Bangladesh (GitHub: msajeeb003; website: mostafizur.me). '
    + 'Builds AI apps, SaaS MVPs, AI agents and n8n, Zapier and Make.com automations for remote teams in the USA, UK and EU.',
  email: 'mostafizur.contacts@gmail.com',
  locality: 'Kushtia',
  country: 'BD',
  countryName: 'Bangladesh',
  image: '/images/about-thumbsup-800.webp',
  ogImage: '/images/og.jpg',
  profiles: {
    linkedin: 'https://www.linkedin.com/in/mostafiz9221',
    github: 'https://github.com/msajeeb003',
    upwork: 'https://www.upwork.com/freelancers/~01943718b97948812b/',
    fiverr: 'https://www.fiverr.com/sb4059',
  },
  knowsAbout: [
    'Generative AI', 'Large language models', 'Prompt engineering', 'AI automation', 'AI agents', 'Workflow automation',
    'AI app development', 'SaaS development', 'AI-assisted development', 'n8n', 'Zapier',
    'Make.com', 'Claude', 'Google Gemini', 'Search engine optimization',
    'Social media marketing', 'B2B lead generation',
  ],
  tools: ['Claude Code', 'Cursor', 'Claude', 'Google Gemini', 'n8n', 'Zapier', 'Make.com', 'React', 'Node.js',
    'PostgreSQL', 'Supabase', 'Python', 'HubSpot', 'Apollo.io', 'LinkedIn Sales Navigator', 'Trello',
    'WordPress', 'Photoshop', 'Illustrator', 'Canva', 'Premiere Pro', 'CapCut', 'Camtasia'],
};

// One-paragraph, quotable summary reused in llms.txt and the About page.
export const SUMMARY = 'Mostafizur Rahman is an AI builder and Gen AI engineer based in Kushtia, Bangladesh. '
  + 'He builds AI-powered web apps, SaaS MVPs and n8n, Zapier and Make.com automations for remote teams in the USA, UK and EU, '
  + 'and has worked remotely for US companies since 2021.';

// ---------------------------------------------------------
// Experience (same facts as the CV and the homepage)
// ---------------------------------------------------------
export const EXPERIENCE = [
  { role: 'Junior Full Stack Developer & Executive Assistant', org: 'Artech Digital', where: 'USA (remote)', dates: 'Aug 2025 – Present',
    text: 'Joined as a Virtual Assistant and was promoted. Builds web apps and SaaS products with Claude and other LLMs, and end-to-end automations in n8n, Zapier and Make.com.' },
  { role: 'Virtual Assistant – Lead Generation & Marketing Head', org: 'Digital Gregg', where: 'USA (remote)', dates: 'Dec 2024 – May 2025',
    text: 'Grew qualified leads by 15% for white-label partnerships with LinkedIn Sales Navigator and Apollo.io; ran HubSpot campaigns and a Trello CRM pipeline.' },
  { role: 'Content Manager', org: 'ICMG LLC', where: 'USA (remote)', dates: 'Jan 2024 – Dec 2024',
    text: 'Improved organic search rankings by 25% with keyword research and on-page SEO across multiple WordPress sites.' },
  { role: 'Social Media Manager', org: 'Crushvertise LLC', where: 'Austin, Texas (remote)', dates: 'Mar 2022 – Sep 2023',
    text: 'Lifted audience engagement by 20% with visual content made in Photoshop and Illustrator for a lead-generation agency.' },
  { role: 'Market Researcher', org: 'Avoraus International', where: 'Rajasthan, India (remote)', dates: 'Dec 2021 – Feb 2022',
    text: 'Researched healthcare and life-science markets and compiled reports for strategic decisions.' },
  { role: 'Virtual Assistant', org: 'Frontier', where: 'San Francisco, USA (remote)', dates: 'Jul 2021 – Aug 2021',
    text: 'Managed data and communications on a technology-driven recruitment platform.' },
];

// ---------------------------------------------------------
// Education (rendered into the homepage and the About page)
// ---------------------------------------------------------
export const EDUCATION = [
  { type: 'Degree', title: 'BSc in Computer Science & Engineering',
    institute: 'Dhaka International University', location: 'Dhaka, Bangladesh', years: '2022 – 2026',
    detail: 'Focus: programming, algorithms, software development, web technologies',
    label: 'CGPA', score: 3.49, scale: 4.0, result: 'Graduated April 2026', photo: 'images/edu-1.jpg',
    color: 'var(--accent)', soft: 'var(--accent-soft)', text: 'var(--accent-text)' },
  { type: 'Diploma', title: 'Diploma in Engineering — Computer Technology',
    institute: 'Jhenaidah Polytechnic Institute', location: 'Jhenaidah, Bangladesh', years: '2017 – 2021',
    detail: 'Specialisation: software development, graphic design, data management',
    label: 'CGPA', score: 3.55, scale: 4.0, result: '4-year engineering diploma', photo: 'images/edu-2.jpg',
    color: 'var(--lilac)', soft: 'var(--lilac-soft)', text: 'var(--lilac-text)' },
  { type: 'Certification', title: 'Google Prompting Essentials',
    institute: 'Google · Coursera', location: 'Online', years: 'Nov 2025',
    detail: '4 courses: writing prompts, everyday work tasks, data analysis & presentations, AI as a creative or expert partner',
    label: 'Status', score: null, scale: null, result: 'Completed · 4 courses', photo: 'images/edu-3-certificate.png',
    alt: 'Google Prompting Essentials certificate awarded to Md Mostafizur Rahman',
    srcset: false, fit: 'contain', link: 'images/edu-3-certificate.png',
    color: 'var(--mint-deep)', soft: 'var(--mint-soft)', text: 'var(--mint-text)' },
];

export const PROCESS = [
  { n: 1, title: 'Discover', text: "Call, goals, the manual work to remove, and the metric we'll measure success by.", chip: 'Scope & goals', color: 'var(--accent)', soft: 'var(--accent-soft)', ctext: 'var(--accent-text)' },
  { n: 2, title: 'Design', text: 'Workflow map, tool choices and visual direction, with review rounds.', chip: 'Blueprint', color: 'var(--lilac)', soft: 'var(--lilac-soft)', ctext: 'var(--lilac-text)' },
  { n: 3, title: 'Build', text: 'Automations, apps and integrations, tested on real data, with handover docs.', chip: 'Tested build', color: 'var(--mint-deep)', soft: 'var(--mint-soft)', ctext: 'var(--mint-text)' },
  { n: 4, title: 'Launch', text: 'Go-live, measurement, and a plan for the next iteration.', chip: 'ongoing', color: 'var(--sky)', soft: 'var(--sky-soft)', ctext: 'var(--sky-text)' },
];

// ---------------------------------------------------------
// FAQ (homepage section + FAQPage schema)
// ---------------------------------------------------------
export const FAQ = [
  { q: 'Who is Mostafizur Rahman?',
    a: 'Mostafizur Rahman is a freelance AI builder and Gen AI engineer based in Kushtia, Bangladesh (GitHub: <a href="https://github.com/msajeeb003" rel="noopener">msajeeb003</a>). He builds AI-powered web apps, SaaS MVPs, AI agents and n8n, Zapier and Make.com automations for remote teams in the USA, UK and EU, and works as a Junior Full Stack Developer &amp; Executive Assistant at Artech Digital. His projects include <a href="/projects/signpro">SignPro</a>, <a href="/projects/socipro">SociPRO</a> and <a href="/projects/eurekaedu">EurekaEDU</a>.' },
  { q: 'What does an AI builder do?',
    a: 'An AI builder turns an idea or a manual process into working software that uses AI. For me that means two kinds of projects: automations in n8n, Zapier and Make.com with AI steps inside them, and full web apps such as <a href="/projects/signpro">SignPro</a>, an e-signature platform, and <a href="/projects/socipro">SociPRO</a>, an autonomous social media agent.' },
  { q: 'How do I hire a gen AI engineer?',
    a: 'Describe the problem you want solved and the result you expect, then talk to the engineer about how they would measure success. To work with me, send your project details through the <a href="/contact">contact page</a>, email <a href="mailto:mostafizur.contacts@gmail.com">mostafizur.contacts@gmail.com</a>, or hire me on <a href="https://www.upwork.com/freelancers/~01943718b97948812b/" rel="noopener">Upwork</a> or <a href="https://www.fiverr.com/sb4059" rel="noopener">Fiverr</a>. Every project starts with a discovery call to agree the goal and the metric.' },
  { q: 'Do you work with clients in the USA, UK and EU?',
    a: "Yes. I'm based in Kushtia, Bangladesh, and I have worked remotely with US companies since 2021, across US time zones, in English (C1). I'm open to remote projects worldwide and to relocating to the EU. Read <a href=\"/hire-ai-developer-bangladesh\">how hiring an AI developer in Bangladesh works</a>." },
  { q: 'What is vibe coding, and do you use it for client work?',
    a: 'Vibe coding means building software by describing what you want to an AI coding assistant and iterating on what it writes. I use Claude Code and Cursor this way because it lets one person ship what used to need a team. Every build still goes through the same steps as hand-written code: it is tested on real data and handed over with documentation.' },
  { q: 'Which automation and AI tools do you use?',
    a: 'For automation: n8n, Zapier and Make.com, plus direct API integrations. For AI: Claude and Google Gemini. For apps: React, Node.js, PostgreSQL and Supabase. For growth work: HubSpot, Apollo.io, LinkedIn Sales Navigator and WordPress. See <a href="/services">all services</a>.' },
  { q: 'Can you build a SaaS MVP with AI?',
    a: 'Yes. I build SaaS MVPs end to end, from idea to launched product. <a href="/projects/signpro">SignPro</a> (React, Node.js, PostgreSQL) and <a href="/projects/socipro">SociPRO</a> (Node.js, Google Gemini, Supabase) are two examples with live demos and public code. Read more on <a href="/services/ai-app-development">AI app and SaaS development</a>.' },
  { q: 'What does a project with you look like?',
    a: 'Four steps with clear milestones and regular check-ins: Discover (goals and the metric we measure), Design (workflow map, tools and visual direction), Build (tested on real data, with handover docs) and Launch (go-live, measurement and a plan for the next iteration).' },
];

// ---------------------------------------------------------
// Hire page (/hire-ai-developer-bangladesh): for clients searching "hire an AI developer
// in Bangladesh" or "AI automation expert in Bangladesh". Real facts only; no prices.
// ---------------------------------------------------------
export const HIRE = {
  path: '/hire-ai-developer-bangladesh',
  title: 'Hire an AI Developer in Bangladesh | Mostafizur Rahman',
  description: 'Hire Mostafizur Rahman, a freelance AI developer and AI automation expert in Bangladesh, for AI apps, SaaS MVPs and n8n, Zapier and Make.com work.',
  h1: 'Hire an AI developer in Bangladesh',
  lead: "I'm Mostafizur Rahman, a freelance AI builder and Gen AI engineer in Kushtia, Bangladesh. I build AI apps, SaaS MVPs, AI agents and n8n, Zapier and Make.com automations for remote teams in the USA, UK and EU, and I've worked remotely with US companies since 2021.",
  projects: ['signpro', 'socipro', 'eurekaedu'],
  body: `
<h2>What I can build for you</h2>
<ul>
  <li><strong><a href="/services/ai-automation">AI automation</a></strong> in n8n, Zapier and Make.com: workflows that connect your CRM, project board, forms and inbox, with AI steps that read, sort, qualify and draft.</li>
  <li><strong>AI agents</strong> that run a multi-step job on their own, like <a href="/projects/socipro">SociPRO</a>, which finds trending topics, writes posts with Google Gemini, renders video and queues it for review.</li>
  <li><strong><a href="/services/ai-app-development">AI apps and SaaS MVPs</a></strong>, built end to end with Claude Code and Cursor: sign-in, dashboards, a database and the core workflow your users pay for.</li>
</ul>
<h2>Why teams hire me</h2>
<ul>
  <li><strong>Remote work with US companies since 2021</strong>, including Artech Digital, Digital Gregg, ICMG LLC and Crushvertise, across US time zones.</li>
  <li><strong>Work you can check.</strong> <a href="/projects/signpro">SignPro</a> and <a href="/projects/socipro">SociPRO</a> have live demos and public source code, and <a href="/projects/eurekaedu">EurekaEDU</a> is a live app.</li>
  <li><strong>Measured results</strong> in earlier roles: +25% organic search rankings at ICMG LLC, +15% qualified leads at Digital Gregg and +20% audience engagement at Crushvertise.</li>
  <li><strong>Clear communication</strong> in English (C1), with regular check-ins and handover documentation for every build.</li>
  <li><strong>One person, end to end.</strong> The same person scopes, builds, tests and documents the work, so nothing gets lost between hand-offs.</li>
</ul>
<h2>How to start</h2>
<p>Send a short description of what you want to build or automate through the <a href="/contact">contact page</a> or by email to <a href="mailto:mostafizur.contacts@gmail.com">mostafizur.contacts@gmail.com</a>. I'll reply by email, and we start with a discovery call to agree the goal and the metric we'll measure success by. If you prefer a platform, you can hire me on <a href="https://www.upwork.com/freelancers/~01943718b97948812b/" rel="noopener">Upwork</a> or order a fixed-scope gig on <a href="https://www.fiverr.com/sb4059" rel="noopener">Fiverr</a>.</p>`,
  faq: [
    { q: 'How do I hire you?',
      a: 'Send a short description of the project through the <a href="/contact">contact page</a> or by email to <a href="mailto:mostafizur.contacts@gmail.com">mostafizur.contacts@gmail.com</a>, or hire me on <a href="https://www.upwork.com/freelancers/~01943718b97948812b/" rel="noopener">Upwork</a> or <a href="https://www.fiverr.com/sb4059" rel="noopener">Fiverr</a>. We start with a discovery call to agree the goal and how we will measure it.' },
    { q: 'How much does a project cost?',
      a: "It depends on the scope. Send your project details and I'll reply with a quote. Fixed-scope work, such as a SaaS MVP, is also available as a gig on <a href=\"https://www.fiverr.com/sb4059\" rel=\"noopener\">Fiverr</a>." },
    { q: 'Which time zones do you work in?',
      a: "I'm in Bangladesh (UTC+6) and have worked across US time zones since 2021. I work with clients in the USA, UK and EU, and I'm open to relocating to the EU." },
    { q: 'What can you build?',
      a: 'AI automations in n8n, Zapier and Make.com, AI agents, and AI-powered web apps and SaaS MVPs. See <a href="/services/ai-automation">AI automation</a>, <a href="/services/ai-app-development">AI app development</a> and the <a href="/projects">case studies</a>.' },
  ],
};

// ---------------------------------------------------------
// Blog posts (/blog). Newest first is handled by the build. Facts in each post are
// checked against the sources listed with it; `checked` is the date they were checked.
// ---------------------------------------------------------
export const POSTS = [
  {
    slug: 'n8n-vs-zapier-vs-make-ai-lead-qualification',
    title: 'n8n vs Zapier vs Make.com for AI lead qualification',
    metaTitle: 'n8n vs Zapier vs Make.com for AI Lead Qualification',
    metaDesc: 'How n8n, Zapier and Make.com compare for an AI lead-qualification workflow: how each one charges, AI steps, custom code, hosting and when to pick each.',
    summary: 'How n8n, Zapier and Make.com compare for one AI lead-qualification workflow: what each one bills for, the AI step, custom code, hosting and when to pick each.',
    date: '2026-11-06', checked: '2026-11-06',
    keywords: ['n8n vs Zapier vs Make', 'AI lead qualification', 'n8n', 'Zapier', 'Make.com', 'AI automation'],
    service: 'ai-automation', projects: ['operations-automation', 'eurekaedu'],
    sources: [
      { label: 'n8n: plans and pricing (what an execution is)', url: 'https://n8n.io/pricing/' },
      { label: 'n8n docs: compare editions (Community edition)', url: 'https://docs.n8n.io/deploy/host-n8n/community-edition-features' },
      { label: 'n8n: AI agents', url: 'https://n8n.io/ai-agents/' },
      { label: 'Zapier help: how task usage is measured', url: 'https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier' },
      { label: 'Zapier: what is a task (AI step multipliers)', url: 'https://zapier.com/blog/what-is-a-task-in-zapier/' },
      { label: 'Make: pricing (credits, code execution)', url: 'https://www.make.com/pricing' },
      { label: 'Make help: credits (AI provider options)', url: 'https://help.make.com/credits' },
    ],
    body: `
<p>A new lead fills in a form. Someone has to read it, decide whether it's a good fit, put it in the CRM and make sure the right person follows up. That's an ideal job for an automation with one AI step in the middle, and n8n, Zapier and Make.com can all run it. They differ in how they charge, how much control you get over the AI step, and who on your team can maintain the result.</p>
<p>I build automations in all three for remote teams, including at Artech Digital, so this comparison is about one concrete workflow rather than a feature checklist.</p>
<h2>The workflow we're comparing</h2>
<p>A typical AI lead-qualification flow looks like this. It's the shape of the flow in my <a href="/projects/operations-automation">operations automation case study</a>.</p>
<ol>
  <li><strong>Trigger:</strong> a webhook receives a new lead from a form or landing page.</li>
  <li><strong>Store:</strong> the lead is created in the CRM, for example HubSpot.</li>
  <li><strong>Qualify:</strong> an AI model (Claude, in my case study) reads the lead against your criteria and returns a score and a short reason.</li>
  <li><strong>Route:</strong> good-fit leads become a sales task (for example in Trello) with a follow-up; the rest go to a nurture list.</li>
  <li><strong>Notify:</strong> the team gets a message, and a person only steps in where a decision is needed.</li>
</ol>
<h2>The short answer</h2>
<div class="table-wrap" role="region" aria-label="Comparison of n8n, Zapier and Make.com" tabindex="0">
<table>
  <thead><tr><th scope="col"></th><th scope="col">n8n</th><th scope="col">Zapier</th><th scope="col">Make.com</th></tr></thead>
  <tbody>
    <tr><th scope="row">What you pay for</th><td>Executions: one execution is a full run of the workflow, however many steps it has</td><td>Tasks: each successful action step</td><td>Credits: most module actions use 1 credit</td></tr>
    <tr><th scope="row">AI step cost</th><td>Your model provider's token cost, with your own API key</td><td>AI by Zapier steps count as 1, 3 or 5 tasks, depending on the model tier</td><td>Make's AI Provider: credits based on tokens. Your own provider connection (paid plans): 1 credit per operation, and you pay the provider for tokens</td></tr>
    <tr><th scope="row">Custom code</th><td>Code node</td><td>Code by Zapier: 1 task per run at standard runtime</td><td>Code module: 2 credits per second of run time</td></tr>
    <tr><th scope="row">Hosting</th><td>n8n Cloud, or self-host the free Community edition</td><td>Cloud only</td><td>Cloud only</td></tr>
    <tr><th scope="row">Best fit</th><td>High volume, many steps, data control, AI agents with tools</td><td>Non-technical teams and the widest choice of ready-made app connectors</td><td>Visual branching with routers and filters</td></tr>
  </tbody>
</table>
</div>
<h2>How the cost adds up per lead</h2>
<p>The flow above has five or six steps. That matters more than the price list.</p>
<ul>
  <li><strong>On Zapier and Make.com, every action step in the run is billed</strong>: a task on Zapier, a credit on Make. The AI step can cost more than a normal step. Ten leads a day is cheap on any of them; thousands of leads a month with extra enrichment steps add up quickly.</li>
  <li><strong>On n8n's paid plans, the whole run is one execution,</strong> no matter how many steps it has. n8n describes an execution as "a single run of your entire workflow".</li>
  <li><strong>Self-hosted n8n (the Community edition) is free to run.</strong> You pay for the server and for your AI model's tokens, and you look after updates and uptime yourself.</li>
</ul>
<h2>When to pick each</h2>
<p><strong>Pick n8n when:</strong></p>
<ul>
  <li>lead volume is high or the flow has many steps (enrichment, scoring, several routes);</li>
  <li>you want to keep lead data on your own server;</li>
  <li>the qualification step needs more than one prompt, such as an AI agent that looks things up with tools before it scores (n8n's AI Agent node connects a model, memory and tools);</li>
  <li>someone on the team is comfortable with a slightly more technical tool.</li>
</ul>
<p><strong>Pick Zapier when:</strong></p>
<ul>
  <li>the people who'll maintain the automation aren't technical;</li>
  <li>you depend on a niche app that only has a ready-made Zapier connector;</li>
  <li>volume is modest, so per-task billing stays small.</li>
</ul>
<p><strong>Pick Make.com when:</strong></p>
<ul>
  <li>you want to see every branch of the flow visually, with routers and filters;</li>
  <li>the flow has several paths but moderate volume;</li>
  <li>your team already builds scenarios in Make.</li>
</ul>
<p>If your team already pays for one of the three and knows it well, that's usually the right choice. Rebuilding a working flow on another platform is rarely worth it unless volume or data rules force the move.</p>
<h2>What makes AI lead scoring reliable, on any platform</h2>
<p>The tool matters less than how the AI step is set up.</p>
<ol>
  <li><strong>Give the model a fixed rubric.</strong> Spell out what a good-fit lead looks like (industry, company size, budget, timeline) instead of asking "is this a good lead?".</li>
  <li><strong>Ask for structured output.</strong> Request a score, a fit label and a one-line reason in a fixed JSON format, so the next step can route on it.</li>
  <li><strong>Check the output before routing.</strong> If the response is missing a field or isn't valid JSON, send the lead to a person instead of guessing.</li>
  <li><strong>Keep a person in the loop for borderline scores.</strong> Auto-route the clear yes and the clear no; review the middle.</li>
  <li><strong>Log every decision.</strong> Store the score and the reason in the CRM, so you can see why a lead was routed and improve the rubric over time.</li>
  <li><strong>Test on real leads before launch.</strong> Run last month's leads through the flow and compare the AI's calls with what your sales team actually decided.</li>
</ol>
<h2>Need this built?</h2>
<p>I build AI lead qualification and other automations in n8n, Zapier and Make.com for teams in the USA, UK and EU. See <a href="/services/ai-automation">AI automation</a>, the <a href="/projects/operations-automation">operations automation case study</a>, or <a href="/hire-ai-developer-bangladesh">how to hire an AI automation expert in Bangladesh</a>.</p>`,
  },
];

// ---------------------------------------------------------
// Services
// ---------------------------------------------------------
export const SERVICES = [
  {
    slug: 'ai-automation', name: 'AI & automation', icon: 'i-zap', soft: 'var(--accent-soft)', strong: 'var(--accent)',
    h1: 'AI automation expert: n8n, Zapier and Make.com',
    metaTitle: 'AI Automation Expert in Bangladesh: n8n, Zapier & Make',
    metaDesc: 'AI automation expert in Bangladesh. I build n8n, Zapier and Make.com workflows and AI agents (Claude, Gemini) that remove manual work for your team.',
    card: 'n8n, Zapier and Make.com workflows plus LLM integrations that remove hours of manual work.',
    lead: "I'm an AI automation expert in Kushtia, Bangladesh. I build automations that move data between your tools and use AI for the steps that used to need a person: reading, sorting, qualifying and drafting.",
    tools: ['n8n', 'Zapier', 'Make.com', 'Claude', 'Google Gemini', 'HubSpot', 'Trello', 'Webhooks & APIs'],
    projects: ['operations-automation', 'socipro', 'b2b-lead-generation'],
    body: `
<h2>What this service covers</h2>
<ul>
  <li><strong>Workflow automation</strong> in n8n, Zapier and Make.com that connects CRMs such as HubSpot, project boards such as Trello, forms, webhooks and email.</li>
  <li><strong>AI steps inside workflows.</strong> LLMs such as Claude and Google Gemini read incoming requests, qualify leads, summarise long threads and draft replies, so a person only reviews the result.</li>
  <li><strong>AI agents</strong> that run a multi-step job on their own, like <a href="/projects/socipro">SociPRO</a>, which finds trending topics, writes posts and queues them for review.</li>
  <li><strong>API integrations</strong> where no ready-made connector exists.</li>
  <li><strong>Handover documentation</strong> so your team can run and change the workflows after launch.</li>
</ul>
<h2>n8n expert in Bangladesh</h2>
<p>At Artech Digital I build and maintain n8n workflows that connect the team's SaaS tools, CRM and marketing systems. For <a href="/projects/eurekaedu">EurekaEDU</a> I built an n8n pipeline that collects scholarship listings on a schedule, uses Google Gemini to turn each page into structured data, validates every record and posts it to the app through a webhook protected by a shared secret. I also build in Zapier and Make.com, so your team can stay on the tool it already uses. For one workflow compared on all three, read <a href="/blog/n8n-vs-zapier-vs-make-ai-lead-qualification">n8n vs Zapier vs Make.com for AI lead qualification</a>.</p>
<h2>Who it's for</h2>
<p>Lean teams, agencies and startups in the USA, UK and EU that lose hours every week to copy-paste work between tools. If someone on your team moves the same data between two apps every day, that task is a good first automation: it is easy to measure, and the time saved shows up immediately.</p>
<h2>Where I've done this</h2>
<p>At Artech Digital, a US company, I build and maintain end-to-end automations with n8n, Zapier and Make.com that connect SaaS tools, CRMs and marketing systems, and I integrate Claude and other LLMs into the team's workflows. The <a href="/projects/operations-automation">operations automation case study</a> shows the kind of flow I build there.</p>
<p>I also apply the same idea to complete products. <a href="/projects/socipro">SociPRO</a> is an autonomous social media agent: it finds trending topics, writes posts with Google Gemini, renders video with FFmpeg and queues publishing on a schedule, with a review step before anything goes live.</p>
<h2>What you get</h2>
<p>A working automation, tested on real data, with a short document that explains each step, where it can fail and how to change it. We agree the success metric in the first call, usually hours saved or response time, so you can see whether the automation is paying for itself.</p>
<p>Hiring from the USA, UK or EU? See <a href="/hire-ai-developer-bangladesh">how to hire an AI automation expert in Bangladesh</a>.</p>`,
  },
  {
    slug: 'ai-app-development', name: 'AI app & SaaS development', icon: 'i-app', soft: 'var(--lilac-soft)', strong: 'var(--lilac)',
    h1: 'Freelance AI app and SaaS MVP developer',
    metaTitle: 'Freelance AI App & SaaS MVP Developer | Mostafizur Rahman',
    metaDesc: 'Freelance AI app developer in Bangladesh. I build AI web apps, AI agents and SaaS MVPs end to end with Claude Code and Cursor, tested and documented.',
    card: 'SaaS, no-code and AI-powered apps, built end-to-end from idea to launched product.',
    lead: 'I build AI-powered web apps and SaaS MVPs end to end, from the first idea to a launched product that real users can sign in to and use.',
    tools: ['Claude Code', 'Cursor', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Google Gemini', 'Claude', 'Vercel'],
    projects: ['signpro', 'socipro', 'eurekaedu', 'linkedin-bioster'],
    body: `
<h2>What I build</h2>
<ul>
  <li><strong>SaaS MVPs</strong> with sign-in, dashboards, a database and the one core workflow your users pay for.</li>
  <li><strong>AI features</strong> on top of LLM APIs such as Claude and Google Gemini: writing and rewriting, classification, summaries and content pipelines.</li>
  <li><strong>AI agents</strong> that run a multi-step job on their own, such as <a href="/projects/socipro">SociPRO</a>, which finds trending topics, writes posts with Google Gemini and renders videos.</li>
  <li><strong>No-code apps</strong> when they are the faster path to a working product.</li>
  <li><strong>Browser extensions and integrations</strong> that connect your app to the tools people already use.</li>
</ul>
<h2>How I build: AI-assisted development</h2>
<p>I build with AI-assisted development, sometimes called vibe coding, using Claude Code and Cursor. I describe each feature, let the AI write a first version and iterate on it. This is how one person can ship a full product, with a frontend, an API, a database and integrations, in the time a small team would need.</p>
<p>Speed is not the whole job. Every build is tested on real data and handed over with documentation, and security pieces such as password hashing, session tokens and rate limiting are written in explicitly, not left to chance.</p>
<h2>Examples</h2>
<p><a href="/projects/signpro">SignPro</a> is a legally binding e-signature platform built with React, Node.js and PostgreSQL. Senders upload PDF or Word documents and request signatures by email or SMS; every signing is sealed with an evidence hash. <a href="/projects/socipro">SociPRO</a> is an autonomous social media agent built with Node.js, Google Gemini, Supabase and FFmpeg. Both have live demos and public source code.</p>
<p>I also built ${plink('eurekaedu', 'EurekaEDU')}, a scholarship platform whose listings are collected by an n8n and Google Gemini pipeline, and ${plink('linkedin-bioster', 'LinkedIn Bioster')}, an AI app that rewrites LinkedIn headlines and bios.</p>
<h2>Who it's for</h2>
<p>Founders who want to test an idea with a real product instead of slides, and teams that need an internal tool built around how they already work. Hiring from the USA, UK or EU? See <a href="/hire-ai-developer-bangladesh">how to hire an AI developer in Bangladesh</a>.</p>`,
  },
  {
    slug: 'seo-social-media', name: 'SEO & social media', icon: 'i-trending', soft: 'var(--mint-soft)', strong: 'var(--mint-deep)',
    h1: 'SEO, social media and lead generation',
    metaTitle: 'SEO, Social Media & Lead Generation | Mostafizur Rahman',
    metaDesc: 'Keyword research, on-page SEO, WordPress, social content and B2B lead generation, with real results: +25% organic rankings, +15% qualified leads.',
    card: 'SEO, social media strategy, short-form video and content that grow traffic, engagement and leads.',
    lead: 'Growth work I have done in-house for US companies: SEO that lifts rankings, social content that gets engagement, and lead generation that fills a pipeline.',
    tools: ['Keyword research', 'On-page SEO', 'WordPress', 'Photoshop', 'Illustrator', 'Canva', 'Premiere Pro', 'CapCut', 'HubSpot', 'Apollo.io', 'LinkedIn Sales Navigator'],
    projects: ['seo-content-program', 'social-content-system', 'b2b-lead-generation'],
    body: `
<h2>SEO</h2>
<p>As Content Manager at ICMG LLC (2024) I improved organic search rankings by 25% across multiple WordPress sites. The work was keyword research to pick the search term each page should target, on-page SEO to align titles, headings and content with that term, and WordPress management: content updates, theme customisation and plugins. <a href="/projects/seo-content-program">Read the SEO case study</a>.</p>
<h2>Social media and content</h2>
<p>As Social Media Manager at Crushvertise LLC, a lead-generation agency in Austin, Texas (2022 – 2023), I lifted audience engagement by 20% with visual content made in Photoshop and Illustrator, and ran a multi-platform strategy that was adjusted based on the data. I also edit short-form video in Premiere Pro, CapCut and Camtasia. <a href="/projects/social-content-system">Read the social content case study</a>.</p>
<h2>B2B lead generation</h2>
<p>At Digital Gregg (2024 – 2025) I grew qualified leads by 15% for white-label partnerships using LinkedIn Sales Navigator and Apollo.io, ran HubSpot campaigns and managed the pipeline in Trello. <a href="/projects/b2b-lead-generation">Read the lead generation case study</a>.</p>
<h2>Where AI fits</h2>
<p>Growth work has a lot of repeat steps: moving new contacts into a CRM, scoring them and drafting first messages. Those are the steps I now automate with n8n, Zapier or Make.com and an LLM, so people spend their time on the conversations. See <a href="/services/ai-automation">AI automation</a>.</p>`,
  },
];

// ---------------------------------------------------------
// Projects (case studies). draft: true = noindex + left out of the sitemap
// until the missing details are filled in.
// ---------------------------------------------------------
const CAT = {
  web: { filter: 'web', label: 'SaaS & Web', soft: 'var(--lilac-soft)', text: 'var(--lilac-text)' },
  automation: { filter: 'automation', label: 'AI & Automation', soft: 'var(--accent-soft)', text: 'var(--accent-text)' },
  marketing: { filter: 'marketing', label: 'Marketing', soft: 'var(--sky-soft)', text: 'var(--sky-text)' },
  freelance: { filter: 'freelance', label: 'Freelance', soft: 'var(--mint-soft)', text: 'var(--mint-text)' },
};

export const PROJECTS = [
  {
    slug: 'signpro', name: 'SignPro', title: 'SignPro — e-signature platform', cat: CAT.web, img: 'signpro',
    alt: 'SignPro dashboard in a browser, with a signature pad and a document-signed confirmation',
    metaTitle: 'SignPro E-Signature App Case Study | Mostafizur Rahman',
    metaDesc: 'How I built SignPro, a legally binding e-signature platform: PDF and DOCX upload, email and SMS signing requests and an evidence hash for every signature.',
    summary: 'Legally binding document signing: upload PDF or DOCX, send signing requests by email or SMS, recipients draw their signature, and each signing is sealed with an evidence hash.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'S3-compatible storage', 'Twilio', 'Nodemailer'],
    live: 'https://sign-pro-zeta.vercel.app', code: 'https://github.com/msajeeb003/SignPro',
    schemaType: 'SoftwareApplication', appCategory: 'BusinessApplication',
    service: 'ai-app-development', related: ['socipro', 'eurekaedu'],
    body: `
<h2>The problem</h2>
<p>Getting a document signed should take minutes, but it often means printing, scanning and chasing people by email, with no clear record of who signed what and when. SignPro handles the whole loop in one place: upload the document, send it out, collect signatures and keep evidence of each signing.</p>
<h2>What SignPro does</h2>
<ul>
  <li>Upload PDF or Word (DOCX) documents of up to 25 MB and 500 pages; the app parses the pages for preview.</li>
  <li>Send a signature request to one or more recipients by email or SMS, with a personal message and the signature spot marked on the page.</li>
  <li>Recipients open a public signing page, draw their signature, accept the consent statement and submit, without creating an account.</li>
  <li>Every signing is sealed with an evidence hash and recorded by an audit service.</li>
  <li>A dashboard lists every document with its status, so senders can see what is pending, signed, declined or void.</li>
  <li>Senders can connect their own SMTP server, so signing emails come from their own domain.</li>
  <li>A companion Chrome extension (Manifest V3) checks for pending signature requests and shows a desktop notification with a "Sign Now" button.</li>
</ul>
<h2>Tools used</h2>
<p>The frontend is React 18 with Vite and React Router. The API is Node.js with Express, backed by PostgreSQL and S3-compatible object storage (Cloudflare R2 through the AWS SDK). PDF and DOCX handling uses pdf-lib, PDF.js and Mammoth. Email goes out through Nodemailer and SMS through Twilio. Authentication uses JWT sessions and bcrypt password hashing, with Helmet and rate limiting on the API. The whole stack runs with Docker Compose and is tested with Jest, Supertest and Puppeteer.</p>
<h2>How I built it</h2>
<p>I built SignPro with AI-assisted development, using Claude Code as a pair programmer. The work followed the real user journey screen by screen: login, dashboard, upload, document detail and the public signing page. Because the product handles legal documents, the security pieces are written in explicitly: hashed passwords, signed session tokens, API rate limiting and an audit trail. I also produced a design system for the app that documents its current look and a second, editorial "Luxe" direction for premium surfaces.</p>
<h2>Result</h2>
<p>SignPro covers the whole signing loop end to end. A sender uploads a document, sends it by email or SMS and gets it back signed, while the recipient signs from a link without creating an account. Every signature is backed by an evidence hash and an audit record, the dashboard shows where each document stands, and the API and signing flow are covered by automated tests with Jest, Supertest and Puppeteer.</p>
<p>SignPro runs as a live demo, and its full source code is public on GitHub, so you can try the signing flow and read how it works.</p>`,
  },
  {
    slug: 'socipro', name: 'SociPRO', title: 'SociPRO — autonomous social media agent', cat: CAT.automation, img: 'socipro',
    alt: 'SociPRO agent dashboard with a pipeline: find trends, write content, render video, publish',
    metaTitle: 'SociPRO AI Social Media Agent Case Study | Mostafizur Rahman',
    metaDesc: 'How I built SociPRO, an AI agent that finds trending topics, writes posts with Google Gemini, renders video with FFmpeg and schedules publishing.',
    summary: 'Finds trending topics, writes posts with Google Gemini, renders video with FFmpeg and queues publishing on a schedule, all from one dashboard.',
    stack: ['Node.js', 'Express', 'Google Gemini', 'Supabase', 'FFmpeg', 'node-cron'],
    live: 'https://soci-pro.vercel.app', code: 'https://github.com/msajeeb003/SociPRO',
    schemaType: 'SoftwareApplication', appCategory: 'BusinessApplication',
    service: 'ai-automation', related: ['signpro', 'operations-automation'],
    body: `
<h2>The problem</h2>
<p>Posting every day across several platforms means hours of finding topics, writing scripts and editing video. SociPRO is an agent that runs that loop on a schedule, while keeping a person in control of what gets published.</p>
<h2>How it works</h2>
<ol>
  <li><strong>Discover.</strong> It pulls trending topics from Google Trends and news from NewsData.io for a chosen niche. The default niche is AI technology.</li>
  <li><strong>Select.</strong> It ranks the trends and picks the top stories.</li>
  <li><strong>Write.</strong> Google Gemini writes a script for each story, in a short or long format.</li>
  <li><strong>Create.</strong> It generates an image and a thumbnail, then FFmpeg turns them into a slideshow video.</li>
  <li><strong>Publish.</strong> It formats each post for Facebook, Instagram and YouTube and publishes through the Meta Graph API and the YouTube Data API.</li>
</ol>
<h2>Built-in controls</h2>
<ul>
  <li>Auto-posting is off by default. In review mode, posts wait in the dashboard until a person approves them.</li>
  <li>Discovery runs every six hours by default, and posting follows per-platform time slots with a cap of two posts a day per platform.</li>
  <li>Mock mode runs the full pipeline with sample data, so it can be tested without any API keys.</li>
</ul>
<h2>Tools used</h2>
<p>Node.js and Express for the server and dashboard, the Google Gemini API for writing, Supabase for storage (with SQLite through sql.js for local runs), FFmpeg through fluent-ffmpeg for video, Cheerio and Axios for trend discovery, node-cron for scheduling and Jest for tests. It is deployed on Vercel.</p>
<h2>How I built it</h2>
<p>SociPRO is built as separate modules for discovery, selection, script writing, asset generation, video editing, formatting, publishing and analytics, wired together by one pipeline. Each step can be tested on its own, and swapping a news source or an AI model only changes one module. The risky step, publishing to real accounts, sits behind an explicit switch that is off by default.</p>
<h2>Result</h2>
<p>SociPRO turns a daily content routine into one scheduled pipeline: every six hours it finds what's trending in a niche, writes scripts with Google Gemini, renders a video and queues posts for Facebook, Instagram and YouTube. A person stays in control: auto-posting is off by default, posts wait for approval in review mode, and each platform is capped at two posts a day. Mock mode runs the whole pipeline with sample data, so it can be tried end to end without any API keys.</p>
<p>SociPRO runs as a live demo, and its source code is public on GitHub.</p>`,
  },
  {
    slug: 'eurekaedu', name: 'EurekaEDU', title: 'EurekaEDU — scholarship finder', cat: CAT.web, img: 'eurekaedu',
    alt: 'EurekaEDU home page: Find your scholarship. Get into your dream university, with a search bar and scholarship results',
    metaTitle: 'EurekaEDU Scholarship Finder Case Study | Mostafizur Rahman',
    metaDesc: 'How I built EurekaEDU, a scholarship platform where n8n and Google Gemini collect the listings and students search, compare and plan studying abroad.',
    summary: 'A scholarship platform for international students. An n8n and Google Gemini pipeline collects the listings; students search, compare, practise IELTS and plan their student visa in one place.',
    stack: ['Next.js 15', 'TypeScript', 'Supabase', 'n8n', 'Google Gemini', 'Tailwind CSS'],
    live: 'https://eureka-edu-gules.vercel.app',
    other: { label: 'See on Upwork', url: 'https://www.upwork.com/freelancers/~01943718b97948812b/' },
    schemaType: 'SoftwareApplication', appCategory: 'EducationalApplication',
    service: 'ai-app-development', related: ['socipro', 'signpro'],
    body: `
<h2>The problem</h2>
<p>Students who want to study abroad on a scholarship have to piece their plan together from dozens of websites: scholarship listings, university entry requirements, English test scores and embassy rules, often out of date or misleading. EurekaEDU puts all of it in one place, so a first-time applicant can find a scholarship they qualify for, see exactly what it takes and apply without paying an agent.</p>
<h2>What EurekaEDU does</h2>
<ul>
  <li>A scholarship finder that filters by country, study level (bachelor to PhD, diploma and language courses), funding type and the highest IELTS score the student can reach, including scholarships that accept MOI instead of IELTS or TOEFL.</li>
  <li>Side-by-side comparison of programs, sorted by the nearest deadline. Each listing shows the funding, the deadline and the exact test requirement, and links to the official source.</li>
  <li>University and degree pages, plus a visa and documents roadmap for the student's home country and embassy.</li>
  <li>Free IELTS practice: auto-scored reading tests, and writing tasks with an AI band estimate, criterion-by-criterion feedback and a model answer.</li>
  <li>Free accounts with a dashboard to save scholarships, set a target country, track deadlines and work on a CV.</li>
  <li>Paid one-to-one consultations in 30, 60 and 90-minute packages, booked from the site.</li>
</ul>
<h2>Tools used</h2>
<p>Next.js 15 (App Router, Server Components and Server Actions) with React 19 and TypeScript; Supabase for the PostgreSQL database and sign-in; Tailwind CSS and Framer Motion for the interface. n8n runs the data pipeline and Google Gemini turns raw scholarship pages into structured records. Zod validates every form and API request, and DOMPurify cleans any HTML content. It is deployed on Vercel.</p>
<h2>How I built it</h2>
<p>The listings come from an automated pipeline instead of manual data entry. On a schedule, an n8n workflow pulls scholarships from official national scheme sources, scholarship aggregators and news feeds. Google Gemini extracts the title, deadline, funding and requirements as structured JSON, each record is validated on its own, and the results are posted to a webhook protected by a shared secret. Valid listings publish automatically, so the site stays current without anyone typing them in, and a built-in admin CMS can edit any listing, publish drafts and retire expired scholarships.</p>
<p>Security is part of the design. Row Level Security on every database table means the public can only read published listings and each user can only see their own saved items. Middleware guards the dashboard and admin areas, the admin role is checked again on the server for every action, and secret keys never reach the browser.</p>
<h2>Result</h2>
<p>EurekaEDU is live. Students can search and compare scholarships, browse universities and degree programs by country, practise IELTS and plan their visa steps without an account. Signing up adds saved scholarships, an application journey tracker and a CV builder.</p>`,
  },
  {
    slug: 'operations-automation', name: 'Operations automation engine', title: 'Operations automation engine', cat: CAT.automation, img: 'automation',
    alt: 'n8n workflow: a webhook lead goes to HubSpot, Claude AI qualifies it, then Trello and Zapier follow up',
    metaTitle: 'n8n, Zapier & Make Automation Case Study | Mostafizur Rahman',
    metaDesc: 'How I build n8n, Zapier and Make.com automations at Artech Digital that connect CRMs, SaaS tools and marketing systems, with Claude for AI steps.',
    summary: 'n8n, Zapier and Make.com flows at Artech Digital that connect CRMs, SaaS tools and marketing systems, removing manual hand-offs.',
    stack: ['n8n', 'Zapier', 'Make.com', 'Claude', 'HubSpot', 'Trello'],
    schemaType: 'CreativeWork', service: 'ai-automation', related: ['socipro', 'b2b-lead-generation'],
    body: `
<h2>Context</h2>
<p>Artech Digital is a US company founded by an ex-Google engineer. I joined in August 2025 as a Virtual Assistant and was promoted to Junior Full Stack Developer &amp; Executive Assistant. The role combines executive support for the CEO with development work, which puts me close to the day-to-day operations I automate.</p>
<h2>The problem</h2>
<p>Growing teams end up with data spread across a CRM, a project board, forms and inboxes. Moving it by hand is slow, and every manual hand-off is a place where a lead or a task can get lost.</p>
<h2>What I build</h2>
<ul>
  <li>End-to-end workflows in n8n, Zapier and Make.com that connect SaaS tools, CRMs and marketing systems.</li>
  <li>AI steps with Claude and other LLMs inside those workflows, for the work that needs reading and judgement.</li>
  <li>Web apps and SaaS tools with AI integration, for the cases where a workflow alone is not enough.</li>
</ul>
<h2>A typical flow</h2>
<p>The diagram above shows the shape of a typical lead flow: a webhook receives a new lead, the lead is created in HubSpot, Claude reads it and qualifies it, and follow-up tasks go to Trello and out through Zapier. Each step runs without anyone copying data between tabs, and a person only steps in where a decision is needed.</p>
<h2>Tools used</h2>
<p>n8n, Zapier and Make.com for orchestration, Claude for the AI steps, HubSpot as the CRM, Trello for task boards, plus webhooks and direct API calls where a ready-made connector does not exist.</p>
<h2>Result</h2>
<p>The flows remove manual hand-offs between the team's tools: leads, tasks and updates move between the CRM, the project board and email on their own, and a person only steps in where a decision is needed.</p>`,
  },
  {
    slug: 'linkedin-bioster', name: 'LinkedIn Bioster', title: 'LinkedIn Bioster', cat: CAT.web, img: 'linkedin-bioster',
    alt: 'LinkedIn profile next to an AI bio booster panel showing a before and after rewrite',
    metaTitle: 'LinkedIn Bioster AI Bio Rewriter | Mostafizur Rahman',
    metaDesc: 'LinkedIn Bioster is an AI app that rewrites LinkedIn headlines and bios so profiles read clearer and get noticed by recruiters.',
    summary: 'AI app that rewrites LinkedIn headlines and bios so profiles read clearer and get noticed by recruiters.',
    stack: ['AI app', 'Private repo'],
    schemaType: 'CreativeWork', service: 'ai-app-development', related: ['signpro', 'eurekaedu'],
    body: `
<h2>What it is</h2>
<p>LinkedIn Bioster is an AI app that rewrites LinkedIn headlines and bios so profiles read clearer and get noticed by recruiters. It shows a before-and-after rewrite next to the profile. The code is in a private repository.</p>
<h2>The problem</h2>
<p>${todo('who uses it and what was wrong with their profiles before')}</p>
<h2>Tools used</h2>
<p>${todo('the stack and the AI model behind the rewrites')}</p>
<h2>How I built it</h2>
<p>${todo('how the prompts and the rewrite flow work')}</p>
<h2>Result</h2>
<p>${todo('live URL and results, such as profiles rewritten or user feedback')}</p>`,
  },
  {
    slug: 'leads-generation-app', name: 'Leads generation app', title: 'Leads generation app', cat: CAT.automation, img: 'leads-app',
    alt: 'Lead finder app with industry, size and location filters, a scored leads table and an Export CSV button',
    metaTitle: 'B2B Leads Generation App | Mostafizur Rahman',
    metaDesc: 'A web app for finding and organising B2B leads, with industry, size and location filters, lead scores and CSV export for outreach.',
    summary: 'Web app for finding and organising B2B leads, with filters, lead scores and CSV export for outreach.',
    stack: ['Web app', 'Private repo'],
    schemaType: 'CreativeWork', service: 'ai-automation', related: ['b2b-lead-generation', 'operations-automation'],
    body: `
<h2>What it is</h2>
<p>A web app for finding and organising B2B leads. Users filter companies by industry, size and location, see a score for each lead and export the list to CSV for outreach. The code is in a private repository.</p>
<h2>The problem</h2>
<p>${todo('who uses it and how they built lead lists before')}</p>
<h2>Tools used</h2>
<p>${todo('the stack and where the lead data comes from')}</p>
<h2>How I built it</h2>
<p>${todo('how leads are scored')}</p>
<h2>Result</h2>
<p>${todo('live URL and results, such as leads found or time saved')}</p>`,
  },
  {
    slug: 'b2b-lead-generation', name: 'B2B lead-generation pipeline', title: 'B2B lead-generation pipeline', cat: CAT.marketing, img: 'lead-pipeline',
    alt: 'Partner pipeline board from prospects to partners, with a +15% qualified leads badge',
    metaTitle: 'Lead Generation Case Study: +15% Leads | Mostafizur Rahman',
    metaDesc: 'How I grew qualified leads by 15% for white-label partnerships at Digital Gregg with LinkedIn Sales Navigator, Apollo.io, HubSpot and Trello.',
    summary: '+15% qualified leads at Digital Gregg for white-label partnerships, using Sales Navigator, Apollo.io, HubSpot and Trello.',
    stack: ['LinkedIn Sales Navigator', 'Apollo.io', 'HubSpot', 'Trello'],
    schemaType: 'CreativeWork', service: 'seo-social-media', related: ['seo-content-program', 'operations-automation'],
    body: `
<h2>Context</h2>
<p>From December 2024 to May 2025 I worked remotely for Digital Gregg, a US company, as Virtual Assistant – Lead Generation &amp; Marketing Head. My focus was white-label partnerships: finding potential partners and moving them through a pipeline from prospect to partner.</p>
<h2>Result</h2>
<p><strong>Qualified leads grew by 15%</strong> for white-label partnerships.</p>
<h2>What I did</h2>
<ul>
  <li>Built prospect lists in LinkedIn Sales Navigator, which filters companies and people by industry, company size and role.</li>
  <li>Found and enriched contact details with Apollo.io.</li>
  <li>Ran HubSpot campaigns to reach prospects and follow up.</li>
  <li>Managed the lead pipeline in Trello, used as a CRM board with a column for each stage from prospect to partner.</li>
</ul>
<h2>Tools used</h2>
<p>LinkedIn Sales Navigator, Apollo.io, HubSpot and Trello.</p>
<h2>What I would automate today</h2>
<p>Much of this pipeline is repeat work that I now automate. An n8n or Zapier workflow can move each new Apollo.io contact into HubSpot, an LLM can draft a fit score and a first message, and the Trello card can be created automatically, so the person running the pipeline only reviews and sends. That is the kind of work covered by my <a href="/services/ai-automation">AI automation service</a>.</p>`,
  },
  {
    slug: 'seo-content-program', name: 'SEO content program', title: 'SEO content program', cat: CAT.marketing, img: 'seo-report',
    alt: 'Organic search report with a rising visibility chart and keyword positions, +25% organic rankings',
    metaTitle: 'SEO Case Study: +25% Organic Rankings | Mostafizur Rahman',
    metaDesc: 'How I improved organic search rankings by 25% at ICMG LLC across multiple WordPress sites with keyword research and on-page SEO.',
    summary: '+25% organic search rankings at ICMG LLC across multiple WordPress sites through keyword research and on-page SEO.',
    stack: ['Keyword research', 'On-page SEO', 'WordPress'],
    schemaType: 'CreativeWork', service: 'seo-social-media', related: ['social-content-system', 'b2b-lead-generation'],
    body: `
<h2>Context</h2>
<p>From January to December 2024 I worked remotely as Content Manager for ICMG LLC, a US company, and managed multiple WordPress sites.</p>
<h2>Result</h2>
<p><strong>Organic search rankings improved by 25%.</strong></p>
<h2>What I did</h2>
<ul>
  <li><strong>Keyword research</strong> to choose the search term each page should target.</li>
  <li><strong>On-page SEO</strong> to align each page's title, description, headings and content with its target term.</li>
  <li><strong>WordPress management:</strong> content updates, theme customisation and plugins across the sites.</li>
</ul>
<h2>Tools used</h2>
<p>WordPress, with keyword research and on-page SEO as the core methods.</p>
<h2>What carries over</h2>
<p>The same principles shape this website: one clear topic per page, descriptive titles and headings, and plain-text answers that search engines and AI assistants can quote. See <a href="/services/seo-social-media">SEO and social media services</a>.</p>`,
  },
  {
    slug: 'social-content-system', name: 'Social content system', title: 'Social content system', cat: CAT.marketing, img: 'social-content',
    alt: 'Grid of social media post designs and a phone showing a post, +20% engagement',
    metaTitle: 'Social Media Case Study: +20% Engagement | Mostafizur Rahman',
    metaDesc: 'How I lifted audience engagement by 20% at Crushvertise, a lead-generation agency in Austin, Texas, with Photoshop and Illustrator content.',
    summary: '+20% audience engagement at Crushvertise from Photoshop and Illustrator visuals for a lead-generation agency.',
    stack: ['Photoshop', 'Illustrator', 'Social media'],
    schemaType: 'CreativeWork', service: 'seo-social-media', related: ['seo-content-program', 'socipro'],
    body: `
<h2>Context</h2>
<p>From March 2022 to September 2023 I worked remotely as Social Media Manager for Crushvertise LLC, a lead-generation agency in Austin, Texas.</p>
<h2>Result</h2>
<p><strong>Audience engagement grew by 20%.</strong></p>
<h2>What I did</h2>
<ul>
  <li>Designed visual content for social media in Photoshop and Illustrator.</li>
  <li>Ran a multi-platform social media strategy for the agency.</li>
  <li>Reviewed campaign data and adjusted the content and campaigns based on what performed.</li>
</ul>
<h2>Tools used</h2>
<p>Adobe Photoshop and Adobe Illustrator for visuals, plus the social platforms' own analytics.</p>
<h2>What carries over</h2>
<p>Consistent posting is the hard part of social media. <a href="/projects/socipro">SociPRO</a>, the agent I built later, automates the research, writing and video steps of that work while keeping a review step before anything is published.</p>`,
  },
];

// Freelance history shown on /projects (no case-study page)
export const FREELANCE = {
  name: 'Upwork client work', img: 'upwork', cat: CAT.freelance,
  alt: 'Upwork work history with three completed jobs, one rated 5.0 stars',
  summary: 'Virtual assistance and content for a US marketing agency (12 months), research respondent recruitment and transcription, and US recruiting rated 5.0 stars.',
  stack: ['Upwork', '2021–2024'],
  url: 'https://www.upwork.com/freelancers/~01943718b97948812b/',
};
