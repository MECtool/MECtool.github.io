import React from 'react';
import { useAtomValue } from 'jotai';
import { resultsAtom } from '../state/atoms';
import { Card, ListGroup, Badge } from 'react-bootstrap';

const ResultItem = React.memo(({ label, value, isTotal = false }) => (
    <ListGroup.Item
        className={`d-flex justify-content-between align-items-center border-0 px-0 ${isTotal ? 'py-3' : 'py-2'}`}
        style={{ backgroundColor: 'transparent' }}
    >
        <span className={isTotal ? "fw-bold fs-5 text-dark" : "text-secondary"}>
            {label}
        </span>
        <span className={isTotal ? "fw-bold fs-4 text-primary" : "fw-medium text-dark"}>
            {value} mg
        </span>
    </ListGroup.Item>
));

const ResultsVisualization = () => {
    const results = useAtomValue(resultsAtom);

    return (
        <Card className="border-0 shadow-lg rounded-4 overflow-hidden bg-white h-100" aria-live="polite">
            <div className="p-4 bg-primary bg-gradient text-white text-center">
                <h6 className="text-uppercase letter-spacing-2 opacity-75 mb-2">Total Morphine Equivalent</h6>
                <h1 className="display-1 fw-bold mb-0">{results.total}</h1>
                <span className="fs-5 opacity-75">mg / day</span>
            </div>

            <Card.Body className="p-4">
                <h6 className="text-uppercase text-secondary fw-bold small mb-3 letter-spacing-1">Breakdown</h6>
                <ListGroup variant="flush">
                    {results.hmo > 0 && <ResultItem label="Hydromorphone Oral" value={results.hmo} />}
                    {results.hmiv > 0 && <ResultItem label="Hydromorphone IV" value={results.hmiv} />}
                    {results.kadian > 0 && <ResultItem label="Morphine (Kadian)" value={results.kadian} />}
                    {results.methadone > 0 && <ResultItem label="Methadone" value={results.methadone} />}
                    {results.fentanyl > 0 && <ResultItem label="Fentanyl Patch" value={results.fentanyl} />}
                    {results.oxycodone > 0 && <ResultItem label="Oxycodone" value={results.oxycodone} />}
                    {results.sufentanil > 0 && <ResultItem label="Sufentanil" value={results.sufentanil} />}
                    {results.streetFentanyl > 0 && <ResultItem label="Street Fentanyl" value={results.streetFentanyl} />}

                    {results.total === 0 && (
                        <div className="text-center py-5 text-muted opacity-50">
                            <p className="mb-0">Enter values to see results</p>
                        </div>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default React.memo(ResultsVisualization);
