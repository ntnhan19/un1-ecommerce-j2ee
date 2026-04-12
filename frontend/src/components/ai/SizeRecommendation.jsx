import React, { useState, useEffect } from 'react';
import { useSize } from '../../context/SizeContext';
import './SizeRecommendation.css';

const FIT_PREFERENCE_LABELS = ['Rất ôm', 'Ôm', 'Tiêu chuẩn', 'Thoải mái', 'Rộng'];

const STATUS_META = {
    'Chật': { cls: 'status--tight', dot: '#d97706', badge: 'badge--tight' },
    'Vừa': { cls: 'status--good', dot: '#059669', badge: 'badge--good' },
    'Rộng': { cls: 'status--loose', dot: '#2563eb', badge: 'badge--loose' },
};

const OVERALL_META = {
    'Ôm/chật': { cls: 'pill--tight' },
    'Vừa vặn': { cls: 'pill--good' },
    'Rộng': { cls: 'pill--loose' },
};

// ─── Garment SVGs ──────────────────────────────────────────────────────────────

const GarmentTop = ({ details }) => {
    const map = {};
    (details || []).forEach(d => { map[d.area] = d; });

    const VBW = 280, VBH = 260;
    const annotations = [
        { area: 'Vai', x: 228, y: 52, side: 'right' },
        { area: 'Ngực', x: 228, y: 100, side: 'right' },
        { area: 'Eo', x: 52, y: 138, side: 'left' },
        { area: 'Dài thân', x: 228, y: 182, side: 'right' },
        { area: 'Dài tay', x: 20, y: 78, side: 'left' },
    ];

    return (
        <div className="sr-diagram">
            <svg className="sr-garment-svg" viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <path
                    d="M95 32 L78 10 L36 30 L16 80 L52 92 L52 235 L228 235 L228 92 L264 80 L244 30 L202 10 L185 32 Q162 44 140 44 Q118 44 95 32Z"
                    fill="var(--sr-garment-fill)" stroke="var(--sr-garment-stroke)" strokeWidth="1.5" strokeLinejoin="round"
                />
                {/* Collar */}
                <path d="M118 44 Q140 60 162 44" stroke="var(--sr-garment-stroke)" strokeWidth="1.2" fill="none" />
                {/* Sleeve seams */}
                <path d="M78 10 Q86 24 95 32" stroke="var(--sr-garment-stroke)" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M202 10 Q194 24 185 32" stroke="var(--sr-garment-stroke)" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Guide lines */}
                <line x1="52" y1="92" x2="228" y2="92" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="52" y1="128" x2="228" y2="128" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="52" y1="165" x2="228" y2="165" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="52" y1="200" x2="228" y2="200" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
            </svg>

            {annotations.map(({ area, x, y, side }) => {
                const d = map[area];
                if (!d) return null;
                const meta = STATUS_META[d.status] || STATUS_META['Vừa'];
                return (
                    <AnnotationPin key={area} area={area} x={x} y={y} side={side} meta={meta} status={d.status} vbW={VBW} vbH={VBH} />
                );
            })}
        </div>
    );
};

const GarmentBottom = ({ details }) => {
    const map = {};
    (details || []).forEach(d => { map[d.area] = d; });

    const VBW = 280, VBH = 280;
    const annotations = [
        { area: 'Eo', x: 228, y: 42, side: 'right' },
        { area: 'Hông', x: 228, y: 90, side: 'right' },
        { area: 'Bắp đùi', x: 52, y: 130, side: 'left' },
        { area: 'Dài quần', x: 228, y: 215, side: 'right' },
        { area: 'Dài đáy quần', x: 52, y: 72, side: 'left' },
    ];

    return (
        <div className="sr-diagram">
            <svg className="sr-garment-svg" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Waistband */}
                <rect x="60" y="14" width="160" height="24" rx="4"
                    fill="var(--sr-garment-fill)" stroke="var(--sr-garment-stroke)" strokeWidth="1.5" />
                {/* Main body */}
                <path
                    d="M60 38 L60 120 Q60 140 72 180 L80 255 L136 255 L140 160 L144 255 L200 255 L208 180 Q220 140 220 120 L220 38 Z"
                    fill="var(--sr-garment-fill)" stroke="var(--sr-garment-stroke)" strokeWidth="1.5" strokeLinejoin="round"
                />
                {/* Crotch seam */}
                <path d="M136 255 Q140 145 144 255" stroke="var(--sr-garment-stroke)" strokeWidth="1" fill="none" />
                {/* Center seam */}
                <line x1="140" y1="38" x2="140" y2="160" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="3,3" />
                {/* Guide lines */}
                <line x1="60" y1="38" x2="220" y2="38" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="60" y1="80" x2="220" y2="80" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="60" y1="118" x2="220" y2="118" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="80" y1="190" x2="200" y2="190" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
            </svg>

            {annotations.map(({ area, x, y, side }) => {
                const d = map[area];
                if (!d) return null;
                const meta = STATUS_META[d.status] || STATUS_META['Vừa'];
                return (
                    <AnnotationPin key={area} area={area} x={x} y={y} side={side} meta={meta} status={d.status} vbW={VBW} vbH={VBH} />
                );
            })}
        </div>
    );
};

