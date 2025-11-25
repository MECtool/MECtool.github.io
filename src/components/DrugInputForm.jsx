import React, { useCallback } from 'react';
import { useAtom } from 'jotai';
import { Form, Row, Col, Card } from 'react-bootstrap';
import {
    hmoAtom,
    hmivAtom,
    kadianAtom,
    methadoneAtom,
    fentanylAtom,
    oxycodoneAtom,
    sufentanilAtom,
    streetFentanylPtsAtom,
    streetFentanylPctAtom
} from '../state/atoms';

const InputField = React.memo(({ label, atom, placeholder, type = "number", step = "any" }) => {
    const [value, setValue] = useAtom(atom);

    const handleChange = useCallback((e) => {
        const val = e.target.value;
        if (val === '' || parseFloat(val) >= 0) {
            setValue(val);
        }
    }, [setValue]);

    return (
        <Form.Group className="mb-3" controlId={label.replace(/\s+/g, '')}>
            <Form.Label className="text-secondary small fw-bold text-uppercase">{label}</Form.Label>
            <Form.Control
                type={type}
                inputMode="decimal"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                step={step}
                className="premium-input"
            />
        </Form.Group>
    );
});

const DrugInputForm = () => {
    return (
        <div className="drug-input-form">
            <h5 className="mb-4 text-primary fw-bold">Prescription Opioids</h5>
            <Row>
                <Col md={6}>
                    <InputField label="Hydromorphone Oral" atom={hmoAtom} placeholder="Daily dose (mg)" />
                </Col>
                <Col md={6}>
                    <InputField label="Hydromorphone IV" atom={hmivAtom} placeholder="Daily dose (mg)" />
                </Col>
                <Col md={6}>
                    <InputField label="Morphine Oral (Kadian)" atom={kadianAtom} placeholder="Daily dose (mg)" />
                </Col>
                <Col md={6}>
                    <InputField label="Methadone" atom={methadoneAtom} placeholder="Daily dose (mg)" />
                </Col>
                <Col md={6}>
                    <InputField label="Fentanyl Transdermal" atom={fentanylAtom} placeholder="Dose (mcg/hr)" />
                </Col>
                <Col md={6}>
                    <InputField label="Oxycodone Oral" atom={oxycodoneAtom} placeholder="Daily dose (mg)" />
                </Col>
                <Col md={6}>
                    <InputField label="Sufentanil IV/SC" atom={sufentanilAtom} placeholder="Daily dose (mcg)" />
                </Col>
            </Row>

            <hr className="my-4 opacity-10" />

            <h5 className="mb-4 text-danger fw-bold">Street Fentanyl</h5>
            <Card className="border-0 shadow-sm bg-light rounded-4">
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <InputField label="Points" atom={streetFentanylPtsAtom} placeholder="Enter points" />
                        </Col>
                        <Col md={6}>
                            <InputField label="Percentage (%)" atom={streetFentanylPctAtom} placeholder="4.4" />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default React.memo(DrugInputForm);
