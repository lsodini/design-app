import { lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/landingPage/Loader';
import './App.css';

const LandingPage = lazy(() => import('./components/landingPage/LandingPage.jsx'));
const Brutalism = lazy(() => import('./components/Brutalism'));
const Minimalism = lazy(() => import('./components/Minimalism'));
const Futurism = lazy(() => import('./components/Futurism'));
const Bauhaus = lazy(() => import('./components/Bauhaus'));
const ArtDeco = lazy(() => import('./components/ArtDeco'));
const Memphis = lazy(() => import('./components/Memphis'));
const ArtNouveau = lazy(() => import('./components/ArtNouveau'));
const Constructivism = lazy(() => import('./components/Constructivism'));
const DeStijl = lazy(() => import('./components/DeStijl'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/landingPage/NotFound'));

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

const seoData = {
  '/': { title: 'Design Portfolio — Explore Design Movements', description: 'Design portfolio exploring 9 iconic design movements from Brutalism to De Stijl.' },
  '/brutalism': { title: 'Brutalism — Design Portfolio', description: 'Explore the Brutalist design movement: raw, unpolished, and bold aesthetic.' },
  '/minimalism': { title: 'Minimalism — Design Portfolio', description: 'Explore Minimalism: clean layouts, limited palette, and visual clarity.' },
  '/futurism': { title: 'Futurism — Design Portfolio', description: 'Explore Futurism: bold geometric shapes, neon colors, and interactive elements.' },
  '/bauhaus': { title: 'Bauhaus — Design Portfolio', description: 'Explore Bauhaus: geometric purity, primary colors, and functional design.' },
  '/art-deco': { title: 'Art Deco — Design Portfolio', description: 'Explore Art Deco: luxurious ornamentation, gold accents, and geometric elegance.' },
  '/memphis': { title: 'Memphis — Design Portfolio', description: 'Explore Memphis: playful pop colors, scattered shapes, and postmodern irony.' },
  '/art-nouveau': { title: 'Art Nouveau — Design Portfolio', description: 'Explore Art Nouveau: organic flowing lines, floral motifs, and natural elegance.' },
  '/constructivism': { title: 'Constructivism — Design Portfolio', description: 'Explore Constructivism: industrial forms, bold angles, and revolutionary composition.' },
  '/de-stijl': { title: 'De Stijl — Design Portfolio', description: 'Explore De Stijl: primary colors, horizontal-vertical grid, and asymmetric balance.' },
  '/about': { title: 'About — Design Portfolio', description: 'Learn about the designer and their approach to design.' },
  '/contact': { title: 'Contact — Design Portfolio', description: 'Get in touch with the designer.' },
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function SeoHelmet() {
  const { pathname } = useLocation();
  const seo = seoData[pathname] || seoData['/'];
  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <LandingPage />
              </motion.div>
            }
          />
          <Route
            path="/brutalism"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <Brutalism />
              </motion.div>
            }
          />
          <Route
            path="/minimalism"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <Minimalism />
              </motion.div>
            }
          />
          <Route
            path="/futurism"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <Futurism />
              </motion.div>
            }
          />
          <Route
            path="/bauhaus"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <Bauhaus />
              </motion.div>
            }
          />
          <Route
            path="/art-deco"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <ArtDeco />
              </motion.div>
            }
          />
          <Route
            path="/memphis"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <Memphis />
              </motion.div>
            }
          />
          <Route
            path="/art-nouveau"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <ArtNouveau />
              </motion.div>
            }
          />
          <Route
            path="/constructivism"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <Constructivism />
              </motion.div>
            }
          />
          <Route
            path="/de-stijl"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <DeStijl />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <About />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <Contact />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="layout bg-black w-100">
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <SeoHelmet />
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </Router>
      </HelmetProvider>
    </div>
  );
}