const GarmentDress = ({ details }) => {
    const map = {};
    (details || []).forEach(d => { map[d.area] = d; });

    const VBW = 280, VBH = 300;
    const annotations = [
        { area: 'Vai', x: 228, y: 42, side: 'right' },
        { area: 'Ngực', x: 228, y: 90, side: 'right' },
        { area: 'Eo', x: 52, y: 132, side: 'left' },
        { area: 'Hông', x: 228, y: 172, side: 'right' },
        { area: 'Dài thân', x: 52, y: 234, side: 'left' },
    ];

    return (
        <div className="sr-diagram">
            <svg className="sr-garment-svg" viewBox="0 0 280 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <path
                    d="M100 28 L84 10 L44 28 L28 68 L60 80 L52 150 Q48 200 60 270 L220 270 Q232 200 228 150 L220 80 L252 68 L236 28 L196 10 L180 28 Q162 40 140 40 Q118 40 100 28Z"
                    fill="var(--sr-garment-fill)" stroke="var(--sr-garment-stroke)" strokeWidth="1.5" strokeLinejoin="round"
                />
                {/* Collar */}
                <path d="M118 40 Q140 56 162 40" stroke="var(--sr-garment-stroke)" strokeWidth="1.2" fill="none" />
                {/* Waist seam */}
                <path d="M52 150 Q140 140 228 150" stroke="var(--sr-garment-stroke)" strokeWidth="0.8" strokeDasharray="3,2" fill="none" />
                {/* Guide lines */}
                <line x1="60" y1="80" x2="220" y2="80" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="54" y1="118" x2="226" y2="118" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="52" y1="158" x2="228" y2="158" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="58" y1="200" x2="222" y2="200" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
            </svg>

            {annotations.map(({ area, x, y, side }) => {
                const d = map[area];
                if (!d) return null;
                const meta = STATUS_META[d.status] || STATUS_META['Vừa'];
                return (
                    <AnnotationPin key={area} area={area} x={x} y={y} side={side} meta={meta} status={d.status} vbW={VBW} vbH={VBH} />
                );
            })}
        </div>
    );
};

const GarmentOuterwear = ({ details }) => {
    const map = {};
    (details || []).forEach(d => { map[d.area] = d; });

    const VBW = 280, VBH = 265;
    const annotations = [
        { area: 'Vai', x: 228, y: 48, side: 'right' },
        { area: 'Ngực', x: 228, y: 100, side: 'right' },
        { area: 'Eo', x: 52, y: 140, side: 'left' },
        { area: 'Dài thân', x: 228, y: 188, side: 'right' },
        { area: 'Dài tay', x: 20, y: 85, side: 'left' },
    ];

    return (
        <div className="sr-diagram">
            <svg className="sr-garment-svg" viewBox="0 0 280 265" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body — slightly wider lapels for outerwear */}
                <path
                    d="M90 30 L72 8 L28 30 L10 85 L52 98 L52 240 L228 240 L228 98 L270 85 L252 30 L208 8 L190 30 Q168 46 152 50 L140 60 L128 50 Q112 46 90 30Z"
                    fill="var(--sr-garment-fill)" stroke="var(--sr-garment-stroke)" strokeWidth="1.5" strokeLinejoin="round"
                />
                {/* Lapels */}
                <path d="M128 50 Q134 80 140 95" stroke="var(--sr-garment-stroke)" strokeWidth="1" fill="none" />
                <path d="M152 50 Q146 80 140 95" stroke="var(--sr-garment-stroke)" strokeWidth="1" fill="none" />
                {/* Center button line */}
                <line x1="140" y1="95" x2="140" y2="240" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="3,3" />
                {/* Sleeve seams */}
                <path d="M72 8 Q82 22 90 30" stroke="var(--sr-garment-stroke)" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M208 8 Q198 22 190 30" stroke="var(--sr-garment-stroke)" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Guide lines */}
                <line x1="52" y1="98" x2="228" y2="98" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="52" y1="134" x2="228" y2="134" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="52" y1="170" x2="228" y2="170" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
                <line x1="52" y1="205" x2="228" y2="205" stroke="var(--sr-guide)" strokeWidth="0.5" strokeDasharray="4,3" />
            </svg>

            {annotations.map(({ area, x, y, side }) => {
                const d = map[area];
                if (!d) return null;
                const meta = STATUS_META[d.status] || STATUS_META['Vừa'];
                return (
                    <AnnotationPin key={area} area={area} x={x} y={y} side={side} meta={meta} status={d.status} vbW={VBW} vbH={VBH} />
                );
            })}
        </div>
    );
};

// ─── Annotation Pin ────────────────────────────────────────────────────────────
// x, y  = absolute pixel coords within the SVG viewBox
// vbW, vbH = viewBox width & height of the specific garment SVG

