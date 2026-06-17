import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpen, User, Calendar, Clock, ChevronLeft, Search } from 'lucide-react';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        // Check if hash exists in URL (e.g. #what-is-genetic-testing)
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
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    window.location.hash = '';
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="articles-page animate-fade-in">
      {/* Page Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container text-center">
          <span className="badge badge-accent mb-4">Educational Resources</span>
          <h1 className="text-gradient">Genetics & Genomics Insights</h1>
          <p className="lead-text mt-4" style={{ maxWidth: '800px', margin: '16px auto 0' }}>
            A library of articles to help patients, families, and healthcare professionals understand DNA testing, inherited risk, and modern personalized medicine.
          </p>
        </div>
      </section>

      {/* Main Blog Area */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: '1000px' }}>
          {selectedArticle ? (
            /* Single Article View */
            <div className="card article-reader-card animate-fade-in">
              <button onClick={handleBackToList} className="btn-back flex-row-center gap-2 mb-6">
                <ChevronLeft size={16} /> Back to Articles List
              </button>
              
              <span className="badge badge-accent mb-4">{selectedArticle.category}</span>
              <h2 className="article-reader-title mb-4">{selectedArticle.title}</h2>
              
              <div className="article-meta flex-row gap-4 mb-8 border-bottom pb-4 text-muted small-text">
                <div className="flex-row-center gap-1">
                  <User size={14} />
                  <span>By {selectedArticle.author}</span>
                </div>
                <div className="flex-row-center gap-1">
                  <Calendar size={14} />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="flex-row-center gap-1">
                  <Clock size={14} />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="article-body-content">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed" style={{ fontSize: '1.1rem' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="card card-accent mt-12 bg-secondary" style={{ padding: '24px' }}>
                <h4>Do you have questions about this topic or need report review?</h4>
                <p className="small-text mt-2 mb-4">
                  Dr. Lahiru Prabodha provides clinical consultations to interpret DNA reports and map family history risks.
                </p>
                <button 
                  onClick={() => {
                    window.location.hash = '';
                    window.location.pathname = '/appointments';
                  }} 
                  className="btn btn-primary"
                >
                  Book consultation
                </button>
              </div>
            </div>
          ) : (
            /* Articles List View */
            <div>
              {/* Search Box */}
              <div className="search-bar-container card mb-8" style={{ padding: '16px' }}>
                <div className="flex-row-center gap-3">
                  <Search size={20} className="text-light" />
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ border: 'none', padding: '8px' }}
                    placeholder="Search articles by title, keyword, or category..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {filteredArticles.length > 0 ? (
                <div className="grid grid-2">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="card flex-col-card hover-scale">
                      <span className="badge badge-accent mb-4">{article.category}</span>
                      <h3 style={{ fontSize: '1.35rem', cursor: 'pointer' }} onClick={() => handleSelectArticle(article)}>
                        {article.title}
                      </h3>
                      <p className="mt-2 text-limit-3">{article.summary}</p>
                      
                      <div className="card-footer mt-auto pt-6 border-top">
                        <div className="card-author flex-row-center gap-1">
                          <Clock size={12} />
                          <span className="small-text">{article.readTime}</span>
                        </div>
                        <button 
                          onClick={() => handleSelectArticle(article)} 
                          className="btn-link"
                        >
                          Read Article
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center card py-12">
                  <BookOpen size={48} className="text-light text-center-icon mb-4" />
                  <h3>No Articles Found</h3>
                  <p>Try resetting your search query or searching for a different keyword.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
