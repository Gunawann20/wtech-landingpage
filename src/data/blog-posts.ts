import type { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    slug: 'modular-monolith-jembatan-microservices',
    title: 'Modular Monolith: Jembatan Strategis Menuju Arsitektur Microservices',
    description:
      'Pelajari mengapa Modular Monolith lebih bijak daripada microservices prematur — kontrak modul, isolasi database, architecture test, dan jalur migrasi ke event-driven.',
    pubDate: '2026-06-19',
    author: 'Gunawan',
    authorRole: 'Software Engineer',
    authorAvatar: '',
    tags: ['Architecture', 'Microservices', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&w=1200&q=80&fit=crop',
    readTime: 6,
    content: `
      <p>Dalam dunia pengembangan perangkat lunak saat ini, banyak pengembang sering kali terjebak dalam tren untuk langsung menggunakan arsitektur <strong>Microservices</strong> sejak awal sebuah proyek dimulai. Padahal, bagi bisnis yang baru berkembang, pendekatan ini sering kali menjadi over-engineering yang justru menghambat efisiensi. Sebagai solusi alternatif yang lebih bijak, <strong>Modular Monolith</strong> hadir sebagai titik tengah yang menawarkan kemudahan pengelolaan monolit namun dengan struktur yang siap untuk masa depan.</p>
      <h2>Mengapa Menghindari Monolit Tradisional dan Microservices Prematur?</h2>
      <p><strong>Monolit Tradisional</strong> sering kali berakhir menjadi spaghetti code. Masalah utamanya meliputi:</p>
      <ul>
        <li>Tidak adanya batasan akses antar domain bisnis, sehingga perubahan pada satu fitur dapat merusak fitur lainnya (<em>high coupling</em>)</li>
        <li>Database yang sangat tightly coupled — ratusan tabel saling berkaitan melalui foreign key dan join yang rumit, sehingga sulit memisahkan modul di kemudian hari</li>
      </ul>
      <p>Di sisi lain, langsung melompat ke <strong>Microservices</strong> membawa kompleksitas infrastruktur yang tinggi:</p>
      <ul>
        <li>Kebutuhan Kubernetes, service discovery, hingga API Gateway</li>
        <li>Komunikasi antar service melalui jaringan (HTTP/gRPC) menimbulkan network overhead — lebih lambat dibanding pemanggilan kode langsung</li>
        <li>Pengelolaan transaksi menjadi jauh lebih sulit karena memerlukan implementasi seperti <strong>Saga Pattern</strong> untuk menangani distributed transaction</li>
      </ul>
      <h2>Konsep Inti Modular Monolith</h2>
      <p><strong>Modular Monolith</strong> adalah aplikasi yang tetap berada dalam satu unit deployment, namun secara internal memiliki <em>logical boundary</em> atau batasan logika yang sangat ketat antar modulnya. Tujuannya adalah memastikan setiap domain bisnis — seperti produk, order, atau pembayaran — bersifat independen secara logika.</p>
      <h2>Strategi Kontrak dan Implementasi</h2>
      <p>Strategi utama dalam Modular Monolith adalah membagi setiap domain bisnis menjadi dua bagian: <strong>Kontrak (Client)</strong> dan <strong>Implementasi</strong>.</p>
      <ul>
        <li><strong>Kontrak/Interface:</strong> Berisi definisi fungsi atau metode yang boleh diakses oleh modul lain. Hanya fitur yang memang perlu diekspos keluar yang dimasukkan ke dalam kontrak ini.</li>
        <li><strong>Implementasi:</strong> Berisi logika bisnis yang sebenarnya. Modul lain tidak diperbolehkan mengakses kelas implementasi secara langsung, melainkan harus melalui kontrak yang telah disepakati.</li>
      </ul>
      <p>Dengan cara ini, modul Order misalnya tidak perlu tahu bagaimana modul Produk bekerja; ia cukup memanggil metode <em>get product</em> atau <em>reduce stock</em> melalui kontrak Produk.</p>
      <h2>Isolasi Database: Kunci Kemudahan Migrasi</h2>
      <p>Salah satu aturan paling krusial dalam Modular Monolith adalah <strong>tidak boleh ada relasi tabel (foreign key) antar modul</strong>, meskipun mereka berada dalam database yang sama. Jika modul Order membutuhkan data Customer, ia tidak boleh melakukan join SQL secara langsung. Sebaliknya, modul Order harus mengambil ID dari databasenya sendiri, lalu memanggil kontrak modul Customer untuk mendapatkan detail datanya.</p>
      <p>Pendekatan ini memastikan bahwa jika suatu saat sebuah modul harus dipindahkan ke database atau teknologi yang berbeda (misalnya dari MySQL ke PostgreSQL), modul lain tidak akan terpengaruh karena tidak ada ketergantungan di level basis data.</p>
      <h2>Menjaga Integritas Arsitektur dengan Testing</h2>
      <p>Tantangan terbesar dalam monolit adalah developer yang mungkin langsung memanggil modul lain tanpa lewat kontrak karena kodenya berada di satu proyek yang sama. Untuk mencegah hal ini, diperlukan <strong>Architecture Test</strong> menggunakan alat seperti ArchUnit (untuk Java) yang secara otomatis akan menggagalkan unit test jika terdeteksi adanya pelanggaran batasan antar modul.</p>
      <h2>Jalan Mulus Menuju Microservices dan Event-Driven</h2>
      <p>Modular Monolith adalah persiapan terbaik untuk skala besar. Ketika sebuah modul (misalnya modul Pembayaran) mulai mengalami trafik yang sangat tinggi, kita bisa dengan mudah mengeluarkannya menjadi Microservice terpisah. Prosesnya sederhana:</p>
      <ol>
        <li>Pindahkan kode modul tersebut ke service baru</li>
        <li>Ubah implementasi kontrak di aplikasi monolit yang tadinya memanggil kode internal menjadi pemanggilan API (HTTP/gRPC) ke service baru tersebut</li>
        <li>Modul lain yang menggunakan kontrak tersebut tidak perlu diubah kodenya sama sekali</li>
      </ol>
      <p>Selain itu, arsitektur ini juga mendukung model <strong>Event-Driven</strong>. Sebagai contoh, modul Notifikasi yang tadinya dipanggil langsung secara sinkron dapat diubah implementasinya untuk mengirim pesan melalui Kafka atau RabbitMQ tanpa merubah logika di modul pengirim (seperti modul Order).</p>
      <h2>Kesimpulan</h2>
      <p>Modular Monolith memungkinkan tim untuk tetap fokus pada nilai bisnis tanpa terjebak dalam kerumitan infrastruktur Microservices di awal proyek. Dengan desain yang rapi, batasan yang ketat, dan penggunaan kontrak, aplikasi monolit tetap bisa memiliki performa yang bagus, stabil, serta memberikan fleksibilitas penuh untuk bertransformasi menjadi Microservices di masa depan jika memang benar-benar dibutuhkan.</p>
      <p>Di WTech Innovations, kami membantu tim merancang arsitektur yang tumbuh bersama bisnis — dari Modular Monolith yang terstruktur hingga migrasi microservices yang terukur, tanpa big-bang rewrite yang merisiko operasional.</p>
    `,
  },
  {
    slug: 'scaling-enterprise-apis',
    title: 'Scaling Enterprise APIs Without Breaking Your Architecture',
    description:
      'How to design resilient API layers that grow with your business — patterns for versioning, observability, and zero-downtime migrations.',
    pubDate: '2025-11-12',
    author: 'Sarah Chen',
    authorRole: 'Principal Architect',
    authorAvatar: 'https://i.pravatar.cc/150?u=sarah-chen',
    tags: ['API', 'Enterprise', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&w=1200&q=80&fit=crop',
    readTime: 6,
    content: `
      <p>Enterprise API ecosystems rarely fail because of a single bad endpoint. They fail when growth outpaces the structural decisions made in year one.</p>
      <h2>Start with contract-first design</h2>
      <p>Define your API contracts before implementation. OpenAPI or AsyncAPI specifications become the single source of truth for frontend teams, partner integrations, and internal services.</p>
      <h2>Version without fragmentation</h2>
      <p>Use explicit versioning strategies — URL paths for major breaks, headers for negotiated features. Deprecation windows should be measured in quarters, not sprints.</p>
      <h2>Observability is non-negotiable</h2>
      <p>Every request needs trace IDs, structured logs, and latency histograms. When something breaks at 2 AM, you need to answer <em>which client</em>, <em>which version</em>, and <em>which dependency</em> in under five minutes.</p>
      <h2>The migration playbook</h2>
      <ol>
        <li>Shadow traffic to the new service</li>
        <li>Compare responses with automated diffing</li>
        <li>Cut over with feature flags</li>
        <li>Keep rollback paths for 30 days minimum</li>
      </ol>
      <p>At WTech Innovations, we treat APIs as products — with SLAs, documentation, and lifecycle management baked in from day one.</p>
    `,
  },
  {
    slug: 'ai-automation-production',
    title: 'AI Automation That Actually Ships to Production',
    description:
      'A practical framework for moving from LLM prototypes to production-grade automation — governance, evaluation, and human-in-the-loop design.',
    pubDate: '2025-10-28',
    author: 'Marcus Webb',
    authorRole: 'Head of AI Engineering',
    authorAvatar: 'https://i.pravatar.cc/150?u=marcus-webb',
    tags: ['AI', 'Automation', 'LLM'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&w=1200&q=80&fit=crop',
    readTime: 7,
    content: `
      <p>Most AI pilots die in the demo stage. The gap between a convincing prototype and a system your operations team trusts is wider than most roadmaps admit.</p>
      <h2>Define success before you prompt</h2>
      <p>Start with measurable outcomes: time saved, error rate reduction, or throughput increase. If you cannot quantify the baseline, you cannot prove ROI.</p>
      <h2>Build evaluation into the pipeline</h2>
      <ul>
        <li>Golden datasets for regression testing</li>
        <li>LLM-as-judge with human calibration</li>
        <li>Cost and latency budgets per workflow</li>
      </ul>
      <h2>Human-in-the-loop by design</h2>
      <p>Automation should escalate — not hallucinate. Critical decisions need audit trails, confidence thresholds, and clear handoff points to human reviewers.</p>
      <p>The teams that win treat AI as infrastructure, not magic. That means the same rigor you apply to payments or identity systems.</p>
    `,
  },
  {
    slug: 'legacy-modernization-staircase',
    title: 'Legacy Modernization: The Staircase Approach',
    description:
      'Why big-bang rewrites fail and how incremental modernization delivers value at every step without halting the business.',
    pubDate: '2025-09-15',
    updatedDate: '2025-10-01',
    author: 'Elena Rodriguez',
    authorRole: 'Engineering Director',
    authorAvatar: 'https://i.pravatar.cc/150?u=elena-rodriguez',
    tags: ['Legacy', 'Modernization', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&w=1200&q=80&fit=crop',
    readTime: 5,
    content: `
      <p>Replacing a decade-old system in one release is a fantasy that budget spreadsheets love and engineering reality punishes.</p>
      <h2>The staircase model</h2>
      <p>Instead of a cliff-edge migration, we break modernization into discrete steps — each delivering standalone value:</p>
      <ol>
        <li><strong>Strangle the monolith</strong> — Extract bounded contexts behind API facades</li>
        <li><strong>Parallel run</strong> — New and old systems serve traffic simultaneously</li>
        <li><strong>Data sync</strong> — Event-driven replication with conflict resolution</li>
        <li><strong>Cutover</strong> — Domain by domain, never all at once</li>
      </ol>
      <h2>What to modernize first</h2>
      <p>Prioritize modules with the highest change frequency and the lowest coupling. Payment flows and reporting dashboards are common first targets.</p>
      <p>Legacy systems are not liabilities — they are proof your business survived. Modernize them with respect, not demolition.</p>
    `,
  },
  {
    slug: 'building-resilient-saas-platforms',
    title: 'Building Resilient SaaS Platforms for Global Scale',
    description:
      'Multi-tenant architecture patterns, data isolation strategies, and operational practices for SaaS products serving millions of users.',
    pubDate: '2025-08-20',
    author: 'James Okonkwo',
    authorRole: 'Cloud Solutions Lead',
    authorAvatar: 'https://i.pravatar.cc/150?u=james-okonkwo',
    tags: ['SaaS', 'Cloud', 'Scalability'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&w=1200&q=80&fit=crop',
    readTime: 8,
    content: `
      <p>Building a SaaS platform that survives its first enterprise customer is different from building one that survives its ten-thousandth.</p>
      <h2>Tenant isolation models</h2>
      <p>Choose between shared database with row-level security, schema-per-tenant, or database-per-tenant based on compliance requirements and scale economics.</p>
      <h2>Design for blast radius</h2>
      <p>Every service should fail independently. Circuit breakers, bulkheads, and graceful degradation prevent a single tenant's spike from taking down the platform.</p>
      <h2>Operational excellence</h2>
      <p>Runbooks, automated rollbacks, and per-tenant observability dashboards are not optional at scale. Your on-call engineer should know which tenant triggered an alert within seconds.</p>
    `,
  },
];
