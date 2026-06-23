import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { 
  BookOpen, 
  User, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  Search, 
  ArrowRight,
  MessageSquare,
  Upload,
  Sparkles,
  Inbox
} from 'lucide-react';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const location = useLocation();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/articles`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        // Check if hash exists in URL
        const hash = location.hash.replace('#', '');
        if (hash) {
          const matched = data.find(a => a.slug === hash);
          if (matched) setSelectedArticle(matched);
        }
      })
      .catch(err => console.log('Failed to load articles:', err));
  }, [location.hash]);

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    window.location.hash = article.slug;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    window.location.hash = '';
  };

  // Map chips to article categories / keywords
  const categoriesMap = {
    'All': 'All',
    'Genetic Testing': ['Education', 'Genomics', 'Clinical Advice'],
    'Counselling': ['Counselling'],
    'NIPT': ['Prenatal Screening'],
    'Wellness Genomics': ['Genomics & Wellness'],
    'Reproductive Genetics': ['Reproductive Genetics'],
    'Sequencing': ['Genomics']
  };

  const filteredArticles = articles.filter(a => {
    // Search query matches title, summary, or category
    const matchesSearch = searchTerm === '' || 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (!matchesSearch) return false;
    
    // Chip filter matches
    if (activeChip === 'All') return true;
    
    const targetCategories = categoriesMap[activeChip] || [activeChip];
    if (targetCategories.includes(a.category)) return true;
    
    // Fallback: see if title/summary/category matches the chip text
    const chipQuery = activeChip.toLowerCase();
    return (
      a.title.toLowerCase().includes(chipQuery) ||
      a.summary.toLowerCase().includes(chipQuery) ||
      a.category.toLowerCase().includes(chipQuery)
    );
  });

  return (
    <div className="articles-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom" style={{ padding: '60px 0 40px' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Genetics Education</span>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '1.2', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
            Articles & Resources
          </h1>
          <p className="lead-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.12rem)', color: 'var(--text-muted)', lineHeight: '1.7', margin: '0 auto 32px' }}>
            Simple, medically responsible articles to help patients and families understand genetic testing, counselling, NIPT, wellness genomics, and report interpretation.
          </p>
          
          <div className="flex-row-center gap-4 flex-wrap">
            <a href="#articles-list" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Explore Articles
            </a>
            <Link to="/appointments" className="btn btn-secondary" style={{ padding: '12px 28px', color: 'var(--text-main)' }}>
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section id="articles-list" className="section section-light" style={{ padding: '64px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {selectedArticle ? (
            /* Single Article View */
            <div className="card animate-fade-in" style={{ padding: '40px', background: 'var(--bg-secondary)', borderRadius: '24px', maxWidth: '840px', margin: '0 auto', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <button 
                onClick={handleBackToList} 
                className="btn btn-secondary btn-sm flex-row-center gap-2 mb-6"
                style={{ padding: '8px 16px', fontSize: '0.82rem', color: 'var(--text-main)' }}
              >
                <ChevronLeft size={16} /> Back to Articles List
              </button>
              
              <div style={{ marginBottom: '16px' }}>
                <span className="badge badge-accent" style={{ fontSize: '0.7rem', padding: '4px 12px' }}>{selectedArticle.category}</span>
              </div>
              
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.3' }}>
                {selectedArticle.title}
              </h2>
              
              <div className="flex-row gap-4 mb-8 border-bottom pb-4 text-muted xsmall-text" style={{ borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                <div className="flex-row align-center gap-1" style={{ display: 'flex', alignItems: 'center' }}>
                  <User size={14} className="text-secondary" />
                  <span>By {selectedArticle.author}</span>
                </div>
                <div className="flex-row align-center gap-1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Calendar size={14} className="text-accent" />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="flex-row align-center gap-1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Clock size={14} className="text-secondary" />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="article-body-content" style={{ textJustify: 'none', textAlign: 'left' }}>
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p 
                    key={index} 
                    className="mb-6" 
                    style={{ 
                      fontSize: '16px', 
                      lineHeight: '1.7', 
                      color: 'var(--text-muted)',
                      wordSpacing: 'normal',
                      letterSpacing: 'normal'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* In-Article Callout Box */}
              <div className="card mt-12 bg-secondary" style={{ padding: '32px', borderRadius: '18px', background: 'rgba(2, 132, 199, 0.03)', borderColor: 'rgba(2, 132, 199, 0.12)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Do you have questions about this topic or need report review?
                </h4>
                <p className="xsmall-text text-muted mb-6" style={{ lineHeight: '1.6' }}>
                  Dr. Lahiru Prabodha provides clinical consultations to interpret DNA reports and map family history risks.
                </p>
                <Link to="/appointments" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                  Book Consultation
                </Link>
              </div>
            </div>
          ) : (
            /* Articles List View */
            <div className="flex-col gap-8">
              
              {/* Search Box & Category Filters Container */}
              <div className="flex-col gap-6 align-center w-full" style={{ maxWidth: '760px', margin: '0 auto' }}>
                
                {/* Search Bar */}
                <div 
                  className="card w-full" 
                  style={{ 
                    padding: '6px 6px 6px 18px', 
                    borderRadius: '50px', 
                    border: '1px solid var(--border-color)', 
                    boxShadow: 'var(--shadow-sm)',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Search size={20} className="text-light" style={{ flexShrink: 0 }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ 
                      border: 'none', 
                      padding: '10px 14px', 
                      width: '100%', 
                      background: 'transparent',
                      color: 'var(--text-main)',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                    placeholder="Search articles by title, keyword, or topic…" 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Category Chips Selector */}
                <div 
                  className="flex-row gap-2 flex-wrap justify-center w-full" 
                  style={{ 
                    paddingBottom: '4px'
                  }}
                >
                  {['All', 'Genetic Testing', 'Counselling', 'NIPT', 'Wellness Genomics', 'Reproductive Genetics', 'Sequencing'].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setActiveChip(chip)}
                      className="btn btn-sm"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.75rem',
                        borderRadius: '50px',
                        backgroundColor: activeChip === chip ? 'var(--secondary)' : 'var(--bg-secondary)',
                        color: activeChip === chip ? 'white' : 'var(--text-muted)',
                        border: activeChip === chip ? '1px solid transparent' : '1px solid var(--border-color)',
                        boxShadow: 'none',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

              </div>

              {/* Grid List */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-3" style={{ gap: '24px', marginTop: '24px' }}>
                  {filteredArticles.map((article) => (
                    <div 
                      key={article.id} 
                      className="card flex-col-card" 
                      style={{ 
                        padding: '28px', 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-color)',
                        borderRadius: '24px', 
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'all var(--transition-normal)'
                      }}
                    >
                      <div className="mb-4">
                        <span className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '3px 8px' }}>{article.category}</span>
                      </div>
                      
                      <h3 
                        style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer', marginBottom: '8px', lineHeight: '1.4' }}
                        onClick={() => handleSelectArticle(article)}
                      >
                        {article.title}
                      </h3>
                      
                      <p 
                        className="xsmall-text text-muted mb-6" 
                        style={{ 
                          lineHeight: '1.6', 
                          textAlign: 'left',
                          wordSpacing: 'normal',
                          letterSpacing: 'normal',
                          minHeight: '64px'
                        }}
                      >
                        {article.summary}
                      </p>
                      
                      <div className="flex-row-between align-center mt-auto pt-4 border-top" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <div className="flex-row align-center gap-1 text-muted" style={{ display: 'flex', alignItems: 'center' }}>
                          <Clock size={12} />
                          <span className="xsmall-text">{article.readTime}</span>
                        </div>
                        <button 
                          onClick={() => handleSelectArticle(article)} 
                          className="btn btn-secondary btn-sm"
                          style={{ 
                            padding: '6px 14px', 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            color: 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          Read Article <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  className="card text-center flex-col align-center justify-center" 
                  style={{ padding: '48px 24px', borderRadius: '20px', background: 'var(--bg-secondary)', maxWidth: '600px', margin: '24px auto 0' }}
                >
                  <div className="flex-row-center text-light mb-4" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-tertiary)' }}>
                    <Inbox size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: 700 }}>No articles found</h3>
                  <p className="small-text text-muted" style={{ maxWidth: '440px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                    No articles found. Try another keyword or contact us for guidance.
                  </p>
                  <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                    Contact The Gene Clinic
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Final bottom CTA */}
      <section className="section bg-secondary" style={{ padding: '96px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="badge badge-accent mb-4">Patient Education</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 800, marginBottom: '16px' }}>
            Need help understanding a genetic topic or report?
          </h2>
          <p className="lead-text text-muted mb-8" style={{ fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 36px' }}>
            Book a consultation to discuss your report, family history, or test options with professional guidance.
          </p>
          <div className="flex-row-center gap-4 flex-wrap">
            <Link to="/appointments" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              <Calendar size={18} /> Book Consultation
            </Link>
            <Link to="/appointments?action=upload" className="btn btn-secondary" style={{ padding: '14px 28px', color: 'var(--text-main)' }}>
              <Upload size={18} /> Upload Report
            </Link>
            <a 
              href="https://wa.me/94701917000" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary" 
              style={{ padding: '14px 28px', backgroundColor: '#25D366', color: 'white', borderColor: 'transparent' }}
            >
              <MessageSquare size={18} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