const AnnotationPin = ({ area, x, y, side, meta, status, vbW = 280, vbH = 280 }) => {
    const isRight = side === 'right';
    const pct_x = (x / vbW) * 100;
    const pct_y = (y / vbH) * 100;

    return (
        <div
            className={`sr-ann sr-ann--${side}`}
            style={{ position: 'absolute', left: `${pct_x}%`, top: `${pct_y}%`, transform: 'translateY(-50%)' }}
        >
            {isRight && <div className="sr-ann__line" />}
            <div className="sr-ann__dot" style={{ background: meta.dot }} />
            {!isRight && <div className="sr-ann__line" />}

            <div className={`sr-ann__content sr-ann__content--${side}`}>
                <span className="sr-ann__area">{area}</span>
                <span className={`sr-ann__badge ${meta.badge}`}>{status}</span>
            </div>
        </div>
    );
};

// ─── Garment selector ──────────────────────────────────────────────────────────

const GarmentDiagram = ({ productType, details }) => {
    const type = (productType || '').toUpperCase();
    if (type === 'BOTTOM') return <GarmentBottom details={details} />;
    if (type === 'DRESS') return <GarmentDress details={details} />;
    if (type === 'OUTERWEAR') return <GarmentOuterwear details={details} />;
    return <GarmentTop details={details} />;
};

// ─── Main component ────────────────────────────────────────────────────────────

const SizeRecommendation = () => {
    const { recommendation, measurements, clearData, resetRecommendation } = useSize();
    const [selectedSize, setSelectedSize] = useState(null);

    const allSizes = recommendation?.allSizeResults || [];
    const recommendedSize = recommendation?.recommendedSize;
    const productType = recommendation?.productType || 'TOP';

    useEffect(() => {
        if (recommendedSize) setSelectedSize(recommendedSize);
    }, [recommendedSize]);

    if (!recommendation) return null;

    const activeResult = allSizes.find(r => r.size === selectedSize) || allSizes[0];
    const overallMeta = OVERALL_META[activeResult?.overallFit] || { cls: 'pill--neutral' };
    const isRecommended = activeResult?.size === recommendedSize;

    return (
        <div className="sr-container">

            {/* ── Meta ── */}
            <div className="sr-meta">
                <span className="sr-meta__info">
                    {measurements.gender === 'male' ? 'Nam' : 'Nữ'} · {measurements.age} tuổi · {measurements.height} cm · {measurements.weight} kg
                </span>
                <div className="sr-meta__row">
                    <span className="sr-meta__fit-row">
                        Fit mong muốn: <strong>{FIT_PREFERENCE_LABELS[measurements.fitPreference] ?? 'Tiêu chuẩn'}</strong>
                    </span>
                    <button className="sr-btn-chip" onClick={resetRecommendation}>Chỉnh sửa</button>
                </div>
            </div>

            {/* ── Hero ── */}
            <div className="sr-hero">
                <div className="sr-hero__left">
                    <p className="sr-hero__eyebrow">Size đề xuất</p>
                    <p className="sr-hero__size">{recommendedSize}</p>
                </div>
                <div className="sr-hero__right">
                    <p className="sr-hero__summary">{recommendation.recommendationSummary}</p>
                </div>
            </div>

            {/* ── Size tabs ── */}
            <div className="sr-tabs" role="tablist">
                {allSizes.map(result => {
                    const isActive = result.size === selectedSize;
                    const isRec = result.size === recommendedSize;
                    return (
                        <button
                            key={result.size}
                            role="tab"
                            aria-selected={isActive}
                            className={`sr-tab ${isActive ? 'sr-tab--active' : ''}`}
                            onClick={() => setSelectedSize(result.size)}
                        >
                            {isRec && <span className="sr-tab__dot" />}
                            <span className="sr-tab__size">{result.size}</span>
                            {isRec && <span className="sr-tab__rec">gợi ý</span>}
                        </button>
                    );
                })}
            </div>

            {/* ── Diagram panel ── */}
            <div className={`sr-panel ${isRecommended ? 'sr-panel--recommended' : ''}`}>

                {/* Panel header */}
                <div className="sr-panel__header">
                    <div className="sr-panel__title-row">
                        <span className="sr-panel__size-label">Size {activeResult?.size}</span>
                        <span className={`sr-pill ${overallMeta.cls}`}>{activeResult?.overallFit}</span>
                    </div>
                    {activeResult?.summary && (
                        <p className="sr-panel__summary">{activeResult.summary}</p>
                    )}
                </div>

                {/* Garment diagram with annotations */}
                <div className="sr-diagram-wrap">
                    <GarmentDiagram
                        productType={productType}
                        details={activeResult?.details || []}
                    />
                </div>

                {/* Legend */}
                <div className="sr-legend">
                    {[
                        { cls: 'badge--good', label: 'Vừa vặn' },
                        { cls: 'badge--tight', label: 'Chật / ôm' },
                        { cls: 'badge--loose', label: 'Rộng' },
                    ].map(({ cls, label }) => (
                        <div key={label} className="sr-legend__item">
                            <span className={`sr-legend__dot ${cls}`} />
                            <span className="sr-legend__label">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="sr-footer">
                <button className="sr-btn-outline" onClick={clearData}>Nhập lại</button>
            </div>

        </div>
    );
};

export default SizeRecommendation;