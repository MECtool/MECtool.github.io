import React from 'react';
import { useAtom } from 'jotai';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import DrugInputForm from './components/DrugInputForm';
import ResultsVisualization from './components/ResultsVisualization';
import { themeAtom, resultsAtom } from './state/atoms';
import { useAtomValue } from 'jotai';
import './styles/theme.scss'; // We will create this next

const App = () => {
    const [theme, setTheme] = useAtom(themeAtom);
    const results = useAtomValue(resultsAtom);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={`app-wrapper min-vh-100 d-flex flex-column ${theme === 'dark' ? 'dark-mode' : 'bg-light'}`}>
            <Navbar className="bg-white shadow-sm py-3 mb-4">
                <Container>
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                            size="sm"
                            onClick={toggleTheme}
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '32px', height: '32px' }}
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </Button>
                        <Navbar.Brand className="fw-bold text-dark fs-4 letter-spacing-1 m-0">
                            MEC<span className="text-primary">tool</span>
                        </Navbar.Brand>
                    </div>
                </Container>
            </Navbar>

            <Container className="flex-grow-1 mb-5">
                <Row className="g-4">
                    <Col lg={7} xl={8}>
                        <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                            <h2 className="mb-4 fw-bold text-dark">Calculator</h2>
                            <DrugInputForm />
                        </div>
                    </Col>
                    <Col lg={5} xl={4}>
                        <div className="sticky-top" style={{ top: '2rem', zIndex: 100 }}>
                            <ResultsVisualization />
                        </div>
                    </Col>
                </Row>
            </Container>

            <footer className="mt-auto py-4 bg-white border-top d-none d-lg-block">
                <Container className="text-center text-muted small">
                    <p className="mb-2">
                        <strong>Disclaimer:</strong> The information provided by the Morphine Equivalence Calculator is for general informational purposes only.
                    </p>
                    <div className="d-flex justify-content-center gap-3 opacity-75">
                        <a href="#" className="text-decoration-none text-muted">Privacy Policy</a>
                        <span>&bull;</span>
                        <a href="#" className="text-decoration-none text-muted">Terms of Use</a>
                        <span>&bull;</span>
                        <a href="mailto:MECConversion@gmail.com" className="text-decoration-none text-muted">Contact</a>
                    </div>
                </Container>
            </footer>

            {/* Sticky Mobile Footer */}
            <div className="d-lg-none fixed-bottom bg-white border-top shadow-lg p-3 sticky-footer">
                <Container className="d-flex justify-content-between align-items-center">
                    <div>
                        <span className="text-secondary small text-uppercase fw-bold letter-spacing-1 d-block">Total MEQ</span>
                        <span className="text-muted small">mg / day</span>
                    </div>
                    <div className="text-end">
                        <span className="display-6 fw-bold text-primary">{results.total}</span>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default App;
