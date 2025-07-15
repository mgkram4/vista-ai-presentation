'use client';

import { BarChart3, Bot, Brain, CheckCircle, ChevronLeft, ChevronRight, Clock, FileText, GanttChart, Search, Shield, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const VistaAIPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{type: string, text: string}>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  // Intro Slide
  const IntroSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <Brain className="w-16 h-16 text-blue-600 mr-4" />
          <h1 className="text-5xl font-bold text-gray-900">Vista Pacific AI</h1>
        </div>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Transform your equipment financing business with cutting-edge AI automation
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
          <Zap className="w-10 h-10 text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg mb-2">60% Faster</h3>
          <p className="text-sm text-gray-600">Approval times</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
          <TrendingUp className="w-10 h-10 text-green-600 mb-3" />
          <h3 className="font-semibold text-lg mb-2">35% Higher</h3>
          <p className="text-sm text-gray-600">Conversion rates</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
          <Shield className="w-10 h-10 text-purple-600 mb-3" />
          <h3 className="font-semibold text-lg mb-2">20% Lower</h3>
          <p className="text-sm text-gray-600">Default rates</p>
        </div>
      </div>
    </div>
  );

  // AI Chatbot Demo
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
      <div className="flex h-full">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6">
            <Bot className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4">24/7 AI Assistant</h2>
            <p className="text-gray-600 mb-6">Instant responses to customer inquiries with intelligent financing recommendations</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>Handles 80% of inquiries automatically</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>Pre-qualification in under 2 minutes</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>Seamless handoff to human agents</span>
            </div>
          </div>
        </div>
        
        <div className="w-1/2 p-8">
          <div className="bg-white rounded-xl shadow-xl h-full flex flex-col">
            <div className="bg-blue-600 text-white p-4 rounded-t-xl">
              <h3 className="font-semibold">Vista Finance Assistant</h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-xs ${
                    msg.type === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about financing options..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
              <div className="mt-2 flex space-x-2">
                <button className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                  &quot;What are your rates?&quot;
                </button>
                <button className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                  &quot;I need a forklift&quot;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Credit Pre-Approval Demo
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
      <div className="flex h-full">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6">
            <Sparkles className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Instant AI Credit Decisions</h2>
            <p className="text-gray-600 mb-6">Advanced ML models analyze 100+ data points for instant approvals</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold mb-3">AI Decision Engine Features:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Brain className="w-4 h-4 text-green-600 mr-2" />
                Alternative data scoring (bank data, cash flow)
              </li>
              <li className="flex items-center">
                <Brain className="w-4 h-4 text-green-600 mr-2" />
                Real-time risk assessment
              </li>
              <li className="flex items-center">
                <Brain className="w-4 h-4 text-green-600 mr-2" />
                Dynamic rate optimization
              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-1/2 p-8">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Quick Pre-Qualification</h3>
            
            {!creditScore ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Annual Revenue</label>
                  <input
                    type="text"
                    placeholder="$500,000"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.revenue}
                    onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Years in Business</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                  />
                </div>
                
                <button
                  onClick={handleApproval}
                  disabled={isProcessing}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center"
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
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-green-600">Pre-Approved!</h4>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2">Credit Score</p>
                  <p className="text-3xl font-bold text-green-600">{creditScore}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Rate</p>
                    <p className="text-xl font-semibold">5.9% - 7.9%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Max Term</p>
                    <p className="text-xl font-semibold">72 months</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setCreditScore(null)}
                  className="text-blue-600 hover:text-blue-700"
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

  // Intelligent Search Demo
  const SearchSlide = () => {
    const [searchResults, setSearchResults] = useState<Array<{name: string, price: string, match: string, image: string}>>([]);

    const equipment = [
      { name: 'CAT 320 Excavator', price: '$125,000', match: '95%', image: '🚜' },
      { name: 'Komatsu PC200', price: '$118,000', match: '92%', image: '🏗️' },
      { name: 'JCB 3CX Backhoe', price: '$95,000', match: '88%', image: '⚙️' }
    ];

    const handleSearch = () => {
      if (searchQuery) {
        setSearchResults(equipment);
      }
    };

    return (
      <div className="flex h-full">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6">
            <Search className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4">AI-Powered Equipment Search</h2>
            <p className="text-gray-600 mb-6">Natural language search with intelligent matching and recommendations</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Smart Search Features:</h4>
              <ul className="text-sm space-y-1">
                <li>• Understands natural language queries</li>
                <li>• Suggests alternatives based on needs</li>
                <li>• Compares prices across vendors</li>
                <li>• Shows financing options inline</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="w-1/2 p-8">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Try: 'I need an excavator for residential construction'"
                  className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full cursor-pointer"
                      onClick={() => setSearchQuery('excavator under $150k')}>
                  excavator under $150k
                </span>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full cursor-pointer"
                      onClick={() => setSearchQuery('forklift for warehouse')}>
                  forklift for warehouse
                </span>
              </div>
            </div>
            
            {searchResults.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">AI found {searchResults.length} matches:</p>
                {searchResults.map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-4 hover:border-purple-400 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-3xl mr-4">{item.image}</span>
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-purple-600 font-semibold">{item.match} match</span>
                        <p className="text-xs text-gray-500">From $1,850/mo</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Analytics Dashboard Demo
  const AnalyticsSlide = () => {
    return (
      <div className="flex h-full">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6">
            <BarChart3 className="w-12 h-12 text-orange-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Predictive Analytics Dashboard</h2>
            <p className="text-gray-600 mb-6">AI-driven insights for smarter business decisions</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
              <h4 className="font-semibold">Lead Scoring</h4>
              <p className="text-sm text-gray-600">Prioritize high-value opportunities</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <h4 className="font-semibold">Churn Prediction</h4>
              <p className="text-sm text-gray-600">Retain customers proactively</p>
            </div>
          </div>
        </div>
        
        <div className="w-1/2 p-8">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Real-time Business Intelligence</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Approval Rate</p>
                <p className="text-2xl font-bold text-green-600">78%</p>
                <p className="text-xs text-green-600">↑ 12% vs last month</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Avg Deal Size</p>
                <p className="text-2xl font-bold text-blue-600">$125K</p>
                <p className="text-xs text-blue-600">↑ 8% vs last month</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">High-Value Lead Alert</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Score: 92</span>
                </div>
                <p className="text-sm text-gray-600">Construction Corp - $500K excavator inquiry</p>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Churn Risk Alert</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">High Risk</span>
                </div>
                <p className="text-sm text-gray-600">ABC Logistics - No activity in 45 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Document Processing Demo
  const DocumentSlide = () => {
    const [uploadStatus, setUploadStatus] = useState('idle');

    const handleUpload = () => {
      setUploadStatus('processing');
      setTimeout(() => {
        setUploadStatus('complete');
      }, 3000);
    };

    return (
      <div className="flex h-full">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6">
            <FileText className="w-12 h-12 text-indigo-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Smart Document Processing</h2>
            <p className="text-gray-600 mb-6">AI extracts and validates data from any document type</p>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Automated Processing:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                Bank statements → Cash flow analysis
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                Tax returns → Income verification
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                Equipment invoices → Pricing validation
              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-1/2 p-8">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Document Upload & Analysis</h3>
            
            {uploadStatus === 'idle' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Drop files here or click to upload</p>
                <button
                  onClick={handleUpload}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Select Documents
                </button>
                <p className="text-xs text-gray-500 mt-3">Supports PDF, JPG, PNG</p>
              </div>
            )}
            
            {uploadStatus === 'processing' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4 animate-pulse">
                  <Brain className="w-8 h-8 text-indigo-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">AI Processing Documents...</h4>
                <p className="text-sm text-gray-600 mb-4">Extracting and validating data</p>
                <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            )}
            
            {uploadStatus === 'complete' && (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-semibold">Processing Complete!</span>
                  </div>
                  <p className="text-sm text-gray-600">3 documents analyzed in 2.4 seconds</p>
                </div>
                
                <div className="space-y-3">
                  <div className="border rounded p-3">
                    <h5 className="font-medium mb-1">Bank_Statement_Dec.pdf</h5>
                    <p className="text-sm text-gray-600">Average monthly revenue: $48,500</p>
                  </div>
                  <div className="border rounded p-3">
                    <h5 className="font-medium mb-1">Tax_Return_2023.pdf</h5>
                    <p className="text-sm text-gray-600">Verified income: $582,000</p>
                  </div>
                  <div className="border rounded p-3">
                    <h5 className="font-medium mb-1">Equipment_Invoice.pdf</h5>
                    <p className="text-sm text-gray-600">CAT 320 Excavator - $125,000</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setUploadStatus('idle')}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm"
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

  // Implementation Roadmap
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
      <div className="flex h-full">
        <div className="w-1/3 p-8 flex flex-col justify-center">
          <div className="mb-6">
            <GanttChart className="w-12 h-12 text-gray-700 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Implementation Roadmap</h2>
            <p className="text-gray-600 mb-6">A phased approach to building your AI-powered platform over ~9 months.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
             <h4 className="font-semibold mb-3">Development Phases:</h4>
             <ul className="space-y-2 text-sm">
               <li>Phase 1: Chatbot & Document AI (Months 1-4)</li>
               <li>Phase 2: Credit & Search AI (Months 3-7)</li>
               <li>Phase 3: Analytics & Optimization (Months 6-9)</li>
             </ul>
          </div>
        </div>
        <div className="w-2/3 p-8 flex flex-col justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="relative">
              {/* Header */}
              <div className="grid grid-cols-9 text-center text-sm font-semibold mb-2">
                {Array.from({ length: totalMonths }).map((_, i) => (
                  <div key={i}>Month {i + 1}</div>
                ))}
              </div>
              {/* Grid lines */}
              <div className="absolute top-8 left-0 right-0 grid grid-cols-9 h-full">
                {Array.from({ length: totalMonths }).map((_, i) => (
                  <div key={i} className="border-r border-gray-200"></div>
                ))}
              </div>
              
              <div className="space-y-3 relative">
                {roadmapData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-48 text-sm font-medium pr-2 text-right">{item.feature}</div>
                    <div className="flex-1 h-8">
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
    );
  };


  // Cost Summary Slide
  const CostSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <h2 className="text-4xl font-bold mb-4">Estimated Monthly Cloud Costs</h2>
      <p className="text-gray-600 mb-8 max-w-2xl">Based on current scale (~20 users/day), costs are minimal and scale with usage. Designed for cost-efficiency.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <Bot className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Chatbot & Search</h3>
          <p className="text-3xl font-bold text-blue-600">$50-100</p>
          <p className="text-gray-600">per month</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <Brain className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Credit & Doc AI</h3>
           <p className="text-3xl font-bold text-green-600">$100-250</p>
          <p className="text-gray-600">per month</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <BarChart3 className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Analytics & Infra</h3>
          <p className="text-3xl font-bold text-orange-600">$75-150</p>
          <p className="text-gray-600">per month</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-8 rounded-xl max-w-3xl">
        <h3 className="text-2xl font-bold mb-4">Total Estimated Cost: ~$225 - $500 / month</h3>
        <p className="mb-6">Our architecture leverages serverless and auto-scaling to ensure you only pay for what you use, from 20 users to 20,000.</p>
        <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Request Detailed Cost Breakdown
        </button>
      </div>
    </div>
  );

  // Future Opportunities Slide
  const FutureOpportunitiesSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <h2 className="text-4xl font-bold mb-6">Future AI Opportunities</h2>
      <p className="text-gray-600 mb-10 max-w-3xl">Beyond the initial roadmap, AI can further enhance operations for your internal teams and leadership.</p>
      
      <div className="flex gap-8 max-w-5xl w-full">
        {/* Agent Co-pilot */}
        <div className="w-1/2 bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-transform">
          <Users className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Agent Co-Pilot</h3>
          <p className="text-gray-600 mb-6">Empower your human agents with real-time AI assistance to close deals faster and improve service quality.</p>
          <ul className="text-left space-y-3 text-gray-700">
             <li className="flex"><CheckCircle className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" /><span>Real-time call transcription & summarization.</span></li>
             <li className="flex"><CheckCircle className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" /><span>Suggests best responses and product info.</span></li>
             <li className="flex"><CheckCircle className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" /><span>Automates data entry into your CRM.</span></li>
          </ul>
        </div>
        
        {/* Executive Dashboard */}
        <div className="w-1/2 bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-transform">
          <Sparkles className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">CEO Oversight AI</h3>
          <p className="text-gray-600 mb-6">Gain effortless, high-level oversight of the entire business with an AI that surfaces critical insights and trends.</p>
           <ul className="text-left space-y-3 text-gray-700">
             <li className="flex"><CheckCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" /><span>Daily business summary delivered to your inbox.</span></li>
             <li className="flex"><CheckCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" /><span>Proactively alerts on portfolio risks or opportunities.</span></li>
             <li className="flex"><CheckCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" /><span>Answers natural language questions about business data.</span></li>
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
      case 3: return <SearchSlide />;
      case 4: return <AnalyticsSlide />;
      case 5: return <DocumentSlide />;
      case 6: return <RoadmapSlide />;
      case 7: return <CostSlide />;
      case 8: return <FutureOpportunitiesSlide />;
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Vista Pacific Capital</h1>
            <span className="ml-4 text-sm text-gray-500">AI Transformation Roadmap</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {renderSlide()}
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-lg px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>
          
          <div className="flex space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 transition-colors"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VistaAIPresentation; 