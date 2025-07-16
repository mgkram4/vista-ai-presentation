'use client';

import { BarChart3, Bot, Brain, CheckCircle, ChevronLeft, ChevronRight, Clock, FileText, GanttChart, Menu, Search, Send, Shield, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { animated, config, useTransition } from 'react-spring';

type SearchResult = {
  name: string;
  price: string;
  match: string;
  image: string;
};

type Equipment = {
  name: string;
  price: string;
  match: string;
  image: string;
  keywords: string[];
};

const SearchSlideComponent = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (q: string) => void }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const equipment: Equipment[] = [
    { name: 'CAT 320 Excavator', price: '$125,000', match: '95%', image: '🚜', keywords: ['excavator', 'construction', 'cat'] },
    { name: 'Komatsu PC200', price: '$118,000', match: '92%', image: '🏗️', keywords: ['excavator', 'komatsu'] },
    { name: 'JCB 3CX Backhoe', price: '$95,000', match: '88%', image: '⚙️', keywords: ['backhoe', 'jcb', 'construction'] },
    { name: 'Toyota Forklift', price: '$45,000', match: '90%', image: '📦', keywords: ['forklift', 'warehouse', 'toyota'] }
  ];

  const handleSearch = () => {
    setHasSearched(true);
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = equipment
      .filter(item => item.keywords.some(k => lowerQuery.includes(k)) || item.name.toLowerCase().includes(lowerQuery))
      .map(item => ({
        ...item,
        match: `${Math.floor(Math.random() * 10 + 90)}%`
      }));
    setSearchResults(filtered);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col justify-center">
        <div className="mb-6">
          <Search className="w-10 h-10 md:w-12 md:h-12 text-black mb-4 mx-auto lg:mx-0" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">AI-Powered Equipment Search</h2>
          <p className="text-black mb-6 text-center lg:text-left">Natural language search with intelligent matching and recommendations</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-center lg:text-left">Smart Search Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Understands natural language queries</li>
              <li>• Suggests alternatives based on needs</li>
              <li>• Compares prices across vendors</li>
              <li>• Shows financing options inline</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 p-4 md:p-8">
        <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHasSearched(false);
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Try: 'I need an excavator for residential construction'"
                className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs bg-purple-100 text-black px-3 py-1 rounded-full cursor-pointer hover:bg-purple-200 transition-colors"
                    onClick={() => { setSearchQuery('excavator under $150k'); handleSearch(); }}>
                excavator under $150k
              </span>
              <span className="text-xs bg-purple-100 text-black px-3 py-1 rounded-full cursor-pointer hover:bg-purple-200 transition-colors"
                    onClick={() => { setSearchQuery('forklift for warehouse'); handleSearch(); }}>
                forklift for warehouse
              </span>
              <span className="text-xs bg-purple-100 text-black px-3 py-1 rounded-full cursor-pointer hover:bg-purple-200 transition-colors"
                    onClick={() => { setSearchQuery('backhoe for construction'); handleSearch(); }}>
                backhoe for construction
              </span>
            </div>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-black">AI found {searchResults.length} matches:</p>
              {searchResults.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-3 md:p-4 hover:border-purple-400 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl md:text-3xl mr-3 md:mr-4">{item.image}</span>
                      <div>
                        <h4 className="font-semibold text-sm md:text-base">{item.name}</h4>
                        <p className="text-sm text-black">{item.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-black font-semibold">{item.match} match</span>
                      <p className="text-xs text-black">From $1,850/mo</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : hasSearched && searchQuery ? (
            <p className="text-sm text-black text-center py-4">No results found. Try another search!</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const VistaAIPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{type: string, text: string}>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

  const slides = [
    { id: 'intro', title: 'AI-Powered Equipment Financing' },
    { id: 'chatbot', title: 'AI Customer Assistant' },
    { id: 'credit', title: 'Instant Credit Pre-Approval' },
    { id: 'search', title: 'Intelligent Equipment Search' },
    { id: 'analytics', title: 'Predictive Analytics Dashboard' },
    { id: 'document', title: 'Smart Document Processing' },
    { id: 'roadmap', title: 'Implementation Roadmap' },
    { id: 'costs', title: 'Estimated Operating Costs' },
    { id: 'future', title: 'Future AI Opportunities' }
  ];

  // Slide transition animation with mobile optimization
  const transitions = useTransition(currentSlide, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
    config: { ...config.gentle, duration: 300 }, // Faster on mobile
  });

  // Touch gesture handling with improved sensitivity
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    touchEndRef.current = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEndRef.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (diff < 0 && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    }
  }, [currentSlide, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  // Intro Slide - Mobile Optimized
  const IntroSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <Brain className="w-12 h-12 md:w-16 md:h-16 text-black mr-3 animate-pulse" />
          <h1 className="text-2xl md:text-5xl font-bold text-black">Vista Pacific AI</h1>
        </div>
        <p className="text-lg md:text-xl text-black mb-8 max-w-2xl">
          Transform your equipment financing business with cutting-edge AI automation
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-xl hover:scale-105 transition-transform duration-200">
          <Zap className="w-8 h-8 md:w-10 md:h-10 text-black mb-3 mx-auto md:mx-0" />
          <h3 className="font-semibold text-lg mb-2">Rapid Approvals</h3>
          <p className="text-sm text-black">Reduce approval times from days to minutes</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-6 rounded-xl hover:scale-105 transition-transform duration-200">
          <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-black mb-3 mx-auto md:mx-0" />
          <h3 className="font-semibold text-lg mb-2">Increased Conversions</h3>
          <p className="text-sm text-black">Engage customers 24/7 and guide them to approval</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-6 rounded-xl hover:scale-105 transition-transform duration-200">
          <Shield className="w-8 h-8 md:w-10 md:h-10 text-black mb-3 mx-auto md:mx-0" />
          <h3 className="font-semibold text-lg mb-2">Smarter Risk Analysis</h3>
          <p className="text-sm text-black">Leverage deeper data insights for better underwriting</p>
        </div>
      </div>
    </div>
  );

  // AI Chatbot Demo - Mobile Optimized
  const ChatbotSlide = () => {
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
      if (!inputValue.trim()) return;
      
      setChatMessages([...chatMessages, 
        { type: 'user', text: inputValue },
        { type: 'bot', text: 'I can help you with that! Based on your needs, I recommend our 60-month financing program with rates starting at 5.9%. Would you like to start a pre-qualification?' }
      ]);
      setInputValue('');
    };

    useEffect(() => {
      if (currentSlide === 1 && chatMessages.length === 0) {
        setChatMessages([
          { type: 'bot', text: 'Hello! I\'m Vista AI. How can I help you finance your equipment today?' }
        ]);
      }
    }, [currentSlide]);

    return (
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <Bot className="w-10 h-10 md:w-12 md:h-12 text-black mb-4 mx-auto lg:mx-0" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">24/7 AI Assistant</h2>
            <p className="text-black mb-6 text-center lg:text-left">Instant responses to customer inquiries with intelligent financing recommendations</p>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-center lg:justify-start">
              <CheckCircle className="w-5 h-5 text-black mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base">Handles 80% of inquiries automatically</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <CheckCircle className="w-5 h-5 text-black mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base">Pre-qualification in under 2 minutes</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <CheckCircle className="w-5 h-5 text-black mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base">Seamless handoff to human agents</span>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-xl h-full max-h-96 lg:max-h-full flex flex-col">
            <div className="bg-blue-600 text-white p-3 md:p-4 rounded-t-xl">
              <h3 className="font-semibold text-sm md:text-base">Vista Finance Assistant</h3>
            </div>
            
            <div className="flex-1 p-3 md:p-4 overflow-y-auto min-h-0">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`mb-3 md:mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 md:p-3 rounded-lg max-w-xs text-sm ${
                    msg.type === 'user' ? 'bg-blue-100 text-black' : 'bg-gray-100 text-black'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 md:p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about financing options..."
                  className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors touch-manipulation"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button 
                  onClick={() => setInputValue("What are your rates?")}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  &quot;What are your rates?&quot;
                </button>
                <button 
                  onClick={() => setInputValue("I need a forklift")}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  &quot;I need a forklift&quot;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Credit Pre-Approval Demo - Mobile Optimized
  const CreditSlide = () => {
    const [formData, setFormData] = useState({
      revenue: '',
      timeInBusiness: '',
      loanAmount: ''
    });

    const handleApproval = () => {
      setIsProcessing(true);
      setTimeout(() => {
        setCreditScore(Math.floor(Math.random() * 200) + 600);
        setIsProcessing(false);
      }, 2000);
    };

    return (
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-black mb-4 mx-auto lg:mx-0" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">Instant AI Credit Decisions</h2>
            <p className="text-black mb-6 text-center lg:text-left">Advanced ML models analyze 100+ data points for instant approvals</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 md:p-6 rounded-xl">
            <h3 className="font-semibold mb-3 text-center lg:text-left">AI Decision Engine Features:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-center lg:justify-start">
                <Brain className="w-4 h-4 text-black mr-2 flex-shrink-0" />
                Alternative data scoring (bank data, cash flow)
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <Brain className="w-4 h-4 text-black mr-2 flex-shrink-0" />
                Real-time risk assessment
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <Brain className="w-4 h-4 text-black mr-2 flex-shrink-0" />
                Dynamic rate optimization
              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-6 text-center">Quick Pre-Qualification</h3>
            
            {!creditScore ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Annual Revenue</label>
                  <input
                    type="text"
                    placeholder="$500,000"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                    value={formData.revenue}
                    onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Years in Business</label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base">
                    <option>Less than 1 year</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Amount Needed</label>
                  <input
                    type="text"
                    placeholder="$100,000"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                  />
                </div>
                
                <button
                  onClick={handleApproval}
                  disabled={isProcessing}
                  className="w-full py-3 md:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400 flex items-center justify-center text-base font-medium transition-all duration-200 transform active:scale-95 touch-manipulation"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      AI Analyzing...
                    </>
                  ) : (
                    'Get Instant Decision'
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-black mx-auto mb-4" />
                  <h4 className="text-xl md:text-2xl font-bold text-black">Pre-Approved!</h4>
                </div>
                
                <div className="bg-green-50 p-4 md:p-6 rounded-lg mb-4">
                  <p className="text-sm text-black mb-2">Credit Score</p>
                  <p className="text-2xl md:text-3xl font-bold text-black">{creditScore}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <p className="text-sm text-black">Rate</p>
                    <p className="text-lg md:text-xl font-semibold">5.9% - 7.9%</p>
                  </div>
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <p className="text-sm text-black">Max Term</p>
                    <p className="text-lg md:text-xl font-semibold">72 months</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setCreditScore(null)}
                  className="text-black hover:text-black transition-colors"
                >
                  Run Another Scenario
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Analytics Dashboard Demo - Mobile Optimized
  const AnalyticsSlide = () => {
    return (
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <BarChart3 className="w-10 h-10 md:w-12 md:h-12 text-black mb-4 mx-auto lg:mx-0" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">Predictive Analytics Dashboard</h2>
            <p className="text-black mb-6 text-center lg:text-left">AI-driven insights for smarter business decisions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-black mb-2 mx-auto lg:mx-0" />
              <h4 className="font-semibold text-center lg:text-left">Lead Scoring</h4>
              <p className="text-sm text-black text-center lg:text-left">Prioritize high-value opportunities</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-black mb-2 mx-auto lg:mx-0" />
              <h4 className="font-semibold text-center lg:text-left">Churn Prediction</h4>
              <p className="text-sm text-black text-center lg:text-left">Retain customers proactively</p>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">Real-time Business Intelligence</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 md:p-4 rounded-lg">
                <p className="text-sm text-black mb-1">Approval Rate</p>
                <p className="text-xl md:text-2xl font-bold text-black">78%</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 rounded-lg">
                <p className="text-sm text-black mb-1">Avg Deal Size</p>
                <p className="text-xl md:text-2xl font-bold text-black">$125K</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">High-Value Lead Alert</span>
                  <span className="text-xs bg-green-100 text-black px-2 py-1 rounded">Score: 92</span>
                </div>
                <p className="text-sm text-black">Construction Corp - $500K excavator inquiry</p>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Churn Risk Alert</span>
                  <span className="text-xs bg-red-100 text-black px-2 py-1 rounded">High Risk</span>
                </div>
                <p className="text-sm text-black">ABC Logistics - No activity in 45 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Document Processing Demo - Mobile Optimized
  const DocumentSlide = () => {
    const [uploadStatus, setUploadStatus] = useState('idle');

    const handleUpload = () => {
      setUploadStatus('processing');
      setTimeout(() => {
        setUploadStatus('complete');
      }, 3000);
    };

    return (
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <FileText className="w-10 h-10 md:w-12 md:h-12 text-black mb-4 mx-auto lg:mx-0" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">Smart Document Processing</h2>
            <p className="text-black mb-6 text-center lg:text-left">AI extracts and validates data from any document type</p>
          </div>
          
          <div className="bg-indigo-50 p-4 md:p-6 rounded-lg">
            <h4 className="font-semibold mb-3 text-center lg:text-left">Automated Processing:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 text-black mr-2 flex-shrink-0" />
                Bank statements → Cash flow analysis
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 text-black mr-2 flex-shrink-0" />
                Tax returns → Income verification
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 text-black mr-2 flex-shrink-0" />
                Equipment invoices → Pricing validation
              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-6 text-center">Document Upload & Analysis</h3>
            
            {uploadStatus === 'idle' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center">
                <FileText className="w-10 h-10 md:w-12 md:h-12 text-black mx-auto mb-4" />
                <p className="text-black mb-4 text-sm md:text-base">Drop files here or click to upload</p>
                <button
                  onClick={handleUpload}
                  className="px-4 md:px-6 py-2 md:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm md:text-base transition-colors"
                >
                  Select Documents
                </button>
                <p className="text-xs text-black mt-3">Supports PDF, JPG, PNG</p>
              </div>
            )}
            
            {uploadStatus === 'processing' && (
              <div className="text-center py-6 md:py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-indigo-100 rounded-full mb-4 animate-pulse">
                  <Brain className="w-6 h-6 md:w-8 md:h-8 text-black" />
                </div>
                <h4 className="text-lg font-semibold mb-2">AI Processing Documents...</h4>
                <p className="text-sm text-black mb-4">Extracting and validating data</p>
                <div className="w-48 md:w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            )}
            
            {uploadStatus === 'complete' && (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-black mr-2" />
                    <span className="font-semibold text-sm md:text-base">Processing Complete!</span>
                  </div>
                  <p className="text-sm text-black">3 documents analyzed in 2.4 seconds</p>
                </div>
                
                <div className="space-y-3">
                  <div className="border rounded p-3">
                    <h5 className="font-medium mb-1 text-sm">Bank_Statement_Dec.pdf</h5>
                    <p className="text-sm text-black">Average monthly revenue: $48,500</p>
                  </div>
                  <div className="border rounded p-3">
                    <h5 className="font-medium mb-1 text-sm">Tax_Return_2023.pdf</h5>
                    <p className="text-sm text-black">Verified income: $582,000</p>
                  </div>
                  <div className="border rounded p-3">
                    <h5 className="font-medium mb-1 text-sm">Equipment_Invoice.pdf</h5>
                    <p className="text-sm text-black">CAT 320 Excavator - $125,000</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setUploadStatus('idle')}
                  className="mt-4 text-black hover:text-black text-sm transition-colors"
                >
                  Upload More Documents
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Implementation Roadmap - Mobile Optimized
  const RoadmapSlide = () => {
    const roadmapData = [
      { feature: 'AI Customer Assistant', start: 0, duration: 2, color: 'bg-blue-500' },
      { feature: 'Smart Document Processing', start: 1, duration: 3, color: 'bg-indigo-500' },
      { feature: 'Instant Credit Pre-Approval', start: 2, duration: 4, color: 'bg-green-500' },
      { feature: 'Intelligent Equipment Search', start: 4, duration: 3, color: 'bg-purple-500' },
      { feature: 'Predictive Analytics', start: 5, duration: 3, color: 'bg-orange-500' },
    ];
    const totalMonths = 9;

    return (
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-1/3 p-4 md:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <GanttChart className="w-10 h-10 md:w-12 md:h-12 text-black mb-4 mx-auto lg:mx-0" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">Implementation Roadmap</h2>
            <p className="text-black mb-6 text-center lg:text-left">A phased approach to building your AI-powered platform over ~9 months.</p>
          </div>
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
             <h4 className="font-semibold mb-3 text-center lg:text-left">Development Phases:</h4>
             <ul className="space-y-2 text-sm">
               <li>Phase 1: Chatbot & Document AI (Months 1-4)</li>
               <li>Phase 2: Credit & Search AI (Months 3-7)</li>
               <li>Phase 3: Analytics & Optimization (Months 6-9)</li>
             </ul>
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-4 md:p-8 flex flex-col justify-center">
          <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 overflow-x-auto">
            <div className="min-w-96">
              {/* Header */}
              <div className="grid grid-cols-9 text-center text-xs md:text-sm font-semibold mb-2">
                {Array.from({ length: totalMonths }).map((_, i) => (
                  <div key={i}>Month {i + 1}</div>
                ))}
              </div>
              {/* Grid lines */}
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 grid grid-cols-9 h-full">
                  {Array.from({ length: totalMonths }).map((_, i) => (
                    <div key={i} className="border-r border-gray-200"></div>
                  ))}
                </div>
                
                <div className="space-y-2 md:space-y-3 relative">
                  {roadmapData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 md:w-48 text-xs md:text-sm font-medium pr-2 text-right truncate">{item.feature}</div>
                      <div className="flex-1 h-6 md:h-8">
                        <div
                          className={`${item.color} h-full rounded opacity-80 flex items-center justify-center text-white text-xs font-bold`}
                          style={{
                            marginLeft: `${(item.start / totalMonths) * 100}%`,
                            width: `${(item.duration / totalMonths) * 100}%`,
                          }}
                        >
                          {item.duration} mo
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cost Summary Slide - Mobile Optimized
  const CostSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
      <h2 className="text-2xl md:text-4xl font-bold mb-4">Lean & Scalable Cloud Costs</h2>
      <p className="text-black mb-8 max-w-3xl text-sm md:text-base">By leveraging a modern serverless architecture on AWS, we can keep monthly costs exceptionally low, especially at your current scale. You only pay for what you actually use.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl w-full mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border">
          <div className="flex items-center justify-center mb-4">
            <div className="h-8 md:h-10 flex items-center">
              <span className="text-lg md:text-xl font-bold mr-1">Vercel</span>
              <span className="text-xl md:text-2xl font-bold">+</span>
              <span className="text-lg md:text-xl font-bold ml-1">AWS</span>
            </div>
          </div>
          <h3 className="text-lg md:text-xl font-bold mb-2">Frontend & Hosting</h3>
          <p className="text-2xl md:text-3xl font-bold text-black">$20<span className="text-lg md:text-xl">/mo</span></p>
          <p className="text-black text-sm">Vercel Pro Plan</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border">
          <Zap className="w-10 h-10 md:w-12 md:h-12 text-black mx-auto mb-4" />
          <h3 className="text-lg md:text-xl font-bold mb-2">Backend & Database</h3>
          <p className="text-2xl md:text-3xl font-bold text-black">$0<span className="text-lg md:text-xl">/mo</span></p>
          <p className="text-black text-sm">AWS Free Tier (Lambda, DynamoDB)</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border">
          <Brain className="w-10 h-10 md:w-12 md:h-12 text-black mx-auto mb-4" />
          <h3 className="text-lg md:text-xl font-bold mb-2">AI Service APIs</h3>
          <p className="text-2xl md:text-3xl font-bold text-black">$5-15<span className="text-lg md:text-xl">/mo</span></p>
          <p className="text-black text-sm">AWS Bedrock & Textract (Usage-Based)</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 md:p-8 rounded-xl max-w-3xl">
        <h3 className="text-xl md:text-2xl font-bold mb-4">Total Estimated Cost: ~$25 - $35 / month</h3>
        <p className="mb-6 text-sm md:text-base">This architecture is built for extreme efficiency. The costs will only grow as your user base and revenue grow, ensuring your operational expenses are always aligned with your success.</p>
        <button className="px-6 md:px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base">
          View Detailed Architecture
        </button>
      </div>
    </div>
  );

  // Future Opportunities Slide - Mobile Optimized
  const FutureOpportunitiesSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
      <h2 className="text-2xl md:text-4xl font-bold mb-6">Future AI Opportunities</h2>
      <p className="text-black mb-8 md:mb-10 max-w-3xl text-sm md:text-base">Beyond the initial roadmap, AI can further enhance operations for your internal teams and leadership.</p>
      
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 max-w-5xl w-full">
        {/* Agent Co-pilot */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-xl p-6 md:p-8 transform hover:scale-105 transition-transform">
          <Users className="w-10 h-10 md:w-12 md:h-12 text-black mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-bold mb-3">Agent Co-Pilot</h3>
          <p className="text-black mb-6 text-sm md:text-base">Empower your human agents with real-time AI assistance to close deals faster and improve service quality.</p>
          <ul className="text-left space-y-3 text-black text-sm md:text-base">
             <li className="flex"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-black mr-3 flex-shrink-0 mt-0.5" /><span>Real-time call transcription & summarization.</span></li>
             <li className="flex"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-black mr-3 flex-shrink-0 mt-0.5" /><span>Suggests best responses and product info.</span></li>
             <li className="flex"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-black mr-3 flex-shrink-0 mt-0.5" /><span>Automates data entry into your CRM.</span></li>
          </ul>
        </div>
        
        {/* Executive Dashboard */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-xl p-6 md:p-8 transform hover:scale-105 transition-transform">
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-black mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-bold mb-3">CEO Oversight AI</h3>
          <p className="text-black mb-6 text-sm md:text-base">Gain effortless, high-level oversight of the entire business with an AI that surfaces critical insights and trends.</p>
           <ul className="text-left space-y-3 text-black text-sm md:text-base">
             <li className="flex"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-black mr-3 flex-shrink-0 mt-0.5" /><span>Daily business summary delivered to your inbox.</span></li>
             <li className="flex"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-black mr-3 flex-shrink-0 mt-0.5" /><span>Proactively alerts on portfolio risks or opportunities.</span></li>
             <li className="flex"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-black mr-3 flex-shrink-0 mt-0.5" /><span>Answers natural language questions about business data.</span></li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: return <IntroSlide />;
      case 1: return <ChatbotSlide />;
      case 2: return <CreditSlide />;
      case 3: return <SearchSlideComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
      case 4: return <AnalyticsSlide />;
      case 5: return <DocumentSlide />;
      case 6: return <RoadmapSlide />;
      case 7: return <CostSlide />;
      case 8: return <FutureOpportunitiesSlide />;
      default: return null;
    }
  };

  return (
    <div 
      className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mobile Header */}
      <div className="bg-white shadow-sm px-4 py-3 md:px-8 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden mr-3 p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-black">Vista Pacific Capital</h1>
            <span className="hidden md:inline ml-4 text-sm text-black">AI Transformation Roadmap</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-sm text-black">
              {currentSlide + 1}/{slides.length}
            </span>
          </div>
        </div>
        
                 {/* Mobile Menu */}
         {showMobileMenu && (
           <div className="md:hidden mt-3 bg-gray-50 rounded-lg p-3 transform transition-all duration-200 ease-out">
             <div className="grid grid-cols-3 gap-2">
               {slides.map((slide, idx) => (
                 <button
                   key={idx}
                   onClick={() => {
                     setCurrentSlide(idx);
                     setShowMobileMenu(false);
                   }}
                   className={`p-2 text-xs rounded transition-all duration-200 active:scale-95 ${
                     idx === currentSlide 
                       ? 'bg-blue-600 text-white shadow-md' 
                       : 'bg-white text-black hover:bg-gray-100 active:bg-gray-200'
                   }`}
                 >
                   {slide.title}
                 </button>
               ))}
             </div>
           </div>
         )}
      </div>

              {/* Content */}
        <div className="flex-1 overflow-hidden">
          {transitions((style) => (
            <animated.div
              style={style}
              className="h-full w-full flex items-center justify-center"
            >
              {renderSlide()}
            </animated.div>
          ))}
        </div>

      {/* Mobile-Optimized Navigation */}
      <div className="bg-white shadow-lg px-4 py-3 md:px-8 md:py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center px-3 py-2 md:px-4 text-black hover:text-black disabled:text-gray-500 transition-colors touch-manipulation"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1" />
            <span className="hidden md:inline">Previous</span>
          </button>
          
          <div className="flex space-x-1 md:space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors touch-manipulation ${
                  idx === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center px-3 py-2 md:px-4 text-black hover:text-black disabled:text-gray-500 transition-colors touch-manipulation"
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VistaAIPresentation; 